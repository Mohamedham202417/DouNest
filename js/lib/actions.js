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

const EN = () => document.documentElement.lang === "en";
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

export const IMAGE_ACTIONS = {
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

export const CONVERT_ACTIONS = {
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
