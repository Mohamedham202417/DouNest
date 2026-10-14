import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { formatBytes, downloadBlob } from "../util.js";

export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>${t("imgc.pick")}</label>
      <input type="file" id="file" accept="image/*">
    </div>
    <div class="row">
      <div class="field"><label>${t("imgc.format")}</label>
        <select id="fmt">
          <option value="image/jpeg">JPEG</option>
          <option value="image/png">PNG</option>
          <option value="image/webp">WebP</option>
        </select>
      </div>
      <div class="field"><label>${t("imgc.quality")}: <span id="qv">0.9</span></label>
        <input type="range" id="q" min="0.1" max="1" step="0.05" value="0.9">
      </div>
    </div>
    <div class="row">
      <button class="btn btn-primary" id="run" disabled>${t("imgc.convert")}</button>
      <button class="btn" id="download" disabled>${t("tool.download")}</button>
    </div>
    <div class="field" style="margin-top:10px">
      <label>${t("tool.output")}</label>
      <div id="preview" style="text-align:center"></div>
      <div id="stats" style="color:var(--text-muted);font-size:13px;margin-top:8px"></div>
    </div>
  `;
  const file = root.querySelector("#file");
  const fmt = root.querySelector("#fmt");
  const q = root.querySelector("#q"), qv = root.querySelector("#qv");
  const run = root.querySelector("#run"), dl = root.querySelector("#download");
  const preview = root.querySelector("#preview"), stats = root.querySelector("#stats");
  let blob = null, ext = "jpg";

  file.onchange = () => { run.disabled = !file.files[0]; };
  q.oninput = () => { qv.textContent = (+q.value).toFixed(2); };

  run.onclick = async () => {
    const f = file.files[0];
    if (!f) return toastError(t("tool.noInput"));
    const type = fmt.value;
    ext = type === "image/png" ? "png" : type === "image/webp" ? "webp" : "jpg";
    try {
      const img = await createImageBitmap(f);
      const canvas = document.createElement("canvas");
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (type === "image/jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(b => {
        if (!b) return toastError(t("tool.error"));
        blob = b;
        preview.innerHTML = `<img src="${URL.createObjectURL(b)}" alt="" style="max-width:100%;max-height:320px;border-radius:10px">`;
        const d = b.size < f.size ? " ↓" : " ↑";
        stats.textContent = `${formatBytes(f.size)} → ${formatBytes(b.size)} (${ext.toUpperCase()})${d}`;
        dl.disabled = false;
        toastSuccess(t("imgc.done"));
      }, type, type === "image/png" ? undefined : +q.value);
    } catch { toastError(t("tool.error")); }
  };

  dl.onclick = () => {
    if (!blob) return;
    const base = (file.files[0]?.name || "image").replace(/\.[^.]+$/, "");
    downloadBlob(blob, `${base}.${ext}`);
  };
}
