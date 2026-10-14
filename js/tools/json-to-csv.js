import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { downloadBlob } from "../util.js";

export function render(root) {
  root.innerHTML = `
    <div class="field"><label>JSON (array of objects)</label>
      <textarea id="in" placeholder='[{"name":"Ali","age":30},{"name":"Sara","age":25}]'>[{"name":"Ali","age":30},{"name":"Sara","age":25}]</textarea>
    </div>
    <div class="row">
      <button class="btn btn-primary" id="run">${t("tool.run")}</button>
      <button class="btn" id="copy">${t("tool.copy")}</button>
      <button class="btn" id="download">${t("tool.download")}</button>
      <button class="btn" id="clear">${t("tool.clear")}</button>
    </div>
    <div class="field" style="margin-top:10px"><label>CSV</label>
      <div class="output" id="out" aria-live="polite"></div>
    </div>
  `;
  const input = root.querySelector("#in");
  const out = root.querySelector("#out");
  let csv = "";

  const cell = (v) => {
    if (v === null || v === undefined) return "";
    const s = typeof v === "object" ? JSON.stringify(v) : String(v);
    return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  root.querySelector("#run").onclick = () => {
    try {
      const data = JSON.parse(input.value);
      if (!Array.isArray(data) || !data.length) throw new Error("expected non-empty array of objects");
      if (typeof data[0] !== "object") throw new Error("array items must be objects");
      const cols = [...data.reduce((set, row) => { Object.keys(row).forEach(k => set.add(k)); return set; }, new Set())];
      csv = [
        cols.join(","),
        ...data.map(row => cols.map(c => cell(row[c])).join(","))
      ].join("\n");
      out.textContent = csv;
      toastSuccess(t("tool.result") + " ✓");
    } catch (e) { out.textContent = "❌ " + e.message; toastError(e.message); }
  };
  root.querySelector("#copy").onclick = () => {
    if (!csv) return;
    navigator.clipboard.writeText(csv); toastSuccess(t("tool.copied"));
  };
  root.querySelector("#download").onclick = () => {
    if (!csv) return;
    downloadBlob(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }), "data.csv");
  };
  root.querySelector("#clear").onclick = () => { input.value = ""; out.textContent = ""; csv = ""; };
}
