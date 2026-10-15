/**
 * DouNest v5 — Security Center (/security/)
 * Password generation, strength analysis, hashing and 2FA codes — all local.
 */
import { workbench } from "../hub-kit.js";
import { SECURITY_ACTIONS, DEV_ACTIONS } from "../lib/actions.js";

const EN = () => document.documentElement.lang === "en";
const t2 = (ar, en) => (EN() ? en : ar);

export function render(root) {
  return workbench(root, {
    icon: "🔐",
    accept: ".txt,text/*",
    multiple: false,
    textMode: true,
    resultPanel: true,
    s: {
      drop: t2("أدخل نصاً في المربع (لا حاجة لرفع ملف)", "Type in the box (no file needed)"),
      files: t2("الملف", "File"),
      clear: t2("إزالة", "Remove"),
      actions: t2("أدوات الأمان — بضغطة زر", "Security actions — one click each"),
      ready: t2("جاهز", "Ready"),
      need: t2("اختر عملية", "Pick an action")
    },
    options: [
      { id: "text", kind: "textarea", label: t2("نص/كلمة مرور للاختبار أو التوليد", "Text or password to test / generate"), rows: 4, placeholder: t2("اكتب كلمة المرور لاختبار قوتها…", "Type a password to test its strength…"), value: "" },
      ...SECURITY_ACTIONS.password.options,
      ...SECURITY_ACTIONS.totp.options,
      ...DEV_ACTIONS.hash.options
    ],
    actions: [SECURITY_ACTIONS.password, SECURITY_ACTIONS.strength, SECURITY_ACTIONS.totp, DEV_ACTIONS.hash]
  });
}
