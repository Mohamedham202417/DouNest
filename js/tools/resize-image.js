import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadEsm, formatBytes, downloadBlob } from "../util.js";

/** Batch image resize via canvas: by width px or %, format + quality choice. */
export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>${t("rsz.pick")}</label>
      <input type="file" id="files" accept="image/*" multiple>
    </div>
    <div class="row wrap" style="gap:10px">
      <div class="field" style="min-width:150px">
        <label>${t("rsz.width")} (px)</label>
        <input type="number" id="w" placeholder="800" min="16" max="8000" style="width:100%">
      </div>
      <div class="field" style="min-width:130px">
        <label>${t("rsz.percent")}</label>
        <select id="pct">
          <option value="">—</option>
          <option value="75">75%</option>
          <option value="50">50%</option>
          <option value="25">25%</option>
          <option value="150">150%</option>
          <option value="200">200%</option>
        </select>
      </div>
      <div class="field" style="min-width:120px">
        <label>${t("rsz.format")}</label>
        <select id="fmt">
          <option value="image/jpeg">JPG</option>
          <option value="image/png">PNG</option>
          <option value="image/webp">WebP</option>
        </select>
      </div>
      <div class="field" style="min-width:140px">
        <label>${t("rsz.quality")}: <span id="qv">85%</span></label>
        <input type="range" id="q" min="0.4" max="1" step="0.05" value="0.85">
      </div>
      <div class="field" style="align-self:flex-end">
        <button class="btn btn-primary" id="run" disabled>${t("rsz.run")}</button>
      </div>
    </div>
    <div id="status" style="color:var(--text-muted);font-size:13px;margin:8px 0"></div>
    <div id="thumbs" class="thumb-grid" style="margin-top:10px"></div>
    <div class="row" id="dlAllWrap" style="display:none;margin-top:10px">
      <button class="btn btn-primary" id="dlAll">${t("tool.download")} ZIP</button>
    </div>
  `;
  const files = root.querySelector("#files");
  const w = root.querySelector("#w");
  const pct = root.querySelector("#pct");
  const fmt = root.querySelector("#fmt");
  const q = root.querySelector("#q");
  const qv = root.querySelector("#qv");
  const run = root.querySelector("#run");
  const status = root.querySelector("#status");
  const thumbs = root.querySelector("#thumbs");
  const dlAllWrap = root.querySelector("#dlAllWrap");
  let results = [];

  files.onchange = () => {
    results = []; thumbs.innerHTML = ""; dlAllWrap.style.display = "none";
    run.disabled = !files.files.length;
  };
  q.oninput = () => { qv.textContent = Math.round(q.value * 100) + "%"; };
  pct.onchange = () => { if (pct.value) w.value = ""; };
  w.oninput = () => { if (w.value) pct.value = ""; };

  run.onclick = async () => {
    const list = [...files.files];
    if (!list.length) return toastError(t("tool.noInput"));
    if (!w.value && !pct.value) return toastError(t("rsz.needSize"));
    run.disabled = true;
    thumbs.innerHTML = "";
    results = [];
    const format = fmt.value;
    const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
    const quality = +q.value;
    try {
      let done = 0;
      for (const f of list) {
        status.textContent = `⚙️ ${f.name} (${++done}/${list.length}) …`;
        const bmp = await createImageBitmap(f);
        let nw, nh;
        if (pct.value) {
          const s = +pct.value / 100;
          nw = Math.max(1, Math.round(bmp.width * s));
          nh = Math.max(1, Math.round(bmp.height * s));
        } else {
          nw = Math.max(1, +w.value);
          nh = Math.max(1, Math.round((bmp.height / bmp.width) * nw));
        }
        const c = document.createElement("canvas");
        c.width = nw; c.height = nh;
        const ctx = c.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(bmp, 0, 0, nw, nh);
        const blob = await new Promise(r => c.toBlob(r, format, quality));
        results.push({
          name: f.name.replace(/\.[^.]+$/, "") + `-${nw}px.${ext}`,
          blob
        });
        const url = URL.createObjectURL(blob);
        const d = document.createElement("div");
        d.className = "thumb";
        d.innerHTML = `<img src="${url}" alt=""><span>${bmp.width}×${bmp.height} → ${nw}×${nh}</span>`;
        d.onclick = () => downloadBlob(blob, results[results.length - 1].name);
        thumbs.appendChild(d);
      }
      status.textContent = `✓ ${results.length} · ${formatBytes(results.reduce((s, r) => s + r.blob.size, 0))}`;
      if (results.length === 1) downloadBlob(results[0].blob, results[0].name);
      else dlAllWrap.style.display = "flex";
      toastSuccess(t("tool.result") + " ✓");
    } catch (e) {
      status.textContent = "❌ " + (e?.message || e);
      toastError(t("tool.error"));
    } finally {
      run.disabled = false;
    }
  };

  dlAllWrap.querySelector("#dlAll").onclick = async () => {
    status.textContent = "⏳ JSZip …";
    const { default: JSZip } = await loadEsm("https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm");
    const zip = new JSZip();
    results.forEach(r => zip.file(r.name, r.blob));
    const out = await zip.generateAsync({ type: "blob" });
    downloadBlob(out, "resized-images.zip");
    status.textContent = `✓ ZIP — ${formatBytes(out.size)}`;
  };
}
