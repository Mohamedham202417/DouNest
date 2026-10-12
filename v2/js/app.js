import { t, getLang, setLang, applyTranslations } from "./i18n.js";
import { route, initRouter, navigate } from "./router.js";
import { TOOLS, CATEGORIES, getTool } from "./registry.js";
import { favorites, recent, ratings, comments, storage } from "./storage.js";
import { toast, toastSuccess, toastError } from "./toast.js";

/* ================= Theme ================= */
const themeKey = "theme";
const savedTheme = storage.get(themeKey);
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
else if (matchMedia("(prefers-color-scheme: dark)").matches) document.documentElement.dataset.theme = "dark";
syncThemeBtn();

function syncThemeBtn() {
  const btn = document.getElementById("theme-toggle");
  const dark = document.documentElement.dataset.theme === "dark";
  btn.textContent = dark ? "☀️" : "🌙";
}
document.getElementById("theme-toggle").onclick = () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  storage.set(themeKey, next);
  syncThemeBtn();
};

/* ================= Language ================= */
const langBtn = document.getElementById("lang-toggle");
langBtn.textContent = getLang() === "ar" ? "EN" : "ع";
langBtn.onclick = () => {
  setLang(getLang() === "ar" ? "en" : "ar");
  langBtn.textContent = getLang() === "ar" ? "EN" : "ع";
};
document.addEventListener("langchange", () => location.reload());

/* ================= Search state ================= */
const state = { query: "", category: "all" };

/* ================= Home ================= */
function renderHome() {
  const main = document.getElementById("main");
  const chipsHtml = CATEGORIES.map(c =>
    `<button class="chip ${state.category===c.id?"active":""}" data-cat="${c.id}">${t(c.label)}</button>`
  ).join("");

  main.innerHTML = `
    <section class="hero">
      <h1>${t("hero.title")}</h1>
      <p>${t("hero.subtitle")}</p>
      <div class="search-wrap">
        <input class="search-input" id="q" type="search" placeholder="${t("search.placeholder")}" value="${escapeHtml(state.query)}">
      </div>
      <div class="category-chips">${chipsHtml}</div>
    </section>
    <section id="grid" class="tools-grid"></section>
  `;

  main.querySelector("#q").addEventListener("input", e => {
    state.query = e.target.value;
    renderGrid();
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

function scoreTool(tool, q) {
  if (!q) return 1;
  q = q.toLowerCase();
  const hay = [
    tool.slug,
    tool.name.ar, tool.name.en,
    tool.short.ar, tool.short.en,
    tool.category
  ].join(" ").toLowerCase();
  return hay.includes(q) ? 1 : 0;
}

function renderGrid() {
  const grid = document.getElementById("grid");
  const list = TOOLS
    .filter(x => state.category === "all" || x.category === state.category)
    .filter(x => scoreTool(x, state.query));

  if (!list.length) {
    grid.innerHTML = `<div class="empty">${t("tool.error")}</div>`;
    return;
  }

  grid.innerHTML = list.map(toolCard).join("");
  grid.querySelectorAll("[data-fav]").forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault(); e.stopPropagation();
      const slug = btn.dataset.fav;
      favorites.toggle(slug);
      btn.classList.toggle("active", favorites.has(slug));
      btn.textContent = favorites.has(slug) ? "★" : "☆";
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
      <h3>${tool.name[getLang()]}</h3>
      <p>${tool.short[getLang()]}</p>
      <div class="rating-mini">⭐ ${avg} ${r.count?`(${r.count})`:""}</div>
    </a>
  `;
}

/* ================= All tools ================= */
function renderAllTools() {
  state.category = "all";
  state.query = "";
  renderHome();
}

/* ================= Favorites ================= */
function renderFavorites() {
  const main = document.getElementById("main");
  const list = TOOLS.filter(t => favorites.has(t.slug));
  main.innerHTML = `
    <h1 style="margin:24px 0 16px">${t("nav.favorites")}</h1>
    ${list.length
      ? `<div class="tools-grid">${list.map(toolCard).join("")}</div>`
      : `<div class="empty">${t("favorites.empty")}</div>`}
  `;
  main.querySelectorAll("[data-fav]").forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault(); e.stopPropagation();
      const slug = btn.dataset.fav;
      favorites.toggle(slug);
      renderFavorites();
    };
  });
}

/* ================= About ================= */
function renderAbout() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <section class="section" style="margin-top:24px">
      <h1>${t("about.title")}</h1>
      <p>${t("about.body")}</p>
      <p class="badge success">🔒 ${t("about.privacy")}</p>
    </section>
  `;
}

/* ================= Tool page ================= */
async function renderToolPage({ slug }) {
  const tool = getTool(slug);
  const main = document.getElementById("main");
  if (!tool) return renderNotFound();

  recent.push(slug);
  const isFav = favorites.has(slug);
  const r = ratings.get(tool.slug);
  const avg = r.count ? (r.sum / r.count).toFixed(1) : "—";
  const myRating = r.mine || 0;

  main.innerHTML = `
    <nav class="breadcrumb">
      <a href="#/">ToolNest</a> ›
      <a href="#/tools">${t("nav.allTools")}</a> ›
      <span>${tool.name[getLang()]}</span>
    </nav>

    <header class="tool-header">
      <h1>${tool.icon} ${tool.name[getLang()]}</h1>
      <p class="lead">${tool.short[getLang()]}</p>
      <div class="tool-meta">
        <span class="badge success">🔒 ${t("footer.local")}</span>
        <span class="badge primary">⭐ <span id="avg">${avg}</span> (<span id="cnt">${r.count}</span>)</span>
        <button class="btn btn-ghost" id="fav">${isFav ? "★ "+t("tool.unfavorite") : "☆ "+t("tool.favorite")}</button>
        <button class="btn btn-ghost" id="share">🔗 ${t("tool.share")}</button>
      </div>
    </header>

    <section class="workspace" id="tool-workspace" aria-live="polite"></section>

    <section class="section">
      <h2>${t("tool.usage")}</h2>
      <ol class="steps">
        ${(tool.usage[getLang()] || []).map(s => `<li>${s}</li>`).join("")}
      </ol>
    </section>

    <section class="section">
      <h2>${t("tool.explanation")}</h2>
      <div class="explanation">
        ${(tool.explanation[getLang()] || []).map(p => `<p>${p}</p>`).join("")}
      </div>
    </section>

    ${tool.faq?.length ? `
      <section class="section">
        <h2>${t("tool.faq")}</h2>
        ${tool.faq.map(f => `
          <details class="faq-item">
            <summary>${f.q[getLang()]}</summary>
            <p>${f.a[getLang()]}</p>
          </details>
        `).join("")}
      </section>` : ""}

    <section class="section">
      <h2>${t("tool.rating")}</h2>
      <div class="rating-box" id="rating-box">
        ${[1,2,3,4,5].map(i =>
          `<span class="star ${i <= myRating ? "active":""}" data-val="${i}">★</span>`
        ).join("")}
      </div>
      <div class="rating-summary" id="rating-text">${r.count ? `${avg} / 5 — ${r.count}` : ""}</div>
    </section>

    <section class="section">
      <h2>${t("tool.comments")}</h2>
      <form class="comment-form" id="comment-form">
        <input class="search-input" id="c-name" placeholder="${t("comment.name")}" maxlength="40">
        <textarea class="search-input" id="c-body" placeholder="${t("comment.placeholder")}" maxlength="500" required style="border-radius:14px;padding:12px"></textarea>
        <button class="btn btn-primary" type="submit" style="justify-self:start">${t("comment.submit")}</button>
      </form>
      <div class="comment-list" id="comment-list"></div>
    </section>

    ${tool.related?.length ? `
      <section class="section">
        <h2>${t("tool.related")}</h2>
        <div class="related-grid">
          ${tool.related.map(s => {
            const rt = getTool(s);
            if (!rt) return "";
            return `<a class="tool-card" href="#/tools/${rt.slug}">
              <div class="icon">${rt.icon}</div>
              <h3>${rt.name[getLang()]}</h3>
            </a>`;
          }).join("")}
        </div>
      </section>` : ""}
  `;

  // Favorites toggle
  main.querySelector("#fav").onclick = (e) => {
    const now = favorites.toggle(slug);
    e.target.textContent = now ? "★ "+t("tool.unfavorite") : "☆ "+t("tool.favorite");
    toastSuccess(now ? t("tool.favorite") : t("tool.unfavorite"));
  };
  // Share
  main.querySelector("#share").onclick = async () => {
    const url = location.href;
    try {
      if (navigator.share) await navigator.share({ url, title: tool.name[getLang()] });
      else { await navigator.clipboard.writeText(url); toastSuccess(t("tool.copied")); }
    } catch {}
  };

  // Ratings
  main.querySelectorAll(".star").forEach(s => {
    s.onclick = () => {
      const val = +s.dataset.val;
      ratings.rate(slug, val);
      const r2 = ratings.get(slug);
      const avg2 = (r2.sum / r2.count).toFixed(1);
      main.querySelector("#avg").textContent = avg2;
      main.querySelector("#cnt").textContent = r2.count;
      main.querySelectorAll(".star").forEach(x =>
        x.classList.toggle("active", +x.dataset.val <= val)
      );
      main.querySelector("#rating-text").textContent = `${avg2} / 5 — ${r2.count}`;
      toastSuccess(t("rating.thanks"));
    };
  });

  // Comments
  const renderComments = () => {
    const list = comments.forTool(slug);
    const el = main.querySelector("#comment-list");
    if (!list.length) { el.innerHTML = `<div class="empty">${t("comment.empty")}</div>`; return; }
    el.innerHTML = list.map(c => `
      <div class="comment">
        <div class="comment-head">
          <strong>${escapeHtml(c.name)}</strong>
          <span>${new Date(c.at).toLocaleString(getLang() === "ar" ? "ar" : "en")}</span>
        </div>
        <div class="comment-body">${escapeHtml(c.body)}</div>
      </div>
    `).join("");
  };
  main.querySelector("#comment-form").onsubmit = (e) => {
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

  // Load tool module
  try {
    const mod = await import(`./tools/${slug}.js`);
    mod.render(main.querySelector("#tool-workspace"));
  } catch (e) {
    main.querySelector("#tool-workspace").innerHTML = `<div class="empty">⚠️ ${t("tool.error")}</div>`;
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}

/* ================= 404 ================= */
function renderNotFound() {
  document.getElementById("main").innerHTML = `
    <div class="empty" style="margin-top:60px">
      <h1>404</h1>
      <p>${t("notfound")}</p>
      <a class="btn btn-primary" href="#/" style="display:inline-block;margin-top:12px">${t("nav.allTools")}</a>
    </div>
  `;
}

/* ================= Routes ================= */
route("/", renderHome);
route("/tools", renderAllTools);
route("/favorites", renderFavorites);
route("/about", renderAbout);
route("/tools/:slug", renderToolPage);

/* ================= Boot ================= */
document.getElementById("year").textContent = new Date().getFullYear();
applyTranslations();
initRouter();

// PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}