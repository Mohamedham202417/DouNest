import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadScript } from "../util.js";

/** Decode QR codes from images via jsQR — no live camera needed. */
export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>${t("qrs.pick")}</label>
      <input type="file" id="file" accept="image/*">
    </div>
    <div class="row">
      <button class="btn btn-primary" id="run" disabled>${t("qrs.run")}</button>
    </div>
    <div id="status" style="color:var(--text-muted);font-size:13px;margin:8px 0"></div>
    <div id="result" class="field" style="display:none">
      <label>${t("tool.result")}</label>
      <textarea id="out" rows="4" dir="auto" readonly style="width:100%"></textarea>
      <div class="row" style="margin-top:8px">
        <button class="btn" id="copy">${t("tool.copy")}</button>
        <a class="btn" id="open" target="_blank" rel="noopener" style="display:none;text-decoration:none">${t("qrs.open")}</a>
      </div>
    </div>
    <div id="preview" style="text-align:center;margin-top:10px"></div>
  `;
  const file = root.querySelector("#file");
  const run = root.querySelector("#run");
  const status = root.querySelector("#status");
  const result = root.querySelector("#result");
  const out = root.querySelector("#out");
  const copy = root.querySelector("#copy");
  const open = root.querySelector("#open");
  const preview = root.querySelector("#preview");

  file.onchange = () => {
    run.disabled = !file.files[0];
    result.style.display = "none";
    preview.innerHTML = "";
  };

  run.onclick = async () => {
    const f = file.files[0];
    if (!f) return toastError(t("tool.noInput"));
    status.textContent = "⏳ jsQR …";
    try {
      await loadScript("https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js");
      const bmp = await createImageBitmap(f);
      // cap huge images for speed
      const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
      const c = document.createElement("canvas");
      c.width = Math.round(bmp.width * scale);
      c.height = Math.round(bmp.height * scale);
      c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
      const imgData = c.getContext("2d").getImageData(0, 0, c.width, c.height);
      const code = window.jsQR(imgData.data, imgData.width, imgData.height, { inversionAttempts: "attemptBoth" });
      preview.innerHTML = `<img src="${c.toDataURL("image/png")}" style="max-width:100%;max-height:300px;border-radius:10px">`;
      if (code && code.data) {
        out.value = code.data;
        result.style.display = "block";
        const isUrl = /^(https?:)?\/\//i.test(code.data.trim());
        open.style.display = isUrl ? "inline-block" : "none";
        if (isUrl) open.href = code.data.trim();
        status.textContent = "✓";
        toastSuccess(t("tool.result") + " ✓");
      } else {
        result.style.display = "none";
        status.textContent = "⚠️ " + t("qrs.notFound");
      }
    } catch (e) {
      status.textContent = "❌ " + (e?.message || e);
      toastError(t("tool.error"));
    }
  };

  copy.onclick = () => {
    out.select();
    navigator.clipboard?.writeText(out.value);
    toastSuccess(t("tool.copied"));
  };
}
