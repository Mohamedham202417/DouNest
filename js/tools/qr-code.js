import { t } from "../i18n.js";
import { toastSuccess } from "../toast.js";

export function render(root) {
  root.innerHTML = `
    <div class="field"><label>${t("tool.input")}</label>
      <textarea id="in" placeholder="https://example.com">https://example.com</textarea>
    </div>
    <div class="row">
      <div class="field" style="flex:1"><label>Size</label>
        <input type="number" id="size" value="320" min="120" max="1024">
      </div>
    </div>
    <div class="row">
      <button class="btn btn-primary" id="run">${t("tool.run")}</button>
      <button class="btn" id="download">${t("tool.download")}</button>
    </div>
    <div class="field" style="margin-top:14px">
      <label>${t("tool.output")}</label>
      <div style="text-align:center;padding:12px;background:#fff;border-radius:10px">
        <canvas id="cv"></canvas>
      </div>
    </div>
  `;
  const input = root.querySelector("#in");
  const size = root.querySelector("#size");
  const cv = root.querySelector("#cv");

  const loadQr = () => new Promise((resolve, reject) => {
    if (window.QRCode) return resolve(window.QRCode);
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js";
    s.onload = () => resolve(window.QRCode);
    s.onerror = reject;
    document.head.appendChild(s);
  });

  const run = async () => {
    try {
      const QRCode = await loadQr();
      const n = Math.min(1024, Math.max(120, +size.value || 320));
      await QRCode.toCanvas(cv, input.value || " ", { width: n, margin: 2 });
    } catch (e) { /* ignore */ }
  };
  root.querySelector("#run").onclick = run;
  root.querySelector("#download").onclick = () => {
    const a = document.createElement("a");
    a.href = cv.toDataURL("image/png");
    a.download = "qrcode.png";
    a.click();
    toastSuccess(t("tool.copied"));
  };
  run();
}
