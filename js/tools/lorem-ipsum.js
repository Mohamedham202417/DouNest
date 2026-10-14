import { t } from "../i18n.js";
import { toastSuccess } from "../toast.js";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ");

export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>Paragraphs</label>
      <input type="number" id="n" value="3" min="1" max="50">
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
  const rnd = (n) => Array.from({length: n}, () => WORDS[Math.floor(Math.random()*WORDS.length)]).join(" ");
  const sentence = () => rnd(6 + Math.floor(Math.random()*8)).replace(/^./, c => c.toUpperCase()) + ".";
  const paragraph = () => Array.from({length: 4 + Math.floor(Math.random()*3)}, sentence).join(" ");

  const run = () => {
    const n = Math.min(50, Math.max(1, +root.querySelector("#n").value || 1));
    out.textContent = Array.from({length: n}, paragraph).join("\n\n");
  };
  root.querySelector("#run").onclick = run;
  root.querySelector("#copy").onclick = () => {
    if (!out.textContent) return;
    navigator.clipboard.writeText(out.textContent);
    toastSuccess(t("tool.copied"));
  };
  run();
}
