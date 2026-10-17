/**
 * DouNest v3 — Application core
 * ------------------------------------------------------------------
 * Pathname-based SPA router (clean URLs, crawlable, works on GitHub
 * Pages via the 404.html fallback trick) + all views + per-route SEO.
 *
 * Fixes carried from v2:
 *  - No hash URLs anymore -> every tool has a real /tools/<slug>/ page.
 *  - Language dropdown no longer leaks document-level listeners.
 *  - Language switch re-renders in place (no hash reset hack).
 *  - Ratings/comments labelled honestly as device-local.
 *  - Monetization slots (ads / featured / support) integrated cleanly.
 */
import { t, getLang, setLang, applyTranslations } from "./i18n.js";
import { LANGS, getLangMeta } from "./langs.js";
import { TOOLS, CATEGORIES, getTool, pick } from "./registry.js";
import { favorites, recent, ratings, comments, storage } from "./storage.js";
import { toastSuccess, toastError } from "./toast.js";
import { escapeHtml } from "./util.js";
import { adSlot, disclosureBanner, featuredBlock, supportButton } from "./monetize.js";
import { RARE_TOOLS, RARE_CATS, getRareTool, getRareCat, rareByCat, SECURITY_WARNING } from "./rare-tools.js";
import { rareIndexHTML, rareCatHTML, rareDetailHTML, hashtagChipsHTML, securityWarningHTML } from "./rare-page.js";
import { AI_TOOLS } from "./ai-directory.js";
import { getArticles, getArticle } from "./articles.js";
import { markdownToHtml } from "./lib/article-markdown.js";
import { getFAQ, FAQ_CATS } from "./faq.js";
import { CENTER_CONTENT, centerContentMarkup, centerFaqSchema } from "./center-content.js";
import { getInfoPage, renderInfoPage, infoPageJsonLd } from "./info-pages.js";

/* ========= Config & base detection ========= */
const CFG = window.DouNestConfig || {};
const SITE_ROOT = (CFG.origin || "") + (CFG.repoPath ? "/" + CFG.repoPath : "");

/**
 * Auto-detect the base path the app is served from.
 * Works for: custom domain "/" , GitHub Pages "/DouNest/", local servers.
 */
function detectBase() {
  if (CFG.base && CFG.base !== "auto") return CFG.base.endsWith("/") ? CFG.base : CFG.base + "/";
  const KNOWN = ["tools", "articles", "categories", "favorites", "ai", "rare", "pdf", "images", "convert", "about", "contact", "privacy", "terms", "faq", "support", "text", "dev", "security", "calculators", "index.html", "404.html"];
  const segs = location.pathname.split("/").filter(Boolean);
  if (segs.length && !KNOWN.includes(segs[0]) && !segs[0].includes(".")) return "/" + segs[0] + "/";
  return "/";
}
const BASE = detectBase();

/* ========= Theme ========= */
const savedTheme = storage.get("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.documentElement.dataset.theme = savedTheme;
const themeBtn = document.getElementById("theme-toggle");
if (themeBtn) {
  syncThemeBtn();
  themeBtn.onclick = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    storage.set("theme", next);
    syncThemeBtn();
  };
}
function syncThemeBtn() {
  themeBtn.textContent = document.documentElement.dataset.theme === "dark" ? "☀️" : "🌙";
}

/* ========= Language menu (no listener leaks) ========= */
const langWrap = document.getElementById("lang-menu");
function renderLangMenu() {
  langWrap.innerHTML = `
    <button class="icon-btn wide lang-trigger" aria-haspopup="true" aria-expanded="false">
      <span>${LANGS.find(l => l.code === getLang())?.flag || "🌐"}</span>
      <span class="lang-code">${getLang().toUpperCase()}</span>
    </button>
    <div class="lang-panel" role="menu">
      ${LANGS.map(l => `
        <button data-lang="${l.code}" class="${l.code === getLang() ? "active" : ""}" role="menuitem">
          <span>${l.flag}</span><span>${l.name}</span>
        </button>`).join("")}
    </div>`;
}
// one delegated pair of listeners for the lifetime of the app
langWrap.addEventListener("click", (e) => {
  const trigger = e.target.closest(".lang-trigger");
  if (trigger) {
    const panel = langWrap.querySelector(".lang-panel");
    const open = panel.classList.toggle("open");
    trigger.setAttribute("aria-expanded", open);
    return;
  }
  const item = e.target.closest("[data-lang]");
  if (item) {
    setLang(item.dataset.lang);
    langWrap.querySelector(".lang-panel")?.classList.remove("open");
  }
});
document.addEventListener("click", (e) => {
  if (!langWrap.contains(e.target)) langWrap.querySelector(".lang-panel")?.classList.remove("open");
});
renderLangMenu();

/* ========= Router (pathname based) ========= */
const routes = [];
let notFoundHandler = () => {};

function route(pattern, handler) {
  const keys = [];
  const regex = new RegExp(
    "^" + pattern
      .replace(/\/:([^/]+)/g, (_, k) => { keys.push(k); return "/([^/]+)"; })
      .replace(/\//g, "\\/") + "$"
  );
  routes.push({ regex, keys, handler });
}

/**
 * Strip the base prefix from a pathname. Defensive: strips it repeatedly so
 * legacy doubled URLs like /DouNest/DouNest/tools/x recover cleanly.
 * Custom domains (BASE = "/") pass through untouched.
 */
function stripBase(pathname) {
  const root = BASE.replace(/\/$/, "");
  if (!root) return pathname || "/";
  let p = pathname || "/";
  let guard = 0;
  while ((p === root || p.startsWith(root + "/")) && guard++ < 6) {
    p = p.slice(root.length) || "/";
  }
  return p;
}

function normalizeVirtual(p) {
  p = (p || "/").replace(/index\.html$/, "").replace(/\/+$/, "");
  return "/" + p.replace(/^\/+/, "");
}

function currentPath() {
  return normalizeVirtual(stripBase(location.pathname));
}

function resolve() {
  const path = currentPath();
  const [pathname] = path.split("?");
  // merge query string from the real URL (location.search) — pathname never
  // contains "?", so this is the only place /tools?q=… can be picked up
  const query = new URLSearchParams(location.search || "");
  for (const r of routes) {
    const m = pathname.match(r.regex);
    if (m) {
      const params = {};
      r.keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1])));
      r.handler(params, query);
      window.scrollTo({ top: 0, behavior: "instant" });
      moveFocusToMain();
      syncTopnavActive();
      return;
    }
  }
  notFoundHandler();
  moveFocusToMain();
  syncTopnavActive();
}

function moveFocusToMain() {
  const main = document.getElementById("main");
  if (main) { main.setAttribute("tabindex", "-1"); main.focus({ preventScroll: true }); }
}

/**
 * Internal navigation with pushState.
 * `path` is a VIRTUAL path ("/", "/tools", "/tools/json-formatter").
 * The real URL is built as BASE + path exactly once — never doubled.
 */
function navigate(path) {
  const [rawPath, rawSearch] = String(path || "/").split("?");
  const clean = normalizeVirtual(rawPath);
  const search = rawSearch ? "?" + rawSearch : "";
  const url = (clean === "/" ? BASE : BASE.replace(/\/$/, "") + clean + "/") + search;
  if (url !== location.pathname + location.search) history.pushState({}, "", url);
  resolve();
}

/**
 * Universal link interception: resolves ANY same-origin link — relative
 * ("./tools/", "../about/") or absolute ("/DouNest/tools/") — to a virtual
 * path, so the SPA handles every internal click with no full reloads and no
 * base-path doubling. External / download / modified clicks pass through.
 */
document.addEventListener("click", (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest("a");
  if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
  const href = a.getAttribute("href");
  if (!href || href.startsWith("#")) return;
  let url;
  try { url = new URL(href, location.href); } catch { return; }
  if (url.origin !== location.origin) return;
  if (BASE !== "/" && !url.pathname.startsWith(BASE) && url.pathname !== BASE.replace(/\/$/, "")) return;
  e.preventDefault();
  navigate(stripBase(url.pathname) + (url.search || ""));
});

window.addEventListener("popstate", resolve);

/**
 * Absolutize every same-origin link ONCE at boot (before any pushState):
 * relative hrefs re-resolve against the document base, which CHANGES after
 * pushState — turning "./rare/" into /DouNest/tools/rare/ and silently
 * breaking the topbar after the first SPA navigation. Rooted absolute
 * hrefs are immune. Static HTML keeps relative hrefs for crawlers/no-JS.
 */
(function absolutizeLinks() {
  const bootBase = location.href; // document base is still correct at boot
  const root = BASE.replace(/\/$/, "");
  document.querySelectorAll("a[href]").forEach(a => {
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("//") || /^[a-z]+:/i.test(href)) return;
    try {
      const u = new URL(href, bootBase);
      if (u.origin !== location.origin) return;
      const v = normalizeVirtual(stripBase(u.pathname));
      a.setAttribute("href", root + (v === "/" ? "/" : v + "/"));
    } catch {}
  });
})();

/**
 * Clean legacy doubled-base URLs (e.g. /DouNest/DouNest/tools/x — shared or
 * bookmarked while the old bug was live) in the address bar itself.
 */
(function cleanDoubledUrl() {
  const clean = stripBase(location.pathname);
  if (clean !== location.pathname) {
    const root = BASE.replace(/\/$/, "");
    const v = normalizeVirtual(clean);
    const target = (v === "/" ? BASE : root + v + "/") + location.search;
    history.replaceState({}, "", target);
  }
})();

function link(path) { return BASE.replace(/\/$/, "") + (path === "/" ? "/" : path + "/"); }

/* ========= Shared UI helpers ========= */
function activeNavClass(path) {
  return currentPath() === path || (path !== "/" && currentPath().startsWith(path)) ? "active" : "";
}

/** Highlight the matching topnav link for the current route. */
function syncTopnavActive() {
  const here = currentPath();
  document.querySelectorAll(".topnav a").forEach(a => {
    let vp;
    try { vp = normalizeVirtual(stripBase(new URL(a.href, location.href).pathname)); } catch { return; }
    const isActive = vp === here || (vp !== "/" && here.startsWith(vp + "/")) || (vp === "/" && here === "/");
    a.classList.toggle("active", isActive);
  });
}

function setLangDirLink() {
  document.documentElement.lang = getLang();
  document.documentElement.dir = getLangMeta(getLang()).dir;
}

/* ========= SEO ========= */
function setMeta(attr, key, val) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.content = val;
}
function setLinkEl(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement("link"); el.rel = rel; document.head.appendChild(el); }
  el.href = href;
}
function injectSEO({ title, description, path, jsonLd = [], alternateLanguages = [], ogType = "website" }) {
  // canonical URLs match the static-file URLs (trailing slash) to avoid
  // duplicate-content signals between SPA state and prerendered pages
  const url = SITE_ROOT + (path === "/" ? "/" : path.replace(/\/$/, "") + "/");
  document.title = title;
  setMeta("name", "description", description);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", url);
  setMeta("property", "og:type", ogType);
  setMeta("property", "og:image", `${SITE_ROOT}/assets/og-cover.png`);
  const ogLocale = ({ ar: "ar_AR", en: "en_US", fr: "fr_FR", es: "es_ES", de: "de_DE", tr: "tr_TR", ru: "ru_RU", zh: "zh_CN", hi: "hi_IN", pt: "pt_BR" })[getLang()] || "en_US";
  setMeta("property", "og:locale", ogLocale);
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:image", `${SITE_ROOT}/assets/og-cover.png`);
  setLinkEl("canonical", url);
  // absolute favicon/manifest — pushState changes the document base, so
  // relative icon URLs can silently break after SPA navigation
  setLinkEl("manifest", `${SITE_ROOT}/manifest.json`);
  document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]').forEach(el => {
    const sizes = el.getAttribute("sizes");
    if (el.getAttribute("rel") === "apple-touch-icon" || sizes === "192x192") el.href = `${SITE_ROOT}/assets/icon-192.png`;
    else if (sizes === "32x32") el.href = `${SITE_ROOT}/assets/favicon-32.png`;
  });
  // proper hreflang alternates (replace the previous single one)
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
  const alternates = alternateLanguages.length
    ? alternateLanguages.map(item => [item.lang, item.url])
    : [["ar", `${url}?lang=ar`], ["en", `${url}?lang=en`], ["x-default", url]];
  alternates.forEach(([hl, target]) => {
    const el = document.createElement("link");
    el.rel = "alternate"; el.hreflang = hl;
    el.href = target;
    document.head.appendChild(el);
  });
  document.querySelectorAll('script[data-ld="dyn"]').forEach(s => s.remove());
  jsonLd.forEach(g => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.dataset.ld = "dyn";
    s.textContent = JSON.stringify(g);
    document.head.appendChild(s);
  });
}

/* ========= State ========= */
const state = { query: "", category: "all" };

/* ========= Home ========= */
function renderHome() {
  state.category = "all"; state.query = "";
  const main = document.getElementById("main");
  const recentList = recent.list().map(getTool).filter(Boolean).slice(0, 6);

  main.innerHTML = `
    <section class="hero">
      <p class="eyebrow"><span class="live-dot" aria-hidden="true"></span>${t("hero.eyebrow")}</p>
      <h1 class="hero-title">${t("hero.title")}</h1>
      <p class="hero-sub">${t("hero.subtitle")}</p>
      <div class="search-wrap">
        <span class="search-icon" aria-hidden="true">🔍</span>
        <input class="search-input" id="q" type="search" placeholder="${t("search.placeholder")}" value="${escapeHtml(state.query)}" aria-label="${t("search.placeholder")}">
      </div>
      <div class="hero-badges">
        <span class="badge primary">${TOOLS.length} ${t("hero.toolsCount")}</span>
        <span class="badge success">🔒 ${t("monetize.localBadge")}</span>
        <span class="badge ghost">🌐 ${LANGS.length} ${t("hero.langsCount")}</span>
      </div>
    </section>

    <section class="section slim">
      <h2 class="section-title">🧭 ${t("home.explore")}</h2>
      <div class="explore-strip">
        <a class="explore-card" href="${link("/pdf")}"><strong>📄 ${t("nav.pdf")}</strong><span>${t("home.explorePdf")}</span></a>
        <a class="explore-card" href="${link("/images")}"><strong>🖼️ ${t("nav.images")}</strong><span>${t("home.exploreImages")}</span></a>
        <a class="explore-card" href="${link("/convert")}"><strong>🔄 ${t("nav.convert")}</strong><span>${t("home.exploreConvert")}</span></a>
        <a class="explore-card" href="${link("/text")}"><strong>✍️ ${getLang()==="en"?"Text center":"مركز النصوص"}</strong><span>${getLang()==="en"?"Clean, convert and analyze text":"تنظيف النصوص وتحويلها وتحليلها"}</span></a>
        <a class="explore-card" href="${link("/dev")}"><strong>🧰 ${getLang()==="en"?"Developer center":"مركز المطورين"}</strong><span>JSON · Base64 · JWT · Hash</span></a>
        <a class="explore-card" href="${link("/security")}"><strong>🔐 ${getLang()==="en"?"Security center":"مركز الأمان"}</strong><span>${getLang()==="en"?"Password tools and TOTP":"كلمات مرور ورموز TOTP"}</span></a>
        <a class="explore-card" href="${link("/calculators")}"><strong>🧮 ${getLang()==="en"?"Calculators":"الحاسبات"}</strong><span>${getLang()==="en"?"Everyday calculators":"حاسبات يومية"}</span></a>
        <a class="explore-card" href="${link("/rare")}"><strong>💎 ${t("nav.rare")}</strong><span>${t("home.exploreRare")}</span></a>
        <a class="explore-card" href="${link("/articles")}"><strong>📝 ${t("nav.articles")}</strong><span>${t("home.exploreArticles")}</span></a>
      </div>
    </section>

    ${recentList.length ? `
    <section class="section slim">
      <h2 class="section-title">🕘 ${t("home.recent")}</h2>
      <div class="tools-grid mini">${recentList.map(toolCard).join("")}</div>
    </section>` : ""}

    <section class="section">
      <div class="section-head">
        <h2 class="section-title">${t("home.allTools")}</h2>
        <a class="see-all" href="${link("/tools")}">${t("nav.allTools")} →</a>
      </div>
      <div class="category-chips" id="chips">
        ${CATEGORIES.map(c => `<button class="chip" data-cat="${c.id}">${t(c.label)}</button>`).join("")}
      </div>
      <div class="tools-grid" id="grid"></div>
    </section>

    <div id="home-featured"></div>
    ${adSlot("inline").outerHTML}
  `;

  // featured block (only renders when configured)
  const f = featuredBlock("home");
  if (f) main.querySelector("#home-featured").appendChild(f);

  const q = main.querySelector("#q");
  q.addEventListener("input", () => { state.query = q.value; renderGrid(); });
  main.querySelectorAll("[data-cat]").forEach(c => {
    c.onclick = () => {
      state.category = c.dataset.cat;
      main.querySelectorAll(".chip").forEach(x => x.classList.toggle("active", x === c));
      renderGrid();
    };
  });
  // default active chip
  main.querySelector('[data-cat="all"]')?.classList.add("active");
  renderGrid();

  injectSEO({
    title: `DouNest — ${t("hero.titleTag")}`,
    description: t("meta.description"),
    path: "/",
    jsonLd: [websiteJsonLd()]
  });
}

function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DouNest",
    "url": SITE_ROOT + "/",
    "inLanguage": getLang(),
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_ROOT}/tools?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

function score(tool, q) {
  if (!q) return true;
  q = q.toLowerCase();
  const hay = [tool.slug, ...Object.values(tool.name || {}), ...Object.values(tool.short || {}), ...(tool.tags || [])]
    .join(" ").toLowerCase();
  return hay.includes(q);
}

/**
 * ONE delegated favorites handler for the whole app — covers grid cards,
 * recent-cards, favorites page and any future card container. Per-render
 * wiring missed the recent-cards (their buttons had no handlers).
 */
function wireFavorites() {
  document.getElementById("main")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-fav]");
    if (!btn) return;
    e.preventDefault(); e.stopPropagation();
    const slug = btn.dataset.fav;
    const added = favorites.toggle(slug);
    btn.classList.toggle("active", added);
    btn.textContent = added ? "★" : "☆";
    toastSuccess(added ? t("tool.favorite") : t("tool.unfavorite"));
    if (currentPath() === "/favorites") renderFavorites();
  });
}

function renderGrid() {
  const grid = document.getElementById("grid");
  if (!grid) return;
  const list = TOOLS
    .filter(x => state.category === "all" || x.category === state.category)
    .filter(x => score(x, state.query));
  if (!list.length) { grid.innerHTML = `<div class="empty">${t("search.empty")}</div>`; return; }
  grid.innerHTML = list.map(toolCard).join("");
}

function toolCard(tool) {
  const isFav = favorites.has(tool.slug);
  return `
    <a class="tool-card" href="${link("/tools/" + tool.slug)}">
      <button class="fav-btn ${isFav ? "active" : ""}" data-fav="${tool.slug}" aria-label="favorite">${isFav ? "★" : "☆"}</button>
      <div class="icon cat-${tool.category}" aria-hidden="true">${tool.icon}</div>
      <h3>${pick(tool.name, getLang())}</h3>
      <p>${pick(tool.short, getLang())}</p>
      <div class="card-foot"><span class="badge tiny">${t("cat." + tool.category)}</span></div>
    </a>`;
}

/* ========= All tools / category ========= */
function renderAllTools(_params, query) {
  const main = document.getElementById("main");
  state.query = query.get("q") || "";
  state.category = "all";
  main.innerHTML = `
    <section class="page-head">
      <h1>${t("nav.allTools")}</h1>
      <p>${t("hero.subtitle")}</p>
      <div class="search-wrap">
        <span class="search-icon" aria-hidden="true">🔍</span>
        <input class="search-input" id="q" type="search" placeholder="${t("search.placeholder")}" value="${escapeHtml(state.query)}">
      </div>
      <div class="category-chips" id="chips">
        ${CATEGORIES.map(c => `<button class="chip" data-cat="${c.id}">${t(c.label)}</button>`).join("")}
      </div>
    </section>
    <section class="tools-grid" id="grid"></section>`;
  const q = main.querySelector("#q");
  q.addEventListener("input", () => { state.query = q.value; renderGrid(); });
  main.querySelectorAll("[data-cat]").forEach(c => {
    c.onclick = () => {
      state.category = c.dataset.cat;
      main.querySelectorAll(".chip").forEach(x => x.classList.toggle("active", x === c));
      renderGrid();
    };
  });
  main.querySelector('[data-cat="all"]')?.classList.add("active");
  renderGrid();
  injectSEO({ title: `${t("nav.allTools")} — DouNest`, description: t("meta.description"), path: "/tools" });
}

/* ========= Favorites ========= */
function renderFavorites() {
  const main = document.getElementById("main");
  const list = TOOLS.filter(x => favorites.has(x.slug));
  main.innerHTML = `
    <section class="page-head"><h1>⭐ ${t("nav.favorites")}</h1></section>
    ${list.length
      ? `<div class="tools-grid">${list.map(toolCard).join("")}</div>`
      : `<div class="empty">${t("favorites.empty")}</div>`}`;
  injectSEO({ title: `${t("nav.favorites")} — DouNest`, description: t("meta.description"), path: "/favorites" });
}

/* ========= Tool page ========= */
async function renderToolPage({ slug }) {
  const tool = getTool(slug);
  const main = document.getElementById("main");
  if (!tool) return notFoundHandler();
  recent.push(slug);

  const isFav = favorites.has(slug);
  const name = pick(tool.name, getLang());
  const short = pick(tool.short, getLang());
  const lang = getLang();

  main.innerHTML = `
    <nav class="breadcrumb" aria-label="breadcrumb">
      <a href="${link("/")}">DouNest</a><span class="sep">›</span>
      <a href="${link("/tools")}">${t("nav.allTools")}</a><span class="sep">›</span>
      <span class="current">${escapeHtml(name)}</span>
    </nav>

    <header class="tool-header">
      <div class="tool-header-main">
        <div class="icon big cat-${tool.category}" aria-hidden="true">${tool.icon}</div>
        <div>
          <h1>${escapeHtml(name)}</h1>
          <p class="lead">${escapeHtml(short)}</p>
          <div class="tool-meta">
            <span class="badge success">🔒 ${t("footer.local")}</span>
            <span class="badge ghost">${t("cat." + tool.category)}</span>
            <button class="btn btn-ghost btn-sm" id="fav">${isFav ? "★" : "☆"} ${isFav ? t("tool.unfavorite") : t("tool.favorite")}</button>
            <button class="btn btn-ghost btn-sm" id="share">🔗 ${t("tool.share")}</button>
          </div>
        </div>
      </div>
    </header>

    <div class="tool-layout">
      <div class="tool-maincol">
        ${adSlot("top").outerHTML}
        <section class="workspace" id="tool-workspace" aria-live="polite"></section>
        <section class="section">
          <h2>${t("tool.usage")}</h2>
          <ol class="steps">
            ${(tool.usage[lang] || tool.usage.en || []).map(s => `<li>${s}</li>`).join("")}
          </ol>
        </section>
        <section class="section">
          <h2>${t("tool.explanation")}</h2>
          <div class="explanation">
            ${(tool.explanation[lang] || tool.explanation.en || []).map(p => `<p>${p}</p>`).join("")}
          </div>
        </section>
        ${tool.faq?.length ? `
        <section class="section">
          <h2>${t("tool.faq")}</h2>
          ${tool.faq.map(f => `
            <details class="faq-item">
              <summary>${f.q[lang] || f.q.en}</summary>
              <p>${f.a[lang] || f.a.en}</p>
            </details>`).join("")}
        </section>` : ""}
        ${tool.tags?.length ? `
        <section class="section">
          <h2>${lang === "ar" ? "وسوم البحث" : "Hashtags"}</h2>
          ${hashtagChipsHTML(tool.tags, lang, link("/tools") + "?q=")}
        </section>` : ""}
        ${adSlot("footer").outerHTML}
      </div>

      <aside class="tool-sidecol">
        ${tool.related?.length ? `
        <div class="side-box">
          <h3>${t("tool.related")}</h3>
          <div class="related-list">
            ${tool.related.map(s => {
              const rt = getTool(s); if (!rt) return "";
              return `<a class="related-item" href="${link("/tools/" + rt.slug)}">
                <span class="icon sm">${rt.icon}</span><span>${pick(rt.name, lang)}</span></a>`;
            }).join("")}
          </div>
        </div>` : ""}
        <div class="side-box" id="side-featured"></div>
        <div class="side-box support-box">
          <h3>☕ ${t("monetize.supportTitle")}</h3>
          <p>${t("monetize.supportBody")}</p>
          <div id="side-support"></div>
        </div>
      </aside>
    </div>

    <section class="section">
      <h2>${t("tool.rating")}</h2>
      <p class="local-note">${t("rating.localNote")}</p>
      <div class="rating-row">
        <div class="rating-box" id="rating-box">
          ${[1, 2, 3, 4, 5].map(i => `<span class="star ${i <= ratings.get(slug).mine ? "active" : ""}" data-val="${i}" role="button" tabindex="0" aria-label="${i}">★</span>`).join("")}
        </div>
        <div class="rating-summary" id="rating-text"></div>
      </div>
    </section>

    <section class="section">
      <h2>${t("tool.comments")}</h2>
      <p class="local-note">${t("rating.localNote")}</p>
      <form class="comment-form" id="comment-form">
        <input class="search-input" id="c-name" placeholder="${t("comment.name")}" maxlength="40">
        <textarea class="search-input" id="c-body" placeholder="${t("comment.placeholder")}" maxlength="500" required></textarea>
        <button class="btn btn-primary" type="submit">${t("comment.submit")}</button>
      </form>
      <div class="comment-list" id="comment-list"></div>
    </section>
  `;

  // side blocks
  const sf = featuredBlock("side");
  if (sf) main.querySelector("#side-featured").appendChild(sf);
  const sb = supportButton("side");
  if (sb) main.querySelector("#side-support").appendChild(sb);
  else main.querySelector(".support-box")?.remove();

  injectSEO({
    title: `${name} — DouNest`,
    description: short,
    path: `/tools/${slug}`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": name,
        "description": short,
        "url": SITE_ROOT + `/tools/${slug}/`,
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "inLanguage": lang,
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      tool.faq?.length ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": tool.faq.map(f => ({
          "@type": "Question",
          "name": f.q[lang] || f.q.en,
          "acceptedAnswer": { "@type": "Answer", "text": f.a[lang] || f.a.en }
        }))
      } : null,
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "DouNest", "item": SITE_ROOT + "/" },
          { "@type": "ListItem", "position": 2, "name": t("nav.allTools"), "item": SITE_ROOT + "/tools/" },
          { "@type": "ListItem", "position": 3, "name": name, "item": SITE_ROOT + `/tools/${slug}/` }
        ]
      }
    ].filter(Boolean)
  });

  // actions
  main.querySelector("#fav").onclick = e => {
    const now = favorites.toggle(slug);
    e.currentTarget.textContent = `${now ? "★" : "☆"} ${now ? t("tool.unfavorite") : t("tool.favorite")}`;
    toastSuccess(now ? t("tool.favorite") : t("tool.unfavorite"));
  };
  main.querySelector("#share").onclick = async () => {
    try {
      const data = { url: location.href, title: name };
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(location.href); toastSuccess(t("tool.copied")); }
    } catch {}
  };

  const updateRatingText = () => {
    const r = ratings.get(slug);
    const avg = r.count ? (r.sum / r.count).toFixed(1) : "—";
    main.querySelector("#rating-text").textContent = r.count ? `${avg} / 5 · ${r.count}` : "";
    return r;
  };
  updateRatingText();
  main.querySelectorAll(".star").forEach(s => {
    const act = () => {
      const val = +s.dataset.val;
      ratings.rate(slug, val);
      updateRatingText();
      main.querySelectorAll(".star").forEach(x => x.classList.toggle("active", +x.dataset.val <= val));
      toastSuccess(t("rating.thanks"));
    };
    s.onclick = act;
    s.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); } };
  });

  const renderComments = () => {
    const list = comments.forTool(slug);
    const el = main.querySelector("#comment-list");
    el.innerHTML = list.length ? list.map(c => `
      <div class="comment">
        <div class="comment-head">
          <strong>${escapeHtml(c.name)}</strong>
          <span>${new Date(c.at).toLocaleString(getLang())}</span>
        </div>
        <div class="comment-body">${escapeHtml(c.body)}</div>
      </div>`).join("") : `<div class="empty">${t("comment.empty")}</div>`;
  };
  main.querySelector("#comment-form").onsubmit = e => {
    e.preventDefault();
    const name2 = main.querySelector("#c-name").value.trim();
    const body = main.querySelector("#c-body").value.trim();
    if (!body) return;
    comments.add(slug, { name: name2, body });
    main.querySelector("#c-body").value = "";
    renderComments();
    toastSuccess(t("comment.posted"));
  };
  renderComments();

  // load tool implementation
  const ws = main.querySelector("#tool-workspace");
  try {
    const mod = await import(`./tools/${slug}.js`);
    ws.innerHTML = "";
    mod.render(ws);
  } catch (err) {
    console.error("tool load failed:", slug, err);
    ws.innerHTML = `<div class="empty">⚠️ ${t("tool.error")}</div>`;
  }
}

/* ========= Rare tools v4 (index / category / detail) ========= */
function renderRareIndex() {
  const lang = getLang();
  const main = document.getElementById("main");
  main.innerHTML = rareIndexHTML(lang, link("/rare"));
  const d = disclosureBanner();
  if (d) main.prepend(d);
  injectSEO({
    title: `${t("nav.rare")} — DouNest`,
    description: t("rare.subtitle"),
    path: "/rare"
  });
}

function renderRareCatView({ cat }) {
  const lang = getLang();
  const main = document.getElementById("main");
  const html = rareCatHTML(cat, lang, link("/rare"));
  if (!html) return notFoundHandler();
  main.innerHTML = html;
  const c = getRareCat(cat);
  injectSEO({
    title: `${pick(c.name, lang)} — ${t("nav.rare")} — DouNest`,
    description: pick(c.blurb, lang).slice(0, 155),
    path: `/rare/${cat}`
  });
}

function renderRareDetailView({ slug }) {
  const lang = getLang();
  const main = document.getElementById("main");
  const tool = getRareTool(slug);
  if (!tool) return notFoundHandler();
  main.innerHTML = rareDetailHTML(slug, lang, link("/rare"), link("/tools") + "?q=");
  injectSEO({
    title: `${pick(tool.name, lang)} — ${t("nav.rare")} — DouNest`,
    description: pick(tool.desc, lang).slice(0, 155),
    path: `/rare/${slug}`,
    jsonLd: tool.cat === "security" ? [] : [{
      "@context": "https://schema.org", "@type": "Article",
      "headline": pick(tool.name, lang), "inLanguage": lang,
      "author": { "@type": "Organization", "name": "DouNest" }
    }]
  });
}

/* ========= Additional work centers ========= */
async function renderAdditionalCenter({ center }) {
  const main = document.getElementById("main");
  const lang = getLang();
  const labels = {
    text: ["✍️", "مركز النصوص — أدوات الكتابة والتحويل", "Text Center — writing and conversion tools"],
    dev: ["🧰", "مركز المطورين — أدوات البرمجة", "Developer Center — practical coding utilities"],
    security: ["🔐", "مركز الأمان — أدوات محلية", "Security Center — local-first utilities"],
    calculators: ["🧮", "مركز الحاسبات", "Calculators Center"]
  };
  const [icon, arTitle, enTitle] = labels[center] || ["🧰", center, center];
  const title = lang === "ar" ? arTitle : enTitle;
  const related = {
    text: ["word-counter","text-case","lorem-ipsum","diff-checker","markdown-to-html","slug-generator","list-cleaner"],
    dev: ["json-formatter","base64","url-encoder","jwt-decoder","hash-generator","uuid-generator","regex-tester","cron-generator","sql-formatter","timestamp-converter","json-yaml"],
    security: ["password-generator","password-strength","totp-generator","hash-generator"],
    calculators: ["age-calculator","bmi-calculator","percentage-calculator","unit-converter"]
  };
  const description = CENTER_CONTENT[center]?.[lang]?.intro || (lang === "ar" ? "مساحة عمل موحّدة تعالج مدخلاتك محلياً في المتصفح." : "A local-first workbench; your input stays in this browser.");
  main.innerHTML = `<section class="page-head"><h1>${icon} ${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p></section><section class="workspace" id="center-workspace"></section>${hubToolLinks(related[center] || [])}${centerContentMarkup(center, lang)}`;
  injectSEO({ title: `${title} — DouNest`, description, path: `/${center}`, jsonLd: [centerFaqSchema(center, lang)] });
  try {
    const mod = await import(`./hubs/${center}-hub.js`);
    mod.render(main.querySelector("#center-workspace"));
  } catch (e) { console.error("center load failed:", center, e); }
}

function hubToolLinks(slugs) {
  const items = slugs.map(getTool).filter(Boolean);
  return `<section class="section"><h2 class="section-title">${getLang()==="ar"?"أدوات مرتبطة":"Related tools"}</h2><div class="tools-grid">${items.map(x=>`<a class="tool-card" href="${link("/tools/"+x.slug)}"><div class="icon cat-${x.category}" aria-hidden="true">${x.icon}</div><h3>${escapeHtml(pick(x.name,getLang()))}</h3><p>${escapeHtml(pick(x.short,getLang()))}</p></a>`).join("")}</div></section>`;
}

/* ========= Hubs (/pdf/, /images/ and /convert/) ========= */
async function renderPdfHub() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <section class="page-head">
      <h1>📄 ${t("hub.pdfTitle")}</h1>
      <p>${t("hub.pdfSub")}</p>
    </section>
    <section class="workspace" id="hub-workspace"></section>
    ${hubToolLinks(["compress-pdf","merge-pdf","split-pdf","rotate-pdf","pdf-to-jpg","pdf-to-txt","pdf-to-word","image-to-pdf","pdf-organize","pdf-watermark","pdf-page-numbers"] )}
    ${centerContentMarkup("pdf", getLang())}`;
  injectSEO({ title: `${t("nav.pdf")} — DouNest`, description: CENTER_CONTENT.pdf[getLang()]?.intro || t("hub.pdfSub"), path: "/pdf", jsonLd: [centerFaqSchema("pdf", getLang())] });
  try {
    const mod = await import("./hubs/pdf-hub.js");
    mod.render(main.querySelector("#hub-workspace"));
  } catch (e) { console.error("pdf hub load failed:", e); }
}

async function renderConvertHub() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <section class="page-head">
      <h1>🔄 ${t("hub.convertTitle")}</h1>
      <p>${t("hub.convertSub")}</p>
    </section>
    <section class="workspace" id="hub-workspace"></section>
    ${hubToolLinks(["csv-to-json","json-to-csv","excel-to-csv","csv-to-excel","excel-to-json","pdf-to-word","word-to-pdf","image-converter","svg-to-png","json-yaml"] )}
    ${centerContentMarkup("convert", getLang())}`;
  injectSEO({ title: `${t("nav.convert")} — DouNest`, description: CENTER_CONTENT.convert[getLang()]?.intro || t("hub.convertSub"), path: "/convert", jsonLd: [centerFaqSchema("convert", getLang())] });
  try {
    const mod = await import("./hubs/convert-hub.js");
    mod.render(main.querySelector("#hub-workspace"));
  } catch (e) { console.error("convert hub load failed:", e); }
}

async function renderImageHub() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <section class="page-head">
      <h1>🖼️ ${t("hub.imagesTitle")}</h1>
      <p>${t("hub.imagesSub")}</p>
    </section>
    <section class="workspace" id="hub-workspace"></section>
    ${hubToolLinks(["image-compressor","image-converter","resize-image","remove-background","ocr-image-to-text","heic-to-jpg","image-crop","image-rotate-flip","exif-viewer","favicon-generator"] )}
    ${centerContentMarkup("images", getLang())}`;
  injectSEO({ title: `${t("nav.images")} — DouNest`, description: CENTER_CONTENT.images[getLang()]?.intro || t("hub.imagesSub"), path: "/images", jsonLd: [centerFaqSchema("images", getLang())] });
  try {
    const mod = await import("./hubs/image-hub.js");
    mod.render(main.querySelector("#hub-workspace"));
  } catch (e) { console.error("image hub load failed:", e); }
}

function affWrap(url) {
  try {
    const u = new URL(url);
    const map = (window.DouNestConfig?.affiliates) || {};
    const host = u.hostname.replace(/^www\./, "");
    const id = window.DouNestConfig?.affiliateId;
    if (map[host] && id) u.searchParams.set(map[host], id);
    return { href: u.toString(), rel: "sponsored noopener" };
  } catch { return { href: url, rel: "noopener" }; }
}

/* ========= AI directory (affiliate-ready) ========= */
function renderAIDirectory() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <section class="page-head">
      <h1>${t("nav.ai")}</h1>
      <p>${getLang() === "ar"
        ? "أفضل أدوات الذكاء الاصطناعي مصنفة حسب الاستخدام."
        : "The best AI tools, categorized by use case."}</p>
    </section>
    <div id="ai-disclosure"></div>
    ${AI_TOOLS.map(cat => `
      <section class="section">
        <h2 class="section-title">${escapeHtml(pick(cat.category, getLang()))}</h2>
        <div class="tools-grid">
          ${cat.items.map(item => {
            const a = affWrap(item.url);
            return `
            <a class="tool-card external" href="${a.href}" target="_blank" rel="${a.rel}">
              <div class="icon" aria-hidden="true">🤖</div>
              <h3>${escapeHtml(item.name)}</h3>
              <p>${escapeHtml(pick(item.desc, getLang()))}</p>
              <div class="card-foot"><span class="badge tiny">AI</span></div>
            </a>`;
          }).join("")}
        </div>
      </section>`).join("")}
  `;
  main.querySelector("#ai-disclosure").appendChild(disclosureBanner());
  injectSEO({ title: `${t("nav.ai")} — DouNest`, description: t("meta.description"), path: "/ai" });
}

/* ========= Articles ========= */
function renderArticlesList() {
  const main = document.getElementById("main");
  const list = getArticles();
  const articlePath = (article, lang = getLang()) => article.content?.[lang]
    ? (lang === "ar" ? `/articles/${article.slug}` : `/articles/${article.slug}/${lang}`)
    : `/articles/${article.slug}`;
  main.innerHTML = `
    <section class="page-head"><h1>${t("nav.articles")}</h1></section>
    <div class="tools-grid">
      ${list.map(a => `
        <a class="tool-card article" href="${link(articlePath(a))}">
          <div class="icon" aria-hidden="true">📝</div>
          <h3>${escapeHtml(pick(a.title, getLang()))}</h3>
          <p>${escapeHtml(pick(a.excerpt, getLang()))}</p>
          <div class="card-foot"><span class="badge tiny">${a.date}</span></div>
        </a>`).join("")}
    </div>`;
  injectSEO({ title: `${t("nav.articles")} — DouNest`, description: t("meta.description"), path: "/articles" });
}

const RELATED_ARTICLE_LABELS = { ar: "دليل مرتبط", en: "Related troubleshooting guide", fr: "Guide de dépannage associé", es: "Guía de solución relacionada", de: "Passender Ratgeber zur Fehlerbehebung", tr: "İlgili sorun giderme rehberi", ru: "Связанное руководство", zh: "相关故障排查指南", hi: "संबंधित समस्या-समाधान गाइड", pt: "Guia de solução relacionado" };
const ARTICLE_AUTHOR_LABELS = { ar: "إعداد", en: "By", fr: "Par", es: "Por", de: "Von", tr: "Yazan", ru: "Автор", zh: "作者", hi: "लेखक", pt: "Por" };
const ARTICLE_PUBLISHED_LABELS = { ar: "نُشر", en: "Published", fr: "Publié", es: "Publicado", de: "Veröffentlicht", tr: "Yayınlandı", ru: "Опубликовано", zh: "发布于", hi: "प्रकाशित", pt: "Publicado" };
const ARTICLE_UPDATED_LABELS = { ar: "آخر تحديث", en: "Updated", fr: "Mis à jour", es: "Actualizado", de: "Aktualisiert", tr: "Güncellendi", ru: "Обновлено", zh: "更新于", hi: "अपडेट किया गया", pt: "Atualizado" };

function renderArticlePage({ slug, lang: routeLang }) {
  const article = getArticle(slug);
  const main = document.getElementById("main");
  if (!article) return notFoundHandler();
  if (routeLang && (!LANGS.some(item => item.code === routeLang) || !article.content?.[routeLang])) return notFoundHandler();
  if (routeLang && routeLang !== getLang()) { setLang(routeLang); return; }
  if (!routeLang && getLang() !== "ar" && article.content?.[getLang()]) { navigate(`/articles/${slug}/${getLang()}`); return; }
  const lang = routeLang || getLang();
  const title = pick(article.title, lang);
  const excerpt = pick(article.excerpt, lang);
  const canonicalPath = routeLang ? `/articles/${slug}/${routeLang}` : `/articles/${slug}`;
  const rawTags = Array.isArray(article.tags) ? article.tags : (article.tags?.[lang] || article.tags?.en || []);
  const tagsHtml = rawTags.length ? `<div class="article-tags"><div class="hash-chips" aria-label="${lang === "ar" ? "موضوعات المقال" : "Article topics"}">${rawTags.map(tag => `<span class="hash-chip">#${escapeHtml(tag)}</span>`).join("")}</div></div>` : "";
  const relatedSlug = slug === "speed-up-slow-windows-pc" ? "wifi-connected-no-internet" : slug === "wifi-connected-no-internet" ? "speed-up-slow-windows-pc" : null;
  const relatedArticle = relatedSlug ? getArticle(relatedSlug) : null;
  const relatedPath = relatedSlug ? (lang === "ar" ? `/articles/${relatedSlug}` : `/articles/${relatedSlug}/${lang}`) : "";
  const relatedHtml = relatedArticle ? `<aside class="article-related"><strong>${escapeHtml(RELATED_ARTICLE_LABELS[lang] || RELATED_ARTICLE_LABELS.en)}</strong><a href="${link(relatedPath)}">${escapeHtml(pick(relatedArticle.title, lang))}</a></aside>` : "";
  const metaTitle = pick(article.metaTitle, lang) || title;
  const availableLangs = LANGS.filter(item => article.content?.[item.code]).map(item => item.code);
  const alternateLanguages = availableLangs.map(code => ({
    lang: code,
    url: `${SITE_ROOT}/articles/${slug}/${code === "ar" ? "" : `${code}/`}`
  }));
  alternateLanguages.push({ lang: "x-default", url: `${SITE_ROOT}/articles/${slug}/en/` });
  main.innerHTML = `
    <nav class="breadcrumb" aria-label="breadcrumb">
      <a href="${link("/")}">DouNest</a><span class="sep">›</span>
      <a href="${link("/articles")}">${t("nav.articles")}</a><span class="sep">›</span>
      <span class="current">${escapeHtml(title)}</span>
    </nav>
    <article class="section article-body" lang="${lang}">
      <h1>${escapeHtml(title)}</h1>
      <p class="article-byline"><span>${ARTICLE_AUTHOR_LABELS[lang] || "By"} DouNest</span><span>· ${ARTICLE_PUBLISHED_LABELS[lang] || "Published"}: <time datetime="${escapeHtml(article.date)}">${escapeHtml(article.date)}</time></span>${article.updated && article.updated !== article.date ? `<span>· ${ARTICLE_UPDATED_LABELS[lang] || "Updated"}: <time datetime="${escapeHtml(article.updated)}">${escapeHtml(article.updated)}</time></span>` : ""}</p>
      <div class="explanation">${markdownToHtml(article.content[lang] || article.content.en, BASE)}</div>
      ${relatedHtml}
      ${tagsHtml}
    </article>`;
  injectSEO({
    title: `${metaTitle} | DouNest`,
    description: excerpt,
    path: canonicalPath,
    jsonLd: [{
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": excerpt,
      "mainEntityOfPage": { "@type": "WebPage", "@id": `${SITE_ROOT}${canonicalPath}/` },
      "datePublished": article.date,
      "dateModified": article.updated || article.date,
      "keywords": rawTags.join(", "),
      "inLanguage": lang,
      "author": { "@type": "Organization", "name": "DouNest", "url": `${SITE_ROOT}/` },
      "publisher": { "@type": "Organization", "name": "DouNest", "logo": { "@type": "ImageObject", "url": `${SITE_ROOT}/assets/dounest-logo.png` } }
    }],
    alternateLanguages,
    ogType: "article"
  });
}

/* ========= Static pages ========= */
function staticPage({ title, description, html, path, jsonLd = [] }) {
  const main = document.getElementById("main");
  main.innerHTML = `<article class="section article-body">${html}</article>`;
  injectSEO({ title: `${title} — DouNest`, description: description || t("meta.description"), path, jsonLd });
}

function renderInfoRoute(slug) {
  const lang = getLang();
  const page = getInfoPage(slug, lang);
  if (!page) return notFoundHandler();
  staticPage({
    title: page.title,
    description: page.description,
    path: `/${slug}`,
    html: renderInfoPage(slug, lang, link),
    jsonLd: infoPageJsonLd(slug, lang, SITE_ROOT)
  });
}

function renderFaq() {
  const items = getFAQ();
  const lang = getLang();
  const sections = Object.entries(FAQ_CATS).map(([id, label]) => {
    const list = items.filter(f => f.cat === id);
    if (!list.length) return "";
    return `
    <section class="section">
      <h2 class="section-title">${escapeHtml(pick(label, lang))}</h2>
      ${list.map(f => `
      <details class="faq-item">
        <summary>${escapeHtml(pick(f.q, lang))}</summary>
        <p>${escapeHtml(pick(f.a, lang))}</p>
      </details>`).join("")}
    </section>`;
  }).join("");
  staticPage({
    title: t("faq.title"),
    path: "/faq",
    html: `
      <h1>${t("faq.title")}</h1>
      <p>${t("faq.subtitle")}</p>
      ${sections}
      <p class="empty" style="max-width:560px;margin:0 auto">${t("faq.more")}</p>`
  });
}

function renderAbout() {
  renderInfoRoute("about");
}

function renderPrivacy() {
  renderInfoRoute("privacy");
}

function renderTerms() {
  renderInfoRoute("terms");
}

function renderContact() { renderInfoRoute("contact"); }

function renderNotFound() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <div class="empty notfound">
      <h1>404</h1>
      <p>${t("notfound")}</p>
      <a class="btn btn-primary" href="${link("/")}">${t("nav.allTools")}</a>
    </div>`;
  injectSEO({ title: `404 — DouNest`, description: t("notfound"), path: "/404" });
}

/* ========= Header wiring ========= */
function wireHeader() {
  const nav = document.getElementById("topnav");
  const navToggle = document.getElementById("nav-toggle");
  if (nav && navToggle) {
    const setOpen = open => {
      nav.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? t("nav.closeMenu") : t("nav.openMenu"));
      navToggle.textContent = open ? "×" : "☰";
    };
    navToggle.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
    nav.addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("click", e => {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });
  }
  const support = supportButton("header");
  if (support) {
    const actions = document.querySelector(".topbar-actions");
    if (actions) actions.prepend(support);
  }
}

/* ========= Language change ========= */
document.addEventListener("langchange", () => {
  renderLangMenu();
  setLangDirLink();
  applyTranslations();
  const match = currentPath().match(/^\/articles\/([^/]+)(?:\/([a-z]{2}))?$/);
  if (match) {
    const article = getArticle(match[1]);
    const nextLang = getLang();
    if (article?.content?.[nextLang]) {
      const target = nextLang === "ar" ? `/articles/${match[1]}` : `/articles/${match[1]}/${nextLang}`;
      if (currentPath() !== target) { navigate(target); return; }
    }
  }
  resolve(); // re-render current route with new language
});

/* ========= Routes ========= */
route("/", renderHome);
route("/tools", renderAllTools);
route("/tools/:slug", renderToolPage);
route("/favorites", renderFavorites);
route("/rare", renderRareIndex);
route("/rare/maps", () => renderRareCatView({ cat: "maps" }));
route("/rare/security", () => renderRareCatView({ cat: "security" }));
route("/rare/gems", () => renderRareCatView({ cat: "gems" }));
route("/rare/classics", () => renderRareCatView({ cat: "classics" }));
route("/rare/:slug", renderRareDetailView);
route("/pdf", renderPdfHub);
route("/images", renderImageHub);
route("/convert", renderConvertHub);
route("/text", () => renderAdditionalCenter({ center: "text" }));
route("/dev", () => renderAdditionalCenter({ center: "dev" }));
route("/security", () => renderAdditionalCenter({ center: "security" }));
route("/calculators", () => renderAdditionalCenter({ center: "calculators" }));
route("/ai", renderAIDirectory);
route("/articles", renderArticlesList);
route("/articles/:slug/:lang", renderArticlePage);
route("/articles/:slug", renderArticlePage);
route("/about", renderAbout);
route("/contact", renderContact);
route("/faq", renderFaq);
route("/privacy", renderPrivacy);
route("/terms", renderTerms);
notFoundHandler = renderNotFound; // unresolved routes now render a real 404 view

/* ========= Boot ========= */
wireFavorites();
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
setLangDirLink();
wireHeader();
applyTranslations();
resolve();

if ("serviceWorker" in navigator) {
  // register from the site root so it works on deep URLs too
  navigator.serviceWorker.register(BASE + "sw.js").catch(() => {});
}
