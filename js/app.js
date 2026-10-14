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
import { RARE_TOOLS } from "./rare-tools.js";
import { AI_TOOLS } from "./ai-directory.js";
import { getArticles, getArticle } from "./articles.js";

/* ========= Config & base detection ========= */
const CFG = window.DouNestConfig || {};
const SITE_ROOT = (CFG.origin || "") + (CFG.repoPath ? "/" + CFG.repoPath : "");

/**
 * Auto-detect the base path the app is served from.
 * Works for: custom domain "/" , GitHub Pages "/DouNest/", local servers.
 */
function detectBase() {
  if (CFG.base && CFG.base !== "auto") return CFG.base.endsWith("/") ? CFG.base : CFG.base + "/";
  const KNOWN = ["tools", "articles", "categories", "favorites", "ai", "rare", "about", "privacy", "terms", "support", "index.html", "404.html"];
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

function currentPath() {
  let p = location.pathname.startsWith(BASE) ? location.pathname.slice(BASE.length) : location.pathname;
  p = p.replace(/index\.html$/, "").replace(/\/+$/, "");
  return "/" + p.replace(/^\/+/, "");
}

function resolve() {
  const path = currentPath();
  const [pathname, queryStr] = path.split("?");
  const query = new URLSearchParams(queryStr || "");
  for (const r of routes) {
    const m = pathname.match(r.regex);
    if (m) {
      const params = {};
      r.keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1])));
      r.handler(params, query);
      window.scrollTo({ top: 0, behavior: "instant" });
      moveFocusToMain();
      return;
    }
  }
  notFoundHandler();
  moveFocusToMain();
}

function moveFocusToMain() {
  const main = document.getElementById("main");
  if (main) { main.setAttribute("tabindex", "-1"); main.focus({ preventScroll: true }); }
}

/** Internal navigation with pushState + link interception. */
function navigate(path) {
  const url = BASE.replace(/\/$/, "") + path;
  history.pushState({}, "", url === "" ? BASE : url);
  resolve();
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
  const href = a.getAttribute("href");
  if (!href || !href.startsWith("/") || href.startsWith("//")) return;
  if (a.host !== location.host && a.getAttribute("href")) return;
  e.preventDefault();
  navigate(href);
});

window.addEventListener("popstate", resolve);

function link(path) { return BASE.replace(/\/$/, "") + path; }

/* ========= Shared UI helpers ========= */
function activeNavClass(path) {
  return currentPath() === path || (path !== "/" && currentPath().startsWith(path)) ? "active" : "";
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
function injectSEO({ title, description, path, jsonLd = [] }) {
  const url = SITE_ROOT + path;
  document.title = title;
  setMeta("name", "description", description);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", url);
  setMeta("property", "og:type", "website");
  setMeta("property", "og:image", `${SITE_ROOT}/assets/og-cover.png`);
  setMeta("property", "og:locale", getLang() === "ar" ? "ar_AR" : "en_US");
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:image", `${SITE_ROOT}/assets/og-cover.png`);
  setLinkEl("canonical", url);
  setLinkEl("alternate", `${SITE_ROOT}${path}?lang=ar`);
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
  const hay = [tool.slug, ...Object.values(tool.name || {}), ...Object.values(tool.short || {})]
    .join(" ").toLowerCase();
  return hay.includes(q);
}

function renderGrid() {
  const grid = document.getElementById("grid");
  if (!grid) return;
  const list = TOOLS
    .filter(x => state.category === "all" || x.category === state.category)
    .filter(x => score(x, state.query));
  if (!list.length) { grid.innerHTML = `<div class="empty">${t("search.empty")}</div>`; return; }
  grid.innerHTML = list.map(toolCard).join("");
  grid.querySelectorAll("[data-fav]").forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault(); e.stopPropagation();
      const slug = btn.dataset.fav;
      const added = favorites.toggle(slug);
      btn.classList.toggle("active", added);
      btn.textContent = added ? "★" : "☆";
      toastSuccess(added ? t("tool.favorite") : t("tool.unfavorite"));
    };
  });
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
  main.querySelectorAll("[data-fav]").forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      favorites.toggle(btn.dataset.fav);
      renderFavorites();
    };
  });
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

/* ========= Rare tools (affiliate-ready) ========= */
function renderRareTools() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <section class="page-head">
      <h1>${t("nav.rare")}</h1>
      <p>${getLang() === "ar"
        ? "أدوات خارجية مختارة بعناية يصعب العثور عليها، مع شرح لكل أداة."
        : "Carefully selected external tools that are hard to find, with a note on each."}</p>
    </section>
    <div id="rare-disclosure"></div>
    <div class="tools-grid">
      ${RARE_TOOLS.map(tool => {
        // affiliate-aware href (adds owner's sub-id when configured)
        const anchor = affWrap(tool.url);
        return `
        <a class="tool-card external" href="${anchor.href}" target="_blank" rel="${anchor.rel}">
          <div class="icon" aria-hidden="true">🧭</div>
          <h3>${escapeHtml(pick(tool.name, getLang()))}</h3>
          <p>${escapeHtml(pick(tool.desc, getLang()))}</p>
          <div class="card-foot"><span class="badge tiny">${t("monetize.sponsored") || "External"}</span></div>
        </a>`;
      }).join("")}
    </div>`;
  main.querySelector("#rare-disclosure").appendChild(disclosureBanner());
  injectSEO({ title: `${t("nav.rare")} — DouNest`, description: t("meta.description"), path: "/rare" });
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
  main.innerHTML = `
    <section class="page-head"><h1>${t("nav.articles")}</h1></section>
    <div class="tools-grid">
      ${list.map(a => `
        <a class="tool-card article" href="${link("/articles/" + a.slug)}">
          <div class="icon" aria-hidden="true">📝</div>
          <h3>${escapeHtml(pick(a.title, getLang()))}</h3>
          <p>${escapeHtml(pick(a.excerpt, getLang()))}</p>
          <div class="card-foot"><span class="badge tiny">${a.date}</span></div>
        </a>`).join("")}
    </div>`;
  injectSEO({ title: `${t("nav.articles")} — DouNest`, description: t("meta.description"), path: "/articles" });
}

function renderArticlePage({ slug }) {
  const article = getArticle(slug);
  const main = document.getElementById("main");
  if (!article) return notFoundHandler();
  const lang = getLang();
  main.innerHTML = `
    <nav class="breadcrumb" aria-label="breadcrumb">
      <a href="${link("/")}">DouNest</a><span class="sep">›</span>
      <a href="${link("/articles")}">${t("nav.articles")}</a><span class="sep">›</span>
      <span class="current">${escapeHtml(pick(article.title, lang))}</span>
    </nav>
    <article class="section article-body">
      <h1>${escapeHtml(pick(article.title, lang))}</h1>
      <p class="article-date">${article.date}</p>
      <div class="explanation">${markdownToHtml(article.content[lang] || article.content.en)}</div>
    </article>`;
  injectSEO({
    title: `${pick(article.title, lang)} — DouNest`,
    description: pick(article.excerpt, lang),
    path: `/articles/${slug}`,
    jsonLd: [{
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": pick(article.title, lang),
      "datePublished": article.date,
      "inLanguage": lang,
      "author": { "@type": "Organization", "name": "DouNest" }
    }]
  });
}

function markdownToHtml(md) {
  const esc = escapeHtml(md);
  return esc
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hp])(.+)$/gm, "<p>$1</p>");
}

/* ========= Static pages ========= */
function staticPage({ title, html, path }) {
  const main = document.getElementById("main");
  main.innerHTML = `<article class="section article-body">${html}</article>`;
  injectSEO({ title: `${title} — DouNest`, description: t("meta.description"), path });
}

function renderAbout() {
  staticPage({
    title: t("about.title"),
    path: "/about",
    html: `
      <h1>${t("about.title")}</h1>
      <p>${t("about.body")}</p>
      <p>${t("about.body2")}</p>
      <ul class="nice-list">
        <li>🔒 ${t("about.p1")}</li>
        <li>⚡ ${t("about.p2")}</li>
        <li>🌐 ${t("about.p3")}</li>
        <li>🆓 ${t("about.p4")}</li>
      </ul>
      <p class="badge success">${t("about.privacy")}</p>`
  });
}

function renderPrivacy() {
  staticPage({
    title: t("legal.privacy"),
    path: "/privacy",
    html: `
      <h1>${t("legal.privacy")}</h1>
      <p>${t("privacy.intro")}</p>
      <h2>${t("privacy.localTitle")}</h2>
      <p>${t("privacy.localBody")}</p>
      <h2>${t("privacy.storageTitle")}</h2>
      <p>${t("privacy.storageBody")}</p>
      <h2>${t("privacy.adsTitle")}</h2>
      <p>${t("privacy.adsBody")}</p>
      <h2>${t("privacy.affiliateTitle")}</h2>
      <p>${t("privacy.affiliateBody")}</p>
      <h2>${t("privacy.analyticsTitle")}</h2>
      <p>${t("privacy.analyticsBody")}</p>
      <h2>${t("privacy.contactTitle")}</h2>
      <p>${t("privacy.contactBody")}</p>`
  });
}

function renderTerms() {
  staticPage({
    title: t("legal.terms"),
    path: "/terms",
    html: `
      <h1>${t("legal.terms")}</h1>
      <p>${t("terms.intro")}</p>
      <h2>${t("terms.useTitle")}</h2>
      <p>${t("terms.useBody")}</p>
      <h2>${t("terms.warrantyTitle")}</h2>
      <p>${t("terms.warrantyBody")}</p>
      <h2>${t("terms.liabilityTitle")}</h2>
      <p>${t("terms.liabilityBody")}</p>
      <h2>${t("terms.ipTitle")}</h2>
      <p>${t("terms.ipBody")}</p>`
  });
}

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
  resolve(); // re-render current route with new language
});

/* ========= Routes ========= */
route("/", renderHome);
route("/tools", renderAllTools);
route("/tools/:slug", renderToolPage);
route("/favorites", renderFavorites);
route("/rare", renderRareTools);
route("/ai", renderAIDirectory);
route("/articles", renderArticlesList);
route("/articles/:slug", renderArticlePage);
route("/about", renderAbout);
route("/privacy", renderPrivacy);
route("/terms", renderTerms);

/* ========= Boot ========= */
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
