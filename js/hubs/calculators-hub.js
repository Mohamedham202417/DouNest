/** DouNest v5 — Calculators center. */
import { escapeHtml } from "../util.js";
const EN = () => document.documentElement.lang === "en";
const t2 = (ar, en) => EN() ? en : ar;
export function render(root) {
  const items = [
    ["age-calculator", "🎂", t2("حاسبة العمر", "Age calculator"), t2("احسب العمر بالسنوات والأشهر والأيام.", "Calculate age in years, months and days.")],
    ["bmi-calculator", "⚖️", t2("حاسبة BMI", "BMI calculator"), t2("احسب مؤشر كتلة الجسم.", "Calculate body mass index.")],
    ["percentage-calculator", "％", t2("حاسبة النسبة المئوية", "Percentage calculator"), t2("احسب النسب والتغيرات المئوية.", "Calculate percentages and changes.")],
    ["unit-converter", "📏", t2("محوّل الوحدات", "Unit converter"), t2("حوّل وحدات الطول والوزن والحجم والحرارة.", "Convert length, weight, volume and temperature.")]
  ];
  root.innerHTML = `<section class="page-head"><h2>${t2("حاسبات مجانية تعمل محلياً", "Free calculators that run locally")}</h2><p>${t2("اختر الحاسبة المناسبة — لا تُرسل البيانات إلى أي خادم.", "Choose a calculator — no data is sent to a server.")}</p></section><div class="tools-grid">${items.map(([slug, icon, name, desc]) => `<a class="tool-card" href="../tools/${slug}/"><div class="icon" aria-hidden="true">${icon}</div><h3>${escapeHtml(name)}</h3><p>${escapeHtml(desc)}</p><div class="card-foot"><span class="badge tiny">${t2("حاسبة", "Calculator")}</span></div></a>`).join("")}</div>`;
}
