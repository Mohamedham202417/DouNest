import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadScript, loadEsm, formatBytes, downloadBlob } from "../util.js";

/** PDF → JPG images via pdf.js (2x scale, adjustable quality). Batch → ZIP. */
export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>${t("p2j.pick")}</label>
      <input type="file" id="file" accept="application/pdf">
    </div>
    <div class="row wrap" style="gap:10px">
      <div class="field" style="min-width:150px">
        <label>${t("p2j.quality")}: <span id="qv">90%</span></label>
        <input type="range" id="q" min="0.5" max="1" step="0.05" value="0.9">
      </div>
      <div class="field" style="align-self:flex-end">
        <button class="btn btn-primary" id="run" disabled>${t("p2j.run")}</button>
      </div>
    </div>
    <div id="status" style="color:var(--text-muted);font-size:13px;margin:8px 0"></div>
    <div id="thumbs" class="thumb-grid" style="margin-top:10px"></div>
    <div class="row" id="dlAllWrap" style="display:none;margin-top:10px">
      <button class="btn btn-primary" id="dlAll">${t("tool.download")} ZIP</button>
    </div>
  `;
  const file = root.querySelector("#file");
  const run = root.querySelector("#run");
  const q = root.querySelector("#q");
  const qv = root.querySelector("#qv");
  const status = root.querySelector("#status");
  const thumbs = root.querySelector("#thumbs");
  const dlAllWrap = root.querySelector("#dlAllWrap");
  let results = [];

  file.onchange = () => { run.disabled = !file.files[0]; };
  q.oninput = () => { qv.textContent = Math.round(q.value * 100) + "%"; };

  run.onclick = async () => {
    const f = file.files[0];
    if (!f) return toastError(t("tool.noInput"));
    run.disabled = true;
    thumbs.innerHTML = "";
    results = [];
    dlAllWrap.style.display = "none";
    try {
      await loadScript("https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js");
      const pdfjs = window.pdfjsLib;
      pdfjs.GlobalWorkerOptions.workerSrc =
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
      const pdf = await pdfjs.getDocument({ data: await f.arrayBuffer() }).promise;
      const quality = +q.value;
      for (let i = 1; i <= pdf.numPages; i++) {
        status.textContent = `⚙️ ${i}/${pdf.numPages}`;
        const page = await pdf.getPage(i);
        const vp1 = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: Math.min(2, 2200 / vp1.width) });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
        const blob = await new Promise(r => canvas.toBlob(r, "image/jpeg", quality));
        results.push({ name: `page-${i}.jpg`, blob });
        const url = URL.createObjectURL(blob);
        const d = document.createElement("div");
        d.className = "thumb";
        d.innerHTML = `<img src="${url}" alt=""><span>${i}</span>`;
        d.onclick = () => downloadBlob(blob, `page-${i}.jpg`);
        thumbs.appendChild(d);
      }
      status.textContent = `✓ ${results.length} JPG`;
      if (results.length === 1) downloadBlob(results[0].blob, "page-1.jpg");
      else dlAllWrap.style.display = "flex";
      toastSuccess(t("tool.result") + " ✓");
    } catch (e) {
      status.textContent = "❌ " + (e?.message || e);
      toastError(t("tool.error"));
    } finally {
      run.disabled = false;
    }
  };

  dlAllWrap.querySelector("#dlAll").onclick = async () => {
    status.textContent = "⏳ JSZip …";
    const { default: JSZip } = await loadEsm("https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm");
    const zip = new JSZip();
    results.forEach(r => zip.file(r.name, r.blob));
    const out = await zip.generateAsync({ type: "blob" });
    downloadBlob(out, "pdf-to-jpg.zip");
    status.textContent = `✓ ZIP — ${formatBytes(out.size)}`;
  };
}
