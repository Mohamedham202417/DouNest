import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadScript, loadEsm, formatBytes, downloadBlob } from "../util.js";

/** Excel (XLSX/XLS/XLSB) → CSV via SheetJS; sheet picker + delimiter choice. */
export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>${t("x2c.pick")}</label>
      <input type="file" id="file" accept=".xlsx,.xls,.xlsb,.xlsm,.ods">
    </div>
    <div class="row wrap" style="gap:10px">
      <div class="field" style="min-width:180px">
        <label>${t("x2c.sheet")}</label>
        <select id="sheet" disabled></select>
      </div>
      <div class="field" style="min-width:150px">
        <label>${t("x2c.delim")}</label>
        <select id="delim">
          <option value=",">, ${t("x2c.comma")}</option>
          <option value=";">; ${t("x2c.semicolon")}</option>
          <option value="\t">Tab</option>
        </select>
      </div>
      <div class="field" style="align-self:flex-end">
        <button class="btn btn-primary" id="run" disabled>${t("x2c.run")}</button>
      </div>
    </div>
    <div class="row" id="dlAllWrap" style="display:none;margin-top:4px">
      <button class="btn" id="dlAll">${t("x2c.allSheets")} (ZIP)</button>
    </div>
    <div id="status" style="color:var(--text-muted);font-size:13px;margin:8px 0"></div>
    <div class="field">
      <label>${t("tool.output")}</label>
      <textarea id="out" rows="8" dir="ltr" readonly style="width:100%;font-family:monospace;font-size:12px"></textarea>
    </div>
  `;
  const file = root.querySelector("#file");
  const sheet = root.querySelector("#sheet");
  const delim = root.querySelector("#delim");
  const run = root.querySelector("#run");
  const status = root.querySelector("#status");
  const out = root.querySelector("#out");
  const dlAllWrap = root.querySelector("#dlAllWrap");
  let wb = null;

  const loadSheet = () => {
    const name = sheet.value;
    const ws = wb.Sheets[name];
    out.value = wb ? window.XLSX.utils.sheet_to_csv(ws, { FS: delim.value }) : "";
  };

  file.onchange = async () => {
    const f = file.files[0];
    if (!f) return;
    run.disabled = true;
    status.textContent = "⏳ SheetJS …";
    try {
      await loadScript("https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js");
      wb = window.XLSX.read(await f.arrayBuffer(), { type: "array" });
      sheet.innerHTML = wb.SheetNames.map(n => `<option value="${n}">${n}</option>`).join("");
      sheet.disabled = false;
      run.disabled = false;
      dlAllWrap.style.display = wb.SheetNames.length > 1 ? "flex" : "none";
      loadSheet();
      status.textContent = `✓ ${wb.SheetNames.length} ${t("x2c.sheets")}`;
    } catch (e) {
      status.textContent = "❌ " + (e?.message || e);
      toastError(t("tool.error"));
    }
  };
  sheet.onchange = loadSheet;
  delim.onchange = () => { if (wb) loadSheet(); };

  run.onclick = () => {
    if (!wb) return toastError(t("tool.noInput"));
    loadSheet();
    downloadBlob(new Blob(["\uFEFF" + out.value], { type: "text/csv;charset=utf-8" }),
      (sheet.value || "sheet") + ".csv");
    status.textContent = `✓ ${sheet.value} — ${formatBytes(out.value.length)}`;
    toastSuccess(t("tool.result") + " ✓");
  };

  dlAllWrap.querySelector("#dlAll").onclick = async () => {
    if (!wb) return;
    status.textContent = "⏳ JSZip …";
    const { default: JSZip } = await loadEsm("https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm");
    const zip = new JSZip();
    wb.SheetNames.forEach(n =>
      zip.file(n.replace(/[\\/:*?"<>|]/g, "_") + ".csv",
        window.XLSX.utils.sheet_to_csv(wb.Sheets[n], { FS: delim.value })));
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, "excel-to-csv.zip");
    status.textContent = `✓ ZIP — ${formatBytes(blob.size)}`;
  };
}
