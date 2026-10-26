#!/usr/bin/env node
/**
 * ============================================================
 * DouNest v3 — Build script (SEO page generator)
 * ============================================================
 * Usage:  node build.mjs
 *
 * Generates:
 *   1. tools/<slug>/index.html   — crawlable landing pages with
 *      prerendered Arabic content (usage + explanation + FAQ) and full
 *      meta/JSON-LD. The SPA hydrates the interactive workspace.
 *   2. articles/<slug>/index.html
 *   3. about|privacy|terms|contact/index.html
 *   4. 404.html — SPA fallback for GitHub Pages clean URLs
 *   5. sitemap.xml — valid, fragment-free URLs
 *   6. sw.js — service worker with a synced asset list (fixes the v2
 *      cache/query mismatch)
 *
 * Single source of truth: config.js + js/registry.js + js/articles.js
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { TOOLS, CATEGORIES } from "./js/registry.js";
import { getArticles } from "./js/articles.js";
import { getFAQ, FAQ_CATS } from "./js/faq.js";
import { AI_TOOLS as AI_TOOLS_DATA } from "./js/ai-directory.js";
import { RARE_CATS, RARE_TOOLS as RARE_TOOLS_DATA, rareByCat, getRareTool } from "./js/rare-tools.js";
import { rareIndexHTML, rareCatHTML, rareDetailHTML, hashtagChipsHTML } from "./js/rare-page.js";
import { markdownToHtml } from "./js/lib/article-markdown.js";
import { centerContentMarkup, centerFaqSchema } from "./js/center-content.js";
import { INFO_PAGES, renderInfoPage, infoPageJsonLd } from "./js/info-pages.js";
import { getMailCopy } from "./js/mail-copy.js";

/* category ordering + Arabic labels for build-time prerendering */
const CATEGORIES_ORDER = CATEGORIES.map(c => c.id).filter(id => id !== "all");
const CAT_LABEL_AR = {
  text: "نصوص", encode: "ترميز", dev: "مطورين", color: "ألوان",
  security: "أمان", media: "وسائط"
};

const ROOT = dirname(fileURLToPath(import.meta.url));
const NOW = new Date().toISOString().slice(0, 10);
const BUILD_ID = "v3-" + NOW + "-" + Date.now().toString(36);

/* ---------- read config.js (plain JS object assignment) ---------- */
const cfgSrc = readFileSync(join(ROOT, "config.js"), "utf-8");
const m = cfgSrc.match(/=\s*(\{[\s\S]*\});?\s*$/m);
if (!m) throw new Error("cannot parse config.js");
const CFG = new Function(`return ${m[1]}`)();

const BASE = CFG.repoPath ? `/${CFG.repoPath}/` : "/";
const SITE = (CFG.origin || "").replace(/\/$/, "") + BASE;

/* ---------- i18n mini-pack (build-time strings) ---------- */
const L = {
  ar: {
    allTools: "All Tools", usage: "طريقة الاستخدام", explanation: "شرح مفصّل",
    faq: "أسئلة شائعة", related: "أدوات ذات صلة", local: "تُعالج الملفات محلياً في المتصفح عندما تدعم الأداة ذلك",
    home: "الرئيسية", articles: "Articles", rare: "أدوات نادرة", ai: "دليل AI", images: "مركز الصور", mail: "بريد مؤقت",
    pdf: "مركز PDF", convert: "مركز التحويل",
    about: "حول", fav: "المفضلة", privacy: "سياسة الخصوصية", terms: "شروط الاستخدام", contact: "التواصل والدعم",
    back: "العودة إلى كل الأدوات", read: "اقرأ المقال", runIn: "شغّل الأداة الآن",
    faqNav: "الأسئلة الشائعة", faqTitle: "الأسئلة الشائعة",
    faqSub: "إجابات واضحة عن أسئلة شائعة حول تحويل الصيغ وملفات PDF والصور والخصوصية؛ وتعالج الأدوات الملفات محلياً عندما تدعم ذلك."
  },
  en: {
    allTools: "All Tools", usage: "How to use", explanation: "Detailed explanation",
    faq: "FAQ", related: "Related tools", local: "Files are processed locally when the tool supports it",
    home: "Home", articles: "Articles", rare: "Rare Tools", ai: "AI Directory", images: "Image Hub", mail: "Temporary Email",
    pdf: "PDF Hub", convert: "Convert Hub",
    about: "About", fav: "Favorites", privacy: "Privacy Policy", terms: "Terms", contact: "Contact and Support",
    back: "Back to all tools", read: "Read the article", runIn: "Open the tool",
    faqNav: "FAQ", faqTitle: "Frequently Asked Questions",
    faqSub: "Clear answers to common questions about file conversion, PDF, images, and privacy; tools process files locally where supported.",
    text: "Text Center", developers: "Developer Center", security: "Security Center", calculators: "Calculators", centers: "Centers"
  }
};
const pick = (obj, lang) => (obj && (obj[lang] || obj.en)) || "";
const relPrefix = (p) => "../".repeat(p.split("/").filter(Boolean).length); // from page folder to site root
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- shared page template (absolute asset paths) ---------- */
function shell({ lang = "ar", title, description, canonicalPath, canonicalUrl = null, jsonLd = [], bodyContent, bodyClass = "", absolute = false, noindex = false, alternateLanguages = [], ogType = "website" }) {
  const url = SITE + canonicalPath;
  const seoUrl = canonicalUrl || url;
  const V = L[lang] || L.en;
  const ogLocale = ({ ar: "ar_AR", en: "en_US", fr: "fr_FR", es: "es_ES", de: "de_DE", tr: "tr_TR", ru: "ru_RU", zh: "zh_CN", hi: "hi_IN", pt: "pt_BR" })[lang] || "en_US";
  const content = String(bodyContent ?? "").trimEnd();
  // Relative prefix that reaches the site root from this page's folder.
  // Works on GitHub Pages (/DouNest/tools/x/), custom domains and local servers alike.
  const depth = canonicalPath ? canonicalPath.split("/").filter(Boolean).length : 0;
  const up = absolute ? BASE : relPrefix(canonicalPath);
  const R = (p) => up + p; // resolve a root-relative path from this page
  const ld = [
    noindex ? null : {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "DouNest",
      "url": SITE,
      "inLanguage": lang,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE}tools/?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    ...jsonLd
  ].filter(Boolean).map(g => `<script type="application/ld+json">${JSON.stringify(g).replace(/</g, "\\u003c")}</script>`).join("\n");
  const hreflangLinks = alternateLanguages.map(item => `<link rel="alternate" hreflang="${esc(item.lang)}" href="${esc(item.url)}" />`).join("\n");
  const verificationMeta = String(CFG.googleSiteVerification || "").trim()
    ? `<meta name="google-site-verification" content="${esc(String(CFG.googleSiteVerification).trim())}" />`
    : "";

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#7c3aed" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<meta name="robots" content="${noindex ? "noindex,nofollow" : "index,follow"}" />
<link rel="canonical" href="${seoUrl}" />
${verificationMeta}
${hreflangLinks}
<link rel="manifest" href="${R("manifest.json")}" />
<link rel="alternate" type="application/rss+xml" title="DouNest" href="${R("feed.xml")}" />
<link rel="icon" type="image/png" sizes="32x32" href="${R("assets/favicon-32.png")}" />
<link rel="icon" type="image/png" sizes="192x192" href="${R("assets/icon-192.png")}" />
<link rel="apple-touch-icon" href="${R("assets/icon-192.png")}" />
<meta property="og:type" content="${esc(ogType)}" />
<meta property="og:site_name" content="DouNest" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${seoUrl}" />
<meta property="og:image" content="${SITE}assets/og-cover.png" />
<meta property="og:locale" content="${ogLocale}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(description)}" />
<meta name="twitter:image" content="${SITE}assets/og-cover.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
<link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Arabic:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="${R("assets/styles.css")}" />
<link rel="stylesheet" href="${R("assets/styles-v4.css")}" />
<script>
  try {
    var _t = JSON.parse(localStorage.getItem("dounest.theme") || "null");
    if (!_t) _t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = _t;
  } catch (e) {}
</script>
<script src="${R("config.js")}"></script>
<script>
/* DouNest self-heal: if the served build changed, purge any stale service
   worker + caches once so users never stay stuck on an old cached version. */
(function(){
  var B="__DN_BUILD__";
  try{
    if(B.indexOf("__")!==0 && localStorage.getItem("dn.build")!==B){
      localStorage.setItem("dn.build",B);
      if(!sessionStorage.getItem("dn.heal")){
        sessionStorage.setItem("dn.heal","1");
        var jobs=[];
        if(navigator.serviceWorker&&navigator.serviceWorker.getRegistrations)
          jobs.push(navigator.serviceWorker.getRegistrations().then(function(rs){rs.forEach(function(r){r.unregister();});}));
        if(window.caches) jobs.push(caches.keys().then(function(ks){ks.forEach(function(k){caches.delete(k);});}));
        Promise.all(jobs).catch(function(){}).then(function(){location.reload();});
      }
    }
  }catch(e){}
})();
</script>
${ld}
</head>
<body>
  <a class="skip-link" href="#main">${lang === "ar" ? "تخطَّ إلى المحتوى" : "Skip to content"}</a>
  <div class="ambient ambient-one" aria-hidden="true"></div>
  <div class="ambient ambient-two" aria-hidden="true"></div>
  <header class="topbar">
    <div class="container topbar-inner">
      <a href="${R("")}" class="brand" aria-label="DouNest">
        <img src="${R("assets/dounest-logo.png")}" class="brand-logo" alt="DouNest" width="38" height="38" />
        <span class="brand-name">DouNest</span>
      </a>
      <nav id="topnav" class="topnav" aria-label="Main">
        <a href="${R("")}" data-i18n="nav.home">${V.home}</a>
        <a href="${R("tools/")}" data-i18n="nav.allTools">${V.allTools}</a>
        <a href="${R("mail/")}" data-i18n="nav.tempMail">${V.mail}</a>
        <details class="topnav-group"><summary data-i18n="nav.centers">${lang === "ar" ? "المراكز" : "Centers"}</summary><div>
          <a href="${R("pdf/")}" data-i18n="nav.pdf">${V.pdf}</a><a href="${R("images/")}" data-i18n="nav.images">${V.images}</a>
          <a href="${R("convert/")}" data-i18n="nav.convert">${V.convert}</a><a href="${R("text/")}" data-i18n="nav.text">${lang === "ar" ? "مركز النصوص" : "Text center"}</a>
          <a href="${R("dev/")}" data-i18n="nav.developers">${lang === "ar" ? "مركز المطورين" : "Developer center"}</a>
          <a href="${R("security/")}" data-i18n="nav.security">${lang === "ar" ? "مركز الأمان" : "Security center"}</a>
          <a href="${R("calculators/")}" data-i18n="nav.calculators">${lang === "ar" ? "الحاسبات" : "Calculators"}</a>
        </div></details>
        <a href="${R("articles/")}" data-i18n="nav.articles">${V.articles}</a><a href="${R("faq/")}" data-i18n="nav.faq">${V.faqNav}</a>
        <a href="${R("rare/")}" data-i18n="nav.rare">${V.rare}</a><a href="${R("ai/")}" data-i18n="nav.ai">${V.ai}</a>
      </nav>
      <div class="topbar-actions">
        <button id="nav-toggle" class="icon-btn nav-toggle" aria-controls="topnav" aria-expanded="false" aria-label="${lang === "ar" ? "فتح قائمة التنقل" : "Open navigation menu"}">☰</button>
        <button id="theme-toggle" class="icon-btn" aria-label="Toggle theme">🌙</button>
        <div id="lang-menu" class="lang-menu"></div>
      </div>
    </div>
  </header>
  <main id="main" class="container" role="main" tabindex="-1">
${content}
  </main>
  <footer class="footer">
    <div class="container footer-inner">
      <span>© <span id="year"></span> DouNest — <span data-i18n="footer.local">${V.local}</span></span>
      <nav class="footer-nav" aria-label="${lang === "ar" ? "روابط الموقع" : "Site links"}">
        <a href="${R("privacy/")}" data-i18n="nav.privacy">${V.privacy}</a>
        <a href="${R("terms/")}" data-i18n="nav.terms">${V.terms}</a>
        <a href="${R("about/")}" data-i18n="nav.about">${V.about}</a>
        <a href="${R("contact/")}" data-i18n="nav.contact">${V.contact}</a>
        <a href="${R("ai/")}">${V.ai}</a>
      </nav>
    </div>
  </footer>
  <div id="toast-container" aria-live="polite" aria-atomic="true"></div>
  <script type="module" src="${R("js/app.js")}"></script>
</body>
</html>`;
}

function writePage(relPath, content) {
  const file = join(ROOT, relPath);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, String(content).replace(/^[\t ]+$/gm, ""));
  console.log("  ✓", relPath);
}

/* ---------- 0) home page (pre-rendered for crawlers and no-JS visits) ---------- */
console.log("→ pre-rendered home page");
{
  const centers = [
    ["pdf/", "📄", "PDF Tools", "Compress, merge, split, and convert PDFs in your browser"],
    ["images/", "🖼️", "Image Tools", "Convert, compress, resize, and edit images locally"],
    ["convert/", "🔄", "File Conversion", "Convert common file formats without uploads"],
    ["text/", "✍️", "Text Tools", "Clean, transform, and analyze text"],
    ["dev/", "🧰", "Developer Tools", "JSON, Base64, JWT, and coding utilities"],
    ["security/", "🔐", "Security Tools", "Passwords, TOTP, and local security utilities"],
    ["calculators/", "🧮", "Calculators", "Free everyday calculators that run in your browser"],
    ["mail/", "✉️", "Temporary Email", "Receive a disposable email address for one hour"]
  ];
  const popular = ["json-formatter", "image-compressor", "merge-pdf", "pdf-to-word", "csv-to-json", "password-generator", "qr-code", "remove-background", "image-to-pdf", "uuid-generator", "word-counter", "exif-viewer"]
    .map(slug => TOOLS.find(t => t.slug === slug)).filter(Boolean);
  const articles = getArticles().slice(0, 3);
  const body = `<section class="page-head home-prerender"><h1>Free Browser Tools and File Converters — DouNest</h1>
    <p>Use ${TOOLS.length}+ free browser tools for PDF, images, text, Excel, JSON, and developer workflows. No signup and no file uploads.</p>
    <form class="home-search" action="${BASE}tools/" method="get"><label for="home-q">Search for a tool</label><input id="home-q" name="q" type="search" placeholder="Try: Excel to JSON or compress PDF"><button class="btn btn-primary">Search</button></form></section>
    <section class="section"><h2 class="section-title">Work centers</h2><div class="explore-strip">${centers.map(([path,icon,name,desc]) => `<a class="explore-card" href="${BASE}${path}"><strong>${icon} ${name}</strong><span>${desc}</span></a>`).join("")}</div></section>
    <section class="section"><h2 class="section-title">Popular tools</h2><div class="tools-grid">${popular.map(t => `<a class="tool-card" href="${BASE}tools/${t.slug}/"><div class="icon cat-${t.category}" aria-hidden="true">${t.icon}</div><h3>${esc(pick(t.name,"en"))}</h3><p>${esc(pick(t.short,"en"))}</p></a>`).join("")}</div><p><a href="${BASE}tools/">Browse all tools →</a></p></section>
    <section class="section"><h2 class="section-title">Guides and troubleshooting</h2><div class="tools-grid">${articles.map(a => `<a class="tool-card article" href="${BASE}articles/${a.slug}/en/"><h3>${esc(pick(a.title,"en"))}</h3><p>${esc(pick(a.excerpt,"en"))}</p></a>`).join("")}</div></section>
    <section class="section"><h2 class="section-title">Privacy by design</h2><p>Supported file tools process content locally in your browser. Temporary email is a server-side exception; read the <a href="${BASE}privacy/">Privacy Policy</a> before using it.</p></section>`;
  writePage("index.html", shell({ lang: "en", title: "DouNest – Free Browser Tools & File Converters", description: "Convert files, format JSON, and use developer tools in your browser. No signup, no uploads—your files stay on your device.", canonicalPath: "", alternateLanguages: [{ lang: "en", url: SITE }, { lang: "x-default", url: SITE }], jsonLd: [{"@context":"https://schema.org","@type":"ItemList","name":"Popular browser tools","itemListElement":centers.map(([path,_icon,name],i)=>({"@type":"ListItem","position":i+1,"name":name,"url":SITE+path}))}], bodyContent: body }));
}

/* ---------- 1) tool landing pages (English-first prerendered) ---------- */
const AR = L.en;
console.log("→ tool pages");
for (const tool of TOOLS) {
  const name = pick(tool.name, "en");
  const short = pick(tool.short, "en");
  const usage = tool.usage.en || tool.usage.ar || [];
  const expl = tool.explanation.en || tool.explanation.ar || [];
  const faq = tool.faq || [];
  const related = (tool.related || []).map(getToolB).filter(Boolean);
  const up = relPrefix(`tools/${tool.slug}/`);
  const guideForTool = {
    "excel-to-json": "excel-to-json-guide",
    "pdf-to-word": "pdf-to-word-guide",
    "image-to-pdf": "image-to-pdf-guide",
    "csv-to-json": "csv-json-conversion-guide",
    "json-to-csv": "csv-json-conversion-guide"
  }[tool.slug];

  const body = `
    <nav class="breadcrumb" aria-label="breadcrumb">
      <a href="${up}">DouNest</a><span class="sep">›</span>
      <a href="${up}tools/">${AR.allTools}</a><span class="sep">›</span>
      <span class="current">${esc(name)}</span>
    </nav>
    <header class="tool-header">
      <div class="tool-header-main">
        <div class="icon big cat-${tool.category}" aria-hidden="true">${tool.icon}</div>
        <div>
          <h1>${esc(name)}</h1>
          <p class="lead">${esc(short)}</p>
          <div class="tool-meta">
            <span class="badge success">🔒 ${AR.local}</span>
            <span class="badge ghost">${esc(tool.category)}</span>
          </div>
        </div>
      </div>
    </header>
    <div class="tool-layout">
      <div class="tool-maincol">
        <section class="workspace" id="tool-workspace">
          <p class="empty" style="margin:0">${esc(short)}</p>
        </section>
        <section class="section">
          <h2>${AR.usage}</h2>
          <ol class="steps">${usage.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
        </section>
        <section class="section">
          <h2>${AR.explanation}</h2>
          <div class="explanation">${expl.map(p => `<p>${esc(p)}</p>`).join("")}</div>
        </section>
        ${faq.length ? `
        <section class="section">
          <h2>${AR.faq}</h2>
          ${faq.map(f => `<details class="faq-item"><summary>${esc(pick(f.q, "en"))}</summary><p>${esc(pick(f.a, "en"))}</p></details>`).join("")}
        </section>` : ""}
        ${(tool.tags && tool.tags.length) ? `
        <section class="section">
          <h2>Search topics</h2>
          ${hashtagChipsHTML(tool.tags, "en", `${BASE}tools/?q=`)}
        </section>` : ""}
      </div>
      <aside class="tool-sidecol">
        ${guideForTool ? `<div class="side-box"><h3>Related guide</h3><a class="related-item" href="${up}articles/${guideForTool}/en/"><span class="icon sm">📖</span><span>Read the guide before using this tool</span></a></div>` : ""}
        ${related.length ? `
        <div class="side-box">
          <h3>${AR.related}</h3>
          <div class="related-list">
            ${related.map(rt => `<a class="related-item" href="${up}tools/${rt.slug}/"><span class="icon sm">${rt.icon}</span><span>${esc(pick(rt.name, "en"))}</span></a>`).join("")}
          </div>
        </div>` : ""}
      </aside>
    </div>`;

  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "WebApplication",
      "name": name, "description": short,
      "keywords": (tool.tags || []).join(", "),
      "url": `${SITE}tools/${tool.slug}/`,
      "applicationCategory": "UtilityApplication", "operatingSystem": "Any",
      "inLanguage": "en",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    faq.length ? {
      "@context": "https://schema.org", "@type": "FAQPage",
      "mainEntity": faq.map(f => ({
        "@type": "Question",
        "name": pick(f.q, "en"),
        "acceptedAnswer": { "@type": "Answer", "text": pick(f.a, "en") }
      }))
    } : null,
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "DouNest", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": AR.allTools, "item": `${SITE}tools/` },
        { "@type": "ListItem", "position": 3, "name": name, "item": `${SITE}tools/${tool.slug}/` }
      ]
    }
  ].filter(Boolean);

  writePage(
    `tools/${tool.slug}/index.html`,
    shell({
      lang: "en",
      title: `${name} — DouNest`,
      description: short,
      canonicalPath: `tools/${tool.slug}/`,
      alternateLanguages: [{ lang: "en", url: SITE + `tools/${tool.slug}/` }, { lang: "x-default", url: SITE + `tools/${tool.slug}/` }],
      jsonLd,
      bodyContent: body
    })
  );
}
function getToolB(slug) { return TOOLS.find(t2 => t2.slug === slug); }

/* ---------- 2) article pages ---------- */
console.log("→ article pages");
const ARTICLE_LANGS = ["ar", "en", "fr", "es", "de", "tr", "ru", "zh", "hi", "pt"];
const ARTICLE_LABELS = { ar: "Articles", en: "Articles", fr: "Articles", es: "Artículos", de: "Artikel", tr: "Makaleler", ru: "Статьи", zh: "文章", hi: "लेख", pt: "Artigos" };
const RELATED_LABELS = { ar: "Related guide", en: "Related troubleshooting guide", fr: "Guide de dépannage associé", es: "Guía de solución relacionada", de: "Passender Ratgeber zur Fehlerbehebung", tr: "İlgili sorun giderme rehberi", ru: "Связанное руководство", zh: "相关故障排查指南", hi: "संबंधित समस्या-समाधान गाइड", pt: "Guia de solução relacionado" };
const AUTHOR_LABELS = { ar: "إعداد", en: "By", fr: "Par", es: "Por", de: "Von", tr: "Yazan", ru: "Автор", zh: "作者", hi: "लेखक", pt: "Por" };
const PUBLISHED_LABELS = { ar: "نُشر", en: "Published", fr: "Publié", es: "Publicado", de: "Veröffentlicht", tr: "Yayınlandı", ru: "Опубликовано", zh: "发布于", hi: "प्रकाशित", pt: "Publicado" };
const UPDATED_LABELS = { ar: "آخر تحديث", en: "Updated", fr: "Mis à jour", es: "Actualizado", de: "Aktualisiert", tr: "Güncellendi", ru: "Обновлено", zh: "更新于", hi: "अपडेट किया गया", pt: "Atualizado" };
const localizedTags = (article, lang) => Array.isArray(article.tags) ? article.tags : (article.tags?.[lang] || article.tags?.en || []);

for (const a of getArticles()) {
  const languages = ARTICLE_LANGS.filter(code => a.title?.[code] && a.content?.[code]);
  for (const lang of languages) {
    const title = pick(a.title, lang);
    const excerpt = pick(a.excerpt, lang);
    const tags = localizedTags(a, lang);
    const canonicalPath = lang === "ar" ? `articles/${a.slug}/` : `articles/${a.slug}/${lang}/`;
    const pagePath = lang === "ar" ? `articles/${a.slug}/index.html` : `articles/${a.slug}/${lang}/index.html`;
    const alternates = languages.map(code => ({
      lang: code,
      url: SITE + (code === "ar" ? `articles/${a.slug}/` : `articles/${a.slug}/${code}/`)
    }));
    const englishPath = languages.includes("en") ? `articles/${a.slug}/en/` : canonicalPath;
    const seoCanonicalUrl = SITE + englishPath;
    const seoAlternates = lang === "en" ? [
      { lang: "en", url: seoCanonicalUrl },
      { lang: "x-default", url: seoCanonicalUrl }
    ] : [];
    const tagsHtml = tags.length ? `<div class="article-tags"><div class="hash-chips" aria-label="${lang === "ar" ? "موضوعات المقال" : "Article topics"}">${tags.map(tag => `<span class="hash-chip">#${esc(tag)}</span>`).join("")}</div></div>` : "";
    const up = relPrefix(canonicalPath);
    const relatedSlug = a.slug === "speed-up-slow-windows-pc" ? "wifi-connected-no-internet" : a.slug === "wifi-connected-no-internet" ? "speed-up-slow-windows-pc" : null;
    const relatedArticle = relatedSlug ? getArticles().find(item => item.slug === relatedSlug) : null;
    const relatedHref = relatedSlug ? `${up}articles/${relatedSlug}/${lang === "ar" ? "" : `${lang}/`}` : "";
    const relatedHtml = relatedArticle ? `<aside class="article-related"><strong>${esc(RELATED_LABELS[lang] || RELATED_LABELS.en)}</strong><a href="${relatedHref}">${esc(pick(relatedArticle.title, lang))}</a></aside>` : "";
    const body = `
    <nav class="breadcrumb" aria-label="breadcrumb">
      <a href="${up}">DouNest</a><span class="sep">›</span>
      <a href="${up}articles/">${ARTICLE_LABELS[lang] || "Articles"}</a><span class="sep">›</span>
      <span class="current">${esc(title)}</span>
    </nav>
    <article class="section article-body" lang="${lang}">
      <h1>${esc(title)}</h1>
      <p class="article-byline"><span>${AUTHOR_LABELS[lang] || "By"} DouNest</span><span>· ${PUBLISHED_LABELS[lang] || "Published"}: <time datetime="${esc(a.date)}">${esc(a.date)}</time></span>${a.updated && a.updated !== a.date ? `<span>· ${UPDATED_LABELS[lang] || "Updated"}: <time datetime="${esc(a.updated)}">${esc(a.updated)}</time></span>` : ""}</p>
      <div class="explanation">${markdownToHtml(a.content[lang], BASE)}</div>${relatedHtml}${tagsHtml}
    </article>`;
    const pageTitle = pick(a.metaTitle, lang) || title;
    writePage(pagePath, shell({
      lang,
      title: `${pageTitle} | DouNest`,
      description: excerpt,
      canonicalPath,
      canonicalUrl: seoCanonicalUrl,
      noindex: lang !== "en",
      alternateLanguages: seoAlternates,
      ogType: "article",
      jsonLd: [{
        "@context": "https://schema.org", "@type": "Article",
        "headline": title, "description": excerpt,
        "mainEntityOfPage": { "@type": "WebPage", "@id": seoCanonicalUrl },
        "image": `${SITE}assets/og-cover.png`,
        "datePublished": a.date, "dateModified": a.updated || a.date,
        "keywords": tags.join(", "), "inLanguage": lang,
        "author": { "@type": "Organization", "name": "DouNest", "url": SITE },
        "publisher": { "@type": "Organization", "name": "DouNest", "logo": { "@type": "ImageObject", "url": `${SITE}assets/dounest-logo.png` } }
      }],
      bodyContent: body
    }));
  }
}

/* ---------- 3) legal/info pages ---------- */
console.log("→ static pages");
for (const slug of Object.keys(INFO_PAGES)) {
  const page = INFO_PAGES[slug].en || INFO_PAGES[slug].ar;
  const infoHref = path => path === "/" ? BASE : BASE + path.replace(/^\/+|\/+$/g, "") + "/";
  writePage(
    `${slug}/index.html`,
    shell({
      lang: "en",
      title: `${page.title} — DouNest`,
      description: page.description,
      canonicalPath: `${slug}/`,
      jsonLd: infoPageJsonLd(slug, "en", SITE),
      bodyContent: renderInfoPage(slug, "en", infoHref)
    })
  );
}


/* ---------- 3b) AI directory + Rare tools landing pages (monetization pages) ---------- */
console.log("→ ai/rare landing pages");
const affWrapBuild = (url) => {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    const map = CFG.affiliates || {};
    if (map[host] && CFG.affiliateId) u.searchParams.set(map[host], CFG.affiliateId);
    return { href: esc(u.toString()), rel: "sponsored noopener" };
  } catch { return { href: esc(url), rel: "noopener" }; }
};

{
  const up = relPrefix("ai/");
  const cards = AI_TOOLS_DATA.map(cat => `
      <section class="section">
        <h2 class="section-title">${esc(pick(cat.category, "ar"))}</h2>
        <div class="tools-grid">
          ${cat.items.map(item => {
            const a = affWrapBuild(item.url);
            return `<a class="tool-card external" href="${a.href}" target="_blank" rel="${a.rel}">
              <div class="icon" aria-hidden="true">🤖</div>
              <h3>${esc(item.name)}</h3>
              <p>${esc(pick(item.desc, "ar"))}</p>
              <div class="card-foot"><span class="badge tiny">AI</span></div>
            </a>`;
          }).join("")}
        </div>
      </section>`).join("");
  writePage(
    "ai/index.html",
    shell({
      title: "دليل أدوات الذكاء الاصطناعي — DouNest",
      description: "أفضل أدوات AI مصنفة حسب الاستخدام: نماذج محادثة، توليد صور، برمجة، وإنتاجية — مع إفصاح عن الروابط التابعة.",
      canonicalPath: "ai/",
      bodyContent: `
    <section class="page-head">
      <h1>دليل أدوات الذكاء الاصطناعي</h1>
      <p>أفضل أدوات AI مصنفة حسب الاستخدام، مع شرح مختصر لكل أداة.</p>
    </section>
    <p class="disclosure">ℹ️ تحتوي هذه الصفحة على روابط تابعة؛ إذا اشتريت عبرها فقد نحصل على عمولة دون أي تكلفة إضافية عليك.</p>
${cards}`
    })
  );
}
{
  /* ---------- Rare tools v4: /rare/ index + 4 categories + 32 detail pages ---------- */
  console.log("→ rare pages (index + categories + details)");
  const RBASE = `${BASE}rare/`;

  writePage(
    "rare/index.html",
    shell({
      title: "الأدوات النادرة — خرائط وأمن وجواهر GitHub — DouNest",
      description: "32 أداة ومشروعاً نادراً في 4 فئات: خرائط حية، أدوات اختراق أخلاقي تعريفية، جواهر GitHub، وكلاسيكيات لا يعرفها الجميع — لكل أداة صفحة تفصيلية كاملة.",
      canonicalPath: "rare/",
      noindex: true,
      bodyContent: rareIndexHTML("ar", RBASE)
    })
  );

  for (const cat of RARE_CATS) {
    const isSec = cat.id === "security";
    writePage(
      `rare/${cat.id}/index.html`,
      shell({
        title: `${pick(cat.name, "ar")} — أدوات نادرة — DouNest`,
        description: pick(cat.blurb, "ar").slice(0, 158),
        canonicalPath: `rare/${cat.id}/`,
        noindex: true,
        bodyContent: rareCatHTML(cat.id, "ar", RBASE)
      })
    );
  }

  for (const tool of RARE_TOOLS_DATA) {
    const isSec = tool.cat === "security";
    writePage(
      `rare/${tool.slug}/index.html`,
      shell({
        title: `${pick(tool.name, "en")} — أدوات نادرة — DouNest`,
        description: pick(tool.desc, "ar").slice(0, 158),
        canonicalPath: `rare/${tool.slug}/`,
        noindex: true,
        bodyContent: rareDetailHTML(tool.slug, "ar", RBASE, `${BASE}tools/?q=`)
      })
    );
  }
}

/* ---------- 3b') PDF + Convert hub landing pages ---------- */
console.log("→ pdf/convert hub pages");
{
  const pdfSlugs = ["compress-pdf", "merge-pdf", "split-pdf", "rotate-pdf", "pdf-to-jpg", "pdf-to-txt", "pdf-to-word", "image-to-pdf", "pdf-organize", "pdf-watermark", "pdf-page-numbers"];
  const pdfTools = pdfSlugs.map(s => TOOLS.find(t2 => t2.slug === s)).filter(Boolean);
  writePage(
    "pdf/index.html",
    shell({ lang: "en",
      title: "PDF Tools — Compress, Merge, Split and Convert | DouNest",
      description: "Compress, merge, split, rotate, and convert PDFs in your browser. No signup and no uploads—your files stay on your device.",
      canonicalPath: "pdf/",
      jsonLd: [{
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "مركز PDF — DouNest", "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any", "inLanguage": "ar",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }, centerFaqSchema("pdf", "en")],
      bodyContent: `
    <section class="page-head">
      <h1>مركز PDF — أدوات شائعة للدمج والتقسيم والتحويل</h1>
      <p>أضف ملفاتك مرة واحدة لاختيار الضغط أو الدمج أو التقسيم أو التدوير أو تصدير الصفحات إلى JPG أو استخراج النص أو التحويل إلى Word، مع تحويل الصور إلى PDF. تُعالج الملفات المختارة داخل متصفحك ولا تُرسل إلى خادم DouNest؛ وقد تُحمّل مكتبات المعالجة من شبكة خارجية.</p>
    </section>
    <section class="workspace"><p class="empty" style="margin:0">افتح الصفحة في متصفحك لتظهر منطقة الرفع والعمليات التفاعلية.</p></section>
    <section class="section">
      <h2 class="section-title">أدوات PDF الفردية</h2>
      <div class="tools-grid">
        ${pdfTools.map(t2 => `
        <a class="tool-card" href="${BASE}tools/${t2.slug}/">
          <div class="icon cat-${t2.category}" aria-hidden="true">${t2.icon}</div>
          <h3>${esc(pick(t2.name, "en"))}</h3>
          <p>${esc(pick(t2.short, "en"))}</p>
          <div class="card-foot"><span class="badge tiny">PDF</span></div>
        </a>`).join("")}
      </div>
    </section>
    ${centerContentMarkup("pdf", "en")}`
    })
  );

  const imageSlugs = ["image-converter", "image-compressor", "resize-image", "remove-background", "image-to-pdf", "ocr-image-to-text", "heic-to-jpg", "pdf-to-jpg", "qr-code", "qr-scanner", "color-picker", "image-crop", "image-rotate-flip", "exif-viewer", "favicon-generator"];
  const imageTools = imageSlugs.map(s => TOOLS.find(t2 => t2.slug === s)).filter(Boolean);
  writePage(
    "images/index.html",
    shell({ lang: "en",
      title: "Image Tools — Convert, Compress, Resize and Edit | DouNest",
      description: "Convert, compress, resize, and edit images in your browser, including HEIC, OCR, QR, background removal, and image-to-PDF tools.",
      canonicalPath: "images/",
      jsonLd: [{
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "مركز الصور — DouNest", "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Any", "inLanguage": "ar",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }, centerFaqSchema("images", "en")],
      bodyContent: `
    <section class="page-head">
      <h1>مركز الصور — التحويل والضغط وتغيير الأبعاد</h1>
      <p>أضف صورة أو أكثر مرة واحدة لتحويل الصيغ أو ضغطها أو تغيير أبعادها أو تدويرها وإنشاء PDF. وتتوفر أدوات منفردة لإزالة الخلفية وOCR وHEIC وQR. تبقى الملفات المختارة في متصفحك ولا تُرسل إلى خادم DouNest؛ وقد تُحمّل بعض المكتبات أو النماذج من شبكة خارجية.</p>
    </section>
    <section class="workspace"><p class="empty" style="margin:0">افتح الصفحة في متصفحك لتظهر منطقة الرفع والعمليات السريعة.</p></section>
    <section class="section">
      <h2 class="section-title">أدوات الصور الفردية والمتخصصة</h2>
      <div class="tools-grid">
        ${imageTools.map(t2 => `
        <a class="tool-card" href="${BASE}tools/${t2.slug}/">
          <div class="icon cat-${t2.category}" aria-hidden="true">${t2.icon}</div>
          <h3>${esc(pick(t2.name, "en"))}</h3>
          <p>${esc(pick(t2.short, "en"))}</p>
          <div class="card-foot"><span class="badge tiny">صور</span></div>
        </a>`).join("")}
      </div>
    </section>
    ${centerContentMarkup("images", "en")}`
    })
  );

  const convSlugs = ["image-converter", "heic-to-jpg", "csv-to-json", "json-to-csv", "excel-to-csv", "csv-to-excel", "excel-to-json", "pdf-to-txt", "pdf-to-jpg", "pdf-to-word", "word-to-pdf", "image-to-pdf", "pdf-to-txt", "svg-to-png", "json-yaml"];
  const convTools = [...new Set(convSlugs)].map(s => TOOLS.find(t2 => t2.slug === s)).filter(Boolean);
  writePage(
    "convert/index.html",
    shell({ lang: "en",
      title: "File Conversion — Excel, CSV, JSON, PDF and Image Tools | DouNest",
      description: "Convert images, PDF, CSV, JSON, XLSX, and DOCX through focused browser tools. Your selected files are processed locally and are not uploaded.",
      canonicalPath: "convert/",
      jsonLd: [{
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "مركز التحويل — DouNest", "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any", "inLanguage": "ar",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }, centerFaqSchema("convert", "en")],
      bodyContent: `
    <section class="page-head">
      <h1>مركز تحويل الملفات — صيغ شائعة ومسارات واضحة</h1>
      <p>أضف ملفاً واحداً ليُكتشف نوعه وتظهر مسارات التحويل المدعومة: صور PNG وJPG وWebP، واستخراج النص من PDF أو تصدير صفحاته كصور، وCSV وJSON، وXLSX إلى CSV أو JSON، وDOCX إلى نص، وTXT إلى PDF، وSVG إلى PNG، وJSON إلى YAML والعكس. تُعالج الملفات المختارة في متصفحك ولا تُرسل إلى خادم DouNest؛ وقد تُحمّل مكتبات عند الطلب من شبكة خارجية.</p>
    </section>
    <section class="workspace"><p class="empty" style="margin:0">افتح الصفحة في متصفحك لتظهر منطقة السحب والإفلات التفاعلية.</p></section>
    <section class="section">
      <h2 class="section-title">أدوات التحويل الفردية</h2>
      <div class="tools-grid">
        ${convTools.map(t2 => `
        <a class="tool-card" href="${BASE}tools/${t2.slug}/">
          <div class="icon cat-${t2.category}" aria-hidden="true">${t2.icon}</div>
          <h3>${esc(pick(t2.name, "en"))}</h3>
          <p>${esc(pick(t2.short, "en"))}</p>
          <div class="card-foot"><span class="badge tiny">تحويل</span></div>
        </a>`).join("")}
      </div>
    </section>
    ${centerContentMarkup("convert", "en")}`
    })
  );
}

/* ---------- 3c) Work centers: text, dev, security and calculators ---------- */
console.log("→ additional work centers");
for (const [slug, title, description, modulePath, related] of [
  ["text", "Text Tools — Clean, Convert and Analyze", "Clean text, convert Markdown to HTML, create slugs, and count words in your browser.", "text-hub.js", ["word-counter","text-case","lorem-ipsum","diff-checker","markdown-to-html","slug-generator","list-cleaner"]],
  ["dev", "Developer Tools — JSON, Base64 and JWT", "Everyday developer utilities for JSON, Base64, URLs, JWT, hashes, UUIDs, and timestamps.", "dev-hub.js", ["json-formatter","base64","url-encoder","jwt-decoder","hash-generator","uuid-generator","regex-tester","cron-generator","sql-formatter","timestamp-converter","json-yaml"]],
  ["security", "Security Tools — Passwords and TOTP Locally", "Generate passwords, check strength, and use TOTP without sending secrets to a server.", "security-hub.js", ["password-generator","password-strength","totp-generator","hash-generator"]],
  ["calculators", "Free Browser Calculators", "Calculate age, BMI, percentages, and unit conversions quickly in your browser.", "calculators-hub.js", ["age-calculator","bmi-calculator","percentage-calculator","unit-converter"]]
]) {
  const items = related.map(slug => TOOLS.find(t => t.slug === slug)).filter(Boolean);
  const cards = items.map(t => `<a class="tool-card" href="${BASE}tools/${t.slug}/"><div class="icon cat-${t.category}" aria-hidden="true">${t.icon}</div><h3>${esc(pick(t.name,"ar"))}</h3><p>${esc(pick(t.short,"ar"))}</p></a>`).join("");
  writePage(`${slug}/index.html`, shell({ lang: "en", title: `${title} | DouNest`, description, canonicalPath: `${slug}/`, jsonLd: [{"@context":"https://schema.org","@type":"CollectionPage","name":title,"url":SITE+slug+"/","inLanguage":"ar"},{"@context":"https://schema.org","@type":"ItemList","itemListElement":items.map((t,i)=>({"@type":"ListItem","position":i+1,"name":pick(t.name,"ar"),"url":SITE+"tools/"+t.slug+"/"}))}, centerFaqSchema(slug,"en")], bodyContent: `<section class="page-head"><h1>${esc(title)}</h1><p>${esc(description)}</p></section><section class="workspace" id="center-workspace"><p class="empty">افتح الصفحة في متصفحك لاستخدام مساحة العمل التفاعلية.</p></section>${centerContentMarkup(slug,"en")}<section class="section"><h2 class="section-title">أدوات ${esc(title.split("—")[0])}</h2><div class="tools-grid">${cards}</div></section>` }));
}

/* ---------- 3b) Tools hub page (was missing -> /tools/ returned HTTP 404) ---------- */
console.log("→ tools hub page");
{
  const cards = CATEGORIES_ORDER.map(catId => {
    const items = TOOLS.filter(t2 => t2.category === catId);
    if (!items.length) return "";
    return `
    <section class="section">
      <h2 class="section-title">${esc(CAT_LABEL_AR[catId] || catId)}</h2>
      <div class="tools-grid">
        ${items.map(t2 => `
        <a class="tool-card" href="${t2.slug}/">
          <div class="icon cat-${t2.category}" aria-hidden="true">${t2.icon}</div>
          <h3>${esc(pick(t2.name, "en"))}</h3>
          <p>${esc(pick(t2.short, "en"))}</p>
          <div class="card-foot"><span class="badge tiny">${esc(CAT_LABEL_AR[t2.category] || t2.category)}</span></div>
        </a>`).join("")}
      </div>
    </section>`;
  }).join("");
  writePage(
    "tools/index.html",
    shell({
      lang: "en",
      title: "All Tools — DouNest",
      description: TOOLS.length + " free browser tools for JSON, Base64, JWT, PDF, images, text, Excel, OCR, and more.",
      canonicalPath: "tools/",
      jsonLd: [{
        "@context": "https://schema.org", "@type": "CollectionPage",
        "name": "All Tools — DouNest", "url": `${SITE}tools/`, "inLanguage": "ar"
      }],
      bodyContent: `
    <section class="page-head">
      <h1>All Tools</h1>
      <p>${TOOLS.length}+ free tools run directly in your browser—no signup and no file uploads.</p>
    </section>
    <section class="section"><h2 class="section-title">استكشف حسب المهمة</h2><div class="explore-strip">${[["pdf/","📄","مركز PDF"],["images/","🖼️","مركز الصور"],["convert/","🔄","مركز التحويل"],["text/","✍️","مركز النصوص"],["dev/","🧰","مركز المطورين"],["security/","🔐","مركز الأمان"],["calculators/","🧮","الحاسبات"],["mail/","✉️","بريد إلكتروني مؤقت"]].map(([p,i,n])=>`<a class="explore-card" href="${BASE}${p}"><strong>${i} ${n}</strong><span>أدوات وخدمات متخصصة</span></a>`).join("")}</div></section>
${cards}`
    })
  );
}

/* ---------- 3c) Articles hub page (was missing -> /articles/ returned HTTP 404) ---------- */
console.log("→ articles hub page");
{
  const cards = getArticles().map(a => `
      <a class="tool-card article" href="${a.slug}/en/">
        <div class="icon" aria-hidden="true">📝</div>
        <h3>${esc(pick(a.title, "en"))}</h3>
        <p>${esc(pick(a.excerpt, "en"))}</p>
        <div class="card-foot"><span class="badge tiny">${esc(a.date)}</span></div>
      </a>`).join("");
  writePage(
    "articles/index.html",
    shell({
      lang: "en",
      title: "Articles — DouNest",
      description: "Practical guides about privacy, file formats, browser tools, and password security from DouNest.",
      canonicalPath: "articles/",
      bodyContent: `
    <section class="page-head"><h1>Articles</h1></section>
    <div class="tools-grid">
${cards}
    </div>`
    })
  );
}

/* ---------- 3d) Favorites page (personal page — noindex) ---------- */
console.log("→ favorites page");
writePage(
  "favorites/index.html",
  shell({
    title: "المفضلة — DouNest",
    description: "أدواتك المفضلة المحفوظة على جهازك.",
    canonicalPath: "favorites/",
    noindex: true,
    bodyContent: `<section class="page-head"><h1>⭐ المفضلة</h1><p>أدواتك المفضلة تُحفظ محلياً على جهازك فقط.</p></section>`
  })
);

/* ---------- 3d') FAQ page (SEO: FAQPage schema + People-Also-Ask targets) ---------- */
console.log("→ faq page");
{
  const up = relPrefix("faq/");
  const faqItems = getFAQ();
  const cats = Object.entries(FAQ_CATS);
  const sections = cats.map(([id, label]) => {
    const items = faqItems.filter(f => f.cat === id);
    if (!items.length) return "";
    return `
    <section class="section">
      <h2 class="section-title">${esc(pick(label, "en"))}</h2>
      ${items.map(f => `
      <details class="faq-item">
        <summary>${esc(pick(f.q, "en"))}</summary>
        <p>${esc(pick(f.a, "en"))}</p>
      </details>`).join("")}
    </section>`;
  }).join("");
  const enSection = `
    <section class="section">
      <h2 class="section-title">English</h2>
      ${faqItems.slice(0, 6).map(f => `
      <details class="faq-item">
        <summary>${esc(f.q.en)}</summary>
        <p>${esc(f.a.en)}</p>
      </details>`).join("")}
    </section>`;
  writePage(
    "faq/index.html",
    shell({ lang: "en",
      title: "FAQ — File Conversion, PDF and Image Tools | DouNest",
      description: "Answers about image-to-PDF, background removal, PDF compression, OCR, HEIC to JPG, and Excel conversion—with no file uploads.",
      canonicalPath: "faq/",
      jsonLd: [{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(f => ({
          "@type": "Question",
          "name": pick(f.q, "en"),
          "acceptedAnswer": { "@type": "Answer", "text": pick(f.a, "en") }
        }))
      }],
      bodyContent: `
    <section class="page-head">
      <h1>${esc(L.en.faqTitle)}</h1>
      <p>${esc(L.en.faqSub)}</p>
    </section>
${sections}
${enSection}`
    })
  );
}

/* ---------- Temporary email landing page ---------- */
{
  const copy = getMailCopy("en");
  const pageTitle = "Temporary Email";
  writePage("mail/index.html", shell({
    lang: "en",
    title: `${pageTitle} — DouNest`,
    description: copy.description,
    canonicalPath: "mail/",
    jsonLd: [{ "@context": "https://schema.org", "@type": "WebPage", "name": pageTitle, "description": copy.description, "url": `${SITE}mail/`, "inLanguage": "en" }],
    bodyContent: `<section class="page-head"><p class="eyebrow">✉ ${esc(copy.nav)}</p><h1>${pageTitle}</h1><p class="lead">A disposable email service separate from DouNest browser tools. Create a random address for short-lived messages; inboxes expire after about one hour. Do not use it for important accounts or sensitive messages.</p></section>
      <section class="mail-link-card"><a class="btn btn-primary" href="https://mail.hmdevelop.me/">Open temporary email ↗</a><p>${esc(copy.warning)}</p></section>`
  }));
}

/* ---------- 4) 404.html (SPA fallback, absolute paths) ---------- */
console.log("→ 404.html fallback");
writePage("404.html", shell({
  title: "DouNest — أدوات تقنية مجانية",
  description: `${TOOLS.length}+ أداة ويب مجانية تعمل محلياً داخل متصفحك.`,
  canonicalPath: "",
  absolute: true,
  noindex: true,
  bodyContent: `<div class="empty notfound"><h1>⏳</h1><p>جارٍ التحميل… / Loading…</p></div>`
}));

/* ---------- 5) sitemap.xml ---------- */
console.log("→ sitemap.xml");
const urls = [
  { p: "", pr: "1.0" },
  { p: "tools/", pr: "0.9" },
  ...TOOLS.map(t2 => ({ p: `tools/${t2.slug}/`, pr: "0.8" })),
  { p: "pdf/", pr: "0.9" },
  { p: "images/", pr: "0.9" },
  { p: "convert/", pr: "0.9" },
  { p: "text/", pr: "0.9" }, { p: "dev/", pr: "0.9" }, { p: "security/", pr: "0.9" }, { p: "calculators/", pr: "0.9" },
  { p: "mail/", pr: "0.8" },
  { p: "faq/", pr: "0.8" },
  { p: "articles/", pr: "0.7" },
  ...getArticles().flatMap(a => a.title?.en && a.content?.en ? [{
    p: `articles/${a.slug}/en/`, pr: "0.7"
  }] : []),
  { p: "ai/", pr: "0.6" },
  { p: "about/", pr: "0.4" },
  { p: "contact/", pr: "0.4" },
  { p: "privacy/", pr: "0.3" },
  { p: "terms/", pr: "0.3" }
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${SITE}${u.p}</loc><lastmod>${NOW}</lastmod><changefreq>${u.p === "" || /^(pdf|images|convert|text|dev|security|calculators|mail)\/$/.test(u.p) ? "weekly" : "monthly"}</changefreq><priority>${u.pr}</priority></url>`).join("\n")}
</urlset>
`;
writeFileSync(join(ROOT, "sitemap.xml"), sitemap);
console.log("  ✓ sitemap.xml (" + urls.length + " URLs)");

/* ---------- 5b) RSS + robots ---------- */
const xmlEsc = (v) => String(v || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");
const feedItems = getArticles().map(a => `<item><title>${xmlEsc(pick(a.title,"ar"))}</title><link>${SITE}articles/${a.slug}/</link><guid>${SITE}articles/${a.slug}/</guid><pubDate>${new Date(a.date || NOW).toUTCString()}</pubDate><description>${xmlEsc(pick(a.excerpt,"ar"))}</description></item>`).join("\n");
writeFileSync(join(ROOT, "feed.xml"), `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>DouNest — أدوات وأدلة</title><link>${SITE}</link><description>مقالات وأدلة عن أدوات المتصفح والتحويل والخصوصية</description><language>ar</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${feedItems}</channel></rss>\n`);
writeFileSync(join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /v2/\nDisallow: /favorites/\nSitemap: ${SITE}sitemap.xml\n`);
console.log("  ✓ feed.xml + robots.txt");

/* ---------- 6) sw.js (synced asset list, query-tolerant) ---------- */
console.log("→ sw.js");
function walk(dir, prefix = "") {
  const out = [];
  for (const e of readdirSync(join(ROOT, dir, prefix || "."), { withFileTypes: true })) {
    const rel = prefix + e.name;
    if (e.isDirectory()) out.push(...walk(dir, rel + "/"));
    else if (e.isFile()) out.push(dir + "/" + rel);
  }
  return out;
}
const toolPages = TOOLS.map(t2 => `tools/${t2.slug}/index.html`);
const articlePages = getArticles().flatMap(a => ARTICLE_LANGS.filter(code => a.title?.[code] && a.content?.[code]).map(code =>
  code === "ar" ? `articles/${a.slug}/index.html` : `articles/${a.slug}/${code}/index.html`
));
const jsFiles = walk("js");
const ASSETS = [
  "./", "./index.html", "./404.html", "./manifest.json",
  "./assets/styles.css", "./assets/styles-v4.css", "./assets/dounest-logo.png",
  "./assets/og-cover.png", "./assets/icon-192.png", "./assets/icon-512.png", "./assets/favicon-32.png",
  "./config.js",
  ...jsFiles.map(f => "./" + f),
  "./tools/index.html",
  ...toolPages.map(p => "./" + p),
  "./articles/index.html",
  ...articlePages.map(p => "./" + p),
  "./favorites/index.html",
  "./faq/index.html",
  "./ai/index.html", "./rare/index.html",
  "./pdf/index.html", "./images/index.html", "./convert/index.html",
  "./text/index.html", "./dev/index.html", "./security/index.html", "./calculators/index.html", "./mail/index.html",
  ...RARE_CATS.filter(c => c.id !== "security").map(c => "./rare/" + c.id + "/index.html"),
  ...RARE_TOOLS_DATA.filter(t2 => t2.cat !== "security").map(t2 => "./rare/" + t2.slug + "/index.html"),
  "./about/index.html", "./privacy/index.html", "./terms/index.html",
  "./sitemap.xml", "./robots.txt", "./feed.xml"
];
const sw = `/* DouNest v3 — generated by build.mjs (${BUILD_ID}) */
const CACHE = "dounest-${BUILD_ID}";
const ASSETS = ${JSON.stringify(ASSETS, null, 2)};

self.addEventListener("install", e => {
  /* hardened: one missing asset must never abort the whole install
     (this is what left users stuck on stale v2 caches before) */
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(ASSETS.map(a => c.add(a))))
      .then(rs => {
        const failed = rs.filter(r => r.status === "rejected");
        if (failed.length) console.warn("[sw] skipped " + failed.length + " uncachable assets");
        return self.skipWaiting();
      })
  );
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // navigations: network first, cache fallback (offline)
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() =>
        caches.match(req, { ignoreSearch: true })
          .then(r => r || caches.match("./"))
      )
    );
    return;
  }

  // static assets: stale-while-revalidate
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(cached => {
      const refresh = fetch(req).then(res => {
        if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone())).catch(() => {});
        return res;
      }).catch(() => cached);
      return cached || refresh;
    })
  );
});
`;
writeFileSync(join(ROOT, "sw.js"), sw);
console.log("  ✓ sw.js (" + ASSETS.length + " cached assets)");

/* ---------- 6b) align manifest with the current tool catalogue ---------- */
const manifestPath = join(ROOT, "manifest.json");
if (existsSync(manifestPath)) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
  manifest.description = `${TOOLS.length}+ free tools that run locally in your browser: PDF, images, text, data and developer tools.`;
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
}

/* ---------- 7) inject build id into every html (self-heal token) ---------- */
console.log("→ inject __DN_BUILD__ tokens");
function walkHtml(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walkHtml(p));
    else if (e.isFile() && e.name.endsWith(".html")) out.push(p);
  }
  return out;
}
let injected = 0;
for (const p of walkHtml(ROOT)) {
  const src = readFileSync(p, "utf-8");
  if (src.includes("__DN_BUILD__")) {
    writeFileSync(p, src.split("__DN_BUILD__").join(BUILD_ID));
    injected++;
  }
}
console.log("  ✓ build id injected into " + injected + " pages");

console.log("\n✔ Build complete —", TOOLS.length, "tool pages,", getArticles().length, "articles.");
