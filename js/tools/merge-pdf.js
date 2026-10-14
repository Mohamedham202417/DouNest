import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadEsm, formatBytes, downloadBlob } from "../util.js";

export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>${t("pdfm.pick")}</label>
      <input type="file" id="files" accept="application/pdf" multiple>
    </div>
    <div class="row">
      <button class="btn btn-primary" id="run" disabled>${t("pdfm.merge")}</button>
      <button class="btn" id="up">${t("pdfm.up")}</button>
      <button class="btn" id="down">${t("pdfm.down")}</button>
    </div>
    <div class="field" style="margin-top:10px"><label>${t("pdfm.order")}</label>
      <ul id="list" class="nice-list" style="margin:0"></ul>
    </div>
    <div id="status" style="color:var(--text-muted);font-size:13px;margin-top:8px"></div>
  `;
  const files = root.querySelector("#files");
  const list = root.querySelector("#list");
  const run = root.querySelector("#run");
  const status = root.querySelector("#status");
  let ordered = [];

  const refresh = () => {
    ordered = [...files.files];
    list.innerHTML = ordered.map((f, i) => `<li>${i + 1}. ${f.name} — ${formatBytes(f.size)}</li>`).join("");
    run.disabled = ordered.length < 2;
  };
  files.onchange = refresh;

  const swap = (dir) => {
    if (!ordered.length) return;
    if (dir === "up") { const l = ordered.pop(); ordered.unshift(l); }
    else { const f = ordered.shift(); ordered.push(f); }
    list.innerHTML = ordered.map((f, i) => `<li>${i + 1}. ${f.name} — ${formatBytes(f.size)}</li>`).join("");
  };
  root.querySelector("#up").onclick = () => swap("up");
  root.querySelector("#down").onclick = () => swap("down");

  run.onclick = async () => {
    if (ordered.length < 2) return toastError(t("tool.noInput"));
    status.textContent = "⏳ pdf-lib …";
    try {
      const { PDFDocument } = await loadEsm("https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.esm.min.js");
      const out = await PDFDocument.create();
      for (const f of ordered) {
        const src = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach(p => out.addPage(p));
      }
      const bytes = await out.save();
      status.textContent = `✓ ${ordered.length} → ${formatBytes(bytes.length)}`;
      downloadBlob(new Blob([bytes], { type: "application/pdf" }), "merged.pdf");
      toastSuccess(t("tool.result") + " ✓");
    } catch (e) {
      status.textContent = "❌ " + e.message;
      toastError(t("tool.error"));
    }
  };
}
