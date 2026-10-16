import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadEsm, formatBytes, downloadBlob } from "../util.js";

/**
 * Compress PDF by rasterizing pages with pdf.js at a chosen scale
 * and rebuilding the document as JPEG-based PDF via pdf-lib.
 * Fully local: pages are rendered on canvas in your browser.
 */
export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>PDF</label>
      <input type="file" id="file" accept="application/pdf">
    </div>
    <p class="operation-note" role="note">${t("pdfc.warning")}</p>
    <div class="row">
      <div class="field"><label>${t("pdfc.level")}</label>
        <select id="scale">
          <option value="1.5">${t("pdfc.high")}</option>
          <option value="1.1" selected>${t("pdfc.balanced")}</option>
          <option value="0.8">${t("pdfc.strong")}</option>
        </select>
      </div>
      <div class="field"><label>Quality: <span id="qv">0.7</span></label>
        <input type="range" id="q" min="0.3" max="0.95" step="0.05" value="0.7">
      </div>
    </div>
    <div class="row">
      <button class="btn btn-primary" id="run" disabled>${t("tool.run")}</button>
      <button class="btn" id="download" disabled>${t("tool.download")}</button>
    </div>
    <div id="status" role="status" aria-live="polite" style="color:var(--text-muted);font-size:13px;margin-top:8px"></div>
  `;
  const file = root.querySelector("#file");
  const scaleSel = root.querySelector("#scale");
  const q = root.querySelector("#q"), qv = root.querySelector("#qv");
  const run = root.querySelector("#run"), dl = root.querySelector("#download");
  const status = root.querySelector("#status");
  let outBytes = null;

  q.oninput = () => { qv.textContent = (+q.value).toFixed(2); };
  file.onchange = () => { run.disabled = !file.files[0]; };

  const CDNP = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/";

  run.onclick = async () => {
    const f = file.files[0];
    if (!f) return toastError(t("tool.noInput"));
    status.textContent = "⏳ …";
    try {
      const pdfjs = await loadEsm(CDNP + "pdf.min.mjs");
      pdfjs.GlobalWorkerOptions.workerSrc = CDNP + "pdf.worker.min.mjs";
      const { PDFDocument } = await loadEsm("https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.esm.min.js");

      const pdf = await pdfjs.getDocument({ data: await f.arrayBuffer() }).promise;
      const outDoc = await PDFDocument.create();
      const scale = +scaleSel.value, quality = +q.value;

      for (let i = 1; i <= pdf.numPages; i++) {
        status.textContent = `⏳ ${i} / ${pdf.numPages} …`;
        const page = await pdf.getPage(i);
        const vp = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(vp.width);
        canvas.height = Math.ceil(vp.height);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        const img = await outDoc.embedJpg(dataUrl);
        const p = outDoc.addPage([img.width, img.height]);
        p.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      outBytes = await outDoc.save({ useObjectStreams: false });
      const delta = f.size - outBytes.length;
      const change = Math.round(Math.abs(delta) / Math.max(1, f.size) * 100);
      const sizeNote = delta > 0 ? `${change}% ${t("pdfc.smaller")}` : delta < 0 ? `${change}% ${t("pdfc.larger")}` : t("pdfc.same");
      status.textContent = `✓ ${formatBytes(f.size)} → ${formatBytes(outBytes.length)} (${sizeNote})`;
      dl.disabled = false;
      toastSuccess(t("tool.result") + " ✓");
    } catch (e) {
      status.textContent = "❌ " + (e?.message || "error");
      toastError(t("tool.error"));
    }
  };

  dl.onclick = () => {
    if (!outBytes) return;
    downloadBlob(new Blob([outBytes], { type: "application/pdf" }), "compressed.pdf");
  };
}
