import { t } from "../i18n.js";

export function render(root) {
  root.innerHTML = `
    <div class="field"><label>${t("tool.input")}</label><textarea id="in"></textarea></div>
    <div class="row" id="stats" style="gap:16px;font-weight:600"></div>
  `;
  const input = root.querySelector("#in");
  const stats = root.querySelector("#stats");
  const update = () => {
    const v = input.value;
    const words = v.trim() ? v.trim().split(/\s+/).length : 0;
    const chars = v.length;
    const charsNS = v.replace(/\s/g,"").length;
    const lines = v ? v.split(/\n/).length : 0;
    stats.innerHTML = `
      <span>Words: ${words}</span>
      <span>Chars: ${chars}</span>
      <span>No spaces: ${charsNS}</span>
      <span>Lines: ${lines}</span>
    `;
  };
  input.oninput = update;
  update();
}