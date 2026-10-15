/**
 * DouNest v5 — Text Center (/text/)
 * Paste text (or drop a .txt/.md file) once, then run every text action.
 */
import { workbench } from "../hub-kit.js";
import { TEXT_ACTIONS } from "../lib/actions.js";

const EN = () => document.documentElement.lang === "en";
const t2 = (ar, en) => (EN() ? en : ar);

export function render(root) {
  return workbench(root, {
    icon: "✍️",
    accept: ".txt,.md,.markdown,.csv,.json,text/*",
    multiple: true,
    textMode: true,
    resultPanel: true,
    s: {
      drop: t2("اسحب ملف نص أو Markdown هنا — أو اكتب مباشرة في المربع", "Drop a text or Markdown file — or type directly below"),
      files: t2("الملفات", "Files"),
      clear: t2("تفريغ الكل", "Clear all"),
      actions: t2("العمليات — بضغطة زر", "Actions — one click each"),
      ready: t2("جاهز — الصق النص أو أضف ملفاً", "Ready — paste text or add a file"),
      need: t2("الصق نصاً لعرض العمليات", "Paste text to see the actions")
    },
    options: [
      { id: "text", kind: "textarea", label: t2("النص", "Text"), rows: 10, placeholder: t2("الصق النص أو Markdown هنا…", "Paste text or Markdown here…"), value: "" },
      ...TEXT_ACTIONS.slugify.options,
      ...TEXT_ACTIONS.cleanList.options
    ],
    actions: [TEXT_ACTIONS.stats, TEXT_ACTIONS.mdToHtml, TEXT_ACTIONS.slugify, TEXT_ACTIONS.cleanList]
  });
}
