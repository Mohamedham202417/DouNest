import { t } from "../i18n.js";

export function render(root) {
  root.innerHTML = `
    <div class="row">
      <div class="field"><label>${t("bmi.height")} (cm)</label>
        <input type="number" id="h" min="50" max="260" step="any" placeholder="170">
      </div>
      <div class="field"><label>${t("bmi.weight")} (kg)</label>
        <input type="number" id="w" min="10" max="400" step="any" placeholder="70">
      </div>
    </div>
    <div class="field"><label>BMI</label>
      <div class="output" id="out" aria-live="polite"></div>
    </div>
    <div id="scale" style="margin-top:10px"></div>
  `;
  const h = root.querySelector("#h"), w = root.querySelector("#w");
  const out = root.querySelector("#out");
  const scale = root.querySelector("#scale");

  const cat = (bmi) => {
    if (bmi < 18.5) return t("bmi.under");
    if (bmi < 25) return t("bmi.normal");
    if (bmi < 30) return t("bmi.over");
    return t("bmi.obese");
  };

  function run() {
    const hh = parseFloat(h.value), ww = parseFloat(w.value);
    if (!hh || !ww) { out.textContent = ""; scale.innerHTML = ""; return; }
    const bmi = ww / Math.pow(hh / 100, 2);
    out.textContent = `${bmi.toFixed(1)} — ${cat(bmi)}`;
    const segs = [
      { up: 18.5, label: "<18.5", c: "#38bdf8" },
      { up: 25, label: "18.5–25", c: "#10b981" },
      { up: 30, label: "25–30", c: "#f59e0b" },
      { up: 40, label: "30+", c: "#ef4444" }
    ];
    const pos = Math.min(97, Math.max(2, (bmi / 40) * 100));
    scale.innerHTML = `
      <div style="display:flex;height:10px;border-radius:6px;overflow:hidden">
        ${segs.map(s => `<div style="flex:${s.up === 40 ? 10 : s.up};background:${s.c};opacity:.55"></div>`).join("")}
      </div>
      <div style="position:relative;height:16px;font-size:11px;color:var(--text-muted)">
        <div style="position:absolute;inset-inline-start:${pos}%;transform:translateX(-50%);font-weight:800;color:var(--text)">▲ ${bmi.toFixed(1)}</div>
      </div>`;
  }
  h.addEventListener("input", run);
  w.addEventListener("input", run);
}
