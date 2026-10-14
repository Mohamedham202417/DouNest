import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadScript, loadEsm, formatBytes, downloadBlob } from "../util.js";

/** HEIC/HEIF → JPG batch conversion via heic2any (libheif), fully local. */
export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>${t("heic.pick")}</label>
      <input type="file" id="files" accept=".heic,.heif,image/heic,image/heif" multiple>
    </div>
    <div class="row wrap" style="gap:10px">
      <div class="field" style="min-width:130px">
        <label>${t("heic.quality")}: <span id="qv">92%</span></label>
        <input type="range" id="q" min="0.5" max="1" step="0.02" value="0.92">
      </div>
      <div class="field" style="align-self:flex-end">
        <button class="btn btn-primary" id="run" disabled>${t("heic.convert")}</button>
      </div>
    </div>
    <div id="status" style="color:var(--text-muted);font-size:13px;margin:8px 0"></div>
    <div id="thumbs" class="thumb-grid" style="margin-top:10px"></div>
    <div class="row" id="dlAllWrap" style="display:none;margin-top:10px">
      <button class="btn btn-primary" id="dlAll">${t("tool.download")} ZIP</button>
    </div>
  `;
  const files = root.querySelector("#files");
  const run = root.querySelector("#run");
  const q = root.querySelector("#q");
  const qv = root.querySelector("#qv");
  const status = root.querySelector("#status");
  const thumbs = root.querySelector("#thumbs");
  const dlAllWrap = root.querySelector("#dlAllWrap");
  let results = [];

  files.onchange = () => {
    results = [];
    thumbs.innerHTML = "";
    dlAllWrap.style.display = "none";
    run.disabled = !files.files.length;
  };
  q.oninput = () => { qv.textContent = Math.round(q.value * 100) + "%"; };

  run.onclick = async () => {
    const list = [...files.files];
    if (!list.length) return toastError(t("tool.noInput"));
    run.disabled = true;
    thumbs.innerHTML = "";
    results = [];
    try {
      await loadScript("https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js");
      let done = 0;
      for (const f of list) {
        status.textContent = `⚙️ ${f.name} (${++done}/${list.length}) …`;
        try {
          const out = await window.heic2any({ blob: f, toType: "image/jpeg", quality: +q.value });
          const blobs = Array.isArray(out) ? out : [out];
          for (const b of blobs) {
            results.push({ name: f.name.replace(/\.(heic|heif)$/i, "") + ".jpg", blob: b });
            const url = URL.createObjectURL(b);
            const d = document.createElement("div");
            d.className = "thumb";
            d.innerHTML = `<img src="${url}" alt=""><span>${formatBytes(b.size)}</span>`;
            thumbs.appendChild(d);
          }
        } catch (err) {
          status.textContent = `⚠️ ${f.name}: ${t("heic.bad")}`;
        }
      }
      status.textContent = `✓ ${results.length} JPG`;
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
    downloadBlob(out, "heic-to-jpg.zip");
    status.textContent = `✓ ZIP — ${formatBytes(out.size)}`;
  };
}
