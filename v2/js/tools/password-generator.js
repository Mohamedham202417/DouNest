import { t } from "../i18n.js";
import { toastSuccess } from "../toast.js";

export function render(root) {
  root.innerHTML = `
    <div class="field"><label>Length: <span id="lenv">16</span></label>
      <input type="range" id="len" min="6" max="64" value="16">
    </div>
    <div class="row">
      <label><input type="checkbox" id="upper" checked> A-Z</label>
      <label><input type="checkbox" id="lower" checked> a-z</label>
      <label><input type="checkbox" id="digits" checked> 0-9</label>
      <label><input type="checkbox" id="symbols" checked> !@#</label>
    </div>
    <div class="row" style="margin-top:12px">
      <button class="btn btn-primary" id="run">${t("tool.run")}</button>
      <button class="btn" id="copy">${t("tool.copy")}</button>
    </div>
    <div class="field" style="margin-top:14px">
      <label>${t("tool.output")}</label>
      <div class="output" id="out" aria-live="polite"></div>
    </div>
  `;
  const len = root.querySelector("#len");
  const lenv = root.querySelector("#lenv");
  const out = root.querySelector("#out");
  len.oninput = () => lenv.textContent = len.value;

  const run = () => {
    let chars = "";
    if (root.querySelector("#upper").checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (root.querySelector("#lower").checked) chars += "abcdefghijklmnopqrstuvwxyz";
    if (root.querySelector("#digits").checked) chars += "0123456789";
    if (root.querySelector("#symbols").checked) chars += "!@#$%^&*()-_=+[]{};:,.?";
    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";
    const n = +len.value;
    const arr = new Uint32Array(n);
    crypto.getRandomValues(arr);
    out.textContent = Array.from(arr, v => chars[v % chars.length]).join("");
  };
  root.querySelector("#run").onclick = run;
  root.querySelector("#copy").onclick = () => {
    if (!out.textContent) return;
    navigator.clipboard.writeText(out.textContent);
    toastSuccess(t("tool.copied"));
  };
  run();
}