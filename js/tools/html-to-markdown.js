import { t, getLang } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";

const COPY = {
  ar: { input: "الصق HTML", convert: "تحويل إلى Markdown", privacy: "يُحلل HTML في DOM غير نشط داخل متصفحك؛ لا تُشغّل الشيفرات ولا يُرفع المحتوى.", invalid: "تعذر تحويل HTML.", limit: "الحد الأقصى لحجم الإدخال هو 1 ميغابايت.", done: "اكتمل التحويل محلياً." },
  en: { input: "Paste HTML", convert: "Convert to Markdown", privacy: "HTML is parsed in an inert browser DOM; scripts are not executed and content is not uploaded.", invalid: "HTML could not be converted.", limit: "The input limit is 1 MiB.", done: "Conversion completed locally." }
};
const label = key => (COPY[getLang()] || COPY.en)[key] || COPY.en[key];
const inline = value => value.replace(/[ \t\r\n]+/g, " ").trim();

function safeUrl(raw) {
  if (!raw) return "";
  try {
    const url = new URL(raw, document.baseURI);
    return ["http:", "https:", "mailto:"].includes(url.protocol) ? url.href : "";
  } catch { return ""; }
}

function convertHtml(source) {
  if (source.length > 1024 * 1024) throw new Error("limit");
  const template = document.createElement("template");
  template.innerHTML = source;
  const walk = (node, depth = 0, inPre = false) => {
    if (node.nodeType === Node.TEXT_NODE) return inPre ? node.nodeValue : node.nodeValue.replace(/[ \t\r\n]+/g, " ");
    if (node.nodeType !== Node.ELEMENT_NODE) return "";
    const el = node;
    const tag = el.tagName.toLowerCase();
    if (["script", "style", "noscript", "template", "svg", "iframe", "object", "embed"].includes(tag)) return "";
    if (tag === "br") return "\n";
    if (tag === "hr") return "\n\n---\n\n";
    if (tag === "img") {
      const alt = inline(el.getAttribute("alt") || "image");
      const url = safeUrl(el.getAttribute("src"));
      return url ? `![${alt.replace(/[\[\]]/g, "\\$&")}](${url.replace(/[()\\]/g, "\\$&")})` : alt;
    }
    if (tag === "pre") {
      const code = el.querySelector("code");
      const text = (code || el).textContent.replace(/\n+$/, "");
      const lang = code?.className.match(/(?:^|\s)language-([\w+-]+)/)?.[1] || "";
      const fence = text.includes("```") ? "````" : "```";
      return `\n\n${fence}${lang}\n${text}\n${fence}\n\n`;
    }
    if (tag === "ul" || tag === "ol") {
      const items = Array.from(el.children).filter(child => child.tagName.toLowerCase() === "li");
      return items.map((li, index) => {
        const childLists = Array.from(li.children).filter(child => ["ul", "ol"].includes(child.tagName.toLowerCase()));
        const content = Array.from(li.childNodes).filter(child => !childLists.includes(child)).map(child => walk(child, depth, inPre)).join("");
        const marker = tag === "ol" ? `${index + 1}. ` : "- ";
        const nested = childLists.map(list => walk(list, depth + 1, inPre)).join("");
        return `${"  ".repeat(depth)}${marker}${inline(content)}\n${nested}`;
      }).join("") + "\n";
    }
    if (tag === "table") {
      const rows = Array.from(el.querySelectorAll("tr"));
      if (!rows.length) return "";
      const cells = rows.map(row => Array.from(row.children).filter(cell => ["th", "td"].includes(cell.tagName.toLowerCase())).map(cell => inline(Array.from(cell.childNodes).map(child => walk(child)).join(""))));
      const width = Math.max(...cells.map(row => row.length));
      const line = row => `| ${Array.from({ length: width }, (_, i) => (row[i] || "").replace(/\|/g, "\\|")).join(" | ")} |`;
      return `\n\n${line(cells[0])}\n${line(Array(width).fill("---"))}\n${cells.slice(1).map(line).join("\n")}\n\n`;
    }
    const children = Array.from(el.childNodes).map(child => walk(child, depth, inPre)).join("");
    if (/^h[1-6]$/.test(tag)) return `\n\n${"#".repeat(Number(tag[1]))} ${inline(children)}\n\n`;
    if (tag === "p" || tag === "div" || tag === "section" || tag === "article" || tag === "header" || tag === "footer") return `\n\n${inline(children)}\n\n`;
    if (tag === "blockquote") return `\n\n${children.trim().split("\n").map(line => `> ${line}`).join("\n")}\n\n`;
    if (["strong", "b"].includes(tag)) return `**${inline(children)}**`;
    if (["em", "i"].includes(tag)) return `*${inline(children)}*`;
    if (["del", "s", "strike"].includes(tag)) return `~~${inline(children)}~~`;
    if (tag === "code") return `\`${children.replace(/`/g, "\\`")}\``;
    if (tag === "a") {
      const text = inline(children);
      const url = safeUrl(el.getAttribute("href"));
      return url ? `[${text || url.replace(/[\[\]]/g, "\\$&")}](${url.replace(/[()\\]/g, "\\$&")})` : text;
    }
    return children;
  };
  const result = Array.from(template.content.childNodes).map(node => walk(node)).join("");
  return result.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function render(root) {
  root.innerHTML = `
    <div class="field"><label for="html-markdown-input">${label("input")}</label><textarea id="html-markdown-input" spellcheck="false" placeholder="&lt;h1&gt;Title&lt;/h1&gt;\n&lt;p&gt;A paragraph with &lt;strong&gt;bold text&lt;/strong&gt;.&lt;/p&gt;"></textarea></div>
    <p class="local-note">${label("privacy")}</p>
    <div class="row"><button class="btn btn-primary" id="html-markdown-convert">${label("convert")}</button><button class="btn" id="html-markdown-copy">${t("tool.copy")}</button><button class="btn btn-ghost" id="html-markdown-clear">${t("tool.clear")}</button></div>
    <div class="field" style="margin-top:14px"><label for="html-markdown-output">${t("tool.output")}</label><textarea id="html-markdown-output" class="output" readonly aria-live="polite"></textarea></div>`;
  const input = root.querySelector("#html-markdown-input");
  const output = root.querySelector("#html-markdown-output");
  root.querySelector("#html-markdown-convert").addEventListener("click", () => {
    try { output.value = convertHtml(input.value); toastSuccess(label("done")); }
    catch (error) { output.value = ""; toastError(error.message === "limit" ? label("limit") : label("invalid")); }
  });
  root.querySelector("#html-markdown-copy").addEventListener("click", async () => {
    if (!output.value) return;
    try { await navigator.clipboard.writeText(output.value); toastSuccess(t("tool.copied")); }
    catch { toastError("Clipboard access is unavailable in this browser."); }
  });
  root.querySelector("#html-markdown-clear").addEventListener("click", () => { input.value = ""; output.value = ""; });
}
