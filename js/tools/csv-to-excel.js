import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadScript, formatBytes, downloadBlob } from "../util.js";

/** CSV → real XLSX via SheetJS (UTF-8 safe, auto delimiter, Arabic-friendly). */
export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>${t("c2x.pick")}</label>
      <input type="file" id="file" accept=".csv,.tsv,text/csv,text/plain">
    </div>
    <div class="field">
      <label>${t("c2x.delim")}</label>
      <select id="delim">
        <option value="auto">${t("c2x.auto")}</option>
        <option value=",">, ${t("c2x.comma")}</option>
        <option value=";">; ${t("c2x.semicolon")}</option>
        <option value="\t">Tab</option>
      </select>
    </div>
    <div class="row">
      <button class="btn btn-primary" id="run" disabled>${t("c2x.run")}</button>
    </div>
    <div id="status" style="color:var(--text-muted);font-size:13px;margin:8px 0"></div>
    <div id="tbl" style="overflow:auto;max-height:340px;margin-top:8px"></div>
  `;
  const file = root.querySelector("#file");
  const delim = root.querySelector("#delim");
  const run = root.querySelector("#run");
  const status = root.querySelector("#status");
  const tbl = root.querySelector("#tbl");
  let rows = null;

  const guessDelim = (text) => {
    const first = text.split(/\r?\n/).find(l => l.trim()) || "";
    const counts = [",", ";", "\t", "|"].map(d => (first.match(new RegExp("\\" + (d === "\t" ? "t" : d), "g")) || []).length);
    return [",", ";", "\t", "|"][counts.indexOf(Math.max(...counts))];
  };

  file.onchange = () => { run.disabled = !file.files[0]; tbl.innerHTML = ""; };

  run.onclick = async () => {
    const f = file.files[0];
    if (!f) return toastError(t("tool.noInput"));
    status.textContent = "⏳ SheetJS …";
    try {
      await loadScript("https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js");
      const text = new TextDecoder("utf-8").decode(await f.arrayBuffer()).replace(/^\uFEFF/, "");
      const d = delim.value === "auto" ? guessDelim(text) : delim.value;
      const wb = window.XLSX.read(text, { type: "string", FS: d, raw: false });
      const ws = wb.Sheets[wb.SheetNames[0]];
      rows = window.XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });
      // preview first 12 rows
      const head = rows.slice(0, 12);
      tbl.innerHTML = `<table class="csv-preview">${head.map((r, ri) =>
        `<tr>${r.map(c => `<${ri === 0 ? "th" : "td"}>${(c ?? "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;")}</${ri === 0 ? "th" : "td"}>`).join("")}</tr>`).join("")}</table>`;
      const out = window.XLSX.utils.aoa_to_sheet(rows);
      const wbOut = window.XLSX.utils.book_new();
      window.XLSX.utils.book_append_sheet(wbOut, out, "Sheet1");
      const buf = window.XLSX.write(wbOut, { bookType: "xlsx", type: "array" });
      const name = f.name.replace(/\.(csv|tsv|txt)$/i, "") + ".xlsx";
      downloadBlob(new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), name);
      status.textContent = `✓ ${rows.length} ${t("c2x.rows")} × ${rows[0]?.length || 0} ${t("c2x.cols")} — ${formatBytes(buf.byteLength ?? buf.length)}`;
      toastSuccess(t("tool.result") + " ✓");
    } catch (e) {
      status.textContent = "❌ " + (e?.message || e);
      toastError(t("tool.error"));
    }
  };
}
