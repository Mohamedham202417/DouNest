/**
 * DouNest v5 — Center engine (hub-kit)
 * ------------------------------------------------------------------
 * One workbench implementation shared by every center:
 *   drop files once → detect what they are → run any action with one click.
 */
import { escapeHtml, formatBytes, downloadBlob } from "./util.js";

const isPdf = (f) => f.type === "application/pdf" || /\.pdf$/i.test(f.name);
const isImg = (f) => f.type.startsWith("image/") || /\.(png|jpe?g|webp|gif|avif|svg|bmp)$/i.test(f.name);
export { isPdf, isImg };

function optionMarkup(o) {
  if (o.kind === "select") return `<label class="wb-opt">${escapeHtml(o.label)}<select id="wb-opt-${o.id}">${(o.choices || []).map(c => `<option value="${escapeHtml(c.v)}"${String(c.v) === String(o.value) ? " selected" : ""}>${escapeHtml(c.label)}</option>`).join("")}</select></label>`;
  if (o.kind === "range") return `<label class="wb-opt">${escapeHtml(o.label)}: <span id="wb-val-${o.id}">${o.value}</span><input type="range" id="wb-opt-${o.id}" min="${o.min ?? 0}" max="${o.max ?? 1}" step="${o.step ?? 0.05}" value="${o.value}"></label>`;
  if (o.kind === "number") return `<label class="wb-opt">${escapeHtml(o.label)}<input type="number" id="wb-opt-${o.id}" min="${o.min ?? 1}" max="${o.max ?? 100000}" value="${o.value}"></label>`;
  if (o.kind === "text") return `<label class="wb-opt">${escapeHtml(o.label)}<input type="text" id="wb-opt-${o.id}" value="${escapeHtml(o.value ?? "")}"></label>`;
  if (o.kind === "checkbox") return `<label class="wb-opt wb-check"><input type="checkbox" id="wb-opt-${o.id}"${o.value ? " checked" : ""}> ${escapeHtml(o.label)}</label>`;
  if (o.kind === "textarea") return `<label class="wb-opt wb-wide">${escapeHtml(o.label)}<textarea id="wb-opt-${o.id}" rows="${o.rows || 4}" placeholder="${escapeHtml(o.placeholder || "")}">${escapeHtml(o.value ?? "")}</textarea></label>`;
  return "";
}

export function workbench(root, cfg) {
  const s = cfg.s || {};
  const AR = document.documentElement.lang !== "en";
  const label = (k, fallback) => s[k] || fallback;
  const standaloneText = !!cfg.textMode;
  root.innerHTML = `
    <div class="hub-drop" id="wb-drop" role="button" tabindex="0" aria-label="${escapeHtml(label("drop", "Drop files here"))}">
      <span class="hub-drop-icon" aria-hidden="true">${cfg.icon || "📁"}</span><p>${escapeHtml(label("drop", "Drop files here"))}</p>
      <input type="file" id="wb-input" ${cfg.multiple === false ? "" : "multiple"} accept="${escapeHtml(cfg.accept || "*/*")}" hidden>
    </div>
    ${standaloneText ? `<label class="wb-opt wb-input-text">${escapeHtml(label("textLabel", AR ? "النص أو المدخل" : "Text / input"))}<textarea id="wb-text" rows="8" placeholder="${escapeHtml(label("textPlaceholder", AR ? "الصق أو اكتب هنا…" : "Paste or type here…"))}"></textarea></label>` : ""}
    <div class="hub-files" id="wb-files" hidden><h3>${escapeHtml(label("files", "Loaded files"))} <button class="btn btn-ghost btn-sm" id="wb-clear">${escapeHtml(label("clear", "Clear all"))}</button></h3><ul class="hub-filelist" id="wb-list"></ul></div>
    <div class="hub-actions" id="wb-actions" hidden><h3>${escapeHtml(label("actions", "Actions"))}</h3>
      <div class="hub-quality wb-opts" id="wb-opts"></div><div class="action-grid" id="wb-grid"></div></div>
    ${cfg.resultPanel ? `<div class="wb-result" id="wb-result" hidden><label>${escapeHtml(label("result", AR ? "النتيجة" : "Result"))}<textarea id="wb-result-text" rows="8" readonly></textarea><button class="btn btn-ghost btn-sm" id="wb-copy">${escapeHtml(label("copy", AR ? "نسخ" : "Copy"))}</button></div>` : ""}
    <div class="hub-status" id="wb-status" aria-live="polite">${escapeHtml(label("ready", "Ready"))}</div>
    <p class="disclosure">🔒 ${AR ? "كل العمليات تُنفَّذ محلياً داخل متصفحك — لا تُرفع ملفاتك إلى أي خادم." : "Every action runs locally in your browser — your files are never uploaded."}</p>`;

  const drop = root.querySelector("#wb-drop"), input = root.querySelector("#wb-input");
  const filesWrap = root.querySelector("#wb-files"), list = root.querySelector("#wb-list");
  const actionsWrap = root.querySelector("#wb-actions"), grid = root.querySelector("#wb-grid");
  const optsWrap = root.querySelector("#wb-opts"), statusEl = root.querySelector("#wb-status");
  const resultWrap = root.querySelector("#wb-result"), resultText = root.querySelector("#wb-result-text");
  let files = [], selectedAction = null;

  const openPicker = () => input.click();
  drop.onclick = openPicker;
  drop.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPicker(); } };
  ["dragover", "dragenter"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add("drag"); }));
  ["dragleave", "drop"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove("drag"); }));
  drop.addEventListener("drop", e => add([...e.dataTransfer.files]));
  input.onchange = () => { add([...input.files]); input.value = ""; };
  root.querySelector("#wb-clear").onclick = () => { files = []; refresh(); };
  root.querySelector("#wb-copy")?.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(resultText.value); statusEl.textContent = label("copied", AR ? "تم النسخ" : "Copied"); }
    catch { resultText.select(); document.execCommand("copy"); }
  });

  function add(more) {
    const accepted = cfg.filter ? more.filter(cfg.filter) : more;
    files = cfg.multiple === false ? accepted.slice(0, 1) : [...files, ...accepted];
    refresh();
  }
  const state = () => ({ files, pdfs: files.filter(isPdf), imgs: files.filter(isImg), text: files.filter(f => !isPdf(f) && !isImg(f)) });

  function refresh() {
    filesWrap.hidden = !files.length;
    list.innerHTML = files.map((f, i) => `<li><span class="hub-file-name">${escapeHtml(f.name)} — ${formatBytes(f.size)}</span><button class="btn btn-ghost btn-sm" data-rm="${i}" aria-label="remove">×</button></li>`).join("");
    list.querySelectorAll("[data-rm]").forEach(b => b.onclick = () => { files.splice(+b.dataset.rm, 1); refresh(); });
    renderActions();
  }
  function applicable(a, st) {
    if (a.visible && !a.visible(st)) return false;
    switch (a.needs || "any") {
      case "pdf": return st.pdfs.length >= 1;
      case "pdf2": return st.pdfs.length >= 2;
      case "image": return st.imgs.length >= 1;
      case "one": return st.files.length === 1;
      case "none": return true;
      default: return st.files.length >= 1;
    }
  }
  function renderActions() {
    const st = state();
    const usable = (cfg.actions || []).filter(a => applicable(a, st));
    actionsWrap.hidden = !(usable.length || cfg.textMode);
    grid.innerHTML = usable.map(a => `<button class="btn ${selectedAction?.id === a.id ? "btn-primary" : "btn-ghost"} hub-act" data-act="${a.id}">${a.icon ? a.icon + " " : ""}${escapeHtml(a.label)}</button>`).join("");
    grid.querySelectorAll("[data-act]").forEach(b => b.onclick = () => {
      selectedAction = usable.find(a => a.id === b.dataset.act);
      optsWrap.innerHTML = (selectedAction.options || []).map(optionMarkup).join("");
      optsWrap.hidden = !selectedAction.options?.length;
      optsWrap.querySelectorAll("input[type=range]").forEach(el => el.oninput = () => {
        const out = optsWrap.querySelector(`#wb-val-${CSS.escape(el.id.slice(7))}`); if (out) out.textContent = el.value;
      });
      grid.querySelectorAll("[data-act]").forEach(x => x.classList.toggle("btn-primary", x === b));
      b.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
    if (selectedAction && !usable.some(a => a.id === selectedAction.id)) { selectedAction = null; optsWrap.innerHTML = ""; }
    if (!selectedAction && usable.length === 1) {
      const b = grid.querySelector("[data-act]"); if (b) b.click();
    }
  }

  const ui = {
    status: txt => { statusEl.textContent = txt; }, busy: () => { statusEl.textContent = "⏳ …"; },
    opt: id => {
      const el = optsWrap.querySelector(`#wb-opt-${CSS.escape(id)}`) || root.querySelector(`#wb-opt-${CSS.escape(id)}`);
      if (!el) return undefined;
      if (el.type === "checkbox") return el.checked;
      if (el.type === "number" || el.type === "range") return Number(el.value);
      return el.value;
    },
    inputText: () => root.querySelector("#wb-text")?.value || root.querySelector("#wb-opt-text")?.value || "",
    result: value => {
      if (!resultWrap) { statusEl.textContent = String(value); return; }
      resultText.value = String(value); resultWrap.hidden = false;
      resultText.style.height = "auto"; resultText.style.height = Math.min(resultText.scrollHeight, 520) + "px";
    },
    save: (blob, name) => { downloadBlob(blob, name); if (typeof window.gtag === "function") window.gtag("event", "tool_download", { file_name: name }); },
    base: name => String(name).replace(/\.[^.]+$/, "") || "file",
    error: e => { statusEl.textContent = "❌ " + (e?.message || e); }
  };

  grid.addEventListener("dblclick", async e => {
    const btn = e.target.closest("[data-act]");
    if (btn && selectedAction) await run(selectedAction, btn);
  });
  // Simple “Run” semantics: selecting the action creates an explicit run button.
  const runHost = document.createElement("div");
  runHost.className = "wb-run-host";
  actionsWrap.appendChild(runHost);
  function selectRunButton() {
    runHost.innerHTML = selectedAction ? `<button class="btn btn-primary wb-run">▶ ${escapeHtml(label("run", AR ? "تنفيذ العملية المحددة" : "Run selected action"))}</button>` : "";
    runHost.querySelector(".wb-run")?.addEventListener("click", e => run(selectedAction, e.currentTarget));
  }
  grid.addEventListener("click", e => { if (e.target.closest("[data-act]")) setTimeout(selectRunButton, 0); });

  async function run(action, btn) {
    if (!action) return;
    btn.disabled = true; ui.busy();
    try { await action.run(state(), ui); if (typeof window.gtag === "function") window.gtag("event", "hub_action", { action_id: action.id }); }
    catch (e) { console.error("workbench action failed:", action.id, e); ui.error(e); }
    finally { btn.disabled = false; }
  }
  if (cfg.autostart) cfg.autostart(ui);
  return { state, refresh, ui };
}
