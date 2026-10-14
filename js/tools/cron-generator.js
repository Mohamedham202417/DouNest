import { t } from "../i18n.js";
import { toastSuccess } from "../toast.js";

/**
 * Cron generator/explainer — supports the 5-field standard cron
 * (minute hour day-of-month month day-of-week) with * , - / values.
 */
export function render(root) {
  root.innerHTML = `
    <div class="field"><label>Cron expression</label>
      <input id="expr" placeholder="*/15 9-17 * * 1-5" value="*/15 9-17 * * 1-5" style="font-family:ui-monospace,monospace">
    </div>
    <div class="row">
      <div class="field"><label>${t("cron.minute")}</label><input id="f0" placeholder="*"></div>
      <div class="field"><label>${t("cron.hour")}</label><input id="f1" placeholder="*"></div>
      <div class="field"><label>${t("cron.dom")}</label><input id="f2" placeholder="*"></div>
      <div class="field"><label>${t("cron.month")}</label><input id="f3" placeholder="*"></div>
      <div class="field"><label>${t("cron.dow")}</label><input id="f4" placeholder="*"></div>
    </div>
    <div class="row">
      <button class="btn btn-primary" id="run">${t("tool.run")}</button>
      <button class="btn" id="copy">${t("tool.copy")}</button>
    </div>
    <div class="field" style="margin-top:10px"><label>${t("tool.output")}</label>
      <div class="output" id="out" aria-live="polite"></div>
    </div>
  `;
  const expr = root.querySelector("#expr");
  const fields = [0, 1, 2, 3, 4].map(i => root.querySelector(`#f${i}`));
  const out = root.querySelector("#out");

  fields.forEach((f, i) => f.addEventListener("input", () => {
    const parts = expr.value.trim().split(/\s+/);
    while (parts.length < 5) parts.push("*");
    parts[i] = f.value || "*";
    expr.value = parts.slice(0, 5).join(" ");
  }));

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  function parseField(f, min, max, names) {
    if (f === undefined || f === "*" || f === "") return { every: true };
    const out = new Set();
    for (const part of f.split(",")) {
      let [range, step = "1"] = part.split("/");
      const stepN = parseInt(step, 10) || 1;
      let a, b;
      if (range === "*" || range === "?") { a = min; b = max; }
      else if (range.includes("-")) { [a, b] = range.split("-").map(v => v.trim()); }
      else { a = b = range.trim(); }
      a = resolveToken(a, names); b = resolveToken(b, names);
      a = parseInt(a, 10); b = parseInt(b, 10);
      if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error(`bad range: ${part}`);
      for (let v = a; v <= b; v += stepN) {
        const wrapped = names && names.length ? ((v - 1) % names.length) : v;
        out.add(wrapped < min ? v % (max + 1) : v);
        if (v > max && !names) break;
      }
    }
    return { every: false, values: [...out].sort((x, y) => x - y) };
  }
  const resolveToken = (v, names) => {
    if (!v || !names) return v;
    const idx = names.findIndex(n => v.toLowerCase().startsWith(n.toLowerCase().slice(0, 3)));
    return idx >= 0 ? idx : v;
  };

  function describe(f, min, max, names, unitAr, unitEn) {
    const p = parseField(f, min, max, names);
    if (p.every) return getLang() === "ar" ? `كل ${unitAr}` : `every ${unitEn}`;
    if (p.values.length === 1) return names ? names[p.values[0]] || p.values[0] : p.values[0];
    return p.values.map(v => names ? names[v] || v : v).join(", ");
  }
  const getLang = () => document.documentElement.lang || "en";

  root.querySelector("#run").onclick = () => {
    const parts = expr.value.trim().split(/\s+/);
    if (parts.length !== 5) { out.textContent = "❌ 5 fields required: m h dom mon dow"; return; }
    try {
      const [m, h, dom, mon, dow] = parts;
      const ar = getLang() === "ar";
      const lines = ar ? [
        `الدقائق : ${describe(m, 0, 59, null, "دقيقة", "minute")}`,
        `الساعات : ${describe(h, 0, 23, null, "ساعة", "hour")}`,
        `أيام الشهر: ${describe(dom, 1, 31, null, "يوم", "day")}`,
        `الشهور : ${describe(mon, 1, 12, MONTHS, "شهر", "month")}`,
        `أيام الأسبوع: ${describe(dow, 0, 6, DAYS, "أسبوع", "week")}`
      ] : [
        `Minutes : ${describe(m, 0, 59, null, "minute", "minute")}`,
        `Hours : ${describe(h, 0, 23, null, "hour", "hour")}`,
        `Days of month: ${describe(dom, 1, 31, null, "day", "day")}`,
        `Months : ${describe(mon, 1, 12, MONTHS, "month", "month")}`,
        `Days of week: ${describe(dow, 0, 6, DAYS, "week", "week")}`
      ];

      // next 5 runs (approximate scan over next 366 days)
      const pm = parseField(m, 0, 59), ph = parseField(h, 0, 23),
            pd = parseField(dom, 1, 31), pn = parseField(mon, 1, 12, MONTHS.map((_, i) => i + 1)),
            pw = parseField(dow, 0, 6);
      const runs = [];
      const cur = new Date(); cur.setSeconds(0, 0);
      for (let d = new Date(cur); d < new Date(cur.getTime() + 366 * 86400000) && runs.length < 5; d.setDate(d.getDate() + 1)) {
        if (!pn.every && !pn.values.includes(d.getMonth() + 1)) continue;
        if (!pd.every && !pd.values.includes(d.getDate())) continue;
        if (!pw.every && !pw.values.includes(d.getDay())) continue;
        for (let hh = 0; hh < 24 && runs.length < 5; hh++) {
          if (!ph.every && !ph.values.includes(hh)) continue;
          for (let mm = 0; mm < 60 && runs.length < 5; mm++) {
            if (!pm.every && !pm.values.includes(mm)) continue;
            const cand = new Date(d); cand.setHours(hh, mm, 0, 0);
            if (cand > cur) runs.push(cand);
            if (pm.every) break;
          }
          if (pm.every && ph.every) break;
        }
      }
      const lang = getLang();
      out.textContent = lines.join("\n") +
        (runs.length ? `\n\n${ar ? "المواعيد القادمة" : "Next runs"}:\n` + runs.map(r => "• " + r.toLocaleString(lang)).join("\n") : "");
    } catch (e) { out.textContent = "❌ " + e.message; }
  };
  root.querySelector("#copy").onclick = () => {
    navigator.clipboard.writeText(expr.value); toastSuccess(t("tool.copied"));
  };
  root.querySelector("#run").click();
}
