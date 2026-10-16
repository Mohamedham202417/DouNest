/**
 * DouNest v5 — shared action catalogue
 * ------------------------------------------------------------------
 * Each action is one unit of work that can appear in two places:
 *   • inside a center (js/hubs/*.js)  → many actions over one upload
 *   • as its own tool page (js/tools/*.js) → the same action alone
 *
 * An action is: { id, label, icon, needs, options?, visible?, run(state, ui) }
 * `run` receives the workbench state (files/pdfs/imgs) and the ui helpers.
 */

import { workbench, isPdf, isImg } from "../hub-kit.js";
import * as ops from "./ops.js";

const EN = () => typeof document !== "undefined" && document.documentElement.lang === "en";
const t2 = (ar, en) => (EN() ? en : ar);
const isSvg = (f) => f.type === "image/svg+xml" || /\.svg$/i.test(f.name);
const isYaml = (f) => /\.(ya?ml)$/i.test(f.name);
const isJson = (f) => /\.json$/i.test(f.name) || f.type === "application/json";

/** Parse "1-3,5,8-10" into a zero-based page index array (order preserved). */
export function parsePageOrder(spec, total) {
  const out = [];
  for (const chunk of String(spec || "").split(/[,،\s]+/).filter(Boolean)) {
    const range = chunk.match(/^(\d+)\s*[-–]\s*(\d+)$/);
    if (range) {
      let [a, b] = [Math.min(+range[1], +range[2]), Math.max(+range[1], +range[2])];
      for (let i = a; i <= b; i++) out.push(i - 1);
    } else if (/^\d+$/.test(chunk)) {
      out.push(+chunk - 1);
    }
  }
  return out.filter(n => n >= 0 && (total ? n < total : true));
}

/* ============================== PDF ============================== */

export const PDF_ACTIONS = {
  compress: {
    id: "compress", label: t2("تقليل حجم PDF (يعيد الرسم كصور)", "Reduce PDF size (rasterizes pages)"), icon: "🗜️", needs: "pdfOne",
    options: [
      { id: "scale", kind: "select", label: t2("دقة الصفحات", "Page resolution"), value: "1.1", choices: [{ v: "1.5", label: t2("أعلى", "Higher") }, { v: "1.1", label: t2("متوسطة", "Medium") }, { v: "0.8", label: t2("أقل / حجم أصغر", "Lower / smaller") }] },
      { id: "quality", kind: "range", label: t2("جودة JPEG", "JPEG quality"), value: 0.7, min: 0.3, max: 0.95, step: 0.05 }
    ],
    async run(st, ui) {
      const f = st.pdfs[0];
      const blob = await ops.pdfCompressRaster(f, { scale: +ui.opt("scale"), quality: ui.opt("quality"), onProgress: (i,n) => ui.status(`${i}/${n}`) });
      const delta = f.size - blob.size, pct = Math.round(Math.abs(delta) / Math.max(1,f.size) * 100);
      ui.save(blob, `${ui.base(f.name)}-rasterized.pdf`);
      ui.status(`✓ ${Math.round(f.size/1024)} KB → ${Math.round(blob.size/1024)} KB (${pct}% ${t2(delta >= 0 ? "أصغر أو مساوٍ" : "أكبر", delta >= 0 ? "smaller or same" : "larger")}) · ${t2("النص أصبح صوراً؛ افحص الملف.", "Text is rasterized; review the output.")}`);
    }
  },
  merge: {
    id: "merge", label: t2("دمج ملفات PDF", "Merge PDFs"), icon: "🔗", needs: "pdf2",
    async run(st, ui) {
      const blob = await ops.pdfMerge(st.pdfs);
      ui.save(blob, "merged.pdf"); ui.status(`✓ ${st.pdfs.length} ${t2("ملفات مدمجة", "files merged")} · ${Math.round(blob.size/1024)} KB`);
    }
  },
  split: {
    id: "split", label: t2("تقسيم كل صفحة (ZIP)", "Split every page (ZIP)"), icon: "✂️", needs: "pdfOne",
    async run(st, ui) {
      const f = st.pdfs[0], blob = await ops.pdfSplitZip(f, (i,n) => ui.status(`${i}/${n}`));
      ui.save(blob, `${ui.base(f.name)}-pages.zip`); ui.status("✓ " + t2("تم تقسيم الصفحات", "Pages split"));
    }
  },
  rotate: {
    id: "rotate", label: t2("تدوير جميع الصفحات", "Rotate all pages"), icon: "🔄", needs: "pdfOne",
    options: [{ id: "angle", kind: "select", label: t2("الزاوية", "Angle"), value: 90, choices: [90,180,270].map(v => ({ v, label: `${v}°` })) }],
    async run(st, ui) { const f=st.pdfs[0], blob=await ops.pdfRotate(f,ui.opt("angle")); ui.save(blob,`${ui.base(f.name)}-rotated.pdf`); ui.status("✓"); }
  },
  toJpg: {
    id: "toJpg", label: t2("PDF إلى JPG (ZIP)", "PDF to JPG (ZIP)"), icon: "🖼️", needs: "pdfOne",
    options: [{ id: "jpgQuality", kind: "range", label: t2("جودة JPG", "JPG quality"), value: 0.85, min: 0.4, max: 0.98, step: 0.02 }],
    async run(st, ui) { const f=st.pdfs[0], blob=await ops.pdfToJpgZip(f,{quality:ui.opt("jpgQuality"),onProgress:(i,n)=>ui.status(`${i}/${n}`)}); ui.save(blob,`${ui.base(f.name)}-jpg.zip`); ui.status("✓"); }
  },
  toText: {
    id: "toText", label: t2("استخراج النص إلى TXT", "Extract text to TXT"), icon: "📝", needs: "pdfOne",
    async run(st,ui) { const f=st.pdfs[0], text=await ops.pdfExtractText(f,(i,n)=>ui.status(`${i}/${n}`)); ui.save(new Blob([text],{type:"text/plain;charset=utf-8"}),`${ui.base(f.name)}.txt`); ui.status("✓"); }
  },
  toWord: {
    id: "toWord", label: t2("استخراج النص إلى DOC", "Extract text to DOC"), icon: "📄", needs: "pdfOne",
    async run(st,ui) { const f=st.pdfs[0], blob=await ops.pdfToWordDoc(f,(i,n)=>ui.status(`${i}/${n}`)); ui.save(blob,`${ui.base(f.name)}-text.doc`); ui.status("✓ · "+t2("ملف DOC مبني على HTML؛ راجع التخطيط.","HTML-based DOC; review layout.")); }
  },
  imagesToPdf: {
    id: "imagesToPdf", label: t2("صور إلى PDF", "Images to PDF"), icon: "📸", needs: "image",
    async run(st,ui) { const blob=await ops.imagesToPdf(st.imgs); ui.save(blob,"images.pdf"); ui.status(`✓ ${st.imgs.length} ${t2("صور", "images")}`); }
  },
  organize: {
    id: "organize", label: t2("إعادة ترتيب/حذف صفحات", "Reorder / delete pages"), icon: "🗂️", needs: "pdf",
    options: [
      { id: "order", kind: "text", label: t2("ترتيب الصفحات (مثال: 3,1,5-7)", "Page order (e.g. 3,1,5-7)"), value: "1-3" }
    ],
    async run(st, ui) {
      const spec = ui.opt("order");
      const order = parsePageOrder(spec);
      if (!order.length) throw new Error(t2("اكتب ترتيب الصفحات أولاً", "Enter the page order first"));
      const blob = await ops.pdfOrganize(st.pdfs[0], order);
      ui.save(blob, `${ui.base(st.pdfs[0].name)}-organized.pdf`);
      ui.status(`✓ ${order.length} ${t2("صفحة", "pages")} → ${blob.size ? Math.round(blob.size / 1024) + " KB" : ""}`);
    }
  },
  watermark: {
    id: "watermark", label: t2("علامة مائية", "Watermark"), icon: "💧", needs: "pdf",
    options: [
      { id: "text", kind: "text", label: t2("نص العلامة (لاتيني)", "Watermark text (Latin)"), value: "CONFIDENTIAL" },
      { id: "size", kind: "number", label: t2("حجم الخط", "Font size"), value: 42, min: 10, max: 120 },
      { id: "opacity", kind: "range", label: t2("الشفافية", "Opacity"), value: 0.15, min: 0.05, max: 0.6, step: 0.05 }
    ],
    async run(st, ui) {
      const blob = await ops.pdfWatermark(st.pdfs[0], {
        text: ui.opt("text"), size: ui.opt("size"), opacity: ui.opt("opacity")
      });
      ui.save(blob, `${ui.base(st.pdfs[0].name)}-watermark.pdf`);
      ui.status("✓ " + t2("تمت إضافة العلامة المائية", "Watermark added"));
    }
  },
  pageNumbers: {
    id: "pageNumbers", label: t2("ترقيم الصفحات", "Add page numbers"), icon: "🔢", needs: "pdf",
    options: [
      {
        id: "position", kind: "select", label: t2("الموضع", "Position"), value: "bottom-center",
        choices: [
          { v: "bottom-center", label: t2("أسفل الوسط", "Bottom center") },
          { v: "bottom-right", label: t2("أسفل اليمين", "Bottom right") },
          { v: "bottom-left", label: t2("أسفل اليسار", "Bottom left") },
          { v: "top-center", label: t2("أعلى الوسط", "Top center") }
        ]
      },
      { id: "startAt", kind: "number", label: t2("ابدأ من", "Start at"), value: 1, min: 1, max: 9999 }
    ],
    async run(st, ui) {
      const blob = await ops.pdfPageNumbers(st.pdfs[0], { position: ui.opt("position"), startAt: ui.opt("startAt") });
      ui.save(blob, `${ui.base(st.pdfs[0].name)}-numbered.pdf`);
      ui.status("✓ " + t2("تم ترقيم الصفحات", "Page numbers added"));
    }
  }
};

/* ============================= IMAGES ============================ */

const RATIOS = {
  free: null, "1:1": 1, "4:5": 4 / 5, "16:9": 16 / 9, "9:16": 9 / 16, "3:2": 3 / 2
};

async function saveImageBatch(files, blobs, ui, suffix, extension) {
  if (blobs.length === 1) {
    ui.save(blobs[0], `${ui.base(files[0].name)}-${suffix}.${extension}`);
    return [{ name: files[0].name, before: files[0].size, after: blobs[0].size }];
  }
  const Zip = await ops.jszip(), zip = new Zip();
  blobs.forEach((blob, i) => zip.file(`${String(i+1).padStart(2,"0")}-${ui.base(files[i].name)}-${suffix}.${extension}`, blob));
  ui.save(await zip.generateAsync({ type: "blob" }), `${suffix}-images.zip`);
  return blobs.map((b,i) => ({ name: files[i].name, before: files[i].size, after: b.size }));
}
function imageSummary(rows, ui) {
  const ar = !EN();
  ui.result(rows.map(r => `${r.name}: ${Math.round(r.before/1024)} KB → ${Math.round(r.after/1024)} KB`).join("\n"));
}

export const IMAGE_ACTIONS = {
  convertWebp: {
    id: "convertWebp", label: t2("تحويل إلى WebP", "Convert to WebP"), icon: "⚡", needs: "image",
    options: [{ id: "webpQuality", kind: "range", label: t2("جودة WebP", "WebP quality"), value: 0.82, min: 0.35, max: 1, step: 0.05 }],
    async run(st,ui) { const blobs=await Promise.all(st.imgs.map(f=>ops.imageEncode(f,{format:"image/webp",quality:ui.opt("webpQuality")}))); const rows=await saveImageBatch(st.imgs,blobs,ui,"converted","webp"); imageSummary(rows,ui); ui.status("✓"); }
  },
  compressJpg: {
    id: "compressJpg", label: t2("ضغط إلى JPG", "Compress to JPG"), icon: "🗜️", needs: "image",
    options: [{ id: "jpgQuality", kind: "range", label: t2("جودة JPG", "JPG quality"), value: 0.82, min: 0.35, max: 1, step: 0.05 }],
    async run(st,ui) { const blobs=await Promise.all(st.imgs.map(f=>ops.imageEncode(f,{format:"image/jpeg",quality:ui.opt("jpgQuality"),background:"#fff"}))); const rows=await saveImageBatch(st.imgs,blobs,ui,"compressed","jpg"); imageSummary(rows,ui); ui.status("✓ " + t2("خلفية JPG بيضاء؛ قارن الحجم.","JPEG background is white; compare sizes.")); }
  },
  resize: {
    id: "resize", label: t2("تغيير العرض", "Resize width"), icon: "↔️", needs: "image",
    options: [{ id: "newWidth", kind: "number", label: t2("العرض الأقصى (px)", "Maximum width (px)"), value: 1200, min: 16, max: 10000 }],
    async run(st,ui) { const blobs=await Promise.all(st.imgs.map(f=>ops.imageEncode(f,{format:f.type==="image/png"?"image/png":"image/webp",width:ui.opt("newWidth")}))); const ext=st.imgs[0].type==="image/png"?"png":"webp"; const rows=await saveImageBatch(st.imgs,blobs,ui,"resized",ext); imageSummary(rows,ui); ui.status("✓"); }
  },
  removeBackground: {
    id: "removeBackground", label: t2("إزالة الخلفية (صورة واحدة)", "Remove background (one image)"), icon: "✂️", needs: "image", visible: st => st.imgs.length === 1,
    async run(st,ui) { ui.status(t2("جارٍ تحميل نموذج إزالة الخلفية…", "Loading background-removal model…")); const mod=await import("https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.5/+esm"); const fn=mod.default||mod.removeBackground; if(typeof fn!=="function") throw new Error("Background-removal model unavailable"); const blob=await fn(st.imgs[0],{output:{format:"image/png",type:"foreground"},model:"isnet_quint8",progress:(key,cur,total)=>ui.status(`${key}: ${Math.round(cur/Math.max(1,total)*100)}%`)}); ui.save(blob,`${ui.base(st.imgs[0].name)}-no-background.png`); ui.status("✓"); }
  },
  toPdf: {
    id: "toPdf", label: t2("صور إلى PDF", "Images to PDF"), icon: "📄", needs: "image",
    async run(st,ui) { const blob=await ops.imagesToPdf(st.imgs); ui.save(blob,"images.pdf"); ui.status(`✓ ${st.imgs.length} ${t2("صور؛ الخلفيات الشفافة تصبح بيضاء.","images; transparent areas become white.")}`); }
  },
  crop: {
    id: "crop", label: t2("قص الصورة", "Crop image"), icon: "✂️", needs: "image",
    options: [
      {
        id: "ratio", kind: "select", label: t2("النسبة", "Ratio"), value: "1:1",
        choices: Object.keys(RATIOS).map(k => ({ v: k, label: k === "free" ? t2("حر", "Free") : k }))
      },
      { id: "x", kind: "number", label: "X (px)", value: 0, min: 0, max: 100000 },
      { id: "y", kind: "number", label: "Y (px)", value: 0, min: 0, max: 100000 },
      { id: "w", kind: "number", label: t2("العرض (px)", "Width (px)"), value: 800, min: 1, max: 100000 },
      {
        id: "format", kind: "select", label: t2("الصيغة", "Format"), value: "image/png",
        choices: [{ v: "image/png", label: "PNG" }, { v: "image/jpeg", label: "JPG" }, { v: "image/webp", label: "WebP" }]
      }
    ],
    async run(st, ui) {
      const ratioKey = ui.opt("ratio");
      const ratio = RATIOS[ratioKey];
      for (const f of st.imgs) {
        const bmp = await ops.bitmapOf(f);
        const sw = bmp.width || bmp.naturalWidth, sh = bmp.height || bmp.naturalHeight;
        let w = ui.opt("w") || sw, h;
        if (ratio) {
          w = Math.min(sw, sh * ratio);
          h = w / ratio;
        } else {
          h = Math.round(w * (sh / sw));
        }
        const blob = await ops.imageCrop(f, {
          x: ratio ? (sw - w) / 2 : ui.opt("x"),
          y: ratio ? (sh - h) / 2 : ui.opt("y"),
          width: w, height: h, format: ui.opt("format")
        });
        const ext = ui.opt("format").split("/")[1].replace("jpeg", "jpg");
        ui.save(blob, `${ui.base(f.name)}-cropped.${ext}`);
      }
      ui.status(`✓ ${t2("تم قص", "Cropped")} ${st.imgs.length}`);
    }
  },
  rotateFlip: {
    id: "rotateFlip", label: t2("تدوير / قلب", "Rotate / flip"), icon: "🔄", needs: "image",
    options: [
      {
        id: "rotate", kind: "select", label: t2("التدوير", "Rotation"), value: "90",
        choices: [{ v: "0", label: "0°" }, { v: "90", label: "90°" }, { v: "180", label: "180°" }, { v: "270", label: "270°" }]
      },
      { id: "flipH", kind: "checkbox", label: t2("قلب أفقي", "Flip horizontal"), value: false },
      { id: "flipV", kind: "checkbox", label: t2("قلب عمودي", "Flip vertical"), value: false },
      {
        id: "format", kind: "select", label: t2("الصيغة", "Format"), value: "image/png",
        choices: [{ v: "image/png", label: "PNG" }, { v: "image/jpeg", label: "JPG" }, { v: "image/webp", label: "WebP" }]
      }
    ],
    async run(st, ui) {
      const opts = { rotate: ui.opt("rotate"), flipH: ui.opt("flipH"), flipV: ui.opt("flipV"), format: ui.opt("format") };
      for (const f of st.imgs) {
        const blob = await ops.imageRotateFlip(f, opts);
        const ext = opts.format.split("/")[1].replace("jpeg", "jpg");
        ui.save(blob, `${ui.base(f.name)}-rotated.${ext}`);
      }
      ui.status(`✓ ${t2("تم التدوير", "Rotated")} ${st.imgs.length}`);
    }
  },
  exif: {
    id: "exif", label: t2("عرض بيانات EXIF", "View EXIF metadata"), icon: "🔎", needs: "image", visible: st => st.files.length === 1,
    async run(st, ui) {
      const rows = await ops.readExif(st.files[0]);
      if (!rows.length) return ui.result(t2("لا توجد بيانات EXIF في هذه الصورة (أو الصيغة غير مدعومة — تعمل الأداة مع JPEG).",
        "No EXIF data found (or unsupported format — this works with JPEG)."));
      ui.result(rows.map(r => `${r.tag}: ${r.value}`).join("\n"));
    }
  },
  stripExif: {
    id: "stripExif", label: t2("إزالة بيانات EXIF", "Strip EXIF metadata"), icon: "🧼", needs: "image",
    options: [
      {
        id: "format", kind: "select", label: t2("صيغة الحفظ", "Output format"), value: "image/jpeg",
        choices: [{ v: "image/jpeg", label: "JPG" }, { v: "image/png", label: "PNG" }, { v: "image/webp", label: "WebP" }]
      }
    ],
    async run(st, ui) {
      const format = ui.opt("format");
      const ext = format.split("/")[1].replace("jpeg", "jpg");
      for (const f of st.imgs) {
        ui.save(await ops.stripExif(f, { format }), `${ui.base(f.name)}-clean.${ext}`);
      }
      ui.status("✓ " + t2("أُزيلت البيانات الوصفية", "Metadata removed"));
    }
  },
  favicon: {
    id: "favicon", label: t2("توليد Favicon", "Generate favicons"), icon: "⭐", needs: "image", visible: st => st.files.length === 1,
    async run(st, ui) {
      const { zip, pngs } = await ops.makeFavicons(st.imgs[0] || st.files[0]);
      ui.save(zip, "favicons.zip");
      ui.status("✓ " + t2(`تم توليد ${pngs.length} مقاسات + ICO`, `${pngs.length} sizes + ICO generated`));
    }
  }
};

/* ============================ CONVERT ============================ */

function parseCSV(text) {
  const rows=[]; let row=[], cell="", quoted=false;
  for(let i=0;i<text.length;i++) { const c=text[i];
    if(quoted) { if(c==='"' && text[i+1]==='"') { cell+='"'; i++; } else if(c==='"') quoted=false; else cell+=c; }
    else if(c==='"') quoted=true;
    else if(c===",") { row.push(cell); cell=""; }
    else if(c==="\n" || c==="\r") { if(c==="\r"&&text[i+1]==="\n") i++; row.push(cell); cell=""; if(row.some(x=>x!=="")) rows.push(row); row=[]; }
    else cell+=c;
  }
  row.push(cell); if(row.some(x=>x!=="")) rows.push(row); return rows;
}
const csvCell = v => { const s=v==null?"":typeof v==="object"?JSON.stringify(v):String(v); return /[",\n\r]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s; };
async function readXlsxRows(file) {
  const Zip=await ops.jszip(), zip=await Zip.loadAsync(await file.arrayBuffer());
  let shared=[];
  if(zip.file("xl/sharedStrings.xml")) { const doc=new DOMParser().parseFromString(await zip.file("xl/sharedStrings.xml").async("text"),"text/xml"); shared=[...doc.getElementsByTagName("si")].map(si=>[...si.getElementsByTagName("t")].map(n=>n.textContent).join("")); }
  const name=zip.file("xl/worksheets/sheet1.xml")?"xl/worksheets/sheet1.xml":Object.keys(zip.files).find(n=>/^xl\/worksheets\/sheet\d+\.xml$/.test(n));
  if(!name) throw new Error(t2("لم يُعثر على ورقة عمل XLSX","No XLSX worksheet found"));
  const doc=new DOMParser().parseFromString(await zip.file(name).async("text"),"text/xml");
  return [...doc.getElementsByTagName("row")].map(row=>[...row.getElementsByTagName("c")].map(cell=>{const v=cell.getElementsByTagName("v")[0]?.textContent??"";return cell.getAttribute("t")==="s"?(shared[+v]??""):v;}));
}

export const CONVERT_ACTIONS = {
  imageFormat: {
    id: "imageFormat", label: t2("تحويل صورة إلى PNG/JPG/WebP", "Convert image to PNG/JPG/WebP"), icon: "🖼️", needs: "image",
    options: [{ id: "targetFormat", kind: "select", label: t2("صيغة الخرج", "Output format"), value: "image/png", choices: [{v:"image/png",label:"PNG"},{v:"image/jpeg",label:"JPG"},{v:"image/webp",label:"WebP"}] }],
    async run(st,ui) { const format=ui.opt("targetFormat"),ext=format.split("/")[1].replace("jpeg","jpg"), blobs=[]; for(const f of st.imgs) blobs.push(await ops.imageEncode(f,{format,quality:0.9,background:"#fff"})); const rows=await saveImageBatch(st.imgs,blobs,ui,"converted",ext); imageSummary(rows,ui); ui.status("✓ " + t2("قد يفقد JPG الشفافية.","JPG may lose transparency.")); }
  },
  csvToJson: {
    id: "csvToJson", label: t2("CSV → JSON", "CSV → JSON"), icon: "📊", needs: "one", visible: st=>st.files.some(f=>/\.csv$/i.test(f.name)),
    async run(st,ui) { const f=st.files[0],rows=parseCSV(await f.text()); if(!rows.length) throw new Error("Empty CSV"); const headers=rows[0],out=rows.slice(1).map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]??""]))); const text=JSON.stringify(out,null,2); ui.result(text); ui.save(new Blob([text],{type:"application/json"}),`${ui.base(f.name)}.json`); ui.status("✓"); }
  },
  jsonToCsv: {
    id: "jsonToCsv", label: t2("JSON → CSV", "JSON → CSV"), icon: "📊", needs: "one", visible: st=>st.files.some(isJson),
    async run(st,ui) { const f=st.files[0],data=JSON.parse(await f.text()),arr=Array.isArray(data)?data:[data],keys=[...new Set(arr.flatMap(o=>o&&typeof o==="object"?Object.keys(o):[]))]; const text="\uFEFF"+[keys.map(csvCell).join(","),...arr.map(o=>keys.map(k=>csvCell(o?.[k])).join(","))].join("\r\n"); ui.result(text); ui.save(new Blob([text],{type:"text/csv;charset=utf-8"}),`${ui.base(f.name)}.csv`); ui.status("✓"); }
  },
  xlsxToCsv: {
    id: "xlsxToCsv", label: t2("XLSX → CSV (الورقة الأولى)", "XLSX → CSV (first sheet)"), icon: "📊", needs: "one", visible: st=>st.files.some(f=>/\.xlsx?$/i.test(f.name)),
    async run(st,ui) { const f=st.files[0],rows=await readXlsxRows(f),text="\uFEFF"+rows.map(r=>r.map(csvCell).join(",")).join("\r\n"); ui.result(text); ui.save(new Blob([text],{type:"text/csv;charset=utf-8"}),`${ui.base(f.name)}.csv`); ui.status("✓ " + t2("الورقة الأولى فقط؛ الصيغ والتنسيقات لا تُحفظ.","First worksheet only; formulas and formatting are not preserved.")); }
  },
  xlsxToJson: {
    id: "xlsxToJson", label: t2("XLSX → JSON (الورقة الأولى)", "XLSX → JSON (first sheet)"), icon: "📊", needs: "one", visible: st=>st.files.some(f=>/\.xlsx?$/i.test(f.name)),
    async run(st,ui) { const f=st.files[0],rows=await readXlsxRows(f); if(!rows.length) throw new Error("Empty workbook"); const out=rows.slice(1).map(r=>Object.fromEntries(rows[0].map((h,i)=>[h,r[i]??""]))),text=JSON.stringify(out,null,2); ui.result(text); ui.save(new Blob([text],{type:"application/json"}),`${ui.base(f.name)}.json`); ui.status("✓ " + t2("الورقة الأولى فقط؛ الصيغ والتنسيقات لا تُحفظ.","First worksheet only; formulas and formatting are not preserved.")); }
  },
  docxToText: {
    id: "docxToText", label: t2("DOCX → TXT", "DOCX → TXT"), icon: "📄", needs: "one", visible: st=>st.files.some(f=>/\.docx$/i.test(f.name)),
    async run(st,ui) { const f=st.files[0],Zip=await ops.jszip(),zip=await Zip.loadAsync(await f.arrayBuffer()),entry=zip.file("word/document.xml"); if(!entry) throw new Error("Invalid DOCX"); const xml=await entry.async("text"),doc=new DOMParser().parseFromString(xml,"application/xml"); const text=[...doc.getElementsByTagName("w:p")].map(p=>[...p.getElementsByTagName("w:t")].map(n=>n.textContent).join("")).join("\n"); ui.result(text); ui.save(new Blob([text],{type:"text/plain;charset=utf-8"}),`${ui.base(f.name)}.txt`); ui.status("✓ " + t2("النص فقط؛ الصور والتنسيق لا يُحفظان.","Text only; images and formatting are not preserved.")); }
  },
  textToPdf: {
    id: "textToPdf", label: t2("TXT → PDF (لاتيني فقط)", "TXT → PDF (Latin text only)"), icon: "📄", needs: "one", visible: st=>st.files.some(f=>/\.(txt|md)$/i.test(f.name)),
    async run(st,ui) { const f=st.files[0],src=await f.text(),text=src.replace(/[^\x00-\xFF]/g,"?").slice(0,20000),{PDFDocument,StandardFonts}=await ops.pdfLib(),doc=await PDFDocument.create(),font=await doc.embedFont(StandardFonts.Helvetica); let page=doc.addPage([595,842]),y=800; for(const line of text.split(/\r?\n/)){if(y<50){page=doc.addPage([595,842]);y=800;} page.drawText(line.slice(0,90),{x:45,y,size:11,font}); y-=17;} const blob=new Blob([await doc.save()],{type:"application/pdf"}); ui.save(blob,`${ui.base(f.name)}.pdf`); ui.status("✓ " + t2("الأحرف غير اللاتينية تُستبدل بعلامة ؟.","Non-Latin characters are replaced with ?.")); }
  },
  svgToPng: {
    id: "svgToPng", label: t2("SVG → PNG", "SVG → PNG"), icon: "🖼️", needs: "any",
    visible: st => st.files.some(isSvg),
    options: [
      { id: "width", kind: "number", label: t2("العرض بالبكسل", "Width in px"), value: 1024, min: 16, max: 8000 },
      { id: "bg", kind: "text", label: t2("لون الخلفية (اتركه فارغاً للشفافية)", "Background (empty = transparent)"), value: "" }
    ],
    async run(st, ui) {
      const svgs = st.files.filter(isSvg);
      for (const f of svgs) {
        const blob = await ops.svgToPng(f, { width: ui.opt("width"), background: ui.opt("bg") || null });
        ui.save(blob, `${ui.base(f.name)}-${ui.opt("width")}.png`);
      }
      ui.status(`✓ ${svgs.length} PNG`);
    }
  },
  jsonYaml: {
    id: "jsonYaml", label: t2("JSON ↔ YAML", "JSON ↔ YAML"), icon: "🔁", needs: "none",
    visible: st => !st.files.length || st.files.some(f => isJson(f) || isYaml(f)),
    options: [
      {
        id: "direction", kind: "select", label: t2("الاتجاه", "Direction"), value: "auto",
        choices: [
          { v: "auto", label: t2("تلقائي حسب الملف", "Auto from file") },
          { v: "json2yaml", label: "JSON → YAML" },
          { v: "yaml2json", label: "YAML → JSON" }
        ]
      }
    ],
    async run(st, ui) {
      const f = st.files[0];
      const text = f ? await f.text() : ui.inputText();
      if (!text.trim()) throw new Error(t2("أضف ملفاً أو الصق النص", "Add a file or paste text"));
      let dir = ui.opt("direction");
      if (dir === "auto") dir = (f && isYaml(f)) || (!f && /^\s*(---|[\w"']+\s*:)/.test(text)) ? "yaml2json" : "json2yaml";
      const out = dir === "yaml2json"
        ? JSON.stringify(ops.yamlToJson(text), null, 2)
        : ops.jsonToYaml(JSON.parse(text));
      ui.result(out);
      ui.save(new Blob([out], { type: "text/plain;charset=utf-8" }), `${f ? ui.base(f.name) : "converted"}.${dir === "yaml2json" ? "json" : "yaml"}`);
      ui.status("✓ " + dir.toUpperCase());
    }
  }
};

/* ============================== TEXT ============================= */

export const TEXT_ACTIONS = {
  mdToHtml: {
    id: "mdToHtml", label: t2("Markdown → HTML", "Markdown → HTML"), icon: "📝", needs: "none",
    async run(st, ui) {
      const src = ui.inputText() || (st.files[0] ? await st.files[0].text() : "");
      if (!src.trim()) throw new Error(t2("الصق نص Markdown أولاً", "Paste Markdown first"));
      const html = ops.mdToHtml(src);
      ui.result(html);
      ui.save(new Blob([html], { type: "text/html;charset=utf-8" }), "markdown.html");
      ui.status("✓ HTML");
    }
  },
  slugify: {
    id: "slugify", label: t2("مولّد Slug", "Slug generator"), icon: "🔗", needs: "none",
    options: [
      { id: "sep", kind: "select", label: t2("الفاصل", "Separator"), value: "-", choices: [{ v: "-", label: "-" }, { v: "_", label: "_" }] },
      { id: "keepArabic", kind: "checkbox", label: t2("الاحتفاظ بالحروف العربية", "Keep Arabic letters"), value: true }
    ],
    async run(st, ui) {
      const src = ui.inputText() || "";
      const lines = String(src).split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      if (!lines.length) throw new Error(t2("أدخل عنواناً أو أكثر", "Enter one or more titles"));
      const out = lines.map(l => ops.slugify(l, { sep: ui.opt("sep"), keepArabic: ui.opt("keepArabic") })).join("\n");
      ui.result(out);
      ui.status(`✓ ${lines.length} ${t2("رابط", "slugs")}`);
    }
  },
  cleanList: {
    id: "cleanList", label: t2("تنظيف القوائم", "Clean list"), icon: "🧹", needs: "none",
    options: [
      { id: "dedupe", kind: "checkbox", label: t2("حذف المكرر", "Remove duplicates"), value: true },
      {
        id: "sort", kind: "select", label: t2("الترتيب", "Sort"), value: "none",
        choices: [
          { v: "none", label: t2("كما هو", "Keep order") },
          { v: "asc", label: t2("أبجدي أ→ي", "A → Z") },
          { v: "desc", label: t2("أبجدي ي→أ", "Z → A") },
          { v: "length", label: t2("حسب الطول", "By length") }
        ]
      },
      { id: "caseInsensitive", kind: "checkbox", label: t2("تجاهل حالة الأحرف في المكرر", "Ignore case when deduping"), value: true }
    ],
    async run(st, ui) {
      const src = ui.inputText() || "";
      if (!src.trim()) throw new Error(t2("الصق القائمة أولاً", "Paste the list first"));
      const before = src.split(/\r?\n/).filter(l => l.trim()).length;
      const lines = ops.cleanList(src, {
        dedupe: ui.opt("dedupe"), sort: ui.opt("sort"), caseInsensitive: ui.opt("caseInsensitive")
      });
      ui.result(lines.join("\n"));
      ui.status(`✓ ${before} → ${lines.length}`);
    }
  },
  stats: {
    id: "stats", label: t2("إحصاءات النص", "Text statistics"), icon: "🔢", needs: "none",
    async run(st, ui) {
      const src = ui.inputText() || "";
      if (!src.trim()) throw new Error(t2("الصق النص أولاً", "Paste text first"));
      const words = src.trim().split(/\s+/).filter(Boolean).length;
      const chars = src.length;
      const noSpaces = src.replace(/\s/g, "").length;
      const lines = src.split(/\r?\n/).length;
      const sentences = (src.match(/[.!?؟।]+/g) || []).length || 1;
      const minutes = Math.max(1, Math.round(words / 200));
      ui.result([
        `${t2("الكلمات", "Words")}: ${words}`,
        `${t2("الأحرف", "Characters")}: ${chars}`,
        `${t2("بدون فراغات", "Without spaces")}: ${noSpaces}`,
        `${t2("الأسطر", "Lines")}: ${lines}`,
        `${t2("الجمل", "Sentences")}: ${sentences}`,
        `${t2("زمن القراءة", "Reading time")}: ~${minutes} ${t2("دقيقة", "min")}`
      ].join("\n"));
      ui.status("✓");
    }
  }
};

/* ============================ DEVELOPER ========================== */

async function digest(algo, text) {
  const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

const b64encode = (s) => btoa(String.fromCharCode(...new TextEncoder().encode(s)));
const b64decode = (s) => new TextDecoder().decode(Uint8Array.from(atob(s.trim()), c => c.charCodeAt(0)));

export const DEV_ACTIONS = {
  jsonFormat: {
    id: "jsonFormat", label: t2("تنسيق/تصغير JSON", "Format / minify JSON"), icon: "{}", needs: "none",
    options: [
      {
        id: "mode", kind: "select", label: t2("الوضع", "Mode"), value: "beautify",
        choices: [
          { v: "beautify", label: t2("تنسيق", "Beautify") },
          { v: "minify", label: t2("تصغير", "Minify") },
          { v: "validate", label: t2("تحقق فقط", "Validate only") }
        ]
      },
      { id: "indent", kind: "number", label: t2("المسافة البادئة", "Indent"), value: 2, min: 1, max: 8 }
    ],
    async run(st, ui) {
      const src = ui.inputText() || "";
      let data;
      try { data = JSON.parse(src); }
      catch (e) { throw new Error(t2("JSON غير صالح: ", "Invalid JSON: ") + e.message); }
      const mode = ui.opt("mode");
      if (mode === "validate") return ui.result(t2("✓ JSON صالح", "✓ Valid JSON"));
      ui.result(mode === "minify" ? JSON.stringify(data) : JSON.stringify(data, null, ui.opt("indent")));
      ui.status("✓");
    }
  },
  base64: {
    id: "base64", label: t2("Base64", "Base64"), icon: "64", needs: "none",
    options: [
      {
        id: "mode", kind: "select", label: t2("الوضع", "Mode"), value: "encode",
        choices: [{ v: "encode", label: t2("ترميز", "Encode") }, { v: "decode", label: t2("فك ترميز", "Decode") }]
      }
    ],
    async run(st, ui) {
      const src = ui.inputText() || "";
      if (!src.trim()) throw new Error(t2("أدخل نصاً", "Enter text"));
      ui.result(ui.opt("mode") === "encode" ? b64encode(src) : b64decode(src));
      ui.status("✓");
    }
  },
  urlCode: {
    id: "urlCode", label: t2("ترميز URL", "URL encode"), icon: "%", needs: "none",
    options: [
      {
        id: "mode", kind: "select", label: t2("الوضع", "Mode"), value: "encode",
        choices: [{ v: "encode", label: t2("ترميز", "Encode") }, { v: "decode", label: t2("فك ترميز", "Decode") }]
      }
    ],
    async run(st, ui) {
      const src = ui.inputText() || "";
      ui.result(ui.opt("mode") === "encode" ? encodeURIComponent(src) : decodeURIComponent(src));
      ui.status("✓");
    }
  },
  jwt: {
    id: "jwt", label: t2("فك JWT", "Decode JWT"), icon: "🔑", needs: "none",
    async run(st, ui) {
      const token = (ui.inputText() || "").trim();
      const parts = token.split(".");
      if (parts.length < 2) throw new Error(t2("رمز JWT غير صالح", "Not a valid JWT"));
      const dec = (p) => JSON.stringify(JSON.parse(b64decode(p.replace(/-/g, "+").replace(/_/g, "/"))), null, 2);
      ui.result(`${t2("الهيدر", "Header")}:\n${dec(parts[0])}\n\n${t2("الحمولة", "Payload")}:\n${dec(parts[1])}`);
      ui.status("✓");
    }
  },
  hash: {
    id: "hash", label: t2("توليد Hash", "Generate hash"), icon: "#", needs: "none",
    options: [
      {
        id: "algo", kind: "select", label: t2("الخوارزمية", "Algorithm"), value: "SHA-256",
        choices: [{ v: "SHA-1", label: "SHA-1" }, { v: "SHA-256", label: "SHA-256" }, { v: "SHA-512", label: "SHA-512" }]
      }
    ],
    async run(st, ui) {
      const src = ui.inputText() || "";
      if (!src) throw new Error(t2("أدخل نصاً", "Enter text"));
      ui.result(await digest(ui.opt("algo"), src));
      ui.status("✓");
    }
  },
  uuid: {
    id: "uuid", label: t2("توليد UUID", "Generate UUID"), icon: "🆔", needs: "none",
    options: [{ id: "count", kind: "number", label: t2("العدد", "How many"), value: 5, min: 1, max: 200 }],
    async run(st, ui) {
      const n = Math.min(200, Math.max(1, ui.opt("count") || 1));
      const list = Array.from({ length: n }, () => crypto.randomUUID());
      ui.result(list.join("\n"));
      ui.status(`✓ ${n}`);
    }
  },
  timestamp: {
    id: "timestamp", label: t2("Unix Timestamp", "Unix timestamp"), icon: "🕐", needs: "none",
    options: [
      {
        id: "mode", kind: "select", label: t2("الاتجاه", "Direction"), value: "ts2date",
        choices: [{ v: "ts2date", label: t2("رقم → تاريخ", "Number → date") }, { v: "date2ts", label: t2("تاريخ → رقم", "Date → number") }]
      }
    ],
    async run(st, ui) {
      const src = (ui.inputText() || "").trim() || String(Math.floor(Date.now() / 1000));
      if (ui.opt("mode") === "ts2date") {
        const n = Number(src);
        const ms = src.length > 10 ? n : n * 1000;
        const d = new Date(ms);
        ui.result(`${t2("محلي", "Local")}: ${d.toString()}\nUTC: ${d.toISOString()}\nUnix: ${Math.floor(d.getTime() / 1000)}`);
      } else {
        const d = new Date(src);
        if (isNaN(d)) throw new Error(t2("تاريخ غير مفهوم", "Unrecognised date"));
        ui.result(`${t2("ثوانٍ", "Seconds")}: ${Math.floor(d.getTime() / 1000)}\n${t2("مللي ثانية", "Milliseconds")}: ${d.getTime()}`);
      }
      ui.status("✓");
    }
  }
};

/* ============================= SECURITY ========================== */

export const SECURITY_ACTIONS = {
  password: {
    id: "password", label: t2("توليد كلمة مرور", "Generate password"), icon: "🔐", needs: "none",
    options: [
      { id: "length", kind: "number", label: t2("الطول", "Length"), value: 20, min: 8, max: 128 },
      { id: "upper", kind: "checkbox", label: t2("أحرف كبيرة", "Uppercase"), value: true },
      { id: "digits", kind: "checkbox", label: t2("أرقام", "Digits"), value: true },
      { id: "symbols", kind: "checkbox", label: t2("رموز", "Symbols"), value: true }
    ],
    async run(st, ui) {
      const len = Math.min(128, Math.max(8, ui.opt("length") || 16));
      let pool = "abcdefghijkmnopqrstuvwxyz";
      if (ui.opt("upper")) pool += "ABCDEFGHJKLMNPQRSTUVWXYZ";
      if (ui.opt("digits")) pool += "23456789";
      if (ui.opt("symbols")) pool += "!@#$%^&*()-_=+[]{};:,.?";
      const bytes = crypto.getRandomValues(new Uint32Array(len));
      ui.result([...bytes].map(b => pool[b % pool.length]).join(""));
      ui.status("✓");
    }
  },
  strength: {
    id: "strength", label: t2("قوة كلمة المرور", "Password strength"), icon: "📊", needs: "none",
    async run(st, ui) {
      const src = ui.inputText() || "";
      if (!src) throw new Error(t2("اكتب كلمة المرور للاختبار", "Type a password to test"));
      const r = ops.passwordStrength(src);
      ui.result([
        `${t2("التقييم", "Score")}: ${r.score}/4 — ${r.label}`,
        `${t2("الإنتروبيا", "Entropy")}: ${r.entropy} bits`,
        `${t2("زمن الكسر التقديري", "Estimated crack time")}: ${r.crackTime}`,
        r.tips.length ? `\n${t2("تحسينات مقترحة", "Suggestions")}:\n- ${r.tips.join("\n- ")}` : ""
      ].join("\n"));
      ui.status("✓");
    }
  },
  totp: {
    id: "totp", label: t2("رمز مصادقة ثنائية (TOTP)", "2FA code (TOTP)"), icon: "🔢", needs: "none",
    options: [
      { id: "secret", kind: "text", label: t2("السر (Base32)", "Secret (Base32)"), value: "" },
      { id: "digits", kind: "number", label: t2("عدد الأرقام", "Digits"), value: 6, min: 6, max: 8 },
      { id: "period", kind: "number", label: t2("المدة بالثواني", "Period (s)"), value: 30, min: 15, max: 90 }
    ],
    async run(st, ui) {
      const secret = ui.opt("secret") || ui.inputText() || "";
      if (!secret.trim()) throw new Error(t2("أدخل سر TOTP (Base32)", "Enter the Base32 TOTP secret"));
      const { code, secondsLeft } = await ops.totp(secret, { digits: ui.opt("digits"), period: ui.opt("period") });
      ui.result(`${t2("الرمز", "Code")}: ${code}\n${t2("ينتهي بعد", "Expires in")}: ${secondsLeft}s`);
      ui.status("✓");
    }
  }
};

/** Every action in one lookup (used by tool pages that need a single action). */
export const ALL_ACTIONS = {
  ...PDF_ACTIONS, ...IMAGE_ACTIONS, ...CONVERT_ACTIONS, ...TEXT_ACTIONS, ...DEV_ACTIONS, ...SECURITY_ACTIONS
};

/**
 * Render one action as a complete standalone tool page.
 * Used by js/tools/<slug>.js so a tool page and its center share one body.
 */
export function singleTool(root, actionId, { icon, accept, multiple, textMode, withTextarea, s, options } = {}) {
  const action = ALL_ACTIONS[actionId];
  if (!action) { root.innerHTML = `<p class="empty">Action "${actionId}" is not registered.</p>`; return; }
  const opts = options || action.options || [];
  const needsText = textMode || withTextarea || action.needs === "none";
  return workbench(root, {
    icon: icon || action.icon,
    accept: accept || "*/*",
    multiple: multiple !== false,
    textMode: needsText,
    resultPanel: true,
    s: s || {
      drop: t2("اسحب ملفاً هنا — أو اضغط للاختيار", "Drop a file here — or click to browse"),
      files: t2("الملف", "File"),
      clear: t2("إزالة", "Remove"),
      actions: t2("نفّذ العملية", "Run the action"),
      ready: t2("جاهز", "Ready"),
      need: t2("أضف الملف المطلوب لعرض العملية", "Add the required file to see the action")
    },
    options: opts,
    actions: [action]
  });
}

export { workbench, isPdf, isImg };
