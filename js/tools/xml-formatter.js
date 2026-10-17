import { t, getLang } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";

const COPY = {
  ar: { title: "أدخل XML", format: "تنسيق XML", invalid: "تعذر تحليل XML. تحقق من الوسوم والاقتباسات والإغلاق.", unsafe: "للسلامة، لا يقبل هذا المنسق تعريفات DTD أو الكيانات الخارجية.", limit: "الحد الأقصى للنص هو 1 ميغابايت.", ready: "تم تنسيق XML محلياً.", privacy: "يعالج المتصفح XML محلياً، ولا تُقبل DTD أو تعريفات الكيانات الخارجية." },
  en: { title: "Enter XML", format: "Format XML", invalid: "XML could not be parsed. Check its tags, quotes, and closing elements.", unsafe: "For safety, this formatter does not accept DTD declarations or external entities.", limit: "The input limit is 1 MiB.", ready: "XML formatted locally.", privacy: "XML is processed locally in your browser; DTD and external entity declarations are rejected." }
};
const label = key => (COPY[getLang()] || COPY.en)[key] || COPY.en[key];

function escapeXml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function formatXml(source) {
  if (source.length > 1024 * 1024) throw new Error("limit");
  if (/<!\s*(?:DOCTYPE|ENTITY)\b/i.test(source)) throw new Error("unsafe");
  const doc = new DOMParser().parseFromString(source, "application/xml");
  if (doc.querySelector("parsererror") || !doc.documentElement) throw new Error("invalid");
  const serializer = new XMLSerializer();
  const indent = depth => "  ".repeat(depth);
  const render = (node, depth = 0) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const attrs = Array.from(node.attributes, attr => ` ${attr.name}="${escapeXml(attr.value)}"`).join("");
      const children = Array.from(node.childNodes);
      const start = `<${node.nodeName}${attrs}`;
      if (!children.length) return `${indent(depth)}${start}/>`;
      const textOnly = children.every(child => child.nodeType === Node.TEXT_NODE || child.nodeType === Node.CDATA_SECTION_NODE);
      if (textOnly) return `${indent(depth)}${start}>${children.map(child => serializer.serializeToString(child)).join("")}</${node.nodeName}>`;
      const hasSignificantText = children.some(child =>
        (child.nodeType === Node.TEXT_NODE || child.nodeType === Node.CDATA_SECTION_NODE) && child.nodeValue.trim()
      );
      if (hasSignificantText) return `${indent(depth)}${serializer.serializeToString(node)}`;
      const nested = children.filter(child => !(child.nodeType === Node.TEXT_NODE && !child.nodeValue.trim()));
      return `${indent(depth)}${start}>\n${nested.map(child => render(child, depth + 1)).join("\n")}\n${indent(depth)}</${node.nodeName}>`;
    }
    if (node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.PROCESSING_INSTRUCTION_NODE) return `${indent(depth)}${serializer.serializeToString(node)}`;
    return `${indent(depth)}${serializer.serializeToString(node)}`;
  };
  const nodes = Array.from(doc.childNodes).filter(node => node.nodeType !== Node.DOCUMENT_TYPE_NODE);
  return nodes.map(node => render(node)).join("\n");
}

export function render(root) {
  root.innerHTML = `
    <div class="field"><label for="xml-input">${label("title")}</label><textarea id="xml-input" spellcheck="false" placeholder="&lt;root&gt;\n  &lt;item&gt;value&lt;/item&gt;\n&lt;/root&gt;"></textarea></div>
    <p class="local-note">${label("privacy")}</p>
    <div class="row"><button class="btn btn-primary" id="xml-format">${label("format")}</button><button class="btn" id="xml-copy">${t("tool.copy")}</button><button class="btn btn-ghost" id="xml-clear">${t("tool.clear")}</button></div>
    <div class="field" style="margin-top:14px"><label for="xml-output">${t("tool.output")}</label><textarea id="xml-output" class="output" readonly aria-live="polite"></textarea></div>`;
  const input = root.querySelector("#xml-input");
  const output = root.querySelector("#xml-output");
  root.querySelector("#xml-format").addEventListener("click", () => {
    try { output.value = formatXml(input.value); toastSuccess(label("ready")); }
    catch (error) {
      const message = error.message === "unsafe" ? label("unsafe") : error.message === "limit" ? label("limit") : label("invalid");
      output.value = "";
      toastError(message);
    }
  });
  root.querySelector("#xml-copy").addEventListener("click", async () => {
    if (!output.value) return;
    try { await navigator.clipboard.writeText(output.value); toastSuccess(t("tool.copied")); }
    catch { toastError("Clipboard access is unavailable in this browser."); }
  });
  root.querySelector("#xml-clear").addEventListener("click", () => { input.value = ""; output.value = ""; });
}
