import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadEsm, formatBytes, downloadBlob } from "../util.js";

/** Rotate PDF pages (90/180/270) — all pages or a range; permanent rotation. */
export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>${t("rpdf.pick")}</label>
      <input type="file" id="file" accept="application/pdf">
    </div>
    <div class="row wrap" style="gap:10px">
      <div class="field" style="min-width:130px">
        <label>${t("rpdf.angle")}</label>
        <select id="angle">
          <option value="90">90° ↻</option>
          <option value="180">180° ↕</option>
          <option value="270">270° ↺</option>
        </select>
      </div>
      <div class="field" style="min-width:160px">
        <label>${t("rpdf.pages")}</label>
        <input type="text" id="ranges" placeholder="1-3,7" dir="ltr" style="width:100%">
      </div>
      <div class="field" style="align-self:flex-end">
        <button class="btn btn-primary" id="run" disabled>${t("rpdf.run")}</button>
      </div>
    </div>
    <div id="status" style="color:var(--text-muted);font-size:13px;margin-top:8px"></div>
  `;
  const file = root.querySelector("#file");
  const run = root.querySelector("#run");
  const status = root.querySelector("#status");

  file.onchange = () => { run.disabled = !file.files[0]; };

  run.onclick = async () => {
    const f = file.files[0];
    if (!f) return toastError(t("tool.noInput"));
    status.textContent = "⏳ pdf-lib …";
    try {
      const { PDFDocument, degrees } = await loadEsm("https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.esm.min.js");
      const doc = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      const total = doc.getPageCount();
      const angle = +root.querySelector("#angle").value;
      const rs = root.querySelector("#ranges").value.trim();
      let targets = [...Array(total).keys()];
      if (rs) {
        const set = new Set();
        for (const part of rs.split(",")) {
          const m = part.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);
          if (!m) throw new Error(t("spdf.badRange") + `: "${part}"`);
          const a = +m[1], b = m[2] ? +m[2] : a;
          if (a < 1 || b > total || a > b) throw new Error(t("spdf.badRange") + `: "${part}" (1–${total})`);
          for (let i = a; i <= b; i++) set.add(i - 1);
        }
        targets = [...set];
      }
      targets.forEach(idx => {
        const page = doc.getPage(idx);
        page.setRotation(degrees((page.getRotation().angle + angle) % 360));
      });
      const bytes = await doc.save();
      status.textContent = `✓ ${targets.length}/${total} — ${formatBytes(bytes.length)}`;
      downloadBlob(new Blob([bytes], { type: "application/pdf" }), "rotated.pdf");
      toastSuccess(t("tool.result") + " ✓");
    } catch (e) {
      status.textContent = "❌ " + e.message;
      toastError(t("tool.error"));
    }
  };
}
