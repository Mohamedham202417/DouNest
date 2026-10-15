#!/usr/bin/env node
/**
 * ============================================================
 * DouNest v3 — Build script (SEO page generator)
 * ============================================================
 * Usage:  node build.mjs
 *
 * Generates:
 *   1. tools/<slug>/index.html   — 30 crawlable landing pages with
 *      prerendered Arabic content (usage + explanation + FAQ) and full
 *      meta/JSON-LD. The SPA hydrates the interactive workspace.
 *   2. articles/<slug>/index.html
 *   3. about|privacy|terms/index.html
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
    allTools: "كل الأدوات", usage: "طريقة الاستخدام", explanation: "شرح مفصّل",
    faq: "أسئلة شائعة", related: "أدوات ذات صلة", local: "يعمل محلياً في متصفحك",
    home: "الرئيسية", articles: "المقالات", rare: "أدوات نادرة", ai: "دليل AI",
    pdf: "مركز PDF", convert: "مركز التحويل",
    about: "حول", fav: "المفضلة", privacy: "سياسة الخصوصية", terms: "شروط الاستخدام",
    back: "العودة إلى كل الأدوات", read: "اقرأ المقال", runIn: "شغّل الأداة الآن",
    faqNav: "الأسئلة الشائعة", faqTitle: "الأسئلة الشائعة",
    faqSub: "إجابات مباشرة لأكثر الأسئلة بحثاً حول تحويل الصيغ وملفات PDF والصور والخصوصية — كل شيء يعمل داخل متصفحك."
  },
  en: {
    allTools: "All Tools", usage: "How to use", explanation: "Detailed explanation",
    faq: "FAQ", related: "Related tools", local: "Runs locally in your browser",
    home: "Home", articles: "Articles", rare: "Rare Tools", ai: "AI Directory",
    pdf: "PDF Hub", convert: "Convert Hub",
    about: "About", fav: "Favorites", privacy: "Privacy Policy", terms: "Terms",
    back: "Back to all tools", read: "Read the article", runIn: "Open the tool",
    faqNav: "FAQ", faqTitle: "Frequently Asked Questions",
    faqSub: "Straight answers to the most-searched questions about file conversion, PDF, images and privacy — everything runs inside your browser."
  }
};
const pick = (obj, lang) => (obj && (obj[lang] || obj.en)) || "";
const relPrefix = (p) => "../".repeat(p.split("/").filter(Boolean).length); // from page folder to site root
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- shared page template (absolute asset paths) ---------- */
function shell({ lang = "ar", title, description, canonicalPath, jsonLd = [], bodyContent, bodyClass = "", absolute = false, noindex = false }) {
  const url = SITE + canonicalPath;
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

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#7c3aed" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<meta name="robots" content="${noindex ? "noindex,nofollow" : "index,follow"}" />
<link rel="canonical" href="${url}" />
<link rel="manifest" href="${R("manifest.json")}" />
<link rel="icon" type="image/png" sizes="32x32" href="${R("assets/favicon-32.png")}" />
<link rel="icon" type="image/png" sizes="192x192" href="${R("assets/icon-192.png")}" />
<link rel="apple-touch-icon" href="${R("assets/icon-192.png")}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="DouNest" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${SITE}assets/og-cover.png" />
<meta property="og:locale" content="${lang === "ar" ? "ar_AR" : "en_US"}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(description)}" />
<meta name="twitter:image" content="${SITE}assets/og-cover.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
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
      <nav class="topnav" aria-label="Main">
        <a href="${R("")}">${L[lang].home}</a>
        <a href="${R("tools/")}">${L[lang].allTools}</a>
        <a href="${R("pdf/")}">${L[lang].pdf}</a>
        <a href="${R("convert/")}">${L[lang].convert}</a>
        <a href="${R("rare/")}">${L[lang].rare}</a>
        <a href="${R("ai/")}">${L[lang].ai}</a>
        <a href="${R("articles/")}">${L[lang].articles}</a>
        <a href="${R("faq/")}">${L[lang].faqNav}</a>
        <a href="${R("favorites/")}" rel="nofollow">${L[lang].fav}</a>
        <a href="${R("about/")}">${L[lang].about}</a>
      </nav>
      <div class="topbar-actions">
        <button id="theme-toggle" class="icon-btn" aria-label="Toggle theme">🌙</button>
        <div id="lang-menu" class="lang-menu"></div>
      </div>
    </div>
  </header>
  <main id="main" class="container" role="main" tabindex="-1">
${bodyContent}
  </main>
  <footer class="footer">
    <div class="container footer-inner">
      <span>© <span id="year"></span> DouNest — ${L[lang].local}</span>
      <nav class="footer-nav" aria-label="Legal">
        <a href="${R("privacy/")}">${L[lang].privacy}</a>
        <a href="${R("terms/")}">${L[lang].terms}</a>
        <a href="${R("ai/")}">${L[lang].ai}</a>
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
  writeFileSync(file, content);
  console.log("  ✓", relPath);
}

/* ---------- 1) tool landing pages (Arabic prerendered) ---------- */
const AR = L.ar;
console.log("→ tool pages");
for (const tool of TOOLS) {
  const name = pick(tool.name, "ar");
  const short = pick(tool.short, "ar");
  const usage = tool.usage.ar || tool.usage.en || [];
  const expl = tool.explanation.ar || tool.explanation.en || [];
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
          ${faq.map(f => `<details class="faq-item"><summary>${esc(pick(f.q, "ar"))}</summary><p>${esc(pick(f.a, "ar"))}</p></details>`).join("")}
        </section>` : ""}
        ${(tool.tags && tool.tags.length) ? `
        <section class="section">
          <h2>وسوم البحث</h2>
          ${hashtagChipsHTML(tool.tags, "ar", `${BASE}tools/?q=`)}
        </section>` : ""}
      </div>
      <aside class="tool-sidecol">
        ${guideForTool ? `<div class="side-box"><h3>دليل مرتبط</h3><a class="related-item" href="${up}articles/${guideForTool}/"><span class="icon sm">📖</span><span>اقرأ الدليل قبل استخدام الأداة</span></a></div>` : ""}
        ${related.length ? `
        <div class="side-box">
          <h3>${AR.related}</h3>
          <div class="related-list">
            ${related.map(rt => `<a class="related-item" href="${up}tools/${rt.slug}/"><span class="icon sm">${rt.icon}</span><span>${esc(pick(rt.name, "ar"))}</span></a>`).join("")}
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
      "inLanguage": "ar",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    faq.length ? {
      "@context": "https://schema.org", "@type": "FAQPage",
      "mainEntity": faq.map(f => ({
        "@type": "Question",
        "name": pick(f.q, "ar"),
        "acceptedAnswer": { "@type": "Answer", "text": pick(f.a, "ar") }
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
      title: `${name} — DouNest`,
      description: short,
      canonicalPath: `tools/${tool.slug}/`,
      jsonLd,
      bodyContent: body
    })
  );
}
function getToolB(slug) { return TOOLS.find(t2 => t2.slug === slug); }

/* ---------- 2) article pages ---------- */
console.log("→ article pages");
const mdToHtml = (md) => esc(md)
  .replace(/^### (.*$)/gm, "<h3>$1</h3>")
  .replace(/^## (.*$)/gm, "<h2>$1</h2>")
  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  .replace(/\[(.*?)\]\((.*?)\)/g, (mm, txt, href) => {
    const h = href.startsWith("/") ? (BASE.replace(/\/$/, "") + href) : href;
    return `<a href="${h}">${txt}</a>`;
  })
  .replace(/\n\n/g, "</p><p>")
  .replace(/^(?!<[hp])(.+)$/gm, "<p>$1</p>");

for (const a of getArticles()) {
  const title = pick(a.title, "ar");
  const excerpt = pick(a.excerpt, "ar");
  const up = relPrefix(`articles/${a.slug}/`);
  const body = `
    <nav class="breadcrumb" aria-label="breadcrumb">
      <a href="${up}">DouNest</a><span class="sep">›</span>
      <a href="${up}articles/">${AR.articles}</a><span class="sep">›</span>
      <span class="current">${esc(title)}</span>
    </nav>
    <article class="section article-body">
      <h1>${esc(title)}</h1>
      <p class="article-date">${a.date}</p>
      <div class="explanation">${mdToHtml(a.content.ar || a.content.en)}</div>
      ${a.tags?.length ? `<div class="article-tags">${hashtagChipsHTML(a.tags, "ar", `${BASE}tools/?q=`)}</div>` : ""}
    </article>`;
  writePage(
    `articles/${a.slug}/index.html`,
    shell({
      title: `${title} — DouNest`,
      description: excerpt,
      canonicalPath: `articles/${a.slug}/`,
      jsonLd: [{
        "@context": "https://schema.org", "@type": "Article",
        "headline": title, "datePublished": a.date,
        "keywords": (a.tags || []).join(", "),
        "inLanguage": "ar",
        "author": { "@type": "Organization", "name": "DouNest" }
      }],
      bodyContent: body
    })
  );
}

/* ---------- 3) legal/info pages ---------- */
console.log("→ static pages");
const LEGAL = {
  about: { title: "حول DouNest", desc: "DouNest مجموعة أدوات ويب مجانية تعمل بالكامل داخل متصفحك." },
  privacy: { title: "سياسة الخصوصية — DouNest", desc: "كيف نتعامل مع بياناتك في DouNest: معالجة محلية، تخزين محلي، شفافية كاملة." },
  terms: { title: "شروط الاستخدام — DouNest", desc: "شروط استخدام أدوات DouNest المجانية." }
};
for (const [slug, meta] of Object.entries(LEGAL)) {
  writePage(
    `${slug}/index.html`,
    shell({
      title: meta.title,
      description: meta.desc,
      canonicalPath: `${slug}/`,
      bodyContent: `<section class="page-head"><h1>${esc(meta.title)}</h1><p>${esc(meta.desc)}</p>
        <p class="empty" style="max-width:560px;margin:0 auto">النسخة الكاملة لهذه الصفحة تُعرض داخل التطبيق عند فتحها في المتصفح.</p></section>`
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
        noindex: isSec,
        bodyContent: rareCatHTML(cat.id, "ar", RBASE)
      })
    );
  }

  for (const tool of RARE_TOOLS_DATA) {
    const isSec = tool.cat === "security";
    writePage(
      `rare/${tool.slug}/index.html`,
      shell({
        title: `${pick(tool.name, "ar")} — أدوات نادرة — DouNest`,
        description: pick(tool.desc, "ar").slice(0, 158),
        canonicalPath: `rare/${tool.slug}/`,
        noindex: isSec,
        bodyContent: rareDetailHTML(tool.slug, "ar", RBASE, `${BASE}tools/?q=`)
      })
    );
  }
}

/* ---------- 3b') PDF + Convert hub landing pages ---------- */
console.log("→ pdf/convert hub pages");
{
  const pdfSlugs = ["compress-pdf", "merge-pdf", "split-pdf", "rotate-pdf", "pdf-to-jpg", "pdf-to-txt", "pdf-to-word", "image-to-pdf"];
  const pdfTools = pdfSlugs.map(s => TOOLS.find(t2 => t2.slug === s)).filter(Boolean);
  writePage(
    "pdf/index.html",
    shell({
      title: "مركز PDF — ضغط ودمج وتقسيم وتحويل بضغطة زر | DouNest",
      description: "ارفع ملف PDF مرة واحدة ثم نفّذ كل العمليات: ضغط، دمج، تقسيم، تدوير، إلى JPG، إلى TXT، إلى Word، وصور إلى PDF — كل شيء محلي داخل متصفحك بدون رفع ملفات.",
      canonicalPath: "pdf/",
      jsonLd: [{
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "مركز PDF — DouNest", "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any", "inLanguage": "ar",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }],
      bodyContent: `
    <section class="page-head">
      <h1>مركز PDF — كل أدوات PDF بضغطة زر</h1>
      <p>ارفع ملفك مرة واحدة ثم اختر العملية: ضغط، دمج عدة ملفات، تقسيم كل صفحة، تدوير، تحويل إلى JPG أو TXT أو Word، أو تحويل صور إلى PDF. كل المعالجة تحدث داخل متصفحك — ملفاتك لا تُرفع لأي خادم إطلاقاً.</p>
    </section>
    <section class="workspace"><p class="empty" style="margin:0">افتح الصفحة في متصفحك لتظهر منطقة الرفع والعمليات التفاعلية.</p></section>
    <section class="section">
      <h2 class="section-title">أدوات PDF الفردية</h2>
      <div class="tools-grid">
        ${pdfTools.map(t2 => `
        <a class="tool-card" href="${t2.slug}/">
          <div class="icon cat-${t2.category}" aria-hidden="true">${t2.icon}</div>
          <h3>${esc(pick(t2.name, "ar"))}</h3>
          <p>${esc(pick(t2.short, "ar"))}</p>
          <div class="card-foot"><span class="badge tiny">PDF</span></div>
        </a>`).join("")}
      </div>
    </section>`
    })
  );

  const convSlugs = ["image-converter", "heic-to-jpg", "csv-to-json", "json-to-csv", "excel-to-csv", "csv-to-excel", "excel-to-json", "pdf-to-txt", "pdf-to-jpg", "pdf-to-word", "word-to-pdf", "image-to-pdf", "pdf-to-txt"];
  const convTools = [...new Set(convSlugs)].map(s => TOOLS.find(t2 => t2.slug === s)).filter(Boolean);
  writePage(
    "convert/index.html",
    shell({
      title: "مركز التحويل — حوّل من وإلى أي صيغة | DouNest",
      description: "أفلِت أي ملف وسيُكتشف نوعه تلقائياً لتعرض كل التحويلات المتاحة: صور بين PNG وJPG وWebP، وPDF إلى TXT وJPG وWord، وCSV وJSON وExcel باتجاهين — كل ذلك محلياً وبدون رفع ملفات.",
      canonicalPath: "convert/",
      jsonLd: [{
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "مركز التحويل — DouNest", "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any", "inLanguage": "ar",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }],
      bodyContent: `
    <section class="page-head">
      <h1>مركز التحويل — من وإلى أي صيغة</h1>
      <p>أفلِت ملفك مرة واحدة: نكتشف نوعه تلقائياً ونعرض كل التحويلات المتاحة بنقرة واحدة — صور بين PNG وJPG وWebP، وPDF إلى TXT وJPG وWord، وCSV وJSON وExcel باتجاهين، وWord إلى نص، ونص إلى PDF. كل شيء يحدث داخل متصفحك بدون رفع وبدون تسجيل.</p>
    </section>
    <section class="workspace"><p class="empty" style="margin:0">افتح الصفحة في متصفحك لتظهر منطقة السحب والإفلات التفاعلية.</p></section>
    <section class="section">
      <h2 class="section-title">أدوات التحويل الفردية</h2>
      <div class="tools-grid">
        ${convTools.map(t2 => `
        <a class="tool-card" href="${t2.slug}/">
          <div class="icon cat-${t2.category}" aria-hidden="true">${t2.icon}</div>
          <h3>${esc(pick(t2.name, "ar"))}</h3>
          <p>${esc(pick(t2.short, "ar"))}</p>
          <div class="card-foot"><span class="badge tiny">تحويل</span></div>
        </a>`).join("")}
      </div>
    </section>`
    })
  );
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
          <h3>${esc(pick(t2.name, "ar"))}</h3>
          <p>${esc(pick(t2.short, "ar"))}</p>
          <div class="card-foot"><span class="badge tiny">${esc(CAT_LABEL_AR[t2.category] || t2.category)}</span></div>
        </a>`).join("")}
      </div>
    </section>`;
  }).join("");
  writePage(
    "tools/index.html",
    shell({
      title: "كل الأدوات — DouNest",
      description: TOOLS.length + " أداة مجانية تعمل محلياً في متصفحك: JSON، Base64، JWT، PDF، QR، ألوان، نصوص، Excel، إزالة خلفية الصور، OCR، وأكثر — مصنّفة حسب الاستخدام.",
      canonicalPath: "tools/",
      jsonLd: [{
        "@context": "https://schema.org", "@type": "CollectionPage",
        "name": "كل الأدوات — DouNest", "url": `${SITE}tools/`, "inLanguage": "ar"
      }],
      bodyContent: `
    <section class="page-head">
      <h1>كل الأدوات</h1>
      <p>${TOOLS.length}+ أداة مجانية تعمل مباشرة في متصفحك — بدون تسجيل وبدون رفع ملفاتك إلى أي خادم، مصنّفة حسب الاستخدام.</p>
    </section>
${cards}`
    })
  );
}

/* ---------- 3c) Articles hub page (was missing -> /articles/ returned HTTP 404) ---------- */
console.log("→ articles hub page");
{
  const cards = getArticles().map(a => `
      <a class="tool-card article" href="${a.slug}/">
        <div class="icon" aria-hidden="true">📝</div>
        <h3>${esc(pick(a.title, "ar"))}</h3>
        <p>${esc(pick(a.excerpt, "ar"))}</p>
        <div class="card-foot"><span class="badge tiny">${esc(a.date)}</span></div>
      </a>`).join("");
  writePage(
    "articles/index.html",
    shell({
      title: "المقالات — DouNest",
      description: "دروس عملية عن الخصوصية، صيغ الملفات، وأمان كلمات المرور — من مدونة DouNest.",
      canonicalPath: "articles/",
      bodyContent: `
    <section class="page-head"><h1>المقالات</h1></section>
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
      <h2 class="section-title">${esc(pick(label, "ar"))}</h2>
      ${items.map(f => `
      <details class="faq-item">
        <summary>${esc(f.q.ar)}</summary>
        <p>${esc(f.a.ar)}</p>
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
    shell({
      title: "الأسئلة الشائعة — تحويل الصيغ وPDF والصور | DouNest",
      description: "إجابات لأكثر أسئلة البحث شيوعاً: تحويل صورة إلى PDF، إزالة الخلفية، ضغط PDF، استخراج نص OCR، HEIC إلى JPG، Excel إلى CSV — وكل ذلك بدون رفع ملفاتك.",
      canonicalPath: "faq/",
      jsonLd: [{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(f => ({
          "@type": "Question",
          "name": f.q.ar,
          "acceptedAnswer": { "@type": "Answer", "text": f.a.ar }
        }))
      }],
      bodyContent: `
    <section class="page-head">
      <h1>${esc(L.ar.faqTitle)}</h1>
      <p>${esc(L.ar.faqSub)}</p>
    </section>
${sections}
${enSection}`
    })
  );
}

/* ---------- 4) 404.html (SPA fallback, absolute paths) ---------- */
console.log("→ 404.html fallback");
writePage("404.html", shell({
  title: "DouNest — أدوات تقنية مجانية",
  description: "30+ أداة ويب مجانية تعمل محلياً داخل متصفحك.",
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
  ...TOOLS.map(t2 => ({ p: `tools/${t2.slug}/`, pr: "0.9" })),
  { p: "pdf/", pr: "0.9" },
  { p: "convert/", pr: "0.9" },
  { p: "faq/", pr: "0.8" },
  { p: "articles/", pr: "0.7" },
  ...getArticles().map(a => ({ p: `articles/${a.slug}/`, pr: "0.7" })),
  { p: "ai/", pr: "0.6" },
  { p: "rare/", pr: "0.6" },
  ...RARE_CATS.filter(c => c.id !== "security").map(c => ({ p: `rare/${c.id}/`, pr: "0.5" })),
  ...RARE_TOOLS_DATA.filter(t2 => t2.cat !== "security").map(t2 => ({ p: `rare/${t2.slug}/`, pr: "0.5" })),
  { p: "about/", pr: "0.4" },
  { p: "privacy/", pr: "0.3" },
  { p: "terms/", pr: "0.3" }
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${SITE}${u.p}</loc><lastmod>${NOW}</lastmod><priority>${u.pr}</priority></url>`).join("\n")}
</urlset>
`;
writeFileSync(join(ROOT, "sitemap.xml"), sitemap);
console.log("  ✓ sitemap.xml (" + urls.length + " URLs)");

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
const articlePages = getArticles().map(a => `articles/${a.slug}/index.html`);
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
  "./pdf/index.html", "./convert/index.html",
  ...RARE_CATS.filter(c => c.id !== "security").map(c => "./rare/" + c.id + "/index.html"),
  ...RARE_TOOLS_DATA.filter(t2 => t2.cat !== "security").map(t2 => "./rare/" + t2.slug + "/index.html"),
  "./about/index.html", "./privacy/index.html", "./terms/index.html",
  "./sitemap.xml", "./robots.txt"
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
