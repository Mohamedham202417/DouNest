import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";

export function render(root) {
  root.innerHTML = `
    <div class="field"><label>${t("tool.input")}</label><textarea id="in"></textarea></div>
    <div class="field">
      <label>Algorithm</label>
      <select id="algo">
        <option value="SHA-1">SHA-1</option>
        <option value="SHA-256" selected>SHA-256</option>
        <option value="SHA-512">SHA-512</option>
      </select>
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
  const input = root.querySelector("#in");
  const out = root.querySelector("#out");

  root.querySelector("#run").onclick = async () => {
    try {
      const algo = root.querySelector("#algo").value;
      const data = new TextEncoder().encode(input.value);
      const buf = await crypto.subtle.digest(algo, data);
      const hex = [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,"0")).join("");
      out.textContent = hex;
    } catch (e) { toastError(t("tool.error")); }
  };
  root.querySelector("#copy").onclick = () => {
    if (!out.textContent) return;
    navigator.clipboard.writeText(out.textContent);
    toastSuccess(t("tool.copied"));
  };
}