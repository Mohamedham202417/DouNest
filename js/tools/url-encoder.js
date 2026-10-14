import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";

export function render(root) {
  root.innerHTML = `
    <div class="field"><label>${t("tool.input")}</label><textarea id="in"></textarea></div>
    <div class="row">
      <button class="btn btn-primary" id="enc">Encode</button>
      <button class="btn" id="dec">Decode</button>
      <button class="btn btn-ghost" id="clear">${t("tool.clear")}</button>
    </div>
    <div class="field" style="margin-top:14px">
      <label>${t("tool.output")}</label>
      <div class="output" id="out" aria-live="polite"></div>
    </div>
    <div class="row" style="margin-top:8px">
      <button class="btn" id="copy">${t("tool.copy")}</button>
    </div>
  `;
  const input = root.querySelector("#in");
  const out = root.querySelector("#out");

  root.querySelector("#enc").onclick = () => {
    try { out.textContent = encodeURIComponent(input.value); }
    catch (e) { toastError(t("tool.error")); }
  };
  root.querySelector("#dec").onclick = () => {
    try { out.textContent = decodeURIComponent(input.value); }
    catch (e) { out.textContent = "❌ " + t("tool.error"); toastError(t("tool.error")); }
  };
  root.querySelector("#clear").onclick = () => { input.value=""; out.textContent=""; };
  root.querySelector("#copy").onclick = () => {
    if (!out.textContent) return;
    navigator.clipboard.writeText(out.textContent);
    toastSuccess(t("tool.copied"));
  };
}