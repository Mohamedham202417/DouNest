import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadScript, downloadBlob } from "../util.js";

/** Word (.docx) → clean HTML preview (mammoth.js) → PDF via print dialog. */
export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>${t("w2p.pick")}</label>
      <input type="file" id="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
    </div>
    <div class="row">
      <button class="btn btn-primary" id="print" disabled>${t("w2p.pdf")}</button>
      <button class="btn" id="dlHtml" disabled>${t("w2p.html")}</button>
    </div>
    <div id="status" style="color:var(--text-muted);font-size:13px;margin:8px 0"></div>
    <div id="preview" class="docx-preview" dir="auto"></div>
  `;
  const file = root.querySelector("#file");
  const print = root.querySelector("#print");
  const dlHtml = root.querySelector("#dlHtml");
  const status = root.querySelector("#status");
  const preview = root.querySelector("#preview");
  let html = "";

  print.onclick = () => {
    if (!html) return toastError(t("tool.noInput"));
    const w = window.open("", "_blank");
    if (!w) return toastError(t("w2p.popup"));
    w.document.write(`<!DOCTYPE html><html dir="auto"><head><meta charset="utf-8">
      <title>document</title>
      <style>
        body{font-family:"Segoe UI",Tahoma,Arial,sans-serif;line-height:1.8;color:#111;
          max-width:820px;margin:0 auto;padding:32px 20px;}
        h1,h2,h3{line-height:1.35} img{max-width:100%} table{border-collapse:collapse;width:100%}
        td,th{border:1px solid #bbb;padding:6px 10px} blockquote{border-inline-start:4px solid #8883;margin:0;padding-inline-start:14px;color:#333}
        @page{margin:18mm}
      </style></head><body>${html}</body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 350);
    status.textContent = "🖨️ " + t("w2p.hint");
  };

  dlHtml.onclick = () => {
    if (!html) return;
    downloadBlob(new Blob([`<!DOCTYPE html><html dir="auto"><head><meta charset="utf-8"></head><body>${html}</body></html>`],
      { type: "text/html;charset=utf-8" }), "document.html");
  };

  file.onchange = async () => {
    const f = file.files[0];
    if (!f) return;
    print.disabled = dlHtml.disabled = true;
    status.textContent = "⏳ mammoth.js …";
    preview.innerHTML = "";
    try {
      await loadScript("https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js");
      const res = await window.mammoth.convertToHtml({ arrayBuffer: await f.arrayBuffer() });
      html = res.value || "";
      preview.innerHTML = html || `<p class="empty">${t("w2p.empty")}</p>`;
      status.textContent = `✓ ${f.name}`;
      print.disabled = dlHtml.disabled = false;
      toastSuccess(t("tool.result") + " ✓");
    } catch (e) {
      status.textContent = "❌ " + (e?.message || e);
      toastError(t("tool.error"));
    }
  };
}
