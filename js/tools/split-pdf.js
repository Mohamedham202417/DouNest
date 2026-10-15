import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadEsm, formatBytes, downloadBlob } from "../util.js";

/** Split PDF by page ranges ("1-3,5,8-10") → one merged file or per-page files (ZIP). */
export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>${t("spdf.pick")}</label>
      <input type="file" id="file" accept="application/pdf">
    </div>
    <div class="field">
      <label>${t("spdf.ranges")}</label>
      <input type="text" id="ranges" placeholder="1-3,5,8-10" dir="ltr" style="width:100%">
    </div>
    <div class="row wrap" style="gap:10px">
      <div class="field" style="min-width:200px">
        <label>${t("spdf.mode")}</label>
        <select id="mode">
          <option value="single">${t("spdf.single")}</option>
          <option value="each">${t("spdf.each")}</option>
        </select>
      </div>
      <div class="field" style="align-self:flex-end">
        <button class="btn btn-primary" id="run" disabled>${t("spdf.run")}</button>
      </div>
    </div>
    <div id="status" style="color:var(--text-muted);font-size:13px;margin-top:8px"></div>
  `;
  const file = root.querySelector("#file");
  const ranges = root.querySelector("#ranges");
  const run = root.querySelector("#run");
  const status = root.querySelector("#status");

  file.onchange = () => { run.disabled = !file.files[0]; };

  const parseRanges = (str, max) => {
    const pages = new Set();
    for (const part of str.split(",")) {
      const p = part.trim();
      if (!p) continue;
      const m = p.match(/^(\d+)(?:\s*-\s*(\d+))?$/);
      if (!m) throw new Error(t("spdf.badRange") + `: "${p}"`);
      let a = +m[1], b = m[2] ? +m[2] : a;
      if (a < 1 || b > max || a > b) throw new Error(t("spdf.badRange") + `: "${p}" (1–${max})`);
      for (let i = a; i <= b; i++) pages.add(i - 1);
    }
    return [...pages].sort((x, y) => x - y);
  };

  run.onclick = async () => {
    const f = file.files[0];
    if (!f) return toastError(t("tool.noInput"));
    status.textContent = "⏳ pdf-lib …";
    try {
      const { PDFDocument } = await loadEsm("https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.esm.min.js");
      const src = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      const total = src.getPageCount();
      const pages = parseRanges(ranges.value, total);
      const mode = root.querySelector("#mode").value;

      if (mode === "single") {
        const out = await PDFDocument.create();
        const copied = await out.copyPages(src, pages);
        copied.forEach(p => out.addPage(p));
        const bytes = await out.save();
        status.textContent = `✓ ${pages.length}/${total} — ${formatBytes(bytes.length)}`;
        downloadBlob(new Blob([bytes], { type: "application/pdf" }), "split.pdf");
      } else {
        const { default: JSZip } = await loadEsm("https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm");
        const zip = new JSZip();
        status.textContent = `⚙️ 0/${pages.length}`;
        for (const idx of pages) {
          const out = await PDFDocument.create();
          const [p] = await out.copyPages(src, [idx]);
          out.addPage(p);
          zip.file(`page-${idx + 1}.pdf`, await out.save());
          status.textContent = `⚙️ ${idx + 1}/${total}`;
        }
        const blob = await zip.generateAsync({ type: "blob" });
        downloadBlob(blob, "split-pages.zip");
        status.textContent = `✓ ${pages.length} PDF — ${formatBytes(blob.size)}`;
      }
      toastSuccess(t("tool.result") + " ✓");
    } catch (e) {
      status.textContent = "❌ " + e.message;
      toastError(t("tool.error"));
    }
  };
}
