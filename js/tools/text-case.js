import { t } from "../i18n.js";
import { toastSuccess } from "../toast.js";

export function render(root) {
  root.innerHTML = `
    <div class="field"><label>${t("tool.input")}</label><textarea id="in"></textarea></div>
    <div class="row">
      <button class="btn" data-case="upper">UPPER</button>
      <button class="btn" data-case="lower">lower</button>
      <button class="btn" data-case="title">Title</button>
      <button class="btn" data-case="sentence">Sentence</button>
      <button class="btn" data-case="camel">camelCase</button>
      <button class="btn" data-case="kebab">kebab-case</button>
      <button class="btn" data-case="snake">snake_case</button>
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
  const fns = {
    upper: s => s.toUpperCase(),
    lower: s => s.toLowerCase(),
    title: s => s.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()),
    sentence: s => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()),
    camel: s => s.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, c) => c.toUpperCase()),
    kebab: s => s.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),
    snake: s => s.trim().toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"")
  };
  root.querySelectorAll("[data-case]").forEach(btn => {
    btn.onclick = () => { out.textContent = fns[btn.dataset.case](input.value); };
  });
  root.querySelector("#copy").onclick = () => {
    if (!out.textContent) return;
    navigator.clipboard.writeText(out.textContent);
    toastSuccess(t("tool.copied"));
  };
}