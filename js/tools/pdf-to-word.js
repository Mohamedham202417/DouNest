import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadEsm, downloadBlob } from "../util.js";

/**
 * PDF → Word (.doc): extracts text with pdf.js and wraps it into a
 * Word-compatible HTML document. 100% local processing.
 */
export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>PDF</label>
      <input type="file" id="file" accept="application/pdf">
    </div>
    <div class="row">
      <button class="btn btn-primary" id="run" disabled>${t("tool.run")}</button>
      <button class="btn" id="download" disabled>${t("pdfw.downloadDoc")}</button>
    </div>
    <div class="field" style="margin-top:10px"><label>${t("tool.output")}</label>
      <div class="output" id="out" aria-live="polite"></div>
    </div>
  `;
  const file = root.querySelector("#file");
  const run = root.querySelector("#run");
  const dl = root.querySelector("#download");
  const out = root.querySelector("#out");
  let text = "";

  file.onchange = () => { run.disabled = !file.files[0]; };

  run.onclick = async () => {
    const f = file.files[0];
    if (!f) return toastError(t("tool.noInput"));
    out.textContent = "⏳ …";
    try {
      const pdfjs = await loadEsm("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.min.mjs");
      pdfjs.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.min.mjs";
      const pdf = await pdfjs.getDocument({ data: await f.arrayBuffer() }).promise;
      text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(it => it.str).join(" ") + "\n\n";
      }
      text = text.trim();
      out.textContent = text || "(no text found)";
      dl.disabled = !text;
      toastSuccess(t("tool.result") + " ✓");
    } catch (e) {
      out.textContent = "❌ " + e.message;
      toastError(t("tool.error"));
    }
  };

  dl.onclick = () => {
    if (!text) return;
    const esc = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="utf-8"><title>Document</title></head>
<body dir="auto">${esc.split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("")}</body></html>`;
    downloadBlob(new Blob(["\uFEFF" + html], { type: "application/msword" }), "document.doc");
  };
}
