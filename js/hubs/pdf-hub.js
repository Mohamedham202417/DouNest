/**
 * DouNest v4 — PDF Hub (/pdf/)
 * -----------------------------
 * Upload once, run any operation with one click — 100% local:
 *   compress · merge · split · rotate · PDF→JPG · PDF→TXT · PDF→Word · images→PDF
 * Same contract as tool modules: export render(root).
 */
import { t, getLang } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadEsm, formatBytes, downloadBlob } from "../util.js";

const PDFJS = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/";
const PDFLIB = "https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.esm.min.js";
const JSZIP = "https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm";

const AR = getLang() === "ar";
const L = {
  drop: AR ? "اسحب ملفات PDF أو صور هنا — أو اضغط للاختيار" : "Drop PDF files or images here — or click to browse",
  files: AR ? "الملفات المرفوعة" : "Loaded files",
  actions: AR ? "العمليات المتاحة — بضغطة زر" : "Available actions — one click each",
  ready: AR ? "جاهز — اختر عملية" : "Ready — pick an action",
  clear: AR ? "تفريغ الكل" : "Clear all",
  needPdf: AR ? "أضف ملف PDF أولاً" : "Add a PDF file first",
  needTwo: AR ? "هذه العملية تحتاج ملفين PDF على الأقل" : "This action needs at least two PDFs",
  needImg: AR ? "أضف صوراً أولاً" : "Add images first",
  compress: AR ? "ضغط" : "Compress",
  merge: AR ? "دمج الكل" : "Merge all",
  split: AR ? "تقسيم (كل صفحة ملف)" : "Split (page per file)",
  rotate: AR ? "تدوير 90°" : "Rotate 90°",
  tojpg: AR ? "إلى JPG" : "To JPG",
  totxt: AR ? "إلى TXT" : "To TXT",
  toword: AR ? "إلى Word" : "To Word",
  img2pdf: AR ? "صور → PDF" : "Images → PDF",
  quality: AR ? "الجودة" : "Quality",
  done: AR ? "تم التنفيذ ✓" : "Done ✓"
};

export function render(root) {
  root.innerHTML = `
    <div class="hub-drop" id="pdf-drop" role="button" tabindex="0" aria-label="${L.drop}">
      <span class="hub-drop-icon" aria-hidden="true">📥</span>
      <p>${L.drop}</p>
      <input type="file" id="pdf-input" multiple accept="application/pdf,image/png,image/jpeg,image/webp" hidden>
    </div>

    <div class="hub-files" id="pdf-files" hidden>
      <h3>${L.files} <button class="btn btn-ghost btn-sm" id="pdf-clear">${L.clear}</button></h3>
      <ul class="hub-filelist" id="pdf-list"></ul>
    </div>

    <div class="hub-actions" id="pdf-actions" hidden>
      <h3>${L.actions}</h3>
      <div class="hub-quality" id="pdf-qwrap" hidden>
        <label>${L.quality}: <span id="pdf-qv">0.7</span></label>
        <input type="range" id="pdf-q" min="0.3" max="0.95" step="0.05" value="0.7">
      </div>
      <div class="action-grid" id="pdf-grid"></div>
    </div>

    <div class="hub-status" id="pdf-status" aria-live="polite">${L.ready}</div>
  `;

  const drop = root.querySelector("#pdf-drop");
  const input = root.querySelector("#pdf-input");
  const filesWrap = root.querySelector("#pdf-files");
  const list = root.querySelector("#pdf-list");
  const actionsWrap = root.querySelector("#pdf-actions");
  const grid = root.querySelector("#pdf-grid");
  const status = root.querySelector("#pdf-status");
  const qWrap = root.querySelector("#pdf-qwrap");
  const q = root.querySelector("#pdf-q"), qv = root.querySelector("#pdf-qv");
  let files = [];

  q.oninput = () => { qv.textContent = (+q.value).toFixed(2); };

  const openPicker = () => input.click();
  drop.onclick = openPicker;
  drop.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPicker(); } };
  ["dragover", "dragenter"].forEach(ev => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add("drag"); }));
  ["dragleave", "drop"].forEach(ev => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove("drag"); }));
  drop.addEventListener("drop", (e) => addFiles([...e.dataTransfer.files]));
  input.onchange = () => { addFiles([...input.files]); input.value = ""; };

  root.querySelector("#pdf-clear").onclick = () => { files = []; refresh(); };

  function addFiles(more) {
    files = [...files, ...more];
    refresh();
  }

  function refresh() {
    filesWrap.hidden = !files.length;
    actionsWrap.hidden = !files.length;
    list.innerHTML = files.map((f, i) => `
      <li>
        <span class="hub-file-name">${f.name} — ${formatBytes(f.size)}</span>
        <button class="btn btn-ghost btn-sm" data-rm="${i}" aria-label="remove">×</button>
      </li>`).join("");
    list.querySelectorAll("[data-rm]").forEach(b => {
      b.onclick = () => { files.splice(+b.dataset.rm, 1); refresh(); };
    });
    renderActions();
  }

  function renderActions() {
    const pdfs = files.filter(f => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"));
    const imgs = files.filter(f => f.type.startsWith("image/"));
    const acts = [];
    if (pdfs.length === 1) {
      acts.push(["compress", L.compress, "🗜️"], ["split", L.split, "✂️"], ["rotate", L.rotate, "🔄"],
        ["tojpg", L.tojpg, "🖼️"], ["totxt", L.totxt, "📝"], ["toword", L.toword, "📄"]);
    }
    if (pdfs.length >= 2) acts.unshift(["merge", L.merge, "🔗"]);
    if (imgs.length) acts.push(["img2pdf", L.img2pdf, "📸"]);
    grid.innerHTML = acts.map(([id, label, icon]) =>
      `<button class="btn btn-primary hub-act" data-act="${id}">${icon} ${label}</button>`).join("");
    qWrap.hidden = !acts.some(([id]) => id === "compress" || id === "tojpg");
    grid.querySelectorAll("[data-act]").forEach(b => {
      b.onclick = () => run(b.dataset.act, pdfs, imgs);
    });
    if (!acts.length) status.textContent = AR ? "أضف ملفات لعرض العمليات" : "Add files to see actions";
  }

  async function loadLibs() {
    const pdfjs = await loadEsm(PDFJS + "pdf.min.mjs");
    pdfjs.GlobalWorkerOptions.workerSrc = PDFJS + "pdf.worker.min.mjs";
    const { PDFDocument, degrees } = await loadEsm(PDFLIB);
    return { pdfjs, PDFDocument, degrees };
  }

  async function run(act, pdfs, imgs) {
    status.textContent = "⏳ …";
    try {
      if (["compress", "split", "rotate", "tojpg", "totxt", "toword"].includes(act) && !pdfs.length) {
        status.textContent = L.needPdf; return toastError(L.needPdf);
      }
      if (act === "merge" && pdfs.length < 2) { status.textContent = L.needTwo; return toastError(L.needTwo); }
      if (act === "img2pdf" && !imgs.length) { status.textContent = L.needImg; return toastError(L.needImg); }

      const { pdfjs, PDFDocument, degrees } = await loadLibs();
      const f = pdfs[0];

      if (act === "merge") {
        const out = await PDFDocument.create();
        for (const pf of pdfs) {
          const src = await PDFDocument.load(await pf.arrayBuffer(), { ignoreEncryption: true });
          (await out.copyPages(src, src.getPageIndices())).forEach(p => out.addPage(p));
        }
        downloadBlob(new Blob([await out.save()], { type: "application/pdf" }), "merged.pdf");

      } else if (act === "compress") {
        const pdf = await pdfjs.getDocument({ data: await f.arrayBuffer() }).promise;
        const out = await PDFDocument.create();
        const quality = +q.value, scale = 1.1;
        for (let i = 1; i <= pdf.numPages; i++) {
          status.textContent = `⏳ ${i}/${pdf.numPages} …`;
          const page = await pdf.getPage(i);
          const vp = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.width = Math.ceil(vp.width); canvas.height = Math.ceil(vp.height);
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport: vp }).promise;
          const img = await out.embedJpg(canvas.toDataURL("image/jpeg", quality));
          const p = out.addPage([img.width, img.height]);
          p.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
        }
        const bytes = await out.save({ useObjectStreams: false });
        const saved = ((1 - bytes.length / f.size) * 100).toFixed(0);
        downloadBlob(new Blob([bytes], { type: "application/pdf" }), "compressed.pdf");
        status.textContent = `✓ ${formatBytes(f.size)} → ${formatBytes(bytes.length)} (${saved}% ↓)`;

      } else if (act === "split") {
        const src = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
        const JZ = (await loadEsm(JSZIP)).default;
        const z = new JZ();
        for (let i = 0; i < src.getPageCount(); i++) {
          status.textContent = `⏳ ${i + 1}/${src.getPageCount()} …`;
          const doc = await PDFDocument.create();
          (await doc.copyPages(src, [i])).forEach(p => doc.addPage(p));
          z.file(`page-${String(i + 1).padStart(3, "0")}.pdf`, await doc.save());
        }
        downloadBlob(await z.generateAsync({ type: "blob" }), f.name.replace(/\.pdf$/i, "") + "-pages.zip");

      } else if (act === "rotate") {
        const src = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
        src.getPages().forEach(p => p.setRotation(degrees((p.getRotation().angle + 90) % 360)));
        downloadBlob(new Blob([await src.save()], { type: "application/pdf" }), "rotated.pdf");

      } else if (act === "tojpg" || act === "totxt" || act === "toword") {
        const pdf = await pdfjs.getDocument({ data: await f.arrayBuffer() }).promise;
        if (act === "tojpg") {
          const JZ = (await loadEsm(JSZIP)).default;
          const z = new JZ();
          const quality = +q.value, scale = 2;
          for (let i = 1; i <= pdf.numPages; i++) {
            status.textContent = `⏳ ${i}/${pdf.numPages} …`;
            const page = await pdf.getPage(i);
            const vp = page.getViewport({ scale });
            const canvas = document.createElement("canvas");
            canvas.width = Math.ceil(vp.width); canvas.height = Math.ceil(vp.height);
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            await page.render({ canvasContext: ctx, viewport: vp }).promise;
            const b64 = canvas.toDataURL("image/jpeg", quality).split(",")[1];
            z.file(`page-${String(i).padStart(3, "0")}.jpg`, b64, { base64: true });
          }
          downloadBlob(await z.generateAsync({ type: "blob" }), f.name.replace(/\.pdf$/i, "") + "-jpg.zip");
        } else {
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            status.textContent = `⏳ ${i}/${pdf.numPages} …`;
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(it => it.str).join(" ") + "\n\n";
          }
          text = text.trim();
          if (!text) throw new Error(AR ? "لا يوجد نص في هذا الملف (صور ممسوحة؟)" : "No text found (scanned images?)");
          if (act === "totxt") {
            downloadBlob(new Blob([text], { type: "text/plain;charset=utf-8" }), "document.txt");
          } else {
            const esc = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="utf-8"><title>Document</title></head>
<body dir="auto">${esc.split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("")}</body></html>`;
            downloadBlob(new Blob(["\uFEFF" + html], { type: "application/msword" }), "document.doc");
          }
        }

      } else if (act === "img2pdf") {
        const out = await PDFDocument.create();
        for (const img of imgs) {
          const buf = await img.arrayBuffer();
          const isPng = img.type === "image/png";
          const embedded = isPng ? await out.embedPng(buf) : await out.embedJpg(buf);
          const p = out.addPage([embedded.width, embedded.height]);
          p.drawImage(embedded, { x: 0, y: 0, width: embedded.width, height: embedded.height });
        }
        downloadBlob(new Blob([await out.save()], { type: "application/pdf" }), "images.pdf");
      }

      status.textContent = `✓ ${L.done}`;
      toastSuccess(L.done);
    } catch (e) {
      status.textContent = "❌ " + (e?.message || "error");
      toastError(t("tool.error"));
    }
  }
}
