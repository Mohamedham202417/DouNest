import { t } from "../i18n.js";

const UNITS = {
  length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254 },
  weight: { kg: 1, g: 0.001, mg: 1e-6, lb: 0.453592, oz: 0.0283495, t: 1000 },
  volume: { l: 1, ml: 0.001, gal: 3.78541, qt: 0.946353, pt: 0.473176, cup: 0.236588 },
  temp: { C: "C", F: "F", K: "K" }
};

export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>Category</label>
      <select id="cat">
        <option value="length">Length</option>
        <option value="weight">Weight</option>
        <option value="volume">Volume</option>
        <option value="temp">Temperature</option>
      </select>
    </div>
    <div class="field">
      <label>${t("tool.input")}</label>
      <div class="row" style="gap:8px">
        <input type="number" id="val" value="1" style="flex:1">
        <select id="from" style="flex:1"></select>
        <span style="padding:0 6px">→</span>
        <select id="to" style="flex:1"></select>
      </div>
    </div>
    <div class="field">
      <label>${t("tool.output")}</label>
      <div class="output" id="out" aria-live="polite"></div>
    </div>
  `;
  const cat = root.querySelector("#cat");
  const from = root.querySelector("#from");
  const to = root.querySelector("#to");
  const out = root.querySelector("#out");

  const fill = () => {
    const list = Object.keys(UNITS[cat.value] || {});
    from.innerHTML = list.map(u => `<option>${u}</option>`).join("");
    to.innerHTML = list.map(u => `<option>${u}</option>`).join("");
    to.selectedIndex = Math.min(1, list.length - 1);
    convert();
  };
  const convert = () => {
    const c = cat.value;
    const v = parseFloat(root.querySelector("#val").value) || 0;
    if (c === "temp") {
      const f = from.value, t2 = to.value;
      let celsius = v;
      if (f === "F") celsius = (v - 32) * 5/9;
      if (f === "K") celsius = v - 273.15;
      let result = celsius;
      if (t2 === "F") result = celsius * 9/5 + 32;
      if (t2 === "K") result = celsius + 273.15;
      out.textContent = `${result.toFixed(2)} ${t2}`;
    } else {
      const base = v * (UNITS[c][from.value] || 1);
      const result = base / (UNITS[c][to.value] || 1);
      out.textContent = `${result.toFixed(4)} ${to.value}`;
    }
  };
  cat.onchange = fill;
  from.onchange = convert;
  to.onchange = convert;
  root.querySelector("#val").oninput = convert;
  fill();
}
