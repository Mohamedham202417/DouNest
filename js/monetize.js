/**
 * DouNest v3 — Monetization layer
 * ------------------------------------------------------------------
 * Central place for every revenue surface. Nothing here is hard-coded:
 * everything is driven by config.js so the owner can flip switches
 * without touching app code.
 *
 * Revenue streams wired here:
 *   1. AdSense display slots   -> cfg.adsense (client + slots per position)
 *   2. Affiliate links         -> cfg.affiliates (per-domain sub-IDs) + rel="sponsored"
 *   3. Featured / sponsored    -> cfg.featured (paid placements, rel="sponsored")
 *   4. Support (BuyMeACoffee)  -> cfg.support.url
 *   5. (roadmap) Pro tier      -> cfg.pro.url shown as "Soon" teaser
 */
import { t } from "./i18n.js";
import { escapeHtml } from "./util.js";

const cfg = () => window.DouNestConfig || {};

/* ---------- 1) Ad slots ---------- */
/**
 * Returns an ad slot element ready to be appended.
 * If AdSense is configured (client id set), a real <ins class="adsbygoogle">
 * is injected and adsbygoogle.push() is called. Otherwise renders a subtle
 * reserved placeholder so layout is stable from day one.
 * @param {"top"|"inline"|"footer"} position
 */
export function adSlot(position = "inline") {
  const c = cfg().adsense || {};
  const el = document.createElement("aside");
  el.className = `ad-slot ad-${position}`;
  el.setAttribute("aria-label", t("monetize.ad"));
  el.dataset.adPosition = position;

  if (c.client && c.slots && c.slots[position]) {
    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", c.client);
    ins.setAttribute("data-ad-slot", c.slots[position]);
    ins.setAttribute("data-ad-format", position === "top" ? "horizontal" : "auto");
    ins.setAttribute("data-full-width-responsive", "true");
    el.appendChild(ins);
    // push after paint
    setTimeout(() => { try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {} }, 50);
  } else {
    el.innerHTML = `<span class="ad-label">${t("monetize.ad")}</span><span class="ad-ph"></span>`;
  }
  return el;
}

/* ---------- 2) Affiliate links ---------- */
const AFF_PARAMS = {
  "hostinger.com":  "ref",
  "contabo.com":    "ref",
  "namecheap.com":  "ref",
  "nordvpn.com":    "ref",
  "canva.com":      "ref",
  "notion.so":      "ref"
};

/**
 * Wraps an outbound URL with the owner's affiliate/sub ID when a mapping
 * exists in config. Marks the anchor rel="sponsored noopener".
 */
export function affAnchor(url, text, extraClass = "") {
  const c = cfg();
  let final = url;
  try {
    const u = new URL(url);
    const map = c.affiliates || {};
    const param = map[u.hostname.replace(/^www\./, "")] || AFF_PARAMS[u.hostname.replace(/^www\./, "")];
    const id = c.affiliateId;
    if (param && id) u.searchParams.set(param, id);
    final = u.toString();
  } catch {}
  const a = document.createElement("a");
  a.href = final;
  a.target = "_blank";
  a.rel = "sponsored noopener";
  a.className = extraClass;
  a.textContent = text;
  return a;
}

/** Disclosure banner for pages containing affiliate links (AI dir / rare tools). */
export function disclosureBanner() {
  const el = document.createElement("p");
  el.className = "disclosure";
  el.textContent = "ℹ️ " + t("monetize.disclosure");
  return el;
}

/* ---------- 3) Featured / sponsored placements ---------- */
/**
 * Featured card for home + tool pages. Driven by cfg.featured:
 * [{ title, desc, url, img?, tag? }] — set rel="sponsored" automatically.
 * Hidden entirely when the list is empty.
 */
export function featuredBlock(variant = "home") {
  const items = (cfg().featured || []);
  if (!items.length) return null;
  const wrap = document.createElement("section");
  wrap.className = `featured featured-${variant}`;
  wrap.innerHTML = `
    <h2 class="featured-title">✦ ${t("monetize.featured")} <span class="tag-sponsored">${t("monetize.sponsored")}</span></h2>
    <div class="featured-grid">
      ${items.map(f => `
        <a class="featured-card" href="${escapeHtml(f.url)}" target="_blank" rel="sponsored noopener">
          ${f.img ? `<img src="${escapeHtml(f.img)}" alt="" loading="lazy">` : `<div class="featured-icon">★</div>`}
          <div class="featured-body">
            <h3>${escapeHtml(f.title)}</h3>
            <p>${escapeHtml(f.desc || "")}</p>
          </div>
        </a>`).join("")}
    </div>`;
  return wrap;
}

/* ---------- 4) Support button ---------- */
export function supportButton(variant = "header") {
  const c = cfg();
  if (!c.support?.url) return null;
  const a = document.createElement("a");
  a.href = c.support.url;
  a.target = "_blank";
  a.rel = "noopener";
  a.className = `support-btn support-${variant}`;
  a.innerHTML = `☕ <span>${t("monetize.support")}</span>`;
  return a;
}
