/**
 * DouNest v5 — Developer Center (/dev/)
 * One input, ten developer actions: JSON, Base64, URL, JWT, hash, UUID, timestamp.
 */
import { workbench } from "../hub-kit.js";
import { DEV_ACTIONS, CONVERT_ACTIONS } from "../lib/actions.js";

const EN = () => document.documentElement.lang === "en";
const t2 = (ar, en) => (EN() ? en : ar);

export function render(root) {
  return workbench(root, {
    icon: "🧰",
    accept: ".json,.yaml,.yml,.txt,.jwt,application/json,text/*",
    multiple: true,
    textMode: true,
    resultPanel: true,
    s: {
      drop: t2("اسحب ملف JSON/YAML هنا — أو الصق النص في المربع", "Drop a JSON/YAML file — or paste text below"),
      files: t2("الملفات", "Files"),
      clear: t2("تفريغ الكل", "Clear all"),
      actions: t2("أدوات المطوّرين — بضغطة زر", "Developer actions — one click each"),
      ready: t2("جاهز — الصق مدخلاتك", "Ready — paste your input"),
      need: t2("الصق نصاً أو أضف ملفاً لعرض العمليات", "Paste text or add a file to see the actions")
    },
    options: [
      { id: "text", kind: "textarea", label: t2("المدخل", "Input"), rows: 8, placeholder: t2("JSON، Base64، JWT، نص…", "JSON, Base64, JWT, text…"), value: "" },
      ...DEV_ACTIONS.jsonFormat.options,
      ...DEV_ACTIONS.base64.options,
      ...DEV_ACTIONS.urlCode.options,
      ...DEV_ACTIONS.hash.options,
      ...DEV_ACTIONS.timestamp.options,
      ...DEV_ACTIONS.uuid.options
    ],
    actions: [
      DEV_ACTIONS.jsonFormat, DEV_ACTIONS.base64, DEV_ACTIONS.urlCode, DEV_ACTIONS.jwt,
      DEV_ACTIONS.hash, DEV_ACTIONS.uuid, DEV_ACTIONS.timestamp, CONVERT_ACTIONS.jsonYaml
    ]
  });
}
