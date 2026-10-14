import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";

export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>Image (JPG / PNG / WebP)</label>
      <input type="file" id="file" accept="image/*">
    </div>
    <div class="field">
      <label>Quality: <span id="qv">0.75</span></label>
      <input type="range" id="q" min="0.1" max="1" step="0.05" value="0.75">
    </div>
    <div class="row">
      <button class="btn btn-primary" id="run" disabled>${t("tool.run")}</button>
      <button class="btn" id="download" disabled>${t("tool.download")}</button>
    </div>
    <div class="field" style="margin-top:14px">
      <label>${t("tool.output")}</label>
      <div id="preview" style="text-align:center"></div>
      <div id="stats" style="color:var(--text-muted);font-size:13px;margin-top:6px"></div>
    </div>
  `;
  const file = root.querySelector("#file");
  const q = root.querySelector("#q");
  const qv = root.querySelector("#qv");
  const run = root.querySelector("#run");
  const dl = root.querySelector("#download");
  const preview = root.querySelector("#preview");
  const stats = root.querySelector("#stats");
  let compressedBlob = null;

  file.onchange = () => { run.disabled = !file.files[0]; };
  q.oninput = () => { qv.textContent = (+q.value).toFixed(2); };

  run.onclick = async () => {
    const f = file.files[0];
    if (!f) return toastError(t("tool.noInput"));
    try {
      const img = await createImageBitmap(f);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);
      canvas.toBlob(b => {
        compressedBlob = b;
        const url = URL.createObjectURL(b);
        preview.innerHTML = `<img src="${url}" style="max-width:100%;border-radius:10px">`;
        const saved = ((1 - b.size / f.size) * 100).toFixed(1);
        stats.textContent = `${(f.size/1024).toFixed(0)} KB → ${(b.size/1024).toFixed(0)} KB (${saved}% ↓)`;
        dl.disabled = false;
        toastSuccess(t("tool.copied"));
      }, "image/jpeg", +q.value);
    } catch (e) { toastError(t("tool.error")); }
  };
  dl.onclick = () => {
    if (!compressedBlob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(compressedBlob);
    a.download = "compressed.jpg";
    a.click();
  };
}
