import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";

export function render(root) {
  root.innerHTML = `
    <div class="field"><label>JWT</label><textarea id="in" placeholder="eyJhbGciOi..."></textarea></div>
    <div class="row">
      <button class="btn btn-primary" id="run">${t("tool.run")}</button>
      <button class="btn btn-ghost" id="clear">${t("tool.clear")}</button>
    </div>
    <div class="field" style="margin-top:14px">
      <label>Header</label>
      <div class="output" id="h" aria-live="polite"></div>
    </div>
    <div class="field">
      <label>Payload</label>
      <div class="output" id="p" aria-live="polite"></div>
    </div>
    <div class="field">
      <label>Signature</label>
      <div class="output" id="s" style="color:var(--text-muted)"></div>
    </div>
  `;
  const input = root.querySelector("#in");

  const b64u = (s) => {
    s = s.replace(/-/g,"+").replace(/_/g,"/");
    while (s.length % 4) s += "=";
    return decodeURIComponent(escape(atob(s)));
  };

  root.querySelector("#run").onclick = () => {
    try {
      const parts = input.value.trim().split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT");
      const h = JSON.parse(b64u(parts[0]));
      const p = JSON.parse(b64u(parts[1]));
      root.querySelector("#h").textContent = JSON.stringify(h, null, 2);
      root.querySelector("#p").textContent = JSON.stringify(p, null, 2);
      root.querySelector("#s").textContent = parts[2];
    } catch (e) {
      root.querySelector("#h").textContent = "❌ " + e.message;
      root.querySelector("#p").textContent = "";
      root.querySelector("#s").textContent = "";
      toastError(e.message);
    }
  };
  root.querySelector("#clear").onclick = () => {
    input.value = "";
    ["#h","#p","#s"].forEach(s => root.querySelector(s).textContent = "");
  };
}