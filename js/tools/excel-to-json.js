import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadScript } from "../util.js";

/** Excel → JSON via SheetJS: array-of-objects (header keys) or array-of-rows. */
export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>${t("x2j.pick")}</label>
      <input type="file" id="file" accept=".xlsx,.xls,.xlsb,.xlsm,.ods">
    </div>
    <div class="row wrap" style="gap:10px">
      <div class="field" style="min-width:180px">
        <label>${t("x2j.sheet")}</label>
        <select id="sheet" disabled></select>
      </div>
      <div class="field" style="min-width:180px">
        <label>${t("x2j.mode")}</label>
        <select id="mode">
          <option value="objects">${t("x2j.objects")}</option>
          <option value="rows">${t("x2j.rows")}</option>
        </select>
      </div>
      <div class="field" style="align-self:flex-end">
        <button class="btn btn-primary" id="run" disabled>${t("x2j.run")}</button>
      </div>
    </div>
    <div id="status" style="color:var(--text-muted);font-size:13px;margin:8px 0"></div>
    <div class="field">
      <label>${t("tool.output")}</label>
      <textarea id="out" rows="10" dir="ltr" readonly style="width:100%;font-family:monospace;font-size:12px"></textarea>
      <div class="row" style="margin-top:8px">
        <button class="btn" id="copy" disabled>${t("tool.copy")}</button>
        <button class="btn" id="dl" disabled>${t("tool.download")} json</button>
      </div>
    </div>
  `;
  const file = root.querySelector("#file");
  const sheet = root.querySelector("#sheet");
  const mode = root.querySelector("#mode");
  const run = root.querySelector("#run");
  const status = root.querySelector("#status");
  const out = root.querySelector("#out");
  const copy = root.querySelector("#copy");
  const dl = root.querySelector("#dl");
  let wb = null;

  const convert = () => {
    const ws = wb.Sheets[sheet.value];
    let json;
    if (mode.value === "objects") {
      json = window.XLSX.utils.sheet_to_json(ws, { defval: null });
    } else {
      json = window.XLSX.utils.sheet_to_json(ws, { header: 1, raw: true });
    }
    out.value = JSON.stringify(json, null, 2);
    copy.disabled = dl.disabled = !out.value;
    status.textContent = `✓ ${Array.isArray(json) ? json.length : 0} ${t("x2j.items")}`;
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
      convert();
    } catch (e) {
      status.textContent = "❌ " + (e?.message || e);
      toastError(t("tool.error"));
    }
  };
  sheet.onchange = () => wb && convert();
  mode.onchange = () => wb && convert();

  run.onclick = () => {
    if (!wb) return toastError(t("tool.noInput"));
    convert();
    toastSuccess(t("tool.result") + " ✓");
  };
  copy.onclick = () => {
    out.select();
    navigator.clipboard?.writeText(out.value);
    toastSuccess(t("tool.copied"));
  };
  dl.onclick = () => {
    if (!out.value) return;
    const blob = new Blob([out.value], { type: "application/json;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (sheet.value || "data") + ".json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  };
}
