import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";

export function render(root) {
  root.innerHTML = `
    <div class="field"><label>${t("pc.type")}</label>
      <select id="type">
        <option value="of">X% of Y — ${t("pc.of")}</option>
        <option value="isWhat">X is what % of Y — ${t("pc.isWhat")}</option>
        <option value="change">% change — ${t("pc.change")}</option>
        <option value="addSub">X ± P% — ${t("pc.addSub")}</option>
      </select>
    </div>
    <div class="row">
      <div class="field"><label id="l1">X</label><input type="number" id="x" step="any"></div>
      <div class="field"><label id="l2">Y</label><input type="number" id="y" step="any"></div>
    </div>
    <div class="field"><label>${t("tool.result")}</label><div class="output" id="out" aria-live="polite"></div></div>
  `;
  const x = root.querySelector("#x"), y = root.querySelector("#y");
  const type = root.querySelector("#type");
  const out = root.querySelector("#out");
  const l1 = root.querySelector("#l1"), l2 = root.querySelector("#l2");

  const labels = {
    of:     ["X %", "Y"],
    isWhat: ["X", "Y"],
    change: ["Old", "New"],
    addSub: ["X", "P %"]
  };
  type.onchange = () => { const L = labels[type.value]; l1.textContent = L[0]; l2.textContent = L[1]; run(); };

  const fmt = (n) => Number.isFinite(n) ? (+n.toFixed(6)).toLocaleString() : "—";

  function run() {
    const a = parseFloat(x.value), b = parseFloat(y.value);
    if (!Number.isFinite(a) || !Number.isFinite(b)) { out.textContent = ""; return; }
    let r = "", extra = "";
    switch (type.value) {
      case "of": r = `${a}% × ${b} = ${fmt(a / 100 * b)}`; break;
      case "isWhat": {
        if (b === 0) { out.textContent = "❌ ÷ 0"; return; }
        r = `${a} ÷ ${b} = ${fmt(a / b * 100)}%`; break;
      }
      case "change": {
        if (a === 0) { out.textContent = "❌ ÷ 0"; return; }
        const p = (b - a) / Math.abs(a) * 100;
        r = `${fmt(a)} → ${fmt(b)} = ${p >= 0 ? "+" : ""}${fmt(p)}%`;
        extra = p >= 0 ? " ▲" : " ▼"; break;
      }
      case "addSub":
        r = `${fmt(a)} + ${a * b / 100} = ${fmt(a + a * b / 100)}\n${fmt(a)} − ${a * b / 100} = ${fmt(a - a * b / 100)}`; break;
    }
    out.textContent = r + extra;
  }
  [x, y].forEach(el => el.addEventListener("input", run));
}
