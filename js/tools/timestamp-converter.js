import { t } from "../i18n.js";
import { toastSuccess } from "../toast.js";

export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>Unix Timestamp</label>
      <input type="number" id="ts" placeholder="1730000000">
    </div>
    <div class="row">
      <div class="field"><label>${t("ts.now")}</label><output id="now" style="font-weight:700">—</output></div>
      <div class="field"><label>ms / s</label>
        <select id="unit"><option value="s">seconds</option><option value="ms">milliseconds</option></select>
      </div>
    </div>
    <div class="row">
      <button class="btn btn-primary" id="run">${t("tool.run")}</button>
      <button class="btn" id="nowBtn">${t("ts.nowBtn")}</button>
      <button class="btn" id="copy">${t("tool.copy")}</button>
    </div>
    <div class="field" style="margin-top:12px">
      <label>${t("tool.output")}</label>
      <div class="output" id="out" aria-live="polite"></div>
    </div>
  `;
  const ts = root.querySelector("#ts");
  const unit = root.querySelector("#unit");
  const out = root.querySelector("#out");
  const nowEl = root.querySelector("#now");

  let timer = null;
  const tick = () => { nowEl.textContent = Math.floor(Date.now() / 1000).toLocaleString(); };
  tick(); timer = setInterval(tick, 1000);

  const run = () => {
    const raw = ts.value.trim();
    if (!raw) return out.textContent = t("tool.noInput");
    let n = Number(raw);
    if (!Number.isFinite(n)) { out.textContent = "❌ invalid number"; return; }
    if (unit.value === "s") n *= 1000;
    const d = new Date(n);
    if (isNaN(d.getTime())) { out.textContent = "❌ out of range"; return; }
    const lang = document.documentElement.lang || "en";
    out.textContent = [
      `ISO     : ${d.toISOString()}`,
      `Local   : ${d.toLocaleString(lang)}`,
      `Date    : ${d.toLocaleDateString(lang)}`,
      `Time    : ${d.toLocaleTimeString(lang)}`,
      `UTC     : ${d.toUTCString()}`,
      `Relative: ${relTime(d, lang)}`
    ].join("\n");
  };

  function relTime(d, lang) {
    const diff = d.getTime() - Date.now();
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
    const mins = diff / 60000, hrs = diff / 3600000, days = diff / 86400000;
    if (Math.abs(days) >= 1) return rtf.format(Math.round(days), "day");
    if (Math.abs(hrs) >= 1) return rtf.format(Math.round(hrs), "hour");
    return rtf.format(Math.round(mins), "minute");
  }

  root.querySelector("#run").onclick = run;
  root.querySelector("#nowBtn").onclick = () => {
    ts.value = unit.value === "s" ? Math.floor(Date.now() / 1000) : Date.now();
    run();
  };
  root.querySelector("#copy").onclick = () => {
    if (!out.textContent) return;
    navigator.clipboard.writeText(out.textContent);
    toastSuccess(t("tool.copied"));
  };
  run();
}
