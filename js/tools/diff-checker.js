import { t } from "../i18n.js";

export function render(root) {
  root.innerHTML = `
    <div class="field"><label>Original</label><textarea id="a"></textarea></div>
    <div class="field"><label>Modified</label><textarea id="b"></textarea></div>
    <div class="row">
      <button class="btn btn-primary" id="run">${t("tool.run")}</button>
      <button class="btn btn-ghost" id="clear">${t("tool.clear")}</button>
    </div>
    <div class="field" style="margin-top:14px">
      <label>${t("tool.output")}</label>
      <div class="output" id="out" style="font-family:monospace"></div>
    </div>
  `;
  root.querySelector("#run").onclick = () => {
    const a = root.querySelector("#a").value.split("\n");
    const b = root.querySelector("#b").value.split("\n");
    const max = Math.max(a.length, b.length);
    let html = "";
    for (let i = 0; i < max; i++) {
      const la = a[i] ?? "";
      const lb = b[i] ?? "";
      if (la === lb) html += `<div>  ${escapeHtml(la)}</div>`;
      else if (!la) html += `<div style="background:rgba(16,185,129,.15)">+ ${escapeHtml(lb)}</div>`;
      else if (!lb) html += `<div style="background:rgba(239,68,68,.15)">- ${escapeHtml(la)}</div>`;
      else html += `<div style="background:rgba(239,68,68,.15)">- ${escapeHtml(la)}</div>
                    <div style="background:rgba(16,185,129,.15)">+ ${escapeHtml(lb)}</div>`;
    }
    root.querySelector("#out").innerHTML = html || "(identical)";
  };
  root.querySelector("#clear").onclick = () => {
    root.querySelector("#a").value = "";
    root.querySelector("#b").value = "";
    root.querySelector("#out").innerHTML = "";
  };
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
