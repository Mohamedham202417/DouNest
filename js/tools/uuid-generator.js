import { t } from "../i18n.js";
import { toastSuccess } from "../toast.js";

export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>Count</label>
      <input type="number" id="n" value="5" min="1" max="100">
    </div>
    <div class="row">
      <button class="btn btn-primary" id="run">${t("tool.run")}</button>
      <button class="btn" id="copy">${t("tool.copy")}</button>
    </div>
    <div class="field" style="margin-top:14px">
      <label>${t("tool.output")}</label>
      <div class="output" id="out" aria-live="polite"></div>
    </div>
  `;
  const out = root.querySelector("#out");
  root.querySelector("#run").onclick = () => {
    const n = Math.min(100, Math.max(1, +root.querySelector("#n").value || 1));
    out.textContent = Array.from({length:n}, () => crypto.randomUUID()).join("\n");
  };
  root.querySelector("#copy").onclick = () => {
    if (!out.textContent) return;
    navigator.clipboard.writeText(out.textContent);
    toastSuccess(t("tool.copied"));
  };
  root.querySelector("#run").click();
}