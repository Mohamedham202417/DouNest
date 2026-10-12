// نظام الترجمة البسيط
const translations = {
  ar: {
    "a11y.skip": "تخطَّ إلى المحتوى",
    "nav.allTools": "كل الأدوات",
    "nav.favorites": "المفضلة",
    "nav.about": "حول",
    "footer.local": "يعمل محليًا في متصفحك",
    "hero.title": "صندوق أدواتك اليومية",
    "hero.subtitle": "أدوات سريعة تعمل داخل متصفحك دون رفع أي بيانات. مجانية، خاصة، وبالعربية.",
    "search.placeholder": "ابحث عن أداة… (مثل: JSON, Base64)",
    "cat.all": "الكل",
    "cat.text": "نصوص",
    "cat.encode": "ترميز",
    "cat.dev": "مطورين",
    "cat.color": "ألوان",
    "cat.security": "أمان",
    "tool.usage": "طريقة الاستخدام",
    "tool.explanation": "شرح مفصّل",
    "tool.faq": "أسئلة شائعة",
    "tool.related": "أدوات ذات صلة",
    "tool.rating": "تقييم الأداة",
    "tool.comments": "التعليقات",
    "tool.favorite": "إضافة للمفضلة",
    "tool.unfavorite": "إزالة من المفضلة",
    "tool.share": "مشاركة",
    "tool.openQuick": "فتح سريع",
    "tool.run": "تنفيذ",
    "tool.copy": "نسخ",
    "tool.clear": "مسح",
    "tool.download": "تنزيل",
    "tool.result": "النتيجة",
    "tool.input": "المدخل",
    "tool.output": "المخرج",
    "tool.copied": "تم النسخ ✓",
    "tool.cleared": "تم المسح",
    "tool.error": "حدث خطأ",
    "tool.noInput": "أدخل بيانات أولًا",
    "rating.thanks": "شكرًا لتقييمك!",
    "comment.placeholder": "اكتب تعليقًا…",
    "comment.name": "اسمك (اختياري)",
    "comment.submit": "إرسال",
    "comment.empty": "لا توجد تعليقات بعد. كن أول من يعلّق!",
    "comment.posted": "تم نشر تعليقك",
    "favorites.empty": "لا توجد أدوات في المفضلة بعد.",
    "about.title": "حول ToolNest",
    "about.body": "ToolNest مجموعة أدوات ويب تعمل بالكامل داخل متصفحك. لا نرفع ملفاتك ولا نخزنها على خوادمنا. الأدوات مجانية ومفتوحة المصدر.",
    "about.privacy": "الخصوصية: الأدوات تعمل محليًا. التقييمات والتعليقات تُحفظ في متصفحك في هذا العرض التجريبي.",
    "notfound": "الصفحة غير موجودة"
  },
  en: {
    "a11y.skip": "Skip to content",
    "nav.allTools": "All Tools",
    "nav.favorites": "Favorites",
    "nav.about": "About",
    "footer.local": "Runs locally in your browser",
    "hero.title": "Your daily toolbox",
    "hero.subtitle": "Fast tools that run in your browser without uploading data. Free, private, bilingual.",
    "search.placeholder": "Search tools… (e.g. JSON, Base64)",
    "cat.all": "All",
    "cat.text": "Text",
    "cat.encode": "Encoding",
    "cat.dev": "Developer",
    "cat.color": "Color",
    "cat.security": "Security",
    "tool.usage": "How to use",
    "tool.explanation": "Detailed explanation",
    "tool.faq": "FAQ",
    "tool.related": "Related tools",
    "tool.rating": "Rate this tool",
    "tool.comments": "Comments",
    "tool.favorite": "Add to favorites",
    "tool.unfavorite": "Remove from favorites",
    "tool.share": "Share",
    "tool.openQuick": "Quick open",
    "tool.run": "Run",
    "tool.copy": "Copy",
    "tool.clear": "Clear",
    "tool.download": "Download",
    "tool.result": "Result",
    "tool.input": "Input",
    "tool.output": "Output",
    "tool.copied": "Copied ✓",
    "tool.cleared": "Cleared",
    "tool.error": "Something went wrong",
    "tool.noInput": "Please enter data first",
    "rating.thanks": "Thanks for rating!",
    "comment.placeholder": "Write a comment…",
    "comment.name": "Your name (optional)",
    "comment.submit": "Submit",
    "comment.empty": "No comments yet. Be the first!",
    "comment.posted": "Comment posted",
    "favorites.empty": "No favorites yet.",
    "about.title": "About ToolNest",
    "about.body": "ToolNest is a set of web tools that run entirely in your browser. We never upload or store your files. Free and open source.",
    "about.privacy": "Privacy: tools run locally. Ratings and comments are stored in your browser in this demo.",
    "notfound": "Page not found"
  }
};

let current = localStorage.getItem("toolnest.lang") || (navigator.language?.startsWith("ar") ? "ar" : "en");

export function t(key) {
  return translations[current]?.[key] ?? translations.en[key] ?? key;
}

export function getLang() { return current; }

export function setLang(lang) {
  current = lang;
  localStorage.setItem("toolnest.lang", lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  applyTranslations();
  document.dispatchEvent(new CustomEvent("langchange"));
}

export function applyTranslations(root = document) {
  root.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
  });
}

// تهيئة فورية
document.documentElement.lang = current;
document.documentElement.dir = current === "ar" ? "rtl" : "ltr";