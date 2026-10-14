import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";

export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label for="in">JSON</label>
      <textarea id="in" placeholder='{"hello": "world"}'></textarea>
    </div>
    <div class="row">
      <button class="btn btn-primary" id="beautify">${t("tool.run")} — Beautify</button>
      <button class="btn" id="minify">Minify</button>
      <button class="btn btn-ghost" id="clear">${t("tool.clear")}</button>
    </div>
    <div class="field" style="margin-top:14px">
      <label>${t("tool.output")}</label>
      <div class="output" id="out" aria-live="polite"></div>
    </div>
    <div class="row" style="margin-top:8px">
      <button class="btn" id="copy">${t("tool.copy")}</button>
      <button class="btn" id="download">${t("tool.download")}</button>
    </div>
  `;
  const input = root.querySelector("#in");
  const out = root.querySelector("#out");

  const run = (mode) => {
    try {
      if (!input.value.trim()) return toastError(t("tool.noInput"));
      const obj = JSON.parse(input.value);
      out.textContent = mode === "min"
        ? JSON.stringify(obj)
        : JSON.stringify(obj, null, 2);
    } catch (e) {
      out.textContent = "❌ " + e.message;
      toastError(e.message);
    }
  };
  root.querySelector("#beautify").onclick = () => run("pretty");
  root.querySelector("#minify").onclick = () => run("min");
  root.querySelector("#clear").onclick = () => { input.value = ""; out.textContent = ""; };
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
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };
}