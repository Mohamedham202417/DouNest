import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";

export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>PDF</label>
      <input type="file" id="file" accept="application/pdf">
    </div>
    <div class="row">
      <button class="btn btn-primary" id="run" disabled>${t("tool.run")}</button>
      <button class="btn" id="copy">${t("tool.copy")}</button>
      <button class="btn" id="download">${t("tool.download")}</button>
    </div>
    <div class="field" style="margin-top:14px">
      <label>${t("tool.output")}</label>
      <div class="output" id="out" aria-live="polite"></div>
    </div>
  `;
  const input = root.querySelector("#file");
  const out = root.querySelector("#out");
  const run = root.querySelector("#run");

  input.onchange = () => { run.disabled = !input.files[0]; };

  run.onclick = async () => {
    const file = input.files[0];
    if (!file) return toastError(t("tool.noInput"));
    out.textContent = "⏳ …";
    try {
      // تحميل pdf.js من CDN عند الحاجة فقط
      const pdfjs = await import("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.min.mjs");
      pdfjs.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.min.mjs";
      const buf = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: buf }).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(it => it.str).join(" ") + "\n\n";
      }
      out.textContent = text.trim() || "(no text found)";
    } catch (e) {
      out.textContent = "❌ " + e.message;
      toastError(t("tool.error"));
    }
  };
  root.querySelector("#copy").onclick = () => {
    if (!out.textContent) return;
    navigator.clipboard.writeText(out.textContent);
    toastSuccess(t("tool.copied"));
  };
  root.querySelector("#download").onclick = () => {
    if (!out.textContent) return;
    const blob = new Blob([out.textContent], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "extracted.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };
}
