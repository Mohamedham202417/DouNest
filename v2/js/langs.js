export const LANGS = [
  { code: "ar", name: "العربية",      flag: "🇸🇦", dir: "rtl" },
  { code: "en", name: "English",      flag: "🇬🇧", dir: "ltr" },
  { code: "fr", name: "Français",     flag: "🇫🇷", dir: "ltr" },
  { code: "es", name: "Español",      flag: "🇪🇸", dir: "ltr" },
  { code: "de", name: "Deutsch",      flag: "🇩🇪", dir: "ltr" },
  { code: "tr", name: "Türkçe",       flag: "🇹🇷", dir: "ltr" },
  { code: "ru", name: "Русский",      flag: "🇷🇺", dir: "ltr" },
  { code: "zh", name: "中文",          flag: "🇨🇳", dir: "ltr" },
  { code: "hi", name: "हिन्दी",        flag: "🇮🇳", dir: "ltr" },
  { code: "pt", name: "Português",    flag: "🇧🇷", dir: "ltr" }
];

export function getLangMeta(code) {
  return LANGS.find(l => l.code === code) || LANGS[0];
}
