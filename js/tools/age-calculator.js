import { t } from "../i18n.js";

export function render(root) {
  root.innerHTML = `
    <div class="field"><label>${t("age.birth")}</label>
      <input type="date" id="dob">
    </div>
    <div class="field"><label>${t("age.at")}</label>
      <input type="date" id="at">
    </div>
    <div class="field"><label>${t("tool.result")}</label>
      <div class="output" id="out" aria-live="polite"></div>
    </div>
  `;
  const dob = root.querySelector("#dob");
  const at = root.querySelector("#at");
  const out = root.querySelector("#out");

  at.value = new Date().toISOString().slice(0, 10);

  function run() {
    if (!dob.value || !at.value) { out.textContent = t("tool.noInput"); return; }
    const b = new Date(dob.value + "T00:00:00");
    const a = new Date(at.value + "T00:00:00");
    if (a < b) { out.textContent = t("age.err"); return; }

    let years = a.getFullYear() - b.getFullYear();
    let months = a.getMonth() - b.getMonth();
    let days = a.getDate() - b.getDate();
    if (days < 0) {
      months--;
      const prev = new Date(a.getFullYear(), a.getMonth(), 0);
      days += prev.getDate();
    }
    if (months < 0) { years--; months += 12; }

    const totalDays = Math.floor((a - b) / 86400000);
    const weekdays = Math.floor(totalDays / 7) * 5;
    const nextBday = new Date(a.getFullYear(), b.getMonth(), b.getDate());
    if (nextBday < a) nextBday.setFullYear(nextBday.getFullYear() + 1);
    const toBday = Math.ceil((nextBday - a) / 86400000);

    const lang = document.documentElement.lang || "en";
    out.textContent = [
      `${years} ${t("age.years")} · ${months} ${t("age.months")} · ${days} ${t("age.days")}`,
      `${t("age.totalDays")}: ${totalDays.toLocaleString(lang)}`,
      `${t("age.totalWeeks")}: ${Math.floor(totalDays / 7).toLocaleString(lang)}`,
      `${t("age.totalHours")}: ${(totalDays * 24).toLocaleString(lang)}`,
      `${t("age.approxWeekdays")}: ~${weekdays.toLocaleString(lang)}`,
      `${t("age.nextBirthday")}: ${toBday} ${t("age.days")}`
    ].join("\n");
  }
  dob.addEventListener("input", run);
  at.addEventListener("input", run);
}
