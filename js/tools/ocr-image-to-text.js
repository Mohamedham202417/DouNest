import { t, getLang } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadScript, downloadBlob } from "../util.js";

/** OCR via Tesseract.js — Arabic, English or both. Fully in-browser. */
const STATUS = {
  ar: { "loading tesseract core": "تحميل محرك التعرف…", "initializing tesseract": "تهيئة المحرك…", "loading language traineddata": "تحميل بيانات اللغة…", "initializing api": "تهيئة الواجهة…", "recognizing text": "التعرف على النص…" },
  en: { "loading tesseract core": "Loading OCR engine…", "initializing tesseract": "Initializing engine…", "loading language traineddata": "Loading language data…", "initializing api": "Initializing API…", "recognizing text": "Recognizing text…" }
};
export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>${t("ocr.pick")}</label>
      <input type="file" id="file" accept="image/*">
    </div>
    <div class="row wrap" style="gap:10px">
      <div class="field" style="min-width:180px">
        <label>${t("ocr.lang")}</label>
        <select id="lang">
          <option value="ara">${t("ocr.ar")}</option>
          <option value="eng">${t("ocr.en")}</option>
          <option value="ara+eng" selected>${t("ocr.both")}</option>
        </select>
      </div>
      <div class="field" style="align-self:flex-end">
        <button class="btn btn-primary" id="run" disabled>${t("ocr.run")}</button>
      </div>
    </div>
    <div class="progress" id="bar" style="display:none"><div class="progress-fill" id="barfill"></div></div>
    <div id="status" style="color:var(--text-muted);font-size:13px;margin:8px 0"></div>
    <div class="field" style="display:none" id="outWrap">
      <label>${t("tool.output")}</label>
      <textarea id="out" rows="10" dir="auto" style="width:100%"></textarea>
      <div class="row" style="margin-top:8px">
        <button class="btn" id="copy">${t("tool.copy")}</button>
        <button class="btn" id="dl">${t("tool.download")} txt</button>
      </div>
    </div>
  `;
  const file = root.querySelector("#file");
  const run = root.querySelector("#run");
  const bar = root.querySelector("#bar");
  const barfill = root.querySelector("#barfill");
  const status = root.querySelector("#status");
  const outWrap = root.querySelector("#outWrap");
  const out = root.querySelector("#out");

  file.onchange = () => { run.disabled = !file.files[0]; };

  run.onclick = async () => {
    const f = file.files[0];
    if (!f) return toastError(t("tool.noInput"));
    run.disabled = true;
    bar.style.display = "block";
    status.textContent = "⏳ tesseract.js …";
    try {
      await loadScript("https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js");
      const T = window.Tesseract;
      const lang = root.querySelector("#lang").value;
      const res = await T.recognize(f, lang, {
        logger: m => {
          if (m.progress != null) barfill.style.width = Math.round(m.progress * 100) + "%";
          if (m.status) {
            const map = STATUS[getLang()] || STATUS.en;
            status.textContent = "⚙️ " + (map[m.status] || m.status) + ` ${Math.round((m.progress || 0) * 100)}%`;
          }
        }
      });
      out.value = (res.data.text || "").trim();
      outWrap.style.display = "block";
      status.textContent = `✓ ${t("ocr.conf")}: ${Math.round(res.data.confidence || 0)}%`;
      toastSuccess(t("tool.result") + " ✓");
    } catch (e) {
      status.textContent = "❌ " + (e?.message || e);
      toastError(t("tool.error"));
    } finally {
      run.disabled = false;
    }
  };
  root.querySelector("#copy").onclick = () => {
    out.select();
    navigator.clipboard?.writeText(out.value);
    toastSuccess(t("tool.copied"));
  };
  root.querySelector("#dl").onclick = () =>
    downloadBlob(new Blob([out.value], { type: "text/plain;charset=utf-8" }), "ocr-text.txt");
}
