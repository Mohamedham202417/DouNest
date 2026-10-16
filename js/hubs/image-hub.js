/** One image queue feeds all common and specialist image operations. */
import { getLang } from "../i18n.js";
import { workbench } from "../hub-kit.js";
import { IMAGE_ACTIONS } from "../lib/actions.js";

export function render(root) {
  const ar = getLang() === "ar";
  workbench(root, {
    icon: "🖼️",
    accept: "image/png,image/jpeg,image/webp,image/gif,image/svg+xml,.png,.jpg,.jpeg,.webp,.gif,.svg",
    multiple: true,
    maxFiles: 20,
    resultPanel: true,
    s: {
      drop: ar ? "أضف صورة أو أكثر مرة واحدة — ثم اختر التحويل أو التعديل" : "Add one or more images once, then choose a conversion or edit",
      files: ar ? "قائمة الصور" : "Image queue",
      fileHelp: ar ? "يمكن تطبيق التحويلات الجماعية على الصور المدعومة؛ إزالة الخلفية والفافيكون تتطلب صورة واحدة." : "Batch actions use supported images; background removal and favicon generation need one image.",
      actions: ar ? "عمليات الصور" : "Image actions",
      ready: ar ? "جاهز — أضف صورة لعرض العمليات" : "Ready — add an image to see actions",
      clear: ar ? "إفراغ القائمة" : "Clear queue",
      run: ar ? "تنفيذ وتنزيل الناتج" : "Run and download output",
      unsupported: ar ? "بعض الملفات غير مدعومة؛ استخدم PNG أو JPG أو WebP أو GIF أو SVG." : "Some files are unsupported; use PNG, JPG, WebP, GIF, or SVG."
    },
    actions: [
      IMAGE_ACTIONS.convertWebp,
      IMAGE_ACTIONS.compressJpg,
      IMAGE_ACTIONS.resize,
      IMAGE_ACTIONS.crop,
      IMAGE_ACTIONS.rotateFlip,
      IMAGE_ACTIONS.exif,
      IMAGE_ACTIONS.stripExif,
      IMAGE_ACTIONS.favicon,
      IMAGE_ACTIONS.removeBackground,
      IMAGE_ACTIONS.toPdf
    ]
  });
  const note = document.createElement("p");
  note.className = "operation-note";
  note.setAttribute("role", "note");
  note.textContent = ar
    ? "قبل الحفظ: JPG صيغة فاقدة وقد تحوّل الشفافية إلى خلفية بيضاء؛ لا نضمن أن يكون الناتج أصغر دائماً، لذا راجع مقارنة الحجم. إزالة الخلفية تحمّل مكتبات ونموذجاً عند الطلب."
    : "Before saving: JPEG is lossy and converts transparency to a white background; output is not guaranteed to be smaller, so review the size comparison. Background removal loads its libraries/model on demand.";
  root.insertBefore(note, root.firstChild);
}
