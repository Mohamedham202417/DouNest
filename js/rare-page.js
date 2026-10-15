/**
 * DouNest v4 — Rare page renderers (shared by app.js SPA + build.mjs)
 * --------------------------------------------------------------------
 * Pure HTML-string builders. NO DOM/window usage → Node-safe, imported
 * by build.mjs to prerender /rare/ index, /rare/<cat>/ and /rare/<slug>/
 * pages, and by app.js for live views in AR/EN.
 */
import { RARE_TOOLS, RARE_CATS, getRareTool, getRareCat, rareByCat, SECURITY_WARNING } from "./rare-tools.js";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const P = (obj, lang) => (obj && (obj[lang] || obj.en)) || "";

/** Clickable hashtag chips → tools search. */
export function hashtagChipsHTML(tags, lang, hrefBase = "/tools/?q=") {
  if (!tags || !tags.length) return "";
  return `<div class="hash-chips" aria-label="${lang === "ar" ? "الوسوم" : "Hashtags"}">
    ${tags.map(tg => `<a class="hash-chip" href="${hrefBase}${encodeURIComponent(tg)}">#${esc(tg)}</a>`).join("")}
  </div>`;
}

/** External-link anchor with affiliate wrapping done by callers via href/rel. */
export function visitBtnHTML(tool, lang, href, rel = "noopener") {
  const label = lang === "ar" ? "زيارة الأداة الرسمية" : "Visit the official tool";
  const nofollow = tool.cat === "security" ? " nofollow" : "";
  return `<a class="btn btn-primary rare-visit" href="${esc(href)}" target="_blank" rel="${rel}${nofollow}">
    ↗ ${label}</a>`;
}

/** Mandatory legal warning for security pages. */
export function securityWarningHTML(lang) {
  return `<div class="sec-warning" role="alert">
    <p>${esc(P(SECURITY_WARNING, lang))}</p>
    <p class="sec-warning-sub">${lang === "ar"
      ? "DouNest لا يستضيف أي أداة هنا ولا يوفر أي تنفيذ تفاعلي — هذه صفحات تعريفية وروابط إلى المشاريع الرسمية فقط."
      : "DouNest does not host or interactively run any tool here — these are information pages linking to the official projects only."}</p>
  </div>`;
}

/** One rare-tool card (links to the local detail page). */
export function rareCardHTML(tool, lang, hrefBase = "/rare/") {
  const isSec = tool.cat === "security";
  return `<a class="tool-card rare-card ${isSec ? "rare-sec" : ""}" href="${hrefBase}${tool.slug}/">
    <div class="icon" aria-hidden="true">${tool.icon}</div>
    <h3>${esc(P(tool.name, lang))}</h3>
    <p>${esc(P(tool.desc, lang).slice(0, 150))}…</p>
    <div class="card-foot">
      <span class="badge tiny">${isSec ? (lang === "ar" ? "تعريفي + تحذير" : "Info + warning") : (lang === "ar" ? "خارجي" : "External")}</span>
      <span class="rare-tag">#${esc(tool.tags?.[0] || tool.slug)}</span>
    </div>
  </a>`;
}

/** /rare/ index body — all categories. */
export function rareIndexHTML(lang, hrefBase = "/rare/") {
  return `
    <section class="page-head">
      <h1>${lang === "ar" ? "الأدوات النادرة" : "Rare Tools"}</h1>
      <p>${lang === "ar"
        ? "32 أداة ومشروعاً مختاراً بعناية في 4 فئات: خرائط حية، أدوات أمن تعريفية، جواهر GitHub، وكلاسيكيات لا يعرفها الجميع — لكل أداة صفحة تفصيلية كاملة بالشرح والخطوات والوسوم."
        : "32 carefully curated tools and projects in 4 categories: live maps, informational security tools, GitHub gems and little-known classics — each with a full detail page covering explanation, steps and hashtags."}</p>
    </section>
    ${RARE_CATS.map(cat => {
      const items = rareByCat(cat.id);
      return `
    <section class="section" id="cat-${cat.id}">
      <div class="rare-cat-head">
        <span class="rare-cat-icon" aria-hidden="true">${cat.icon}</span>
        <div>
          <h2 class="section-title">${esc(P(cat.name, lang))} <span class="rare-count">${items.length}</span></h2>
          <p class="rare-tagline">${esc(P(cat.tagline, lang))}</p>
        </div>
      </div>
      <p class="rare-blurb">${esc(P(cat.blurb, lang))}</p>
      ${cat.id === "security" ? securityWarningHTML(lang) : ""}
      <div class="tools-grid">
        ${items.map(tool => rareCardHTML(tool, lang, hrefBase)).join("")}
      </div>
    </section>`;
    }).join("")}`;
}

/** /rare/<cat>/ body. */
export function rareCatHTML(catId, lang, hrefBase = "/rare/") {
  const cat = getRareCat(catId);
  const items = rareByCat(catId);
  if (!cat || !items.length) return null;
  return `
    <nav class="breadcrumb" aria-label="breadcrumb">
      <a href="${hrefBase}">DouNest</a><span class="sep">›</span>
      <a href="${hrefBase}">${lang === "ar" ? "أدوات نادرة" : "Rare Tools"}</a><span class="sep">›</span>
      <span class="current">${esc(P(cat.name, lang))}</span>
    </nav>
    <section class="page-head">
      <h1>${cat.icon} ${esc(P(cat.name, lang))}</h1>
      <p>${esc(P(cat.tagline, lang))}</p>
    </section>
    <p class="rare-blurb">${esc(P(cat.blurb, lang))}</p>
    ${catId === "security" ? securityWarningHTML(lang) : ""}
    <div class="tools-grid">
      ${items.map(tool => rareCardHTML(tool, lang, hrefBase)).join("")}
    </div>`;
}

/** /rare/<slug>/ detail body. */
export function rareDetailHTML(slug, lang, hrefBase = "/rare/", chipBase = "/tools/?q=") {
  const tool = getRareTool(slug);
  if (!tool) return null;
  const cat = getRareCat(tool.cat);
  const isAr = lang === "ar";
  return `
    <nav class="breadcrumb" aria-label="breadcrumb">
      <a href="${hrefBase}">DouNest</a><span class="sep">›</span>
      <a href="${hrefBase}">${isAr ? "أدوات نادرة" : "Rare Tools"}</a><span class="sep">›</span>
      <a href="${hrefBase}${tool.cat}/">${esc(P(cat?.name, lang))}</a><span class="sep">›</span>
      <span class="current">${esc(P(tool.name, lang))}</span>
    </nav>
    <header class="tool-header">
      <div class="tool-header-main">
        <div class="icon big rare-icon" aria-hidden="true">${tool.icon}</div>
        <div>
          <h1>${esc(P(tool.name, lang))}</h1>
          <p class="lead">${isAr ? "أداة نادرة مختارة — شرح كامل، خطوات البدء، ووسوم البحث." : "A curated rare tool — full explanation, getting-started steps and hashtags."}</p>
          <div class="tool-meta">
            <span class="badge ghost">${esc(P(cat?.name, lang))}</span>
            ${isAr ? '<span class="badge success">مجاني ومفتوح المصدر</span>' : '<span class="badge success">Free & open source</span>'}
          </div>
        </div>
      </div>
    </header>
    ${tool.cat === "security" ? securityWarningHTML(lang) : ""}
    <article class="section rare-detail">
      <h2>${isAr ? "ما هي هذه الأداة؟" : "What is this tool?"}</h2>
      <div class="explanation"><p>${esc(P(tool.desc, lang))}</p></div>
      <h2>${isAr ? "لماذا نرشحها؟" : "Why we recommend it"}</h2>
      <div class="explanation"><p>${esc(P(tool.why, lang))}</p></div>
      <h2>${isAr ? "كيف تبدأ معها" : "How to get started"}</h2>
      <ol class="steps">${(tool.how[lang] || tool.how.en).map(s => `<li>${esc(s)}</li>`).join("")}</ol>
      <div class="rare-visit-row">${visitBtnHTML(tool, lang, tool.url)}</div>
      ${hashtagChipsHTML(tool.tags, lang, chipBase)}
    </article>`;
}

/* expose lookups for consumers that import only this module */
export { RARE_TOOLS, RARE_CATS, getRareTool, getRareCat, rareByCat, SECURITY_WARNING };
