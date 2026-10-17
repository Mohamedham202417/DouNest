import { t, getLang } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";

const LABELS = {
  ar: { file: "اختر صورة", mode: "صيغة الناتج", raw: "Base64 فقط", data: "Data URL مع نوع MIME", run: "تحويل إلى Base64", privacy: "تُقرأ الصورة محلياً في متصفحك ولا تُرفع إلى خادم. الحد الأقصى: 8 ميغابايت.", invalid: "اختر ملف صورة صالحاً.", large: "حجم الصورة أكبر من 8 ميغابايت. اختر ملفاً أصغر.", read: "تعذرت قراءة الصورة. نزّلها إلى هذا الجهاز ثم اخترها مرة أخرى.", done: "اكتمل التحويل محلياً.", clipboard: "الحافظة غير متاحة في هذا المتصفح." },
  en: { file: "Choose an image", mode: "Output format", raw: "Base64 only", data: "Data URL with MIME type", run: "Convert to Base64", privacy: "The image is read locally in your browser and is not uploaded. Maximum size: 8 MiB.", invalid: "Choose a valid image file.", large: "Image is larger than 8 MiB. Choose a smaller file.", read: "The image could not be read. Download it to this device, then select it again.", done: "Conversion completed locally.", clipboard: "Clipboard access is unavailable in this browser." }
};
const message = (key) => (LABELS[getLang()] || LABELS.en)[key] || LABELS.en[key];
const MAX_BYTES = 8 * 1024 * 1024;

export function render(root) {
  root.innerHTML = `
    <div class="field"><label for="image-file">${message("file")}</label><input id="image-file" type="file" accept="image/*"></div>
    <div class="field"><label for="image-mode">${message("mode")}</label><select id="image-mode"><option value="raw">${message("raw")}</option><option value="data">${message("data")}</option></select></div>
    <p class="local-note">${message("privacy")}</p>
    <div class="row"><button class="btn btn-primary" id="encode-image">${message("run")}</button><button class="btn" id="copy-image">${t("tool.copy")}</button><button class="btn btn-ghost" id="clear-image">${t("tool.clear")}</button></div>
    <div class="field" style="margin-top:14px"><label for="image-output">${t("tool.output")}</label><textarea id="image-output" class="output" readonly aria-live="polite"></textarea></div>`;
  const fileInput = root.querySelector("#image-file");
  const output = root.querySelector("#image-output");

  root.querySelector("#encode-image").addEventListener("click", async () => {
    const file = fileInput.files?.[0];
    if (!file) { toastError(message("file")); return; }
    if (!file.type.startsWith("image/")) { toastError(message("invalid")); return; }
    if (file.size > MAX_BYTES) { toastError(message("large")); return; }
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      let binary = "";
      const chunkSize = 0x8000;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
      }
      const encoded = btoa(binary);
      const mime = /^[\w.+-]+\/[\w.+-]+$/.test(file.type) ? file.type : "application/octet-stream";
      output.value = root.querySelector("#image-mode").value === "data"
        ? `data:${mime};base64,${encoded}`
        : encoded;
      toastSuccess(message("done"));
    } catch {
      output.value = "";
      toastError(message("read"));
    }
  });
  root.querySelector("#copy-image").addEventListener("click", async () => {
    if (!output.value) return;
    try { await navigator.clipboard.writeText(output.value); toastSuccess(t("tool.copied")); }
    catch { toastError(message("clipboard")); }
  });
  root.querySelector("#clear-image").addEventListener("click", () => { fileInput.value = ""; output.value = ""; });
}
