import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";

export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>CSV</label>
      <textarea id="in" placeholder="name,age\nAli,25\nSara,30"></textarea>
    </div>
    <div class="row">
      <button class="btn btn-primary" id="run">${t("tool.run")}</button>
      <button class="btn" id="copy">${t("tool.copy")}</button>
      <button class="btn" id="download">${t("tool.download")}</button>
    </div>
    <div class="field" style="margin-top:14px">
      <label>${t("tool.output")}</label>
      <div class="output" id="out" aria-live="polite"></div>
    </div>
  `;
  const out = root.querySelector("#out");
  root.querySelector("#run").onclick = () => {
    try {
      const csv = root.querySelector("#in").value.trim();
      if (!csv) return toastError(t("tool.noInput"));
      const lines = csv.split("\n").filter(Boolean);
      const headers = lines[0].split(",").map(h => h.trim());
      const rows = lines.slice(1).map(line => {
        const vals = line.split(",").map(v => v.trim());
        const obj = {};
        headers.forEach((h, i) => obj[h] = vals[i] || "");
        return obj;
      });
      out.textContent = JSON.stringify(rows, null, 2);
    } catch (e) { toastError(t("tool.error")); }
  };
  root.querySelector("#copy").onclick = () => {
    if (!out.textContent) return;
    navigator.clipboard.writeText(out.textContent);
    toastSuccess(t("tool.copied"));
  };
  root.querySelector("#download").onclick = () => {
    if (!out.textContent) return;
    const blob = new Blob([out.textContent], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };
}
