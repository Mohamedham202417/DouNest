/** One conversion queue for supported images, PDFs, spreadsheets, and text formats. */
import { getLang } from "../i18n.js";
import { workbench } from "../hub-kit.js";
import { PDF_ACTIONS, IMAGE_ACTIONS, CONVERT_ACTIONS } from "../lib/actions.js";

export function render(root) {
  const ar = getLang() === "ar";
  workbench(root, {
    icon: "🔄",
    accept: "application/pdf,.pdf,image/png,image/jpeg,image/webp,image/svg+xml,.png,.jpg,.jpeg,.webp,.svg,.csv,.json,.xlsx,.xls,.docx,.txt,.md,.yaml,.yml",
    multiple: true,
    maxFiles: 20,
    textMode: true,
    resultPanel: true,
    s: {
      drop: ar ? "أضف ملفاً أو الصق JSON/YAML مرة واحدة — ثم اختر التحويل" : "Add a file or paste JSON/YAML once, then choose a conversion",
      textLabel: ar ? "أو الصق نص JSON/YAML للتحويل" : "Or paste JSON/YAML text to convert",
      textPlaceholder: ar ? "الصق JSON أو YAML هنا…" : "Paste JSON or YAML here…",
      files: ar ? "قائمة المدخلات" : "Input queue",
      fileHelp: ar ? "اختر ملفاً واحداً للتحويل المعتاد؛ يمكن اختيار صور متعددة. لدمج PDF أضف ملفين أو أكثر." : "Choose one file for most conversions; multiple images are supported. Add two or more PDFs to merge.",
      actions: ar ? "التحويلات المتاحة لهذا النوع" : "Available conversions for these inputs",
      ready: ar ? "جاهز — أضف ملفاً أو الصق JSON/YAML" : "Ready — add a file or paste JSON/YAML",
      clear: ar ? "إفراغ القائمة" : "Clear queue",
      run: ar ? "تنفيذ وتنزيل الناتج" : "Run and download output",
      unsupported: ar ? "صيغة غير مدعومة هنا. استخدم PDF أو PNG/JPG/WebP/SVG أو CSV/JSON/XLSX/DOCX/TXT/YAML." : "Unsupported format. Use PDF, PNG/JPG/WebP/SVG, CSV/JSON/XLSX/DOCX/TXT/YAML."
    },
    actions: [
      PDF_ACTIONS.merge, PDF_ACTIONS.toJpg, PDF_ACTIONS.toText, PDF_ACTIONS.toWord,
      IMAGE_ACTIONS.convertWebp,
      CONVERT_ACTIONS.imageFormat, CONVERT_ACTIONS.csvToJson, CONVERT_ACTIONS.jsonToCsv,
      CONVERT_ACTIONS.xlsxToCsv, CONVERT_ACTIONS.xlsxToJson, CONVERT_ACTIONS.docxToText,
      CONVERT_ACTIONS.textToPdf, CONVERT_ACTIONS.svgToPng, CONVERT_ACTIONS.jsonYaml
    ]
  });
  const note = document.createElement("p");
  note.className = "operation-note";
  note.setAttribute("role", "note");
  note.textContent = ar
    ? "حدود التحويل: XLSX يقرأ الورقة الأولى فقط ولا يحفظ الصيغ أو التنسيقات؛ DOCX إلى TXT يستخرج النص فقط؛ TXT إلى PDF يدعم الحروف اللاتينية أساساً؛ PDF إلى Word يخرج DOC نصياً وقد يغيّر التخطيط. راجع الناتج قبل الاعتماد عليه."
    : "Conversion limits: XLSX reads only the first worksheet and does not preserve formulas or formatting; DOCX→TXT extracts text only; TXT→PDF primarily supports Latin characters; PDF→Word creates a text-focused DOC and may change layout. Review outputs before relying on them.";
  root.insertBefore(note, root.firstChild);
}
