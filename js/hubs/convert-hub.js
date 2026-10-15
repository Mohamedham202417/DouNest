/**
 * DouNest v4 — Convert Hub (/convert/)
 * --------------------------------------
 * From/To conversion center: drop any file → type auto-detected →
 * available conversions shown as one-click buttons. 100% local.
 * Matrix: images⇄png/jpg/webp · pdf→txt/jpg/doc · csv⇄json ·
 *         xlsx→csv/json · docx→txt · txt→pdf
 * Same contract as tool modules: export render(root).
 */
import { t, getLang } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadEsm, formatBytes, downloadBlob } from "../util.js";
import { workbench } from "../hub-kit.js";
import { CONVERT_ACTIONS } from "../lib/actions.js";

const PDFJS = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/";
const PDFLIB = "https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.esm.min.js";
const JSZIP = "https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm";

const AR = getLang() === "ar";
const L = {
  drop: AR ? "اسحب أي ملف هنا — سنكتشف نوعه ونعرض التحويلات المتاحة" : "Drop any file here — we detect its type and list available conversions",
  detected: AR ? "النوع المكتشف" : "Detected type",
  actions: AR ? "حوّل من/إلى — بضغطة زر" : "Convert from/to — one click",
  ready: AR ? "جاهز — أضف ملفاً" : "Ready — add a file",
  clear: AR ? "إزالة" : "Remove",
  none: AR ? "لا توجد تحويلات مدعومة لهذا النوع حالياً — جرّب مركز PDF للملفات النصية." : "No supported conversion for this type yet — try the PDF hub for text files.",
  done: AR ? "تم التحويل ✓" : "Converted ✓",
  unknown: AR ? "نوع غير مدعوم" : "Unsupported type",
  latinNote: AR ? "ملاحظة: PDF الناتج يدعم الحروف اللاتينية بأفضل شكل." : "Note: the generated PDF renders Latin text best."
};

const TYPES = {
  png: { ar: "صورة PNG", en: "PNG image" },
  jpg: { ar: "صورة JPEG", en: "JPEG image" },
  webp: { ar: "صورة WebP", en: "WebP image" },
  pdf: { ar: "مستند PDF", en: "PDF document" },
  csv: { ar: "ملف CSV", en: "CSV file" },
  json: { ar: "ملف JSON", en: "JSON file" },
  xlsx: { ar: "جدول Excel", en: "Excel sheet" },
  docx: { ar: "مستند Word", en: "Word document" },
  txt: { ar: "ملف نصي", en: "Text file" }
};

export function render(root) {
  root.innerHTML = `
    <div class="hub-drop" id="cv-drop" role="button" tabindex="0" aria-label="${L.drop}">
      <span class="hub-drop-icon" aria-hidden="true">🔄</span>
      <p>${L.drop}</p>
      <input type="file" id="cv-input" hidden>
    </div>

    <div class="hub-files" id="cv-file" hidden>
      <ul class="hub-filelist" id="cv-list"></ul>
    </div>

    <div class="hub-actions" id="cv-actions" hidden>
      <h3>${L.actions}</h3>
      <div class="action-grid" id="cv-grid"></div>
    </div>

    <div class="hub-status" id="cv-status" aria-live="polite">${L.ready}</div>
  `;

  const more = document.createElement("section");
  more.className = "section wb-existing-tools";
  more.innerHTML = `<h3>${AR ? "تحويلات إضافية — SVG وJSON/YAML" : "Additional conversions — SVG and JSON/YAML"}</h3><div class="workspace" id="cv-advanced"></div>`;
  root.appendChild(more);
  workbench(root.querySelector("#cv-advanced"), {
    icon: "🔄", accept: ".svg,.json,.yaml,.yml,application/json,image/svg+xml", multiple: false, resultPanel: true,
    s: { drop: AR ? "أضف SVG أو JSON أو YAML" : "Add SVG, JSON or YAML", actions: AR ? "اختر التحويل" : "Choose conversion", ready: AR ? "جاهز" : "Ready", run: AR ? "تنفيذ التحويل" : "Convert" },
    actions: [CONVERT_ACTIONS.svgToPng, CONVERT_ACTIONS.jsonYaml]
  });

  const drop = root.querySelector("#cv-drop");
  const input = root.querySelector("#cv-input");
  const fileWrap = root.querySelector("#cv-file");
  const list = root.querySelector("#cv-list");
  const actionsWrap = root.querySelector("#cv-actions");
  const grid = root.querySelector("#cv-grid");
  const status = root.querySelector("#cv-status");
  let file = null, kind = null;

  const openPicker = () => input.click();
  drop.onclick = openPicker;
  drop.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPicker(); } };
  ["dragover", "dragenter"].forEach(ev => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add("drag"); }));
  ["dragleave", "drop"].forEach(ev => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove("drag"); }));
  drop.addEventListener("drop", (e) => setFile(e.dataTransfer.files[0]));
  input.onchange = () => { if (input.files[0]) setFile(input.files[0]); input.value = ""; };

  function detect(f) {
    const name = f.name.toLowerCase();
    const ext = name.split(".").pop();
    if (f.type === "image/png" || ext === "png") return "png";
    if (f.type === "image/jpeg" || ext === "jpg" || ext === "jpeg") return "jpg";
    if (f.type === "image/webp" || ext === "webp") return "webp";
    if (f.type === "application/pdf" || ext === "pdf") return "pdf";
    if (ext === "csv") return "csv";
    if (ext === "json") return "json";
    if (ext === "xlsx" || ext === "xls") return "xlsx";
    if (ext === "docx") return "docx";
    if (f.type.startsWith("text/") || ext === "txt" || ext === "md") return "txt";
    return null;
  }

  function setFile(f) {
    if (!f) return;
    file = f; kind = detect(f);
    fileWrap.hidden = false;
    list.innerHTML = `<li><span class="hub-file-name">${f.name} — ${formatBytes(f.size)}</span>
      <span class="badge tiny">${kind ? (L.detected + ": " + (TYPES[kind][AR ? "ar" : "en"])) : L.unknown}</span>
      <button class="btn btn-ghost btn-sm" id="cv-rm">${L.clear}</button></li>`;
    list.querySelector("#cv-rm").onclick = () => { file = null; kind = null; fileWrap.hidden = true; actionsWrap.hidden = true; status.textContent = L.ready; };
    renderActions();
  }

  function renderActions() {
    const M = {
      png: [["to-jpg", "→ JPG"], ["to-webp", "→ WebP"]],
      jpg: [["to-png", "→ PNG"], ["to-webp", "→ WebP"]],
      webp: [["to-png", "→ PNG"], ["to-jpg", "→ JPG"]],
      pdf: [["pdf-txt", "→ TXT"], ["pdf-jpg", "→ JPG"], ["pdf-doc", "→ Word"]],
      csv: [["csv-json", "→ JSON"]],
      json: [["json-csv", "→ CSV"]],
      xlsx: [["xlsx-csv", "→ CSV"], ["xlsx-json", "→ JSON"]],
      docx: [["docx-txt", "→ TXT"]],
      txt: [["txt-pdf", "→ PDF"]]
    };
    const acts = M[kind] || [];
    actionsWrap.hidden = !acts.length;
    grid.innerHTML = acts.map(([id, label]) =>
      `<button class="btn btn-primary hub-act" data-act="${id}">${label}</button>`).join("") +
      (kind === "txt" ? `<p class="hub-note">${L.latinNote}</p>` : "");
    if (!acts.length) status.textContent = L.none;
    else status.textContent = L.ready;
    grid.querySelectorAll("[data-act]").forEach(b => { b.onclick = () => run(b.dataset.act); });
  }

  /* ---------- converters ---------- */

  async function imageTo(target) {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
    canvas.getContext("2d").drawImage(img, 0, 0);
    const mime = target === "png" ? "image/png" : target === "webp" ? "image/webp" : "image/jpeg";
    const q = target === "png" ? undefined : 0.9;
    canvas.toBlob((blob) => {
      downloadBlob(blob, file.name.replace(/\.[^.]+$/, "") + "." + target);
      finish();
    }, mime, q);
  }

  async function pdfLib() { return (await loadEsm(PDFLIB)).PDFDocument; }

  async function pdfExtract() {
    const pdfjs = await loadEsm(PDFJS + "pdf.min.mjs");
    pdfjs.GlobalWorkerOptions.workerSrc = PDFJS + "pdf.worker.min.mjs";
    return pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  }

  async function pdfToTxt() {
    const pdf = await pdfExtract();
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      status.textContent = `⏳ ${i}/${pdf.numPages} …`;
      const content = await (await pdf.getPage(i)).getTextContent();
      text += content.items.map(it => it.str).join(" ") + "\n\n";
    }
    downloadBlob(new Blob([text.trim()], { type: "text/plain;charset=utf-8" }), base() + ".txt");
    finish();
  }

  async function pdfToJpg() {
    const pdf = await pdfExtract();
    const JZ = (await loadEsm(JSZIP)).default;
    const z = new JZ();
    for (let i = 1; i <= pdf.numPages; i++) {
      status.textContent = `⏳ ${i}/${pdf.numPages} …`;
      const page = await pdf.getPage(i);
      const vp = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(vp.width); canvas.height = Math.ceil(vp.height);
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport: vp }).promise;
      z.file(`page-${String(i).padStart(3, "0")}.jpg`, canvas.toDataURL("image/jpeg", 0.85).split(",")[1], { base64: true });
    }
    downloadBlob(await z.generateAsync({ type: "blob" }), base() + "-jpg.zip");
    finish();
  }

  async function pdfToDoc() {
    const pdf = await pdfExtract();
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const content = await (await pdf.getPage(i)).getTextContent();
      text += content.items.map(it => it.str).join(" ") + "\n\n";
    }
    const esc = text.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="utf-8"><title>Document</title></head>
<body dir="auto">${esc.split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("")}</body></html>`;
    downloadBlob(new Blob(["\uFEFF" + html], { type: "application/msword" }), base() + ".doc");
    finish();
  }

  function parseCSV(text) {
    const rows = []; let row = [], cell = "", inQ = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQ) {
        if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else inQ = false; }
        else cell += c;
      } else if (c === '"') inQ = true;
      else if (c === ",") { row.push(cell); cell = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(cell); cell = "";
        if (row.some(v => v !== "")) rows.push(row);
        row = [];
      } else cell += c;
    }
    row.push(cell);
    if (row.some(v => v !== "")) rows.push(row);
    return rows;
  }

  async function csvToJson() {
    const text = await file.text();
    const rows = parseCSV(text);
    if (!rows.length) throw new Error("empty");
    const headers = rows[0];
    const out = rows.slice(1).map(r => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""])));
    downloadBlob(new Blob([JSON.stringify(out, null, 2)], { type: "application/json" }), base() + ".json");
    finish();
  }

  async function jsonToCsv() {
    const data = JSON.parse(await file.text());
    const arr = Array.isArray(data) ? data : [data];
    const keys = [...new Set(arr.flatMap(o => (o && typeof o === "object") ? Object.keys(o) : []))];
    const escCell = (v) => {
      const s = v == null ? "" : (typeof v === "object" ? JSON.stringify(v) : String(v));
      return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    const lines = [keys.map(escCell).join(",")];
    for (const o of arr) lines.push(keys.map(k => escCell(o?.[k])).join(","));
    downloadBlob(new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" }), base() + ".csv");
    finish();
  }

  async function xlsxRead() {
    const JZ = (await loadEsm(JSZIP)).default;
    const z = await JZ.loadAsync(await file.arrayBuffer());
    let shared = [];
    if (z.file("xl/sharedStrings.xml")) {
      const xml = new DOMParser().parseFromString(await z.file("xl/sharedStrings.xml").async("text"), "text/xml");
      shared = [...xml.getElementsByTagName("si")].map(si =>
        [...si.getElementsByTagName("t")].map(n => n.textContent).join(""));
    }
    const sheetName = Object.keys(z.files).find(n => /^xl\/worksheets\/sheet1\.xml$/.test(n)) || Object.keys(z.files).find(n => n.startsWith("xl/worksheets/sheet"));
    const xml = new DOMParser().parseFromString(await z.file(sheetName).async("text"), "text/xml");
    const rows = [...xml.getElementsByTagName("row")].map(r =>
      [...r.getElementsByTagName("c")].map(c => {
        const v = c.getElementsByTagName("v")[0]?.textContent ?? "";
        return c.getAttribute("t") === "s" ? (shared[+v] ?? "") : v;
      })
    );
    return rows;
  }

  async function xlsxToCsv() {
    const rows = await xlsxRead();
    const escCell = (v) => /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
    downloadBlob(new Blob(["\uFEFF" + rows.map(r => r.map(escCell).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" }), base() + ".csv");
    finish();
  }

  async function xlsxToJson() {
    const rows = await xlsxRead();
    if (!rows.length) throw new Error("empty");
    const headers = rows[0];
    const out = rows.slice(1).map(r => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""])));
    downloadBlob(new Blob([JSON.stringify(out, null, 2)], { type: "application/json" }), base() + ".json");
    finish();
  }

  async function docxToTxt() {
    const JZ = (await loadEsm(JSZIP)).default;
    const z = await JZ.loadAsync(await file.arrayBuffer());
    const xml = await z.file("word/document.xml").async("text");
    const text = xml
      .replace(/<\/w:p>/g, "\n\n")
      .replace(/<w:br\s*\/>/g, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      .trim();
    downloadBlob(new Blob([text], { type: "text/plain;charset=utf-8" }), base() + ".txt");
    finish();
  }

  async function txtToPdf() {
    const PDFDocument = await pdfLib();
    const text = (await file.text()).replace(/[^\x00-\xFF]/g, "?").slice(0, 20000);
    const out = await PDFDocument.create();
    const font = await out.embedFont("Helvetica");
    const lines = text.split(/\r?\n/);
    let page = out.addPage([595, 842]);
    let y = 800;
    for (const line of lines) {
      if (y < 50) { page = out.addPage([595, 842]); y = 800; }
      page.drawText(line.slice(0, 90), { x: 45, y, size: 11, font });
      y -= 17;
    }
    downloadBlob(new Blob([await out.save()], { type: "application/pdf" }), base() + ".pdf");
    finish();
  }

  /* ---------- plumbing ---------- */
  const base = () => file.name.replace(/\.[^.]+$/, "");
  const finish = () => { status.textContent = `✓ ${L.done}`; toastSuccess(L.done); };

  async function run(act) {
    if (!file) return;
    status.textContent = "⏳ …";
    try {
      if (act.startsWith("to-")) return await imageTo(act.slice(3));
      const map = {
        "pdf-txt": pdfToTxt, "pdf-jpg": pdfToJpg, "pdf-doc": pdfToDoc,
        "csv-json": csvToJson, "json-csv": jsonToCsv,
        "xlsx-csv": xlsxToCsv, "xlsx-json": xlsxToJson,
        "docx-txt": docxToTxt, "txt-pdf": txtToPdf
      };
      await map[act]();
    } catch (e) {
      status.textContent = "❌ " + (e?.message || "error");
      toastError(t("tool.error"));
    }
  }
}
