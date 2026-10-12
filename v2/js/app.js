import { t, getLang, setLang, applyTranslations } from "./i18n.js";
import { LANGS } from "./langs.js";
import { route, initRouter } from "./router.js";
import { TOOLS, CATEGORIES, getTool, pick } from "./registry.js";
import { favorites, recent, ratings, comments, storage } from "./storage.js";
import { toastSuccess, toastError } from "./toast.js";
import { RARE_TOOLS } from "./rare-tools.js";
import { AI_TOOLS } from "./ai-directory.js";
import { getArticles, getArticle } from "./articles.js";

/* ========= Theme ========= */
const savedTheme = storage.get("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.documentElement.dataset.theme = savedTheme;
const themeBtn = document.getElementById("theme-toggle");
syncThemeBtn();
themeBtn.onclick = () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  storage.set("theme", next);
  syncThemeBtn();
};
function syncThemeBtn() {
  themeBtn.textContent = document.documentElement.dataset.theme === "dark" ? "☀️" : "🌙";
}

/* ========= Language dropdown ========= */
const langWrap = document.getElementById("lang-menu");
function renderLangMenu() {
  langWrap.innerHTML = `
    <button class="icon-btn wide lang-trigger" aria-haspopup="true" aria-expanded="false">
      <span>${LANGS.find(l=>l.code===getLang())?.flag || "🌐"}</span>
      <span style="font-size:13px">${getLang().toUpperCase()}</span>
    </button>
    <div class="lang-panel" role="menu">
      ${LANGS.map(l => `
        <button data-lang="${l.code}" class="${l.code===getLang()?'active':''}">
          <span>${l.flag}</span><span>${l.name}</span>
        </button>
      `).join("")}
    </div>
  `;
  const trigger = langWrap.querySelector(".lang-trigger");
  const panel = langWrap.querySelector(".lang-panel");
  trigger.onclick = () => {
    const open = panel.classList.toggle("open");
    trigger.setAttribute("aria-expanded", open);
  };
  langWrap.querySelectorAll("[data-lang]").forEach(b => {
    b.onclick = () => { setLang(b.dataset.lang); panel.classList.remove("open"); };
  });
  document.addEventListener("click", e => {
    if (!langWrap.contains(e.target)) panel.classList.remove("open");
  });
}
renderLangMenu();
document.addEventListener("langchange", () => {
  renderLangMenu();
  // إعادة تحميل الصفحة الحالية لترجمة المحتوى الثابت
  const hash = location.hash || "#/";
  location.hash = "";
  setTimeout(() => { location.hash = hash; }, 20);
});

/* ========= State ========= */
const state = { query: "", category: "all" };

/* ========= Home ========= */
function renderHome() {
  const main = document.getElementById("main");
  const chips = CATEGORIES.map(c =>
    `<button class="chip ${state.category===c.id?"active":""}" data-cat="${c.id}">${t(c.label)}</button>`
  ).join("");
  main.innerHTML = `
    <section class="hero">
      <h1>${t("hero.title")}</h1>
      <p>${t("hero.subtitle")}</p>
      <div class="search-wrap">
        <input class="search-input" id="q" type="search"
               placeholder="${t("search.placeholder")}" value="${state.query}">
      </div>
      <div class="category-chips">${chips}</div>
    </section>
    <section id="grid" class="tools-grid"></section>
  `;
  main.querySelector("#q").addEventListener("input", e => {
    state.query = e.target.value; renderGrid();
  });
  main.querySelectorAll("[data-cat]").forEach(c => {
    c.onclick = () => {
      state.category = c.dataset.cat;
      main.querySelectorAll(".chip").forEach(x => x.classList.toggle("active", x === c));
      renderGrid();
    };
  });
  renderGrid();
}

function score(tool, q) {
  if (!q) return true;
  q = q.toLowerCase();
  const hay = [tool.slug, ...Object.values(tool.name), ...Object.values(tool.short)]
    .join(" ").toLowerCase();
  return hay.includes(q);
}

function renderGrid() {
  const grid = document.getElementById("grid");
  const list = TOOLS
    .filter(x => state.category === "all" || x.category === state.category)
    .filter(x => score(x, state.query));
  if (!list.length) { grid.innerHTML = `<div class="empty">${t("search.empty")}</div>`; return; }
  grid.innerHTML = list.map(toolCard).join("");
  grid.querySelectorAll("[data-fav]").forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault(); e.stopPropagation();
      favorites.toggle(btn.dataset.fav);
      btn.classList.toggle("active", favorites.has(btn.dataset.fav));
      btn.textContent = favorites.has(btn.dataset.fav) ? "★" : "☆";
    };
  });
}

function toolCard(tool) {
  const isFav = favorites.has(tool.slug);
  const r = ratings.get(tool.slug);
  const avg = r.count ? (r.sum / r.count).toFixed(1) : "—";
  return `
    <a class="tool-card" href="#/tools/${tool.slug}">
      <button class="fav-btn ${isFav?"active":""}" data-fav="${tool.slug}" aria-label="favorite">${isFav?"★":"☆"}</button>
      <div class="icon">${tool.icon}</div>
      <h3>${pick(tool.name)}</h3>
      <p>${pick(tool.short)}</p>
      <div class="rating-mini">⭐ ${avg}${r.count?` (${r.count})`:""}</div>
    </a>`;
}

/* ========= Pages ========= */
function renderAllTools() { state.category="all"; state.query=""; renderHome(); }

function renderFavorites() {
  const main = document.getElementById("main");
  const list = TOOLS.filter(x => favorites.has(x.slug));
  main.innerHTML = `
    <h1 style="margin:24px 0 16px">${t("nav.favorites")}</h1>
    ${list.length ? `<div class="tools-grid">${list.map(toolCard).join("")}</div>`
                  : `<div class="empty">${t("favorites.empty")}</div>`}
  `;
  main.querySelectorAll("[data-fav]").forEach(btn => {
    btn.onclick = (e) => { e.preventDefault(); favorites.toggle(btn.dataset.fav); renderFavorites(); };
  });
}

function renderAbout() {
  document.getElementById("main").innerHTML = `
    <section class="section" style="margin-top:24px">
      <h1>${t("about.title")}</h1>
      <p>${t("about.body")}</p>
      <p class="badge success">🔒 ${t("about.privacy")}</p>
    </section>`;
}

/* ========= Tool page ========= */
async function renderToolPage({ slug }) {
  const tool = getTool(slug);
  const main = document.getElementById("main");
  if (!tool) return renderNotFound();
  recent.push(slug);

  const isFav = favorites.has(slug);
  const r = ratings.get(slug);
  const avg = r.count ? (r.sum / r.count).toFixed(1) : "—";

  main.innerHTML = `
    <nav class="breadcrumb">
      <a href="#/">DouNest</a><span class="sep">›</span>
      <a href="#/tools">${t("nav.allTools")}</a><span class="sep">›</span>
      <span class="current">${pick(tool.name)}</span>
    </nav>

    <header class="tool-header">
      <h1>${tool.icon} ${pick(tool.name)}</h1>
      <p class="lead">${pick(tool.short)}</p>
      <div class="tool-meta">
        <span class="badge success">🔒 ${t("footer.local")}</span>
        <span class="badge primary">⭐ <span id="avg">${avg}</span> (<span id="cnt">${r.count}</span>)</span>
        <button class="btn btn-ghost" id="fav">${isFav?"★":"☆"} ${isFav?t("tool.unfavorite"):t("tool.favorite")}</button>
        <button class="btn btn-ghost" id="share">🔗 ${t("tool.share")}</button>
      </div>
    </header>

    <section class="workspace" id="tool-workspace" aria-live="polite"></section>

    <section class="section">
      <h2>${t("tool.usage")}</h2>
      <ol class="steps">
        ${(tool.usage[getLang()] || tool.usage.en || []).map(s => `<li>${s}</li>`).join("")}
      </ol>
    </section>

    <section class="section">
      <h2>${t("tool.explanation")}</h2>
      <div class="explanation">
        ${(tool.explanation[getLang()] || tool.explanation.en || []).map(p => `<p>${p}</p>`).join("")}
      </div>
    </section>

    ${tool.faq?.length ? `
      <section class="section">
        <h2>${t("tool.faq")}</h2>
        ${tool.faq.map(f => `
          <details class="faq-item">
            <summary>${f.q[getLang()] || f.q.en}</summary>
            <p>${f.a[getLang()] || f.a.en}</p>
          </details>`).join("")}
      </section>` : ""}

    <section class="section">
      <h2>${t("tool.rating")}</h2>
      <div class="rating-box" id="rating-box">
        ${[1,2,3,4,5].map(i => `<span class="star ${i<=r.mine?"active":""}" data-val="${i}">★</span>`).join("")}
      </div>
      <div class="rating-summary" id="rating-text">${r.count ? `${avg} / 5 — ${r.count}` : ""}</div>
    </section>

    <section class="section">
      <h2>${t("tool.comments")}</h2>
      <form class="comment-form" id="comment-form">
        <input class="search-input" id="c-name" placeholder="${t("comment.name")}" maxlength="40">
        <textarea class="search-input" id="c-body" placeholder="${t("comment.placeholder")}" maxlength="500" required></textarea>
        <button class="btn btn-primary" type="submit" style="justify-self:start">${t("comment.submit")}</button>
      </form>
      <div class="comment-list" id="comment-list"></div>
    </section>

    ${tool.related?.length ? `
      <section class="section">
        <h2>${t("tool.related")}</h2>
        <div class="related-grid">
          ${tool.related.map(s => {
            const rt = getTool(s); if (!rt) return "";
            return `<a class="tool-card" href="#/tools/${rt.slug}">
              <div class="icon">${rt.icon}</div><h3>${pick(rt.name)}</h3></a>`;
          }).join("")}
        </div>
      </section>` : ""}
  `;

  // SEO
  injectSEO(tool);

  // Actions
  main.querySelector("#fav").onclick = e => {
    const now = favorites.toggle(slug);
    e.target.textContent = `${now?"★":"☆"} ${now?t("tool.unfavorite"):t("tool.favorite")}`;
    toastSuccess(now ? t("tool.favorite") : t("tool.unfavorite"));
  };
  main.querySelector("#share").onclick = async () => {
    try {
      const data = { url: location.href, title: pick(tool.name) };
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(location.href); toastSuccess(t("tool.copied")); }
    } catch {}
  };
  main.querySelectorAll(".star").forEach(s => {
    s.onclick = () => {
      const val = +s.dataset.val;
      ratings.rate(slug, val);
      const r2 = ratings.get(slug);
      const avg2 = (r2.sum / r2.count).toFixed(1);
      main.querySelector("#avg").textContent = avg2;
      main.querySelector("#cnt").textContent = r2.count;
      main.querySelectorAll(".star").forEach(x => x.classList.toggle("active", +x.dataset.val <= val));
      main.querySelector("#rating-text").textContent = `${avg2} / 5 — ${r2.count}`;
      toastSuccess(t("rating.thanks"));
    };
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
    const name = main.querySelector("#c-name").value.trim();
    const body = main.querySelector("#c-body").value.trim();
    if (!body) return;
    comments.add(slug, { name, body });
    main.querySelector("#c-body").value = "";
    renderComments();
    toastSuccess(t("comment.posted"));
  };
  renderComments();

  try {
    const mod = await import(`./tools/${slug}.js`);
    mod.render(main.querySelector("#tool-workspace"));
  } catch {
    main.querySelector("#tool-workspace").innerHTML = `<div class="empty">⚠️ ${t("tool.error")}</div>`;
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}

/* ========= SEO: meta + JSON-LD ========= */
const SITE = "https://mohamedham202417.github.io/DouNest";

function setMeta(attr, key, val) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.content = val;
}
function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement("link"); el.rel = rel; document.head.appendChild(el); }
  el.href = href;
}

function injectSEO(tool) {
  document.title = `${pick(tool.name)} — ${t("hero.title")} | DouNest`;
  setMeta("name", "description", pick(tool.short));
  setMeta("property", "og:title", document.title);
  setMeta("property", "og:description", pick(tool.short));
  setMeta("property", "og:url", `${SITE}/#/tools/${tool.slug}`);
  setMeta("property", "og:type", "website");
  setMeta("name", "twitter:card", "summary_large_image");
  setLink("canonical", `${SITE}/#/tools/${tool.slug}`);

  // JSON-LD WebApplication
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": pick(tool.name),
    "description": pick(tool.short),
    "url": `${SITE}/#/tools/${tool.slug}`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "inLanguage": getLang(),
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };
  // FAQ schema
  const graphs = [ld];
  if (tool.faq?.length) {
    graphs.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": tool.faq.map(f => ({
        "@type": "Question",
        "name": f.q[getLang()] || f.q.en,
        "acceptedAnswer": { "@type": "Answer", "text": f.a[getLang()] || f.a.en }
      }))
    });
  }
  document.querySelectorAll('script[data-ld="tool"]').forEach(s => s.remove());
  graphs.forEach(g => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.dataset.ld = "tool";
    s.textContent = JSON.stringify(g);
    document.head.appendChild(s);
  });
}

/* ========= 404 ========= */
function renderNotFound() {
  document.getElementById("main").innerHTML = `
    <div class="empty" style="margin-top:60px">
      <h1>404</h1><p>${t("notfound")}</p>
      <a class="btn btn-primary" href="#/" style="display:inline-block;margin-top:12px">${t("nav.allTools")}</a>
    </div>`;
}


function renderRareTools() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <h1 style="margin:24px 0 16px">${getLang() === "ar" ? "أدوات نادرة" : "Rare Tools"}</h1>
    <p style="color:var(--text-muted);margin-bottom:20px">
      ${getLang() === "ar" ? "أدوات خارجية يصعب العثور عليها، مع شرح مفصل لاستخدامها." : "External tools that are hard to find, with detailed usage explanations."}
    </p>
    <div class="tools-grid">
      ${RARE_TOOLS.map(tool => `
        <a class="tool-card" href="${tool.url}" target="_blank" rel="noopener">
          <div class="icon">🔗</div>
          <h3>${tool.name[getLang()] || tool.name.en}</h3>
          <p>${tool.desc[getLang()] || tool.desc.en}</p>
          <div class="rating-mini">${getLang() === "ar" ? "خارجي" : "External"}</div>
        </a>
      `).join("")}
    </div>
  `;
}

route("/rare", renderRareTools);


function renderAIDirectory() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <h1 style="margin:24px 0 16px">${getLang() === "ar" ? "دليل أدوات الذكاء الاصطناعي" : "AI Tools Directory"}</h1>
    <p style="color:var(--text-muted);margin-bottom:20px">
      ${getLang() === "ar" ? "أفضل أدوات AI مصنفة حسب الاستخدام، مع شرح مختصر لكل أداة." : "Best AI tools categorized by use, with a brief description for each."}
    </p>
    ${AI_TOOLS.map(cat => `
      <section class="section">
        <h2>${cat.category[getLang()] || cat.category.en}</h2>
        <div class="tools-grid">
          ${cat.items.map(item => `
            <a class="tool-card" href="${item.url}" target="_blank" rel="noopener">
              <div class="icon">🤖</div>
              <h3>${item.name}</h3>
              <p>${item.desc[getLang()] || item.desc.en}</p>
            </a>
          `).join("")}
        </div>
      </section>
    `).join("")}
  `;
}

route("/ai", renderAIDirectory);


function renderArticlesList() {
  const main = document.getElementById("main");
  const list = getArticles();
  main.innerHTML = `
    <h1 style="margin:24px 0 16px">${getLang() === "ar" ? "المقالات" : "Articles"}</h1>
    <div class="tools-grid">
      ${list.map(a => `
        <a class="tool-card" href="#/articles/${a.slug}">
          <div class="icon">📝</div>
          <h3>${a.title[getLang()] || a.title.en}</h3>
          <p>${a.excerpt[getLang()] || a.excerpt.en}</p>
          <div class="rating-mini">${a.date}</div>
        </a>
      `).join("")}
    </div>
  `;
}

function renderArticle({ slug }) {
  const article = getArticle(slug);
  const main = document.getElementById("main");
  if (!article) return renderNotFound();
  main.innerHTML = `
    <nav class="breadcrumb">
      <a href="#/">DouNest</a><span class="sep">›</span>
      <a href="#/articles">${getLang() === "ar" ? "المقالات" : "Articles"}</a><span class="sep">›</span>
      <span class="current">${article.title[getLang()] || article.title.en}</span>
    </nav>
    <article class="section" style="margin-top:16px">
      <h1>${article.title[getLang()] || article.title.en}</h1>
      <p style="color:var(--text-muted)">${article.date}</p>
      <div class="explanation">${markdownToHtml(article.content[getLang()] || article.content.en)}</div>
    </article>
  `;
}

function markdownToHtml(md) {
  return md
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(.+)$/gm, "<p>$1</p>");
}

route("/articles", renderArticlesList);
route("/articles/:slug", renderArticle);


/* ========= Routes ========= */
route("/", renderHome);
route("/tools", renderAllTools);
route("/favorites", renderFavorites);
route("/about", renderAbout);
route("/tools/:slug", renderToolPage);

/* ========= Boot ========= */
document.getElementById("year").textContent = new Date().getFullYear();
applyTranslations();
initRouter();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
