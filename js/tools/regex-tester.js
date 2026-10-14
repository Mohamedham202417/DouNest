import { t } from "../i18n.js";

export function render(root) {
  root.innerHTML = `
    <div class="field"><label>Pattern</label><input type="text" id="pat" value="\\w+"></div>
    <div class="field"><label>Flags</label><input type="text" id="flags" value="g"></div>
    <div class="field"><label>${t("tool.input")}</label><textarea id="in"></textarea></div>
    <div class="row">
      <button class="btn btn-primary" id="run">${t("tool.run")}</button>
    </div>
    <div class="field" style="margin-top:14px">
      <label>${t("tool.output")}</label>
      <div class="output" id="out" aria-live="polite"></div>
    </div>
  `;
  root.querySelector("#run").onclick = () => {
    try {
      const re = new RegExp(root.querySelector("#pat").value, root.querySelector("#flags").value);
      const text = root.querySelector("#in").value;
      const matches = [...text.matchAll(re)];
      root.querySelector("#out").innerHTML = matches.length
        ? matches.map((m, i) => `<div>#${i+1}: <strong>${escapeHtml(m[0])}</strong> @ ${m.index}</div>`).join("")
        : "(no matches)";
    } catch (e) {
      root.querySelector("#out").textContent = "❌ " + e.message;
    }
  };
}
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
