const htmlEscape = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function inline(text, basePath) {
  let out = htmlEscape(text);
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label, rawHref) => {
    const href = rawHref.startsWith("/") ? `${basePath.replace(/\/$/, "")}${rawHref}` : rawHref;
    if (!/^(https?:\/\/|\/|#)/i.test(href)) return label;
    return `<a href="${htmlEscape(href)}">${label}</a>`;
  });
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*(.+?)\*/g, "<em>$1</em>");
  return out;
}

/** Render the deliberately small, safe Markdown subset used by DouNest articles. */
export function markdownToHtml(markdown, basePath = "/") {
  const source = String(markdown || "").replace(/\r\n?/g, "\n").trim();
  if (!source) return "";
  return source.split(/\n\s*\n/).map((rawBlock) => {
    const lines = rawBlock.split("\n");
    const block = rawBlock.trim();
    const heading = block.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      return `<h${level}>${inline(heading[2], basePath)}</h${level}>`;
    }

    if (lines.every((line) => /^>\s?/.test(line))) {
      const quoteLines = lines.map((line) => line.replace(/^>\s?/, ""));
      const listItems = quoteLines.filter((line) => /^[-*]\s+/.test(line)).map((line) => line.replace(/^[-*]\s+/, ""));
      const prose = quoteLines.filter((line) => !/^[-*]\s+/.test(line)).map((line) => `<p>${inline(line, basePath)}</p>`).join("");
      const list = listItems.length ? `<ul>${listItems.map((item) => `<li>${inline(item, basePath)}</li>`).join("")}</ul>` : "";
      return `<blockquote>${prose}${list}</blockquote>`;
    }

    const isOrdered = lines.length > 0 && lines.every((line) => /^\d+[.)]\s+/.test(line));
    const isUnordered = lines.length > 0 && lines.every((line) => /^[-*]\s+/.test(line));
    if (isOrdered || isUnordered) {
      const tag = isOrdered ? "ol" : "ul";
      const items = lines.map((line) => line.replace(isOrdered ? /^\d+[.)]\s+/ : /^[-*]\s+/, ""));
      return `<${tag}>${items.map((item) => `<li>${inline(item, basePath)}</li>`).join("")}</${tag}>`;
    }

    return `<p>${inline(lines.join(" "), basePath)}</p>`;
  }).join("\n");
}
