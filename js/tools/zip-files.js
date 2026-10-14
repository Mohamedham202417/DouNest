import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadEsm, formatBytes, downloadBlob } from "../util.js";

/** Pack any number of files into one ZIP via JSZip — optional inner folder. */
export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>${t("zipf.pick")}</label>
      <input type="file" id="files" multiple>
    </div>
    <ul id="list" class="nice-list" style="margin:8px 0"></ul>
    <div class="row wrap" style="gap:10px">
      <div class="field" style="min-width:170px">
        <label>${t("zipf.folder")}</label>
        <input type="text" id="folder" placeholder="${t("zipf.folderHint")}" dir="ltr" style="width:100%">
      </div>
      <div class="field" style="min-width:170px">
        <label>${t("zipf.name")}</label>
        <input type="text" id="zname" value="archive" dir="ltr" style="width:100%">
      </div>
      <div class="field" style="align-self:flex-end">
        <button class="btn btn-primary" id="run" disabled>${t("zipf.run")}</button>
      </div>
    </div>
    <div id="status" style="color:var(--text-muted);font-size:13px;margin-top:8px"></div>
  `;
  const files = root.querySelector("#files");
  const list = root.querySelector("#list");
  const folder = root.querySelector("#folder");
  const zname = root.querySelector("#zname");
  const run = root.querySelector("#run");
  const status = root.querySelector("#status");
  let picked = [];

  const refresh = () => {
    picked = [...files.files];
    list.innerHTML = picked.map((f, i) =>
      `<li>${i + 1}. ${f.name} — ${formatBytes(f.size)}</li>`).join("");
    run.disabled = !picked.length;
  };
  files.onchange = refresh;

  run.onclick = async () => {
    if (!picked.length) return toastError(t("tool.noInput"));
    run.disabled = true;
    status.textContent = "⏳ JSZip …";
    try {
      const { default: JSZip } = await loadEsm("https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm");
      const zip = new JSZip();
      const prefix = folder.value.trim().replace(/[\\/:*?"<>|]/g, "-");
      for (const f of picked) {
        zip.file(prefix ? `${prefix}/${f.name}` : f.name, f);
      }
      const blob = await zip.generateAsync(
        { type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } },
        m => { status.textContent = `⚙️ ${Math.round(m.percent)}%`; }
      );
      const name = (zname.value.trim() || "archive").replace(/[\\/:*?"<>|]/g, "-") + ".zip";
      downloadBlob(blob, name);
      status.textContent = `✓ ${picked.length} → ${name} (${formatBytes(blob.size)})`;
      toastSuccess(t("tool.result") + " ✓");
    } catch (e) {
      status.textContent = "❌ " + (e?.message || e);
      toastError(t("tool.error"));
    } finally {
      run.disabled = false;
    }
  };
}
