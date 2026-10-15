/**
 * DouNest v5 — shared local operations library
 * ------------------------------------------------------------------
 * Every function here runs 100% inside the browser: no uploads, no server.
 * Consumed by the tool modules (js/tools/*.js) and by the centers
 * (js/hubs/*.js) so one implementation powers both surfaces.
 */

import { loadEsm } from "../util.js";

export const CDN = {
  PDFLIB: "https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.esm.min.js",
  PDFJS: "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/",
  JSZIP: "https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm"
};

export async function pdfLib() { return loadEsm(CDN.PDFLIB); }
export async function pdfjs() {
  const m = await loadEsm(CDN.PDFJS + "pdf.min.mjs");
  m.GlobalWorkerOptions.workerSrc = CDN.PDFJS + "pdf.worker.min.mjs";
  return m;
}
export async function jszip() { return (await loadEsm(CDN.JSZIP)).default; }

/** Load a PDF with pdf-lib (tolerating encryption where possible). */
export async function loadPdf(file) {
  const { PDFDocument } = await pdfLib();
  return PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
}

/** pdf-lib standard fonts cannot encode Arabic — keep watermarks Latin-safe. */
export function latinSafe(text) {
  return String(text || "").replace(/[^\x20-\x7E]/g, "?").trim();
}

/* ================================================================
 * PDF operations
 * ================================================================ */

/** Reorder / drop pages. `order` = 0-based page indices, in output order. */
export async function pdfOrganize(file, order) {
  const { PDFDocument } = await pdfLib();
  const src = await loadPdf(file);
  const total = src.getPageCount();
  const clean = (order || []).map(Number).filter(n => Number.isInteger(n) && n >= 0 && n < total);
  if (!clean.length) throw new Error("No pages selected");
  const out = await PDFDocument.create();
  const copied = await out.copyPages(src, clean);
  copied.forEach(p => out.addPage(p));
  return new Blob([await out.save()], { type: "application/pdf" });
}

/** Diagonal tiled text watermark on every page. */
export async function pdfWatermark(file, { text = "CONFIDENTIAL", size = 42, opacity = 0.15, angle = 45 } = {}) {
  const { PDFDocument, StandardFonts, degrees, rgb } = await pdfLib();
  const doc = await loadPdf(file);
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const label = latinSafe(text) || "WATERMARK";
  for (const page of doc.getPages()) {
    const { width, height } = page.getSize();
    const tw = font.widthOfTextAtSize(label, size);
    const cols = Math.max(1, Math.ceil(width / (tw + 60)));
    const rows = Math.max(1, Math.ceil(height / (size + 90)));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        page.drawText(label, {
          x: (c * width) / cols - tw / 4,
          y: (r * height) / rows + size,
          size, font,
          color: rgb(0.45, 0.45, 0.5),
          opacity,
          rotate: degrees(angle)
        });
      }
    }
  }
  return new Blob([await doc.save()], { type: "application/pdf" });
}

/** Add page numbers ("1 / N") at a chosen position. */
export async function pdfPageNumbers(file, { position = "bottom-center", startAt = 1, size = 11 } = {}) {
  const { PDFDocument, StandardFonts, rgb } = await pdfLib();
  const doc = await loadPdf(file);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const pages = doc.getPages();
  pages.forEach((page, i) => {
    const { width } = page.getSize();
    const label = `${i + startAt} / ${pages.length + startAt - 1}`;
    const tw = font.widthOfTextAtSize(label, size);
    const [vertical, horizontal] = position.split("-");
    const x = horizontal === "left" ? 40 : horizontal === "right" ? width - 40 - tw : (width - tw) / 2;
    const y = vertical === "top" ? page.getSize().height - 30 : 24;
    page.drawText(label, { x, y, size, font, color: rgb(0.25, 0.25, 0.3) });
  });
  return new Blob([await doc.save()], { type: "application/pdf" });
}

/* ================================================================
 * Image operations
 * ================================================================ */

export async function bitmapOf(file) {
  if (typeof createImageBitmap === "function") return createImageBitmap(file);
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  } finally { setTimeout(() => URL.revokeObjectURL(url), 4000); }
}

function canvasOf(w, h) {
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(w));
  c.height = Math.max(1, Math.round(h));
  return c;
}

export function canvasToBlob(canvas, type = "image/png", quality) {
  return new Promise((resolve, reject) =>
    canvas.toBlob(b => b ? resolve(b) : reject(new Error("Canvas export failed")), type, quality));
}

/** Crop a rectangle given in pixels; returns a Blob in `format`. */
export async function imageCrop(file, { x = 0, y = 0, width, height, format = "image/png", quality = 0.92 } = {}) {
  const bmp = await bitmapOf(file);
  const sw = bmp.width || bmp.naturalWidth, sh = bmp.height || bmp.naturalHeight;
  const w = Math.max(1, Math.min(Math.round(width || sw), sw));
  const h = Math.max(1, Math.min(Math.round(height || sh), sh));
  const cx = Math.max(0, Math.min(Math.round(x), sw - w));
  const cy = Math.max(0, Math.min(Math.round(y), sh - h));
  const canvas = canvasOf(w, h);
  const ctx = canvas.getContext("2d");
  if (format === "image/jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h); }
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bmp, cx, cy, w, h, 0, 0, w, h);
  return canvasToBlob(canvas, format, format === "image/png" ? undefined : quality);
}

/** Rotate by 90/180/270 and/or flip, optionally re-encoding to another format. */
export async function imageRotateFlip(file, { rotate = 0, flipH = false, flipV = false, format = "image/png", quality = 0.92 } = {}) {
  const bmp = await bitmapOf(file);
  const sw = bmp.width || bmp.naturalWidth, sh = bmp.height || bmp.naturalHeight;
  const rad = (rotate % 360) * Math.PI / 180;
  const swap = rotate % 180 !== 0;
  const canvas = canvasOf(swap ? sh : sw, swap ? sw : sh);
  const ctx = canvas.getContext("2d");
  if (format === "image/jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rad);
  ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bmp, -sw / 2, -sh / 2, sw, sh);
  return canvasToBlob(canvas, format, format === "image/png" ? undefined : quality);
}

/* ---------- minimal EXIF reader (JPEG APP1 / TIFF) ---------- */

const EXIF_TAGS = {
  0x010f: "Make", 0x0110: "Model", 0x0112: "Orientation", 0x011a: "XResolution",
  0x0131: "Software", 0x0132: "DateTime", 0x829a: "ExposureTime", 0x829d: "FNumber",
  0x8822: "ExposureProgram", 0x8827: "ISO", 0x9003: "DateTimeOriginal",
  0x9004: "DateTimeDigitized", 0x9201: "ShutterSpeedValue", 0x9202: "ApertureValue",
  0x9204: "ExposureBiasValue", 0x9207: "MeteringMode", 0x9209: "Flash",
  0x920a: "FocalLength", 0xa002: "PixelXDimension", 0xa003: "PixelYDimension",
  0x0100: "ImageWidth", 0x0101: "ImageLength", 0x0102: "BitsPerSample",
  0x0111: "StripOffsets", 0x0116: "RowsPerStrip", 0x0117: "StripByteCounts",
  0x011c: "PlanarConfiguration", 0x0201: "ThumbnailOffset", 0x0202: "ThumbnailLength"
};
const GPS_TAGS = {
  0x0000: "GPSVersionID", 0x0001: "GPSLatitudeRef", 0x0002: "GPSLatitude",
  0x0003: "GPSLongitudeRef", 0x0004: "GPSLongitude", 0x0005: "GPSAltitudeRef",
  0x0006: "GPSAltitude", 0x0007: "GPSTimeStamp", 0x001d: "GPSDateStamp"
};

function parseIFD(view, offset, tiffStart, little, tags, out) {
  const count = view.getUint16(offset, little);
  for (let i = 0; i < count; i++) {
    const entry = offset + 2 + i * 12;
    if (entry + 12 > view.byteLength) break;
    const tag = view.getUint16(entry, little);
    const type = view.getUint16(entry + 2, little);
    const num = view.getUint32(entry + 4, little);
    const valueOffset = entry + 8;
    const sizes = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 };
    const bytes = (sizes[type] || 1) * num;
    let dataOffset = bytes > 4 ? tiffStart + view.getUint32(valueOffset, little) : valueOffset;
    if (dataOffset < 0 || dataOffset + bytes > view.byteLength) continue;
    let value;
    if (type === 2) {
      let s = "";
      for (let k = 0; k < num; k++) {
        const ch = view.getUint8(dataOffset + k);
        if (ch === 0) break;
        s += String.fromCharCode(ch);
      }
      value = s.trim();
    } else if (type === 3) {
      const arr = [];
      for (let k = 0; k < num; k++) arr.push(view.getUint16(dataOffset + k * 2, little));
      value = arr.length > 1 ? arr.join(", ") : arr[0];
    } else if (type === 4 || type === 9) {
      const arr = [];
      for (let k = 0; k < num; k++) arr.push(view.getUint32(dataOffset + k * 4, little));
      value = arr.length > 1 ? arr.join(", ") : arr[0];
    } else if (type === 5 || type === 10) {
      const arr = [];
      for (let k = 0; k < num; k++) {
        const n = view.getUint32(dataOffset + k * 8, little);
        const d = view.getUint32(dataOffset + k * 8 + 4, little);
        arr.push(d ? (n / d).toFixed(4).replace(/\.?0+$/, "") : String(n));
      }
      value = arr.join(", ");
    } else {
      const arr = [];
      for (let k = 0; k < Math.min(num, 24); k++) arr.push(view.getUint8(dataOffset + k));
      value = arr.join(", ");
    }
    const name = tags[tag] || ("Tag 0x" + tag.toString(16).padStart(4, "0"));
    if (value !== "" && value !== undefined) out.push({ tag: name, value: String(value) });
    // descend into the Exif sub-IFD
    if (tag === 0x8769 && type === 4) parseIFD(view, tiffStart + view.getUint32(valueOffset, little), tiffStart, little, EXIF_TAGS, out);
    if (tag === 0x8825 && type === 4) parseIFD(view, tiffStart + view.getUint32(valueOffset, little), tiffStart, little, GPS_TAGS, out);
  }
}

/** Read EXIF metadata from a JPEG. Returns [] when none is present. */
export async function readExif(file) {
  const buf = await file.arrayBuffer();
  const view = new DataView(buf);
  if (view.byteLength < 4 || view.getUint16(0) !== 0xffd8) return [];
  let offset = 2;
  while (offset + 4 < view.byteLength) {
    if (view.getUint8(offset) !== 0xff) break;
    const marker = view.getUint8(offset + 1);
    const size = view.getUint16(offset + 2);
    if (marker === 0xe1) {
      const start = offset + 4;
      if (String.fromCharCode(view.getUint8(start), view.getUint8(start + 1), view.getUint8(start + 2), view.getUint8(start + 3)) !== "Exif") break;
      const tiffStart = start + 6;
      const little = view.getUint16(tiffStart) === 0x4949;
      const firstIFD = tiffStart + view.getUint32(tiffStart + 4, little);
      const out = [];
      parseIFD(view, firstIFD, tiffStart, little, EXIF_TAGS, out);
      return out;
    }
    offset += 2 + size;
  }
  return [];
}

/** Re-encode the image through a canvas, which drops all metadata. */
export async function stripExif(file, { format = "image/jpeg", quality = 0.92 } = {}) {
  const bmp = await bitmapOf(file);
  const sw = bmp.width || bmp.naturalWidth, sh = bmp.height || bmp.naturalHeight;
  const canvas = canvasOf(sw, sh);
  const ctx = canvas.getContext("2d");
  if (format === "image/jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, sw, sh); }
  ctx.drawImage(bmp, 0, 0, sw, sh);
  return canvasToBlob(canvas, format, format === "image/png" ? undefined : quality);
}

/** Build a favicon bundle (PNG sizes + .ico) as a single ZIP. */
export async function makeFavicons(file, { sizes = [16, 32, 48, 180, 192, 512] } = {}) {
  const bmp = await bitmapOf(file);
  const sw = bmp.width || bmp.naturalWidth, sh = bmp.height || bmp.naturalHeight;
  const side = Math.min(sw, sh);
  const sx = (sw - side) / 2, sy = (sh - side) / 2;
  const pngs = [];
  for (const size of sizes) {
    const canvas = canvasOf(size, size);
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bmp, sx, sy, side, side, 0, 0, size, size);
    const blob = await canvasToBlob(canvas, "image/png");
    pngs.push({ size, blob });
  }
  const Z = await jszip();
  const zip = new Z();
  for (const p of pngs) zip.file(`favicon-${p.size}x${p.size}.png`, p.blob);
  zip.file("favicon.ico", await buildIco(pngs.filter(p => p.size <= 64)));
  zip.file("snippet.html", [
    '<link rel="icon" href="/favicon.ico" sizes="any">',
    '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">',
    '<link rel="apple-touch-icon" href="/favicon-180x180.png">',
    '<link rel="manifest" href="/site.webmanifest">'
  ].join("\n"));
  return { zip: await zip.generateAsync({ type: "blob" }), pngs };
}

/** Minimal ICO container wrapping PNG payloads (accepted by all modern browsers). */
async function buildIco(entries) {
  const blobs = await Promise.all(entries.map(async e => new Uint8Array(await e.blob.arrayBuffer())));
  const header = 6, dir = 16 * entries.length;
  const total = header + dir + blobs.reduce((a, b) => a + b.length, 0);
  const out = new Uint8Array(total);
  const dv = new DataView(out.buffer);
  dv.setUint16(0, 0, true); dv.setUint16(2, 1, true); dv.setUint16(4, entries.length, true);
  let dataOffset = header + dir;
  entries.forEach((e, i) => {
    const p = header + i * 16;
    out[p] = e.size >= 256 ? 0 : e.size;
    out[p + 1] = e.size >= 256 ? 0 : e.size;
    out[p + 2] = 0; out[p + 3] = 0;
    dv.setUint16(p + 4, 1, true); dv.setUint16(p + 6, 32, true);
    dv.setUint32(p + 8, blobs[i].length, true);
    dv.setUint32(p + 12, dataOffset, true);
    out.set(blobs[i], dataOffset);
    dataOffset += blobs[i].length;
  });
  return new Blob([out], { type: "image/x-icon" });
}

/* ================================================================
 * Conversion operations
 * ================================================================ */

/** Rasterize an SVG file to PNG at a target width (transparent background). */
export async function svgToPng(file, { width = 1024, background = null, quality = 1 } = {}) {
  let text = await file.text();
  // Do not execute active SVG content or load remote resources during rasterization.
  const doc = new DOMParser().parseFromString(text, "image/svg+xml");
  doc.querySelectorAll("script,foreignObject,iframe,object,embed,link").forEach(n => n.remove());
  doc.querySelectorAll("*").forEach(el => [...el.attributes].forEach(a => {
    if (/^on/i.test(a.name)) el.removeAttribute(a.name);
    else if (/^(href|xlink:href)$/i.test(a.name) && !/^#|^data:image\/(png|jpeg|gif|webp);base64,/i.test(a.value)) el.removeAttribute(a.name);
  }));
  text = new XMLSerializer().serializeToString(doc.documentElement);
  const url = URL.createObjectURL(new Blob([text], { type: "image/svg+xml" }));
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    await img.decode();
    const ratio = (img.naturalHeight || width) / (img.naturalWidth || width);
    const canvas = canvasOf(width, Math.max(1, width * ratio));
    const ctx = canvas.getContext("2d");
    if (background) { ctx.fillStyle = background; ctx.fillRect(0, 0, canvas.width, canvas.height); }
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvasToBlob(canvas, "image/png");
  } finally { URL.revokeObjectURL(url); }
}

/* ---------- JSON <-> YAML (common subset, dependency-free) ---------- */

export function jsonToYaml(value, indent = 0) {
  const pad = "  ".repeat(indent);
  if (value === null || value === undefined) return "null";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "string") {
    if (value === "" ) return '""';
    if (/^[\w\u0600-\u06FF][\w\u0600-\u06FF .\-/@]*$/.test(value) && !/^(true|false|null|~|\d)/.test(value)) return value;
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    return value.map(v => {
      const rendered = jsonToYaml(v, indent + 1);
      const multiline = rendered.includes("\n");
      return multiline
        ? `${pad}- ${rendered.trim().split("\n").join("\n" + pad + "  ")}`
        : `${pad}- ${rendered}`;
    }).join("\n");
  }
  const keys = Object.keys(value);
  if (!keys.length) return "{}";
  return keys.map(k => {
    const v = value[k];
    const key = /^[\w\u0600-\u06FF\-@]+$/.test(k) ? k : JSON.stringify(k);
    if (v !== null && typeof v === "object") {
      const inner = jsonToYaml(v, indent + 1);
      const empty = Array.isArray(v) ? "[]" : "{}";
      return `${pad}${key}: ${Object.keys(v).length ? "\n" + inner : empty}`;
    }
    return `${pad}${key}: ${jsonToYaml(v, indent + 1)}`;
  }).join("\n");
}

/** Parse a YAML document (maps, lists, scalars, quotes, comments, block text). */
export function yamlToJson(text) {
  const lines = String(text).replace(/\t/g, "  ").split(/\r?\n/);
  const root = {};
  const stack = [{ indent: -1, value: root, kind: "map" }];

  const scalar = (raw) => {
    let s = raw.trim();
    if (!s) return null;
    const hash = s.indexOf(" #");
    if (hash > -1 && !/^["']/.test(s)) s = s.slice(0, hash).trim();
    if (/^["']/.test(s)) return s.slice(1, s.endsWith(s[0]) && s.length > 1 ? -1 : undefined);
    if (s === "null" || s === "~" || s === "") return null;
    if (s === "true" || s === "false") return s === "true";
    if (/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(s)) return Number(s);
    if (s === "[]") return [];
    if (s === "{}") return {};
    if (/^\[.*\]$/.test(s) || /^\{.*\}$/.test(s)) {
      try { return JSON.parse(s.replace(/([{,]\s*)([A-Za-z_][\w-]*)\s*:/g, '$1"$2":').replace(/'/g, '"')); } catch { /* keep as text */ }
    }
    return s;
  };

  for (const rawLine of lines) {
    if (!rawLine.trim() || /^\s*#/.test(rawLine)) continue;
    if (/^---/.test(rawLine.trim())) continue;
    const indent = rawLine.match(/^\s*/)[0].length;
    const line = rawLine.trim();
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();
    const parent = stack[stack.length - 1];

    if (line.startsWith("- ")) {
      const rest = line.slice(2).trim();
      if (parent.kind !== "list") {
        // convert the current holder into a list
        const holder = parent.value;
        const key = parent.key;
        const container = parent.container;
        const list = [];
        if (key === undefined) { /* root list unsupported */ }
        else container[key] = list;
        parent.kind = "list"; parent.value = list;
      }
      const list = parent.value;
      const colon = rest.match(/^([\w\u0600-\u06FF"'-]+)\s*:\s*(.*)$/);
      if (colon) {
        const item = {};
        item[colon[1].replace(/^["']|["']$/g, "")] = scalar(colon[2]);
        list.push(item);
        stack.push({ indent, value: item, kind: "map", key: colon[1].replace(/^["']|["']$/g, ""), container: item });
      } else {
        list.push(scalar(rest));
      }
      continue;
    }

    const m = line.match(/^([^:]+):\s*(.*)$/);
    if (!m) continue;
    const key = m[1].trim().replace(/^["']|["']$/g, "");
    const rest = m[2];
    if (!rest.trim()) {
      const child = {};
      if (parent.kind === "list") parent.value.push({ [key]: child });
      else parent.value[key] = child;
      stack.push({ indent, value: child, kind: "map", key, container: parent.kind === "list" ? parent.value[parent.value.length - 1] : parent.value });
    } else {
      const v = scalar(rest);
      if (parent.kind === "list") parent.value.push({ [key]: v });
      else parent.value[key] = v;
    }
  }
  return root;
}

/* ================================================================
 * Text operations
 * ================================================================ */

/** Escape-then-format Markdown into clean HTML. */
export function mdToHtml(md) {
  const esc = String(md).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const blocks = [];
  let text = esc.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    blocks.push(`<pre><code${lang ? ` class="lang-${lang}"` : ""}>${code.replace(/\n$/, "")}</code></pre>`);
    return `\u0000BLOCK${blocks.length - 1}\u0000`;
  });
  const safeUrl = (href) => /^(https?:|mailto:|tel:|\/|#)/i.test(href) ? href : "#";
  text = text
    .replace(/^###### (.*)$/gm, "<h6>$1</h6>")
    .replace(/^##### (.*)$/gm, "<h5>$1</h5>")
    .replace(/^#### (.*)$/gm, "<h4>$1</h4>")
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/^\s*(?:---|\*\*\*|___)\s*$/gm, "<hr>")
    .replace(/^&gt; (.*)$/gm, "<blockquote>$1</blockquote>")
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, href) => `<img src="${safeUrl(href)}" alt="${alt}" loading="lazy">`)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => `<a href="${safeUrl(href)}" rel="noopener">${label}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|\W)\*([^*\n]+)\*(?=\W|$)/g, "$1<em>$2</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
  text = text.replace(/(?:^|\n)((?:[-*+] .*(?:\n|$))+)/g, (_, list) =>
    "\n<ul>" + list.trim().split("\n").map(l => `<li>${l.replace(/^[-*+] /, "")}</li>`).join("") + "</ul>");
  text = text.replace(/(?:^|\n)((?:\d+\. .*(?:\n|$))+)/g, (_, list) =>
    "\n<ol>" + list.trim().split("\n").map(l => `<li>${l.replace(/^\d+\. /, "")}</li>`).join("") + "</ol>");
  text = text.split(/\n{2,}/).map(p => {
    const t = p.trim();
    if (!t) return "";
    return /^<(h[1-6]|ul|ol|pre|blockquote|hr|img|table)/.test(t) ? t : `<p>${t.replace(/\n/g, "<br>")}</p>`;
  }).join("\n");
  return text.replace(/\u0000BLOCK(\d+)\u0000/g, (_, i) => blocks[+i]);
}

const ARABIC_TRANSLIT = {
  "ا": "a", "أ": "a", "إ": "i", "آ": "a", "ب": "b", "ت": "t", "ث": "th", "ج": "j", "ح": "h",
  "خ": "kh", "د": "d", "ذ": "dh", "ر": "r", "ز": "z", "س": "s", "ش": "sh", "ص": "s", "ض": "d",
  "ط": "t", "ظ": "z", "ع": "a", "غ": "gh", "ف": "f", "ق": "q", "ك": "k", "ل": "l", "م": "m",
  "ن": "n", "ه": "h", "و": "w", "ي": "y", "ى": "a", "ة": "a", "ء": "", "ئ": "e", "ؤ": "o",
  "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9"
};

/** Turn any text into a URL-safe slug. Arabic can be transliterated or kept. */
export function slugify(input, { sep = "-", keepArabic = true, lower = true } = {}) {
  let s = String(input || "").trim();
  s = s.replace(/[\u064B-\u065F\u0670\u0640]/g, ""); // diacritics + tatweel
  if (!keepArabic) s = s.split("").map(ch => ARABIC_TRANSLIT[ch] ?? ch).join("");
  s = s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  if (lower) s = s.toLowerCase();
  s = s.replace(/[^\p{L}\p{N}]+/gu, sep).replace(new RegExp(`^${sep}+|${sep}+$`, "g"), "");
  return s;
}

/** Clean a list of lines: trim, drop empties, dedupe, sort. */
export function cleanList(text, { trim = true, dropEmpty = true, dedupe = false, caseInsensitive = true, sort = "none", stripAccents = false } = {}) {
  let lines = String(text).split(/\r?\n/);
  if (trim) lines = lines.map(l => l.trim());
  if (dropEmpty) lines = lines.filter(l => l.length);
  if (stripAccents) lines = lines.map(l => l.normalize("NFKD").replace(/[\u0300-\u036f]/g, ""));
  if (dedupe) {
    const seen = new Set();
    lines = lines.filter(l => {
      const k = caseInsensitive ? l.toLowerCase() : l;
      if (seen.has(k)) return false;
      seen.add(k); return true;
    });
  }
  if (sort === "asc") lines.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  if (sort === "desc") lines.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  if (sort === "length") lines.sort((a, b) => a.length - b.length);
  return lines;
}

/* ---------- TOTP (RFC 6238) with WebCrypto ---------- */

const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
export function base32Decode(input) {
  const clean = String(input).toUpperCase().replace(/[\s=-]/g, "");
  let bits = 0, value = 0;
  const out = [];
  for (const ch of clean) {
    const idx = B32.indexOf(ch);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) { out.push((value >>> (bits - 8)) & 0xff); bits -= 8; }
  }
  return new Uint8Array(out);
}

/** Generate a time-based one-time password from a base32 secret. */
export async function totp(secret, { digits = 6, period = 30, algorithm = "SHA-1", timestamp = Date.now() } = {}) {
  const key = base32Decode(secret);
  if (!key.length) throw new Error("Invalid secret");
  const counter = Math.floor(timestamp / 1000 / period);
  const buf = new ArrayBuffer(8);
  const view = new DataView(buf);
  view.setUint32(0, Math.floor(counter / 2 ** 32));
  view.setUint32(4, counter >>> 0);
  const cryptoKey = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: algorithm }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", cryptoKey, buf));
  const offset = sig[sig.length - 1] & 0x0f;
  const code = ((sig[offset] & 0x7f) << 24 | sig[offset + 1] << 16 | sig[offset + 2] << 8 | sig[offset + 3]) % 10 ** digits;
  const secondsLeft = period - Math.floor(timestamp / 1000) % period;
  return { code: String(code).padStart(digits, "0"), secondsLeft, period };
}

/* ---------- password strength ---------- */

export function passwordStrength(pw) {
  const s = String(pw || "");
  const sets = [
    { re: /[a-z]/, size: 26 }, { re: /[A-Z]/, size: 26 }, { re: /[0-9]/, size: 10 },
    { re: /[^A-Za-z0-9]/, size: 33 }
  ];
  const pool = sets.reduce((a, set) => a + (set.re.test(s) ? set.size : 0), 0);
  const unique = new Set(s).size;
  const entropy = s.length && pool ? +(s.length * Math.log2(pool)).toFixed(1) : 0;
  const guessesPerSecond = 1e10; // offline GPU attack, order of magnitude
  const seconds = entropy ? 2 ** (entropy - 1) / guessesPerSecond : 0;
  const human = (sec) => {
    if (sec < 1) return "أقل من ثانية";
    const units = [["سنة", 31557600], ["يوم", 86400], ["ساعة", 3600], ["دقيقة", 60], ["ثانية", 1]];
    for (const [name, size] of units) if (sec >= size) return `${Math.round(sec / size).toLocaleString()} ${name}`;
    return "أقل من ثانية";
  };
  const tips = [];
  if (s.length < 12) tips.push("استخدم 12 حرفاً على الأقل (16+ أفضل).");
  if (!/[A-Z]/.test(s)) tips.push("أضف حرفاً كبيراً.");
  if (!/[0-9]/.test(s)) tips.push("أضف رقماً.");
  if (!/[^A-Za-z0-9]/.test(s)) tips.push("أضف رمزاً خاصاً.");
  if (unique < s.length / 2) tips.push("قلّل تكرار الأحرف.");
  const score = entropy >= 90 ? 4 : entropy >= 70 ? 3 : entropy >= 50 ? 2 : entropy >= 30 ? 1 : 0;
  const labels = ["ضعيفة جداً", "ضعيفة", "متوسطة", "قوية", "قوية جداً"];
  return { entropy, score, label: labels[score], crackTime: human(seconds), tips };
}
