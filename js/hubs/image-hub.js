/**
 * DouNest v4 — Image Hub (/images/)
 * Upload once, then run common image operations locally in the browser.
 */
import { t, getLang } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadEsm, formatBytes, downloadBlob } from "../util.js";

const PDFLIB = "https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.esm.min.js";
const BG_REMOVE = "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.5/+esm";
const AR = getLang() === "ar";
const L = {
  drop: AR ? "اسحب الصور هنا — أو اضغط للاختيار" : "Drop images here — or click to browse",
  files: AR ? "الصور المرفوعة" : "Loaded images",
  actions: AR ? "العمليات المتاحة — بضغطة زر" : "Available actions — one click each",
  ready: AR ? "جاهز — اختر صورة أو أكثر ثم عملية" : "Ready — choose images and an action",
  clear: AR ? "تفريغ الكل" : "Clear all",
  convert: AR ? "تحويل إلى WebP" : "Convert to WebP",
  compress: AR ? "ضغط JPG" : "Compress to JPG",
  resize: AR ? "تغيير الحجم" : "Resize",
  remove: AR ? "إزالة الخلفية" : "Remove background",
  pdf: AR ? "الصور → PDF" : "Images → PDF",
  specialized: AR ? "أدوات صور متخصصة" : "Specialized image tools",
  width: AR ? "العرض الجديد بالبكسل" : "New width in pixels",
  quality: AR ? "الجودة" : "Quality",
  done: AR ? "تم التنفيذ ✓" : "Done ✓",
  needImage: AR ? "أضف صورة واحدة على الأقل أولاً" : "Add at least one image first",
  oneImage: AR ? "هذه العملية تحتاج صورة واحدة" : "This action needs one image",
  model: AR ? "جارٍ تحميل نموذج إزالة الخلفية…" : "Loading background-removal model…"
};

export function render(root) {
  root.innerHTML = `
    <div class="hub-drop" id="img-drop" role="button" tabindex="0" aria-label="${L.drop}">
      <span class="hub-drop-icon" aria-hidden="true">🖼️</span>
      <p>${L.drop}</p>
      <input type="file" id="img-input" multiple accept="image/*" hidden>
    </div>
    <div class="hub-files" id="img-files" hidden>
      <h3>${L.files} <button class="btn btn-ghost btn-sm" id="img-clear">${L.clear}</button></h3>
      <ul class="hub-filelist" id="img-list"></ul>
    </div>
    <div class="hub-actions" id="img-actions" hidden>
      <h3>${L.actions}</h3>
      <div class="hub-quality" id="img-options">
        <label>${L.width}: <input type="number" id="img-width" min="16" max="10000" value="1200" style="width:110px"></label>
        <label>${L.quality}: <span id="img-qv">0.82</span></label>
        <input type="range" id="img-q" min="0.35" max="1" step="0.05" value="0.82">
      </div>
      <div class="action-grid" id="img-grid"></div>
    </div>
    <div class="hub-status" id="img-status" aria-live="polite">${L.ready}</div>
    <p class="disclosure">🔒 ${AR ? "المعالجة الأساسية تتم محلياً داخل متصفحك — لا تُرفع صورك." : "Core processing runs locally in your browser — your images are not uploaded."}</p>
  `;

  const drop = root.querySelector("#img-drop");
  const input = root.querySelector("#img-input");
  const filesWrap = root.querySelector("#img-files");
  const list = root.querySelector("#img-list");
  const actionsWrap = root.querySelector("#img-actions");
  const grid = root.querySelector("#img-grid");
  const status = root.querySelector("#img-status");
  const width = root.querySelector("#img-width");
  const q = root.querySelector("#img-q");
  const qv = root.querySelector("#img-qv");
  let files = [];

  q.oninput = () => { qv.textContent = (+q.value).toFixed(2); };
  const openPicker = () => input.click();
  drop.onclick = openPicker;
  drop.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPicker(); } };
  ["dragover", "dragenter"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add("drag"); }));
  ["dragleave", "drop"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove("drag"); }));
  drop.addEventListener("drop", e => addFiles([...e.dataTransfer.files].filter(f => f.type.startsWith("image/"))));
  input.onchange = () => { addFiles([...input.files]); input.value = ""; };
  root.querySelector("#img-clear").onclick = () => { files = []; refresh(); };

  function addFiles(more) {
    files = [...files, ...more.filter(f => f.type.startsWith("image/"))];
    refresh();
  }
  function refresh() {
    filesWrap.hidden = !files.length;
    actionsWrap.hidden = !files.length;
    list.innerHTML = files.map((f, i) => `<li><span class="hub-file-name">${escapeHtml(f.name)} — ${formatBytes(f.size)}</span><button class="btn btn-ghost btn-sm" data-rm="${i}" aria-label="remove">×</button></li>`).join("");
    list.querySelectorAll("[data-rm]").forEach(b => b.onclick = () => { files.splice(+b.dataset.rm, 1); refresh(); });
    renderActions();
  }
  function renderActions() {
    const acts = [
      ["convert", L.convert, "⚡"], ["compress", L.compress, "🗜️"], ["resize", L.resize, "↔️"],
      ["pdf", L.pdf, "📄"], ["remove", L.remove, "✂️"]
    ];
    grid.innerHTML = acts.map(([id, label, icon]) => `<button class="btn btn-primary hub-act" data-act="${id}">${icon} ${label}</button>`).join("");
    grid.querySelectorAll("[data-act]").forEach(b => b.onclick = () => run(b.dataset.act));
  }

  async function bitmap(file) { return createImageBitmap(file); }
  async function canvasBlob(bmp, type, quality, targetWidth = bmp.width) {
    const ratio = targetWidth / bmp.width;
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(targetWidth));
    c.height = Math.max(1, Math.round(bmp.height * ratio));
    const ctx = c.getContext("2d");
    if (type === "image/jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height); }
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bmp, 0, 0, c.width, c.height);
    return new Promise((resolve, reject) => c.toBlob(b => b ? resolve(b) : reject(new Error("Canvas export failed")), type, quality));
  }
  function baseName(name) { return name.replace(/\.[^.]+$/, "") || "image"; }

  async function run(act) {
    if (!files.length) return toastError(L.needImage);
    if (act === "remove" && files.length !== 1) return toastError(L.oneImage);
    status.textContent = "⏳ …";
    try {
      if (act === "pdf") {
        const { PDFDocument } = await loadEsm(PDFLIB);
        const out = await PDFDocument.create();
        for (const f of files) {
          const bytes = await f.arrayBuffer();
          let embedded;
          if (f.type === "image/png") embedded = await out.embedPng(bytes);
          else if (f.type === "image/jpeg" || f.type === "image/jpg") embedded = await out.embedJpg(bytes);
          else {
            const b = await canvasBlob(await bitmap(f), "image/jpeg", +q.value);
            embedded = await out.embedJpg(await b.arrayBuffer());
          }
          const page = out.addPage([embedded.width, embedded.height]);
          page.drawImage(embedded, { x: 0, y: 0, width: embedded.width, height: embedded.height });
        }
        const blob = new Blob([await out.save()], { type: "application/pdf" });
        downloadBlob(blob, "images.pdf");
        status.textContent = `${L.done} ${formatBytes(blob.size)}`;
      } else if (act === "remove") {
        status.textContent = L.model;
        const mod = await import(BG_REMOVE);
        const removeBackground = mod.default || mod.removeBackground;
        if (typeof removeBackground !== "function") throw new Error("Background removal module unavailable");
        const blob = await removeBackground(files[0], { output: { format: "image/png", type: "foreground" }, model: "isnet_quint8", progress: (key, cur, total) => { status.textContent = `${key}: ${Math.round((cur / (total || 1)) * 100)}%`; } });
        downloadBlob(blob, `${baseName(files[0].name)}-no-background.png`);
        status.textContent = L.done;
      } else {
        for (let i = 0; i < files.length; i++) {
          const f = files[i];
          status.textContent = `⏳ ${i + 1}/${files.length} …`;
          const bmp = await bitmap(f);
          const target = act === "resize" ? Math.min(+width.value || 1200, 10000) : bmp.width;
          const type = act === "convert" ? "image/webp" : "image/jpeg";
          const blob = await canvasBlob(bmp, type, +q.value, target);
          const ext = act === "convert" ? "webp" : "jpg";
          downloadBlob(blob, `${baseName(f.name)}-${act}.${ext}`);
        }
        status.textContent = `${L.done} ${files.length}`;
      }
      toastSuccess(L.done);
    } catch (e) {
      status.textContent = "❌ " + (e?.message || e);
      toastError(t("tool.error"));
    }
  }
}

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
