import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { formatBytes, downloadBlob } from "../util.js";

/**
 * Remove image background — runs the open-source U²-Net model (via
 * @imgly/background-removal) fully in the browser. Model (~40MB) is
 * fetched from img.ly's CDN on first use and cached by the browser.
 */
export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>${t("bgr.pick")}</label>
      <input type="file" id="file" accept="image/jpeg,image/png,image/webp">
    </div>
    <p class="disclosure">ℹ️ ${t("bgr.note")}</p>
    <div class="row">
      <button class="btn btn-primary" id="run" disabled>${t("bgr.run")}</button>
    </div>
    <div class="progress" id="bar" style="display:none"><div class="progress-fill" id="barfill"></div></div>
    <div id="status" style="color:var(--text-muted);font-size:13px;margin:8px 0"></div>
    <div class="row wrap" style="gap:10px;display:none" id="bgs">
      <button class="btn" data-bg="transparent">${t("bgr.transparent")}</button>
      <button class="btn" data-bg="#ffffff">${t("bgr.white")}</button>
      <button class="btn" data-bg="#000000">${t("bgr.black")}</button>
      <input type="color" id="pick" value="#7c3aed" title="color" style="width:44px;height:38px;border:none;background:none;cursor:pointer">
    </div>
    <div id="preview" style="text-align:center;margin-top:10px"></div>
  `;
  const file = root.querySelector("#file");
  const run = root.querySelector("#run");
  const bar = root.querySelector("#bar");
  const barfill = root.querySelector("#barfill");
  const status = root.querySelector("#status");
  const preview = root.querySelector("#preview");
  const bgs = root.querySelector("#bgs");
  const pick = root.querySelector("#pick");
  let result = null; // PNG blob (transparent)
  let busy = false;

  file.onchange = () => { run.disabled = !file.files[0]; };
  pick.oninput = () => compose(pick.value);

  async function compose(bg) {
    if (!result) return;
    if (bg === "transparent") { show(result); return; }
    const bmp = await createImageBitmap(result);
    const c = document.createElement("canvas");
    c.width = bmp.width; c.height = bmp.height;
    const ctx = c.getContext("2d");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(bmp, 0, 0);
    const blob = await new Promise(r => c.toBlob(r, "image/png"));
    show(blob);
  }
  function show(blob) {
    if (!blob) return;
    if (preview.dataset.url) URL.revokeObjectURL(preview.dataset.url);
    const url = URL.createObjectURL(blob);
    preview.dataset.url = url;
    preview.innerHTML = `
      <img src="${url}" alt="result" style="max-width:100%;max-height:420px;border-radius:12px;background:
        repeating-conic-gradient(#8882 0% 25%, transparent 0% 50%) 50% / 20px 20px">
      <div class="row" style="justify-content:center;margin-top:10px">
        <button class="btn btn-primary" id="dl">${t("tool.download")} PNG (${formatBytes(blob.size)})</button>
      </div>`;
    preview.querySelector("#dl").onclick = () =>
      downloadBlob(blob, "no-background.png");
    toastSuccess(t("tool.result") + " ✓");
  }

  bgs.querySelectorAll("[data-bg]").forEach(b =>
    b.onclick = () => compose(b.dataset.bg));

  run.onclick = async () => {
    const f = file.files[0];
    if (!f || busy) return toastError(t("tool.noInput"));
    busy = true;
    run.disabled = true;
    bar.style.display = "block";
    barfill.style.width = "0%";
    status.textContent = "⏳ " + t("bgr.loading");
    try {
      const mod = await import(
        "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.5/+esm"
      );
      // The package exposes the remover as the ESM default export. Keep the
      // named fallback for CDN wrappers that re-export it under its function name.
      const removeBackground = mod.default || mod.removeBackground;
      if (typeof removeBackground !== "function") throw new Error("Background removal module unavailable");
      const blob = await removeBackground(f, {
        model: "isnet_quint8",
        output: { format: "image/png", type: "foreground" },
        progress: (key, cur, total) => {
          const p = Math.round((cur / (total || 1)) * 100);
          barfill.style.width = p + "%";
          if (key.startsWith("fetch")) status.textContent = `⬇️ ${t("bgr.model")} ${p}%`;
          else status.textContent = `⚙️ ${t("bgr.compute")} ${p}%`;
        }
      });
      result = new Blob([blob], { type: "image/png" });
      bar.style.display = "none";
      status.textContent = `✓ ${formatBytes(f.size)} → ${formatBytes(result.size)}`;
      bgs.style.display = "flex";
      compose("transparent");
    } catch (e) {
      bar.style.display = "none";
      status.textContent = "❌ " + (e?.message || e);
      toastError(t("tool.error"));
    } finally {
      busy = false;
      run.disabled = false;
    }
  };
}
