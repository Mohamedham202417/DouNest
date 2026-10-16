/** One PDF workspace: a single queue feeds every core and advanced task. */
import { getLang } from "../i18n.js";
import { workbench } from "../hub-kit.js";
import { PDF_ACTIONS } from "../lib/actions.js";

export function render(root) {
  const ar = getLang() === "ar";
  workbench(root, {
    icon: "📄",
    accept: "application/pdf,.pdf,image/png,image/jpeg,image/webp",
    multiple: true,
    maxFiles: 20,
    s: {
      drop: ar ? "أضف ملفات PDF أو صوراً مرة واحدة — ثم اختر العملية" : "Add PDFs or images once, then choose an action",
      files: ar ? "قائمة الملفات" : "File queue",
      fileHelp: ar ? "رتّب ملفات الدمج بالأسهم. تُطبّق العمليات على الملفات المطابقة فقط." : "Use arrows to order merge inputs. Actions use matching files only.",
      actions: ar ? "عمليات PDF والصور" : "PDF and image actions",
      ready: ar ? "جاهز — أضف ملفاً لعرض العمليات المتاحة" : "Ready — add a file to see available actions",
      clear: ar ? "إفراغ القائمة" : "Clear queue",
      run: ar ? "تنفيذ وتنزيل الناتج" : "Run and download output",
      unsupported: ar ? "بعض الملفات غير مدعومة؛ المقبول PDF وPNG وJPG وWebP." : "Some files are unsupported; accepted: PDF, PNG, JPG, WebP."
    },
    actions: [
      PDF_ACTIONS.merge,
      PDF_ACTIONS.compress,
      PDF_ACTIONS.split,
      PDF_ACTIONS.organize,
      PDF_ACTIONS.rotate,
      PDF_ACTIONS.toJpg,
      PDF_ACTIONS.toText,
      PDF_ACTIONS.toWord,
      PDF_ACTIONS.watermark,
      PDF_ACTIONS.pageNumbers,
      PDF_ACTIONS.imagesToPdf
    ]
  });
  const note = document.createElement("p");
  note.className = "operation-note";
  note.setAttribute("role", "note");
  note.textContent = ar
    ? "مهم: ضغط PDF هنا يعيد رسم الصفحات كصور وقد يزيل النص القابل للبحث والروابط؛ وقد يكبر الملف. تحويل PDF إلى Word يستخرج النص فقط إلى DOC متوافق، ولا يحافظ على تخطيط الصفحة. احتفظ بالأصل وافحص الناتج."
    : "Important: PDF compression rasterizes pages, may remove searchable text and links, and can increase file size. PDF-to-Word extracts text into a compatible DOC and does not preserve page layout. Keep the original and review the output.";
  root.insertBefore(note, root.firstChild);
}
