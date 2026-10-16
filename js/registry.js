/**
 * DouNest v3 — Tools Registry (pure data)
 * ----------------------------------------
 * Single source of truth for every tool: multilingual names, descriptions,
 * usage steps, explanations, FAQ and related tools.
 * This module is dependency-free so the build script (build.mjs) can import
 * it in Node to generate per-tool SEO landing pages.
 */


import { TOOL_CONTENT } from "./tool-content.js";

// Pure helper: returns translation for lang, or English fallback.
// lang is passed explicitly so this module stays dependency-free (works in Node for the build script).
export const pick = (obj, lang) => (obj && (obj[lang] || obj.en)) || "";

export const TOOLS = [
  {
    slug: "json-formatter",
    icon: "{}",
    category: "dev",
    name: {
      ar: "منسّق JSON", en: "JSON Formatter", fr: "Formateur JSON",
      es: "Formateador JSON", de: "JSON-Formatierer", tr: "JSON Biçimlendirici",
      ru: "Форматтер JSON", zh: "JSON 格式化", hi: "JSON फ़ॉर्मैटर", pt: "Formatador JSON"
    },
    short: {
      ar: "تنسيق، تصغير، والتحقق من صحة JSON.",
      en: "Format, minify, and validate JSON.",
      fr: "Formater, minifier et valider le JSON.",
      es: "Formatea, minimiza y valida JSON.",
      de: "JSON formatieren, minifizieren und validieren.",
      tr: "JSON biçimlendir, küçült ve doğrula.",
      ru: "Форматирование, минификация и проверка JSON.",
      zh: "格式化、压缩并验证 JSON。",
      hi: "JSON को फ़ॉर्मैट, मिनिफ़ाई और मान्य करें।",
      pt: "Formate, minifique e valide JSON."
    },
    usage: {
      ar: ["الصق نص JSON في مربع الإدخال.", "اختر Beautify أو Minify.", "اضغط تنفيذ.", "انسخ النتيجة أو نزّلها."],
      en: ["Paste JSON into the input.", "Choose Beautify or Minify.", "Click Run.", "Copy or download the output."]
    },
    explanation: {
      ar: ["JSON هو تنسيق تبادل بيانات شائع الاستخدام في واجهات API والملفات الإعدادية.", "هذه الأداة تتحقق من صحة البنية وتُبرز الأخطاء، ثم تنسّق النص.", "كل شيء يعمل محليًا في متصفحك."],
      en: ["JSON is a widely used data format for APIs and config files.", "This tool validates the structure, then pretty-prints or minifies it.", "Everything runs locally in your browser."]
    },
    faq: [
      { q: { ar: "هل تُرسل بياناتي للخادم؟", en: "Is my data uploaded?" },
        a: { ar: "لا، تعمل الأداة محليًا 100%.", en: "No, it runs 100% locally." } }
    ],
    related: ["base64", "url-encoder", "jwt-decoder"]
  },
  {
    slug: "base64", icon: "64", category: "encode",
    name: { ar: "ترميز Base64", en: "Base64 Encoder", fr: "Encodeur Base64", es: "Codificador Base64", de: "Base64-Encoder", tr: "Base64 Kodlayıcı", ru: "Кодировщик Base64", zh: "Base64 编码", hi: "Base64 एन्कोडर", pt: "Codificador Base64" },
    short: { ar: "ترميز وفك ترميز نصوص Base64.", en: "Encode and decode Base64.", fr: "Encoder et décoder Base64.", es: "Codifica y decodifica Base64.", de: "Base64 kodieren und dekodieren.", tr: "Base64 kodla ve çöz.", ru: "Кодирование и декодирование Base64.", zh: "Base64 编码与解码。", hi: "Base64 एन्कोड और डिकोड करें।", pt: "Codifique e decodifique Base64." },
    usage: { ar: ["اكتب النص.", "اختر ترميز أو فك ترميز.", "اضغط تنفيذ.", "انسخ النتيجة."], en: ["Type your text.", "Pick Encode or Decode.", "Click Run.", "Copy the result."] },
    explanation: { ar: ["Base64 طريقة لتحويل البيانات الثنائية إلى نص."], en: ["Base64 encodes binary data as text."] },
    faq: [], related: ["url-encoder", "jwt-decoder", "hash-generator"]
  },
  {
    slug: "url-encoder", icon: "%", category: "encode",
    name: { ar: "ترميز URL", en: "URL Encoder", fr: "Encodeur URL", es: "Codificador URL", de: "URL-Encoder", tr: "URL Kodlayıcı", ru: "Кодировщик URL", zh: "URL 编码", hi: "URL एन्कोडर", pt: "Codificador URL" },
    short: { ar: "ترميز وفك ترميز الروابط.", en: "Encode and decode URLs.", fr: "Encoder et décoder les URL.", es: "Codifica y decodifica URLs.", de: "URLs kodieren und dekodieren.", tr: "URL'leri kodla ve çöz.", ru: "Кодирование и декодирование URL.", zh: "URL 编码与解码。", hi: "URL एन्कोड और डिकोड करें।", pt: "Codifique e decodifique URLs." },
    usage: { ar: ["الصق الرابط.", "اختر ترميز أو فك ترميز.", "اضغط تنفيذ."], en: ["Paste a URL.", "Choose encode/decode.", "Click Run."] },
    explanation: { ar: ["تُحوَّل الأحرف الخاصة إلى %XX."], en: ["Special characters become %XX."] },
    faq: [], related: ["base64", "jwt-decoder", "hash-generator"]
  },
  {
    slug: "jwt-decoder", icon: "🔑", category: "dev",
    name: { ar: "مفكّك JWT", en: "JWT Decoder", fr: "Décodeur JWT", es: "Decodificador JWT", de: "JWT-Decoder", tr: "JWT Çözücü", ru: "Декодер JWT", zh: "JWT 解码", hi: "JWT डिकोडर", pt: "Decodificador JWT" },
    short: { ar: "اقرأ محتوى رموز JWT.", en: "Inspect JWT payload.", fr: "Inspecter la charge JWT.", es: "Inspecciona el payload JWT.", de: "JWT-Payload anzeigen.", tr: "JWT içeriğini incele.", ru: "Просмотр содержимого JWT.", zh: "查看 JWT 内容。", hi: "JWT पेलोड देखें।", pt: "Inspecione o payload JWT." },
    usage: { ar: ["الصق رمز JWT.", "اضغط تنفيذ.", "اقرأ الهيدر والحمولة."], en: ["Paste a JWT.", "Click Run.", "Read header and payload."] },
    explanation: { ar: ["JWT يتكون من ثلاثة أجزاء."], en: ["A JWT has three parts."] },
    faq: [], related: ["base64", "hash-generator", "json-formatter"]
  },
  {
    slug: "hash-generator", icon: "#", category: "security",
    name: { ar: "مولّد Hash", en: "Hash Generator", fr: "Générateur de hachage", es: "Generador de hash", de: "Hash-Generator", tr: "Hash Üretici", ru: "Генератор хэшей", zh: "哈希生成器", hi: "हैश जनरेटर", pt: "Gerador de hash" },
    short: { ar: "أنشئ SHA-1/256/512.", en: "Compute SHA-1/256/512.", fr: "Calculer SHA-1/256/512.", es: "Calcula SHA-1/256/512.", de: "SHA-1/256/512 berechnen.", tr: "SHA-1/256/512 hesapla.", ru: "Вычислить SHA-1/256/512.", zh: "计算 SHA-1/256/512。", hi: "SHA-1/256/512 की गणना करें।", pt: "Calcule SHA-1/256/512." },
    usage: { ar: ["اكتب النص.", "اختر الخوارزمية.", "اضغط تنفيذ."], en: ["Type text.", "Choose algorithm.", "Click Run."] },
    explanation: { ar: ["Hash دالة تُنتج بصمة ثابتة الطول."], en: ["A hash is a fixed-length fingerprint."] },
    faq: [], related: ["password-generator", "uuid-generator", "base64"]
  },
  {
    slug: "uuid-generator", icon: "🆔", category: "dev",
    name: { ar: "مولّد UUID", en: "UUID Generator", fr: "Générateur UUID", es: "Generador UUID", de: "UUID-Generator", tr: "UUID Üretici", ru: "Генератор UUID", zh: "UUID 生成器", hi: "UUID जनरेटर", pt: "Gerador de UUID" },
    short: { ar: "أنشئ UUID v4 عشوائيًا.", en: "Generate random UUID v4.", fr: "Générer des UUID v4.", es: "Genera UUID v4 aleatorios.", de: "Zufällige UUID v4 generieren.", tr: "Rastgele UUID v4 üret.", ru: "Генерация случайных UUID v4.", zh: "生成随机 UUID v4。", hi: "यादृच्छिक UUID v4 बनाएं।", pt: "Gere UUID v4 aleatórios." },
    usage: { ar: ["اختر الكمية.", "اضغط تنفيذ.", "انسخ النتيجة."], en: ["Choose how many.", "Click Run.", "Copy results."] },
    explanation: { ar: ["UUID v4 معرّف عشوائي."], en: ["UUID v4 is a random identifier."] },
    faq: [], related: ["hash-generator", "password-generator", "json-formatter"]
  },
  {
    slug: "password-generator", icon: "🔐", category: "security",
    name: { ar: "مولّد كلمات المرور", en: "Password Generator", fr: "Générateur de mots de passe", es: "Generador de contraseñas", de: "Passwort-Generator", tr: "Şifre Üretici", ru: "Генератор паролей", zh: "密码生成器", hi: "पासवर्ड जनरेटर", pt: "Gerador de senhas" },
    short: { ar: "كلمات مرور قوية عشوائية.", en: "Strong random passwords.", fr: "Mots de passe forts aléatoires.", es: "Contraseñas fuertes aleatorias.", de: "Starke zufällige Passwörter.", tr: "Güçlü rastgele şifreler.", ru: "Надёжные случайные пароли.", zh: "强随机密码。", hi: "मज़बूत यादृच्छिक पासवर्ड।", pt: "Senhas fortes aleatórias." },
    usage: { ar: ["اختر الطول.", "اضغط تنفيذ.", "انسخ كلمة المرور."], en: ["Set length.", "Click Run.", "Copy password."] },
    explanation: { ar: ["استخدم كلمة مرور طويلة 16+ حرفًا."], en: ["Prefer long passwords (16+ chars)."] },
    faq: [], related: ["hash-generator", "uuid-generator", "base64"]
  },
  {
    slug: "color-converter", icon: "🎨", category: "color",
    name: { ar: "محوّل الألوان", en: "Color Converter", fr: "Convertisseur de couleurs", es: "Convertidor de colores", de: "Farbkonverter", tr: "Renk Dönüştürücü", ru: "Конвертер цветов", zh: "颜色转换器", hi: "रंग कन्वर्टर", pt: "Conversor de cores" },
    short: { ar: "تحويل بين HEX و RGB و HSL.", en: "Convert HEX, RGB, HSL.", fr: "Convertir HEX, RGB, HSL.", es: "Convierte HEX, RGB, HSL.", de: "HEX, RGB, HSL konvertieren.", tr: "HEX, RGB, HSL dönüştür.", ru: "Преобразование HEX, RGB, HSL.", zh: "转换 HEX、RGB、HSL。", hi: "HEX, RGB, HSL कन्वर्ट करें।", pt: "Converta HEX, RGB, HSL." },
    usage: { ar: ["أدخل اللون.", "اقرأ القيم.", "انسخ ما تحتاجه."], en: ["Enter a color.", "Read all formats.", "Copy what you need."] },
    explanation: { ar: ["HEX و RGB و HSL ثلاثة تمثيلات للألوان."], en: ["HEX, RGB, HSL are three ways to represent color."] },
    faq: [], related: ["color-picker", "text-case", "word-counter"]
  },
  {
    slug: "word-counter", icon: "🔢", category: "text",
    name: { ar: "عدّاد الكلمات", en: "Word Counter", fr: "Compteur de mots", es: "Contador de palabras", de: "Wortzähler", tr: "Kelime Sayacı", ru: "Счётчик слов", zh: "字数统计", hi: "शब्द गणक", pt: "Contador de palavras" },
    short: { ar: "احسب الكلمات والأحرف والأسطر.", en: "Count words, chars, lines.", fr: "Compter mots, caractères, lignes.", es: "Cuenta palabras, caracteres, líneas.", de: "Wörter, Zeichen, Zeilen zählen.", tr: "Kelime, karakter, satır say.", ru: "Подсчёт слов, символов, строк.", zh: "统计字数、字符、行数。", hi: "शब्द, अक्षर, पंक्तियाँ गिनें।", pt: "Conte palavras, caracteres, linhas." },
    usage: { ar: ["الصق النص.", "شاهد الإحصاءات."], en: ["Paste text.", "See stats."] },
    explanation: { ar: ["مفيد للكتّاب والمحررين."], en: ["Useful for writers and editors."] },
    faq: [], related: ["text-case", "json-formatter", "base64"]
  },
  {
    slug: "text-case", icon: "Aa", category: "text",
    name: { ar: "تحويل حالة النص", en: "Text Case Converter", fr: "Convertisseur de casse", es: "Convertidor de mayúsculas", de: "Text-Konverter", tr: "Metin Büyük/Küçük Harf", ru: "Конвертер регистра", zh: "文本大小写", hi: "टेक्स्ट केस कन्वर्टर", pt: "Conversor de maiúsculas" },
    short: { ar: "UPPER, lower, Title, Sentence.", en: "UPPER, lower, Title, Sentence.", fr: "MAJ, min, Titre, Phrase.", es: "MAYÚS, minús, Título, Oración.", de: "GROSS, klein, Titel, Satz.", tr: "BÜYÜK, küçük, Başlık, Cümle.", ru: "ВЕРХ, низ, Заголовок, Предложение.", zh: "大写、小写、标题、句子。", hi: "UPPER, lower, Title, Sentence।", pt: "MAIÚS, minús, Título, Frase." },
    usage: { ar: ["الصق النص.", "اختر الحالة.", "انسخ النتيجة."], en: ["Paste text.", "Pick a case.", "Copy result."] },
    explanation: { ar: ["تحويل حالة الأحرف مفيد للعناوين."], en: ["Case converters help with headings."] },
    faq: [], related: ["word-counter", "json-formatter", "base64"]
  },
  /* ====== أدوات جديدة ====== */
  {
    slug: "pdf-to-txt", icon: "📄", category: "media",
    name: { ar: "PDF إلى نص", en: "PDF to Text", fr: "PDF en texte", es: "PDF a texto", de: "PDF zu Text", tr: "PDF'ten Metin", ru: "PDF в текст", zh: "PDF 转文本", hi: "PDF से टेक्स्ट", pt: "PDF para texto" },
    short: { ar: "استخرج النص من ملفات PDF محليًا.", en: "Extract text from PDFs locally.", fr: "Extraire le texte des PDF localement.", es: "Extrae texto de PDFs localmente.", de: "Text aus PDFs lokal extrahieren.", tr: "PDF'lerden metni yerel olarak çıkar.", ru: "Извлечение текста из PDF локально.", zh: "本地从 PDF 提取文本。", hi: "PDF से स्थानीय रूप से टेक्स्ट निकालें।", pt: "Extraia texto de PDFs localmente." },
    usage: { ar: ["اختر ملف PDF أو اسحبه.", "انتظر المعالجة.", "انسخ النص أو نزّله."], en: ["Choose or drop a PDF.", "Wait for processing.", "Copy or download the text."] },
    explanation: { ar: ["تستخدم الأداة pdf.js من Mozilla لاستخراج النص من كل صفحة.", "لا يُرفع الملف إلى أي خادم."], en: ["Uses Mozilla's pdf.js to extract text per page.", "Your file is never uploaded."] },
    faq: [], related: ["word-counter", "text-case", "json-formatter"]
  },
  {
    slug: "qr-code", icon: "▦", category: "media",
    name: { ar: "مولّد QR", en: "QR Code Generator", fr: "Générateur QR", es: "Generador QR", de: "QR-Code-Generator", tr: "QR Kod Üretici", ru: "Генератор QR", zh: "QR 码生成器", hi: "QR कोड जनरेटर", pt: "Gerador de QR" },
    short: { ar: "أنشئ رموز QR للنصوص والروابط.", en: "Generate QR codes for text and URLs.", fr: "Générer des QR codes.", es: "Genera códigos QR.", de: "QR-Codes erstellen.", tr: "QR kodları oluştur.", ru: "Генерация QR-кодов.", zh: "为文本和 URL 生成 QR 码。", hi: "टेक्स्ट और URL के लिए QR कोड बनाएं।", pt: "Gere códigos QR para texto e URLs." },
    usage: { ar: ["اكتب النص أو الرابط.", "اضغط تنفيذ.", "نزّل الصورة."], en: ["Enter text or URL.", "Click Run.", "Download the image."] },
    explanation: { ar: ["QR رمز ثنائي الأبعاد يقرأه الهاتف."], en: ["QR is a 2D barcode readable by phones."] },
    faq: [], related: ["base64", "url-encoder", "image-compressor"]
  },
  {
    slug: "image-compressor", icon: "🖼️", category: "media",
    name: { ar: "ضاغط الصور", en: "Image Compressor", fr: "Compresseur d'images", es: "Compresor de imágenes", de: "Bild-Kompressor", tr: "Görsel Sıkıştırıcı", ru: "Сжатие изображений", zh: "图片压缩", hi: "छवि कंप्रेसर", pt: "Compressor de imagens" },
    short: { ar: "اضغط JPG/PNG/WebP محليًا.", en: "Compress JPG/PNG/WebP locally.", fr: "Compresser JPG/PNG/WebP localement.", es: "Comprime JPG/PNG/WebP localmente.", de: "JPG/PNG/WebP lokal komprimieren.", tr: "JPG/PNG/WebP'yi yerel sıkıştır.", ru: "Сжатие JPG/PNG/WebP локально.", zh: "本地压缩 JPG/PNG/WebP。", hi: "JPG/PNG/WebP स्थानीय रूप से कंप्रेस करें।", pt: "Comprima JPG/PNG/WebP localmente." },
    usage: { ar: ["اختر صورة.", "اضبط الجودة.", "نزّل النسخة المضغوطة."], en: ["Choose an image.", "Set quality.", "Download the compressed version."] },
    explanation: { ar: ["تستخدم Canvas API لضغط الصورة.", "لا يُرفع الملف لأي خادم."], en: ["Uses the Canvas API to re-encode images.", "Nothing is uploaded."] },
    faq: [], related: ["resize-image", "pdf-to-txt", "color-picker"]
  },
  {
    slug: "color-picker", icon: "🖌️", category: "color",
    name: { ar: "منتقي الألوان", en: "Color Picker", fr: "Sélecteur de couleur", es: "Selector de color", de: "Farbwähler", tr: "Renk Seçici", ru: "Выбор цвета", zh: "颜色选择器", hi: "रंग चयनकर्ता", pt: "Seletor de cores" },
    short: { ar: "اختر لونًا واحصل على كل الصيغ.", en: "Pick a color and get all formats.", fr: "Choisir une couleur et toutes ses valeurs.", es: "Elige un color y todas sus valores.", de: "Farbe wählen und alle Werte erhalten.", tr: "Renk seç ve tüm formatları al.", ru: "Выбор цвета и всех форматов.", zh: "选取颜色并获取所有格式。", hi: "रंग चुनें और सभी फ़ॉर्मैट पाएं।", pt: "Escolha uma cor e veja todos os formatos." },
    usage: { ar: ["اختر لونًا.", "انسخ HEX/RGB/HSL."], en: ["Pick a color.", "Copy HEX/RGB/HSL."] },
    explanation: { ar: ["منتقي بصري مع كل الصيغ."], en: ["Visual picker with all formats."] },
    faq: [], related: ["color-converter", "text-case", "word-counter"]
  },
  {
    slug: "lorem-ipsum", icon: "📝", category: "text",
    name: { ar: "مولّد Lorem Ipsum", en: "Lorem Ipsum Generator", fr: "Générateur Lorem Ipsum", es: "Generador Lorem Ipsum", de: "Lorem-Ipsum-Generator", tr: "Lorem Ipsum Üretici", ru: "Генератор Lorem Ipsum", zh: "Lorem Ipsum 生成器", hi: "Lorem Ipsum जनरेटर", pt: "Gerador Lorem Ipsum" },
    short: { ar: "نص تجريبي للتصميم.", en: "Placeholder text for design.", fr: "Texte de remplissage.", es: "Texto de relleno.", de: "Platzhaltertext für Design.", tr: "Tasarım için yer tutucu metin.", ru: "Текст-заполнитель для дизайна.", zh: "设计占位文本。", hi: "डिज़ाइन के लिए प्लेसहोल्डर टेक्स्ट।", pt: "Texto de preenchimento." },
    usage: { ar: ["اختر العدد والنوع.", "اضغط تنفيذ.", "انسخ النص."], en: ["Choose count and type.", "Click Run.", "Copy the text."] },
    explanation: { ar: ["نص لاتيني يُستخدم كحشو بصري."], en: ["Latin filler text for layouts."] },
    faq: [], related: ["word-counter", "text-case", "json-formatter"]
  },
/* ===== أدوات التحويل ===== */
{
  slug: "pdf-to-word",
  icon: "📄",
  category: "media",
  name: {
    ar: "PDF إلى Word", en: "PDF to Word", fr: "PDF en Word",
    es: "PDF a Word", de: "PDF zu Word", tr: "PDF'ten Word",
    ru: "PDF в Word", zh: "PDF 转 Word", hi: "PDF से Word", pt: "PDF para Word"
  },
  short: { ar: "استخرج نص PDF إلى ملف DOC متوافق مع Word؛ قد يتغير تخطيط الصفحة.", en: "Extract PDF text to a Word-compatible DOC file; page layout may change.", fr: "Extrayez le texte PDF vers un fichier DOC compatible Word ; la mise en page peut changer.", es: "Extrae texto PDF a un archivo DOC compatible con Word; el diseño puede cambiar.", de: "PDF-Text in eine Word-kompatible DOC-Datei extrahieren; das Layout kann sich ändern.", tr: "PDF metnini Word uyumlu DOC dosyasına çıkarın; sayfa düzeni değişebilir.", ru: "Извлечение текста PDF в DOC-файл для Word; макет страницы может измениться.", zh: "将 PDF 文本提取到兼容 Word 的 DOC 文件；页面布局可能改变。", hi: "PDF पाठ को Word-संगत DOC फ़ाइल में निकालें; पृष्ठ लेआउट बदल सकता है।", pt: "Extraia o texto do PDF para DOC compatível com Word; o layout pode mudar." },
  usage: {
    ar: ["ارفع ملف PDF.", "اضغط تحويل.", "حمّل ملف Word الناتج."],
    en: ["Upload a PDF file.", "Click Convert.", "Download the Word file."]
  },
  explanation: {
    ar: ["تستخدم الأداة pdf.js لاستخراج النص، ثم docx.js لإنشاء ملف Word.", "لا يُرفع الملف إلى أي خادم."],
    en: ["Uses pdf.js to extract text, then docx.js to generate a Word file.", "No file is uploaded to any server."]
  },
  faq: [],
  related: ["pdf-to-txt", "merge-pdf", "compress-pdf"]
},
{
  slug: "merge-pdf",
  icon: "📚",
  category: "media",
  name: { ar: "دمج PDF", en: "Merge PDF", fr: "Fusionner PDF", es: "Unir PDF", de: "PDF zusammenfügen", tr: "PDF Birleştir", ru: "Объединить PDF", zh: "合并 PDF", hi: "PDF मर्ज करें", pt: "Mesclar PDF" },
  short: { ar: "اجمع عدة ملفات PDF في ملف واحد.", en: "Combine multiple PDFs into one.", fr: "Combiner plusieurs PDF en un seul.", es: "Combina varios PDF en uno.", de: "Mehrere PDFs zu einer Datei zusammenfügen.", tr: "Birden fazla PDF'yi tek dosyada birleştir.", ru: "Объединение нескольких PDF в один.", zh: "将多个 PDF 合并为一个。", hi: "कई PDF को एक में संयोजित करें।", pt: "Combine vários PDFs em um só." },
  usage: { ar: ["ارفع ملفات PDF.", "رتّبها.", "اضغط دمج."], en: ["Upload PDFs.", "Reorder them.", "Click Merge."] },
  explanation: { ar: ["تستخدم pdf-lib لدمج الملفات محليًا."], en: ["Uses pdf-lib to merge files locally."] },
  faq: [], related: ["pdf-to-word", "compress-pdf", "pdf-to-txt"]
},
{
  slug: "compress-pdf",
  icon: "🗜️",
  category: "media",
  name: { ar: "ضغط PDF", en: "Compress PDF", fr: "Compresser PDF", es: "Comprimir PDF", de: "PDF komprimieren", tr: "PDF Sıkıştır", ru: "Сжать PDF", zh: "压缩 PDF", hi: "PDF कंप्रेस करें", pt: "Comprimir PDF" },
  short: { ar: "قلّل حجم PDF بإعادة رسم الصفحات كصور؛ قد يفقد النص قابليته للبحث والنسخ.", en: "Reduce PDF size by rasterizing pages; searchable or selectable text may be lost.", fr: "Réduisez un PDF en pixellisant ses pages ; le texte sélectionnable peut être perdu.", es: "Reduce el PDF rasterizando las páginas; el texto seleccionable puede perderse.", de: "PDF-Seiten werden gerastert; durchsuchbarer oder auswählbarer Text kann verloren gehen.", tr: "Sayfalar görsele dönüştürülür; aranabilir veya seçilebilir metin kaybolabilir.", ru: "Страницы растрируются; поиск и выделение текста могут быть утрачены.", zh: "通过将页面栅格化来缩小 PDF；可搜索或可选中的文本可能丢失。", hi: "पृष्ठों को रास्टराइज़ करके PDF छोटा करें; खोजने योग्य या चुनने योग्य पाठ खो सकता है।", pt: "Reduza o PDF rasterizando as páginas; o texto selecionável pode ser perdido." },
  usage: { ar: ["ارفع ملف PDF.", "اضغط ضغط.", "حمّل الملف المضغوط."], en: ["Upload a PDF.", "Click Compress.", "Download the compressed file."] },
  explanation: { ar: ["تستخدم pdf-lib لإعادة ترميز الملف بحجم أصغر."], en: ["Uses pdf-lib to re-encode the file smaller."] },
  faq: [], related: ["pdf-to-word", "merge-pdf", "image-compressor"]
},
{
  slug: "image-converter",
  icon: "🔄",
  category: "media",
  name: { ar: "محوّل الصور", en: "Image Converter", fr: "Convertisseur d'images", es: "Convertidor de imágenes", de: "Bildkonverter", tr: "Görsel Dönüştürücü", ru: "Конвертер изображений", zh: "图片转换器", hi: "छवि कन्वर्टर", pt: "Conversor de imagens" },
  short: { ar: "حوّل بين JPG, PNG, WebP, AVIF, GIF.", en: "Convert between JPG, PNG, WebP, AVIF, GIF.", fr: "Convertir entre JPG, PNG, WebP, AVIF, GIF.", es: "Convierte entre JPG, PNG, WebP, AVIF, GIF.", de: "Zwischen JPG, PNG, WebP, AVIF, GIF konvertieren.", tr: "JPG, PNG, WebP, AVIF, GIF arasında dönüştür.", ru: "Конвертация между JPG, PNG, WebP, AVIF, GIF.", zh: "在 JPG、PNG、WebP、AVIF、GIF 之间转换。", hi: "JPG, PNG, WebP, AVIF, GIF के बीच कन्वर्ट करें।", pt: "Converta entre JPG, PNG, WebP, AVIF, GIF." },
  usage: { ar: ["ارفع صورة.", "اختر الصيغة الهدف.", "حمّل الناتج."], en: ["Upload an image.", "Choose target format.", "Download result."] },
  explanation: { ar: ["تستخدم Canvas API للتحويل بين الصيغ."], en: ["Uses Canvas API to convert formats."] },
  faq: [], related: ["image-compressor", "pdf-to-word", "qr-code"]
},
{
  slug: "csv-to-json",
  icon: "📊",
  category: "dev",
  name: { ar: "CSV إلى JSON", en: "CSV to JSON", fr: "CSV en JSON", es: "CSV a JSON", de: "CSV zu JSON", tr: "CSV'den JSON", ru: "CSV в JSON", zh: "CSV 转 JSON", hi: "CSV से JSON", pt: "CSV para JSON" },
  short: { ar: "حوّل بيانات CSV إلى صيغة JSON.", en: "Convert CSV data to JSON.", fr: "Convertir des données CSV en JSON.", es: "Convierte datos CSV a JSON.", de: "CSV-Daten in JSON konvertieren.", tr: "CSV verilerini JSON'a dönüştür.", ru: "Преобразование CSV в JSON.", zh: "将 CSV 数据转换为 JSON。", hi: "CSV डेटा को JSON में बदलें।", pt: "Converta dados CSV para JSON." },
  usage: { ar: ["الصق CSV.", "اضغط تحويل.", "انسخ JSON."], en: ["Paste CSV.", "Click Convert.", "Copy JSON."] },
  explanation: { ar: ["تحليل CSV يدعم الفواصل والعلامات."], en: ["CSV parsing supports commas and quotes."] },
  faq: [], related: ["json-to-csv", "json-formatter", "excel-to-json"]
},
{
  slug: "json-to-csv",
  icon: "📈",
  category: "dev",
  name: { ar: "JSON إلى CSV", en: "JSON to CSV", fr: "JSON en CSV", es: "JSON a CSV", de: "JSON zu CSV", tr: "JSON'dan CSV", ru: "JSON в CSV", zh: "JSON 转 CSV", hi: "JSON से CSV", pt: "JSON para CSV" },
  short: { ar: "حوّل مصفوفات JSON إلى CSV.", en: "Convert JSON arrays to CSV.", fr: "Convertir des tableaux JSON en CSV.", es: "Convierte arrays JSON a CSV.", de: "JSON-Arrays in CSV konvertieren.", tr: "JSON dizilerini CSV'ye dönüştür.", ru: "Преобразование массивов JSON в CSV.", zh: "将 JSON 数组转换为 CSV。", hi: "JSON सरणियों को CSV में बदलें।", pt: "Converta arrays JSON para CSV." },
  usage: { ar: ["الصق JSON.", "اضغط تحويل.", "نزّل CSV."], en: ["Paste JSON.", "Click Convert.", "Download CSV."] },
  explanation: { ar: ["تسطيح الكائنات المتداخلة."], en: ["Flattens nested objects."] },
  faq: [], related: ["csv-to-json", "json-formatter", "excel-to-json"]
},

/* ===== أدوات المطورين ===== */
{
  slug: "regex-tester",
  icon: ".*",
  category: "dev",
  name: { ar: "مختبر Regex", en: "Regex Tester", fr: "Testeur Regex", es: "Probador Regex", de: "Regex-Tester", tr: "Regex Test Edici", ru: "Тестер Regex", zh: "Regex 测试器", hi: "Regex टेस्टर", pt: "Testador Regex" },
  short: { ar: "اختبر التعبيرات النمطية مباشرة.", en: "Test regular expressions live.", fr: "Tester les expressions régulières en direct.", es: "Prueba expresiones regulares en vivo.", de: "Reguläre Ausdrücke live testen.", tr: "Düzenli ifadeleri canlı test et.", ru: "Проверка регулярных выражений.", zh: "实时测试正则表达式。", hi: "नियमित अभिव्यक्तियों का लाइव परीक्षण करें।", pt: "Teste expressões regulares ao vivo." },
  usage: { ar: ["اكتب النمط.", "الصق النص.", "شاهد التطابقات."], en: ["Type pattern.", "Paste text.", "See matches."] },
  explanation: { ar: ["تستخدم RegExp مع تمييز مباشر للنتائج."], en: ["Uses RegExp with live highlighting."] },
  faq: [], related: ["diff-checker", "sql-formatter", "cron-generator"]
},
{
  slug: "cron-generator",
  icon: "⏰",
  category: "dev",
  name: { ar: "مولّد Cron", en: "Cron Generator", fr: "Générateur Cron", es: "Generador Cron", de: "Cron-Generator", tr: "Cron Üretici", ru: "Генератор Cron", zh: "Cron 生成器", hi: "Cron जनरेटर", pt: "Gerador Cron" },
  short: { ar: "أنشئ وافهم تعبيرات Cron.", en: "Build and understand cron expressions.", fr: "Créer et comprendre les expressions cron.", es: "Crea y entiende expresiones cron.", de: "Cron-Ausdrücke erstellen und verstehen.", tr: "Cron ifadeleri oluştur ve anla.", ru: "Создание и понимание cron-выражений.", zh: "构建并理解 cron 表达式。", hi: "Cron अभिव्यक्तियाँ बनाएं और समझें।", pt: "Crie e entenda expressões cron." },
  usage: { ar: ["اختر الحقول.", "اقرأ التعبير.", "انسخه."], en: ["Select fields.", "Read expression.", "Copy it."] },
  explanation: { ar: ["ترجمة بشرية للتعبير مع عرض مواعيد التشغيل."], en: ["Human-readable translation with next run times."] },
  faq: [], related: ["timestamp-converter", "regex-tester", "diff-checker"]
},
{
  slug: "diff-checker",
  icon: "🔍",
  category: "dev",
  name: { ar: "مقارنة النصوص", en: "Diff Checker", fr: "Comparateur de texte", es: "Comparador de texto", de: "Text-Vergleich", tr: "Metin Karşılaştırma", ru: "Сравнение текста", zh: "文本对比", hi: "टेक्स्ट तुलना", pt: "Comparador de texto" },
  short: { ar: "قارن نصين وأظهر الفروقات.", en: "Compare two texts and show differences.", fr: "Comparer deux textes et montrer les différences.", es: "Compara dos textos y muestra diferencias.", de: "Zwei Texte vergleichen und Unterschiede anzeigen.", tr: "İki metni karşılaştır ve farkları göster.", ru: "Сравнение двух текстов и вывод различий.", zh: "比较两段文本并显示差异。", hi: "दो टेक्स्ट की तुलना करें और अंतर दिखाएं।", pt: "Compare dois textos e mostre diferenças." },
  usage: { ar: ["الصق النص الأصلي.", "الصق النص المعدل.", "اضغط مقارنة."], en: ["Paste original.", "Paste modified.", "Click Compare."] },
  explanation: { ar: ["خوارزمية diff سطر بسطر مع تمييز لوني."], en: ["Line-by-line diff algorithm with color highlighting."] },
  faq: [], related: ["regex-tester", "json-formatter", "text-case"]
},
{
  slug: "sql-formatter",
  icon: "🗃️",
  category: "dev",
  name: { ar: "منسّق SQL", en: "SQL Formatter", fr: "Formateur SQL", es: "Formateador SQL", de: "SQL-Formatierer", tr: "SQL Biçimlendirici", ru: "Форматтер SQL", zh: "SQL 格式化", hi: "SQL फ़ॉर्मैटर", pt: "Formatador SQL" },
  short: { ar: "نسّق استعلامات SQL للقراءة.", en: "Format SQL queries for readability.", fr: "Formater les requêtes SQL.", es: "Formatea consultas SQL.", de: "SQL-Abfragen lesbar formatieren.", tr: "SQL sorgularını okunabilir hale getir.", ru: "Форматирование SQL-запросов.", zh: "格式化 SQL 查询以便阅读。", hi: "SQL क्वेरी को पठनीय बनाएं।", pt: "Formate consultas SQL." },
  usage: { ar: ["الصق SQL.", "اضغط تنسيق.", "انسخ الناتج."], en: ["Paste SQL.", "Click Format.", "Copy result."] },
  explanation: { ar: ["تستخدم sql-formatter لدعم عدة لهجات."], en: ["Uses sql-formatter for multiple dialects."] },
  faq: [], related: ["json-formatter", "regex-tester", "diff-checker"]
},
{
  slug: "timestamp-converter",
  icon: "🕐",
  category: "dev",
  name: { ar: "محوّل Unix Timestamp", en: "Timestamp Converter", fr: "Convertisseur Timestamp", es: "Convertidor Timestamp", de: "Timestamp-Konverter", tr: "Zaman Damgası Dönüştürücü", ru: "Конвертер Timestamp", zh: "时间戳转换器", hi: "टाइमस्टैम्प कन्वर्टर", pt: "Conversor de Timestamp" },
  short: { ar: "حوّل بين Unix timestamp والتاريخ.", en: "Convert between Unix timestamp and date.", fr: "Convertir entre timestamp Unix et date.", es: "Convierte entre timestamp Unix y fecha.", de: "Zwischen Unix-Zeitstempel und Datum konvertieren.", tr: "Unix zaman damgası ve tarih arasında dönüştür.", ru: "Конвертация между Unix-timestamp и датой.", zh: "在 Unix 时间戳和日期之间转换。", hi: "Unix टाइमस्टैम्प और दिनांक के बीच कन्वर्ट करें।", pt: "Converta entre timestamp Unix e data." },
  usage: { ar: ["أدخل timestamp أو تاريخ.", "اقرأ النتيجة."], en: ["Enter timestamp or date.", "Read result."] },
  explanation: { ar: ["دعم المناطق الزمنية والتوقيت المحلي."], en: ["Supports timezones and local time."] },
  faq: [], related: ["cron-generator", "age-calculator", "unit-converter"]
},

/* ===== الآلات الحاسبة ===== */
{
  slug: "unit-converter",
  icon: "📏",
  category: "dev",
  name: { ar: "محوّل الوحدات", en: "Unit Converter", fr: "Convertisseur d'unités", es: "Convertidor de unidades", de: "Einheitenrechner", tr: "Birim Dönüştürücü", ru: "Конвертер единиц", zh: "单位转换器", hi: "इकाई कन्वर्टर", pt: "Conversor de unidades" },
  short: { ar: "حوّل بين وحدات الطول والوزن والحجم والحرارة.", en: "Convert length, weight, volume, temperature.", fr: "Convertir longueur, poids, volume, température.", es: "Convierte longitud, peso, volumen, temperatura.", de: "Länge, Gewicht, Volumen, Temperatur umrechnen.", tr: "Uzunluk, ağırlık, hacim, sıcaklık dönüştür.", ru: "Конвертация длины, веса, объёма, температуры.", zh: "转换长度、重量、体积、温度。", hi: "लंबाई, वजन, आयतन, तापमान कन्वर्ट करें।", pt: "Converta comprimento, peso, volume, temperatura." },
  usage: { ar: ["اختر الفئة.", "أدخل القيمة.", "اقرأ النتائج."], en: ["Choose category.", "Enter value.", "Read results."] },
  explanation: { ar: ["تحويل فوري بين الوحدات الشائعة."], en: ["Instant conversion between common units."] },
  faq: [], related: ["percentage-calculator", "bmi-calculator", "timestamp-converter"]
},
{
  slug: "percentage-calculator",
  icon: "％",
  category: "dev",
  name: { ar: "حاسبة النسبة المئوية", en: "Percentage Calculator", fr: "Calculatrice de pourcentage", es: "Calculadora de porcentaje", de: "Prozentrechner", tr: "Yüzde Hesaplayıcı", ru: "Калькулятор процентов", zh: "百分比计算器", hi: "प्रतिशत कैलकुलेटर", pt: "Calculadora de porcentagem" },
  short: { ar: "احسب النسب والزيادة والنقصان.", en: "Calculate percentages, increase, decrease.", fr: "Calculer pourcentages, augmentation, diminution.", es: "Calcula porcentajes, aumento, disminución.", de: "Prozente, Zunahme, Abnahme berechnen.", tr: "Yüzde, artış, azalış hesapla.", ru: "Расчёт процентов, увеличения, уменьшения.", zh: "计算百分比、增加、减少。", hi: "प्रतिशत, वृद्धि, कमी की गणना करें।", pt: "Calcule porcentagens, aumento, diminuição." },
  usage: { ar: ["اختر النوع.", "أدخل الأرقام.", "اقرأ النتيجة."], en: ["Choose type.", "Enter numbers.", "Read result."] },
  explanation: { ar: ["أربعة أنواع من حسابات النسب."], en: ["Four types of percentage calculations."] },
  faq: [], related: ["unit-converter", "age-calculator", "bmi-calculator"]
},
{
  slug: "age-calculator",
  icon: "🎂",
  category: "dev",
  name: { ar: "حاسبة العمر", en: "Age Calculator", fr: "Calculatrice d'âge", es: "Calculadora de edad", de: "Altersrechner", tr: "Yaş Hesaplayıcı", ru: "Калькулятор возраста", zh: "年龄计算器", hi: "आयु कैलकुलेटर", pt: "Calculadora de idade" },
  short: { ar: "احسب عمرك بالسنوات والأيام.", en: "Calculate your age in years and days.", fr: "Calculer votre âge en années et jours.", es: "Calcula tu edad en años y días.", de: "Alter in Jahren und Tagen berechnen.", tr: "Yaşını yıl ve gün olarak hesapla.", ru: "Расчёт возраста в годах и днях.", zh: "计算您的年龄（年、天）。", hi: "अपनी आयु वर्ष और दिनों में जानें।", pt: "Calcule sua idade em anos e dias." },
  usage: { ar: ["أدخل تاريخ الميلاد.", "اقرأ النتيجة."], en: ["Enter birth date.", "Read result."] },
  explanation: { ar: ["حساب دقيق مع أيام الأسبوع المتبقية."], en: ["Accurate calculation with remaining weekdays."] },
  faq: [], related: ["percentage-calculator", "bmi-calculator", "timestamp-converter"]
},
{
  slug: "bmi-calculator",
  icon: "⚖️",
  category: "dev",
  name: { ar: "حاسبة BMI", en: "BMI Calculator", fr: "Calculatrice IMC", es: "Calculadora IMC", de: "BMI-Rechner", tr: "BMI Hesaplayıcı", ru: "Калькулятор ИМТ", zh: "BMI 计算器", hi: "BMI कैलकुलेटर", pt: "Calculadora de IMC" },
  short: { ar: "احسب مؤشر كتلة الجسم.", en: "Calculate body mass index.", fr: "Calculer l'indice de masse corporelle.", es: "Calcula el índice de masa corporal.", de: "Body-Mass-Index berechnen.", tr: "Vücut kitle indeksini hesapla.", ru: "Расчёт индекса массы тела.", zh: "计算身体质量指数。", hi: "बॉडी मास इंडेक्स की गणना करें।", pt: "Calcule o índice de massa corporal." },
  usage: { ar: ["أدخل الطول والوزن.", "اقرأ النتيجة."], en: ["Enter height and weight.", "Read result."] },
  explanation: { ar: ["تصنيف من نحافة إلى سمنة مفرطة."], en: ["Classification from underweight to obese."] },
  faq: [], related: ["age-calculator", "percentage-calculator", "unit-converter"]
},
{
  slug: "image-to-pdf",
  icon: "📄",
  category: "media",
  name: { ar: "صورة إلى PDF", en: "Image to PDF", fr: "Image vers PDF", es: "Imagen a PDF", de: "Bild zu PDF", tr: "Görselden PDF'ye", ru: "Изображение в PDF", zh: "图片转 PDF", hi: "इमेज से PDF", pt: "Imagem para PDF" },
  short: { ar: "حوّل صور JPG أو PNG إلى ملف PDF واحد.", en: "Convert JPG/PNG images into one PDF file.", fr: "Convertissez des images JPG/PNG en un seul PDF.", es: "Convierte imágenes JPG/PNG en un solo PDF.", de: "JPG-/PNG-Bilder in eine PDF-Datei umwandeln.", tr: "JPG/PNG görsellerini tek PDF'ye dönüştür.", ru: "Конвертируйте JPG/PNG в один PDF.", zh: "将 JPG/PNG 图片转换为一个 PDF 文件。", hi: "JPG/PNG इमेज को एक PDF में बदलें।", pt: "Converta imagens JPG/PNG em um único PDF." },
  usage: { ar: ["اختر صورة أو أكثر (JPG/PNG/WebP).", "رتّب الصور واختر حجم الصفحة والاتجاه والهامش.", "اضغط «إنشاء PDF».", "نزّل الملف الناتج."], en: ["Pick one or more images (JPG/PNG/WebP).", "Arrange order, choose page size, orientation and margin.", "Press Create PDF.", "Download the result."] },
  explanation: { ar: ["أشهر استخدام لهذه الأداة هو تحويل مستندات مصوّرة أو فواتير أو واجبات إلى ملف PDF واحد منسّق.", "تُضمَّن الصور بجودتها الأصلية داخل صفحات بالحجم الذي تختاره (A4 أو Letter أو بحجم الصورة نفسها).", "التحويل يتم داخل متصفحك عبر مكتبة pdf-lib — صورك لا تُرفع إلى أي خادم."], en: ["The most common use: turning photographed documents, invoices or homework into one tidy PDF.", "Images are embedded at original quality inside pages of your chosen size (A4, Letter, or fit-to-image).", "Conversion runs in your browser via pdf-lib — images never leave your device."] },
  faq: [
    { q: { ar: "هل يمكنني دمج عدة صور في PDF واحد؟", en: "Can I merge multiple images into one PDF?" },
      a: { ar: "نعم، اختر أي عدد من الصور ورتّبها قبل التحويل، وستظهر كل صورة في صفحة مستقلة داخل الملف الواحد.", en: "Yes — pick as many images as you like, arrange their order, and each becomes its own page in the single output file." } },
    { q: { ar: "هل تُرفع صوري إلى الإنترنت؟", en: "Are my photos uploaded to the internet?" },
      a: { ar: "لا، العملية كلها تحدث داخل متصفحك ويمكنك حتى قطع الإنترنت بعد فتح الصفحة.", en: "No — everything happens inside your browser; you can even go offline after loading the page." } }
  ],
  related: ["merge-pdf", "compress-pdf", "image-converter"]
},
{
  slug: "remove-background",
  icon: "✂️",
  category: "media",
  name: { ar: "إزالة خلفية الصورة", en: "Remove Background", fr: "Supprimer l'arrière-plan", es: "Quitar fondo", de: "Hintergrund entfernen", tr: "Arka Planı Kaldır", ru: "Удалить фон", zh: "移除图片背景", hi: "बैकग्राउंड हटाएं", pt: "Remover fundo" },
  short: { ar: "عزل الشخص أو العنصر بخلفية شفافة عبر AI داخل المتصفح.", en: "Isolate subjects with transparent background via in-browser AI.", fr: "Isolez le sujet avec un fond transparent via l'IA du navigateur.", es: "Aísla el sujeto con fondo transparente con IA en el navegador.", de: "Freistellung mit transparentem Hintergrund per KI im Browser.", tr: "Tarayıcıda AI ile şeffaf arka planlı kırpma.", ru: "Отделите объект с прозрачным фоном через ИИ в браузере.", zh: "在浏览器内用 AI 抠图，输出透明背景。", hi: "ब्राउज़र AI से पारदर्शी बैकग्राउंड के साथ सब्जेक्ट अलग करें।", pt: "Isole o objeto com fundo transparente via IA no navegador." },
  usage: { ar: ["اختر صورة (يفضّل أن يكون العنصر الرئيسي واضحاً).", "انتظر تحميل النموذج لأول مرة (نحو 40MB ثم يُخزَّن).", "اضغط «إزالة الخلفية» وانتظر ثوانٍ.", "نزّل النتيجة بصيغة PNG شفافة أو أضف خلفية بلون."], en: ["Pick an image (clear main subject works best).", "Wait for first-time model download (~40MB, cached after).", "Press Remove Background and wait seconds.", "Download the transparent PNG or add a solid color background."] },
  explanation: { ar: ["تعتمد الأداة على نموذج مفتوح المصدر (U²-Net عبر @imgly/background-removal) يعمل بمحرك ONNX داخل متصفحك.", "بعكس remove.bg والمواقع المشابهة، صورك لا تُرفع لأي خادم — النموذج نفسه يأتي إلى جهازك.", "النتيجة PNG بقناة شفافية كاملة، جاهزة للمتاجر الإلكترونية والعروض والتصميم."], en: ["Powered by the open-source U²-Net model (via @imgly/background-removal) running on ONNX inside your browser.", "Unlike remove.bg and similar sites, your photos stay on your device — the model comes to you.", "Output is a full-alpha PNG ready for e-commerce listings, presentations and design."] },
  faq: [
    { q: { ar: "لماذا يحمَّل نموذج كبير في أول استخدام؟", en: "Why does a large model download on first use?" },
      a: { ar: "نموذج الذكاء الاصطناعي (~40MB) يُنزَّل مرة واحدة ثم يُخزَّن مؤقتاً، لتعمل كل المرات التالية بسرعة وبدون إنترنت.", en: "The AI model (~40MB) downloads once and is cached, so every later run is fast and works offline." } },
    { q: { ar: "هل النتيجة مجانية بجودة كاملة؟", en: "Is the result free at full quality?" },
      a: { ar: "نعم — بخلاف مواقع مثل remove.bg التي تحدّ الدقة المجانية، نتيجتك كاملة الدقة ودون علامة مائية لأنها تُنشأ على جهازك.", en: "Yes — unlike remove.bg which caps free resolution, your result is full-resolution and watermark-free because it's generated on your device." } }
  ],
  related: ["image-converter", "resize-image", "image-compressor"]
},
{
  slug: "ocr-image-to-text",
  icon: "🔍",
  category: "media",
  name: { ar: "استخراج نص من صورة OCR", en: "Image to Text (OCR)", fr: "Image vers texte (OCR)", es: "Imagen a texto (OCR)", de: "Bild zu Text (OCR)", tr: "Görselden Metne (OCR)", ru: "Изображение в текст (OCR)", zh: "图片转文字 (OCR)", hi: "इमेज से टेक्स्ट (OCR)", pt: "Imagem para texto (OCR)" },
  short: { ar: "استخرج النص من الصور والمستندات الممسوحة — عربي وإنجليزي.", en: "Extract text from images and scans — Arabic & English.", fr: "Extrayez le texte des images — arabe et anglais.", es: "Extrae texto de imágenes — árabe e inglés.", de: "Text aus Bildern extrahieren — Arabisch & Englisch.", tr: "Görsellerden metin çıkar — Arapça ve İngilizce.", ru: "Извлеките текст из изображений — арабский и английский.", zh: "从图片提取文字 — 支持阿拉伯语和英语。", hi: "इमेज से टेक्स्ट निकालें — अरबी और अंग्रेज़ी।", pt: "Extraia texto de imagens — árabe e inglês." },
  usage: { ar: ["اختر صورة تحتوي نصاً (لقطة شاشة أو صورة مستند).", "حدد اللغة: العربية أو الإنجليزية أو معاً.", "اضغط «استخراج النص» وانتظر شريط التقدم.", "انسخ النص أو نزّله كملف txt."], en: ["Pick an image containing text (screenshot or document photo).", "Choose language: Arabic, English, or both.", "Press Extract Text and watch the progress bar.", "Copy the text or download it as a .txt file."] },
  explanation: { ar: ["يعمل المحرك عبر Tesseract.js — نسخة المتصفح من محرك Tesseract الشهير المفتوح المصدر بدقة 100+ لغة.", "يُعدّ OCR بالعربية ميزة نادرة في الأدوات المجانية؛ هنا يعمل كاملاً على جهازك بما يناسب المستندات الشخصية.", "لنتائج أفضل: استخدم صوراً واضحة بإضاءة جيدة ودقة عالية، وقصّ المساحات الزائدة قبل الاستخراج."], en: ["The engine is Tesseract.js — the browser port of the famous open-source Tesseract OCR with 100+ languages.", "Arabic OCR is rare among free tools; here it runs entirely on your device, ideal for personal documents.", "For best results: use sharp, well-lit, high-resolution images and crop empty margins first."] },
  faq: [
    { q: { ar: "هل يدعم الاستخراج النص العربي؟", en: "Does it support Arabic text?" },
      a: { ar: "نعم، اختر «العربية» أو «عربي + إنجليزي» للنصوص المختلطة — تحميل بيانات اللغة يحدث لأول مرة فقط.", en: "Yes — choose Arabic or Arabic+English for mixed text; language data downloads only on first use." } },
    { q: { ar: "أستطيع تحويل صورة إلى Word؟", en: "Can I convert an image to Word?" },
      a: { ar: "استخرج النص أولاً ثم انسخه إلى أي محرر، أو استخدم أداة «CSV إلى Excel» للبيانات الجدولية.", en: "Extract the text first, paste it into any editor, or use the CSV to Excel tool for tabular data." } }
  ],
  related: ["pdf-to-txt", "word-counter", "csv-to-excel"]
},
{
  slug: "heic-to-jpg",
  icon: "📱",
  category: "media",
  name: { ar: "تحويل HEIC إلى JPG", en: "HEIC to JPG", fr: "HEIC vers JPG", es: "HEIC a JPG", de: "HEIC zu JPG", tr: "HEIC'den JPG'ye", ru: "HEIC в JPG", zh: "HEIC 转 JPG", hi: "HEIC से JPG", pt: "HEIC para JPG" },
  short: { ar: "افتح صور الآيفون HEIC وحوّلها إلى JPG متوافق.", en: "Open iPhone HEIC photos and convert them to JPG.", fr: "Ouvrez les photos HEIC d'iPhone et convertissez-les en JPG.", es: "Abre fotos HEIC de iPhone y conviértelas a JPG.", de: "iPhone-HEIC-Fotos öffnen und zu JPG konvertieren.", tr: "iPhone HEIC fotoğraflarını JPG'ye çevir.", ru: "Откройте фото HEIC с iPhone и конвертируйте в JPG.", zh: "打开 iPhone 的 HEIC 照片并转换为 JPG。", hi: "iPhone की HEIC फोटो खोलें और JPG में बदलें।", pt: "Abra fotos HEIC do iPhone e converta para JPG." },
  usage: { ar: ["اختر صورة أو أكثر بصيغة HEIC/HEIF.", "اضغط «تحويل».", "نزّل صور JPG الناتجة (دفعة كاملة تُنزَّل كأرشيف ZIP)."], en: ["Pick one or more HEIC/HEIF photos.", "Press Convert.", "Download the JPG results (batches arrive as a ZIP)."] },
  explanation: { ar: ["HEIC هي الصيغة الافتراضية لكاميرا الآيفون منذ iOS 11، وتوفر حجماً أقل بجودة أعلى لكنها لا تُفتح على ويندوز وأندرويد ومواقع كثيرة.", "تعتمد الأداة على مكتبة heic2any مفتوحة المصدر (libheif) وتحوّل داخل متصفحك دون رفع.", "نصيحة: يمكنك تعطيل HEIC من إعدادات الآيفون (الكاميرا ← الصيغ ← الأكثر توافقاً)، لكن الأداة تظل الحل الأسرع للصور الموجودة."], en: ["HEIC is the default iPhone camera format since iOS 11 — smaller at higher quality, but Windows, Android and many sites can't open it.", "Powered by the open-source heic2any library (libheif), converting locally without uploads.", "Tip: you can disable HEIC on iPhone (Camera → Formats → Most Compatible), but this tool remains the fastest fix for existing photos."] },
  faq: [
    { q: { ar: "هل تفقد الصورة جودتها عند التحويل؟", en: "Does the photo lose quality when converted?" },
      a: { ar: "الجودة قابلة للضبط وافتراضياً 92% — عملياً لن تلاحظ فرقاً، ويمكنك رفعها إلى 100%.", en: "Quality is adjustable and defaults to 92% — practically indistinguishable, and you can raise it to 100%." } },
    { q: { ar: "كم صورة أحوّل دفعة واحدة؟", en: "How many photos can I convert at once?" },
      a: { ar: "أي عدد — دفعات الصور الكبيرة تُنزَّل مجمعة في ملف ZIP واحد لتسهيل الحفظ على الهاتف.", en: "Any number — large batches arrive packed in a single ZIP for easy saving on phones." } }
  ],
  related: ["image-converter", "image-compressor", "resize-image"]
},
{
  slug: "split-pdf",
  icon: "✂️",
  category: "media",
  name: { ar: "تقسيم PDF", en: "Split PDF", fr: "Diviser PDF", es: "Dividir PDF", de: "PDF teilen", tr: "PDF Böl", ru: "Разделить PDF", zh: "拆分 PDF", hi: "PDF विभाजित करें", pt: "Dividir PDF" },
  short: { ar: "استخرج صفحات أو نطاقات من PDF إلى ملفات منفصلة.", en: "Extract pages or ranges from a PDF into separate files.", fr: "Extrayez des pages ou plages d'un PDF.", es: "Extrae páginas o rangos de un PDF.", de: "Seiten oder Bereiche aus einem PDF extrahieren.", tr: "PDF'den sayfa veya aralık çıkar.", ru: "Извлеките страницы или диапазоны из PDF.", zh: "从 PDF 提取页面或页码范围。", hi: "PDF से पेज या रेंज निकालें।", pt: "Extraia páginas ou intervalos de um PDF." },
  usage: { ar: ["اختر ملف PDF.", "اكتب نطاقات الصفحات مثل: 1-3,5,8-10.", "اختر المخرج: ملف واحد بالصفحات المحددة أو كل صفحة ملفاً مستقلاً.", "اضغط «تقسيم» ونزّل النتيجة (الملفات المتعددة تصل كـ ZIP)."], en: ["Pick a PDF file.", "Type page ranges like 1-3,5,8-10.", "Choose output: one merged file of selected pages, or each page as its own file.", "Press Split and download (multi-file results come as ZIP)."] },
  explanation: { ar: ["التقسيم أداة أساسية في كل المنافسين (iLovePDF وSmallpdf وPDF24) وتغيب عن كثير من البدائل المجانية.", "مفيدة لاستخراج فصل من كتاب، أو إرسال جزء من عقد، أو تقسيم مستند ضخم بين عدة أشخاص.", "تُنفَّذ عبر pdf-lib داخل متصفحك ولا يحتاج المستند أي رفع."], en: ["Splitting is a staple in every competitor (iLovePDF, Smallpdf, PDF24) and missing from many free alternatives.", "Use it to extract a book chapter, share part of a contract, or split a huge document between people.", "Runs via pdf-lib inside your browser — the document is never uploaded."] },
  faq: [
    { q: { ar: "كيف أكتب نطاق الصفحات؟", en: "How do I write page ranges?" },
      a: { ar: "بفواصل: 1-3 تعني الصفحات من 1 إلى 3، و5 صفحة مفردة، و8-10 من 8 إلى 10 — مثال كامل: 1-3,5,8-10.", en: "Comma-separated: 1-3 means pages 1 through 3, 5 is a single page, 8-10 is 8 through 10 — full example: 1-3,5,8-10." } }
  ],
  related: ["merge-pdf", "rotate-pdf", "compress-pdf"]
},
{
  slug: "pdf-to-jpg",
  icon: "🖼️",
  category: "media",
  name: { ar: "PDF إلى صور", en: "PDF to Images", fr: "PDF vers images", es: "PDF a imágenes", de: "PDF zu Bilder", tr: "PDF'den görsellere", ru: "PDF в изображения", zh: "PDF 转图片", hi: "PDF से इमेज", pt: "PDF para imagens" },
  short: { ar: "حوّل صفحات PDF إلى صور JPG بجودة قابلة للضبط.", en: "Render PDF pages to JPG images with adjustable quality.", fr: "Convertissez les pages PDF en images JPG.", es: "Convierte páginas PDF a imágenes JPG.", de: "PDF-Seiten in JPG-Bilder umwandeln.", tr: "PDF sayfalarını JPG'ye çevir.", ru: "Конвертируйте страницы PDF в JPG.", zh: "将 PDF 页面渲染为 JPG 图片。", hi: "PDF पेज को JPG इमेज में बदलें।", pt: "Renderize páginas PDF em imagens JPG." },
  usage: { ar: ["اختر ملف PDF.", "حدد جودة JPG (افتراضي 90%).", "اضغط «تحويل» وانتظر معالجة الصفحات.", "صفحة واحدة تُنزَّل مباشرة، ومتعددة الصفحات تصل كأرشيف ZIP."], en: ["Pick a PDF file.", "Set JPG quality (default 90%).", "Press Convert and wait for pages to render.", "Single page downloads directly; multi-page results arrive as ZIP."] },
  explanation: { ar: ["يُرسم كل صفحة عبر pdf.js من Mozilla على لوحة Canvas ثم يُرمَّز JPG — نفس تقنية عارض PDF في فايرفوكس.", "مفيد لتحويل شرائح أو تصاميم أو مستندات إلى صور قابلة للإدراج في العروض والشبكات الاجتماعية.", "كل المعالجة محلية — حتى المستندات السرية تبقى على جهازك."], en: ["Each page is rendered via Mozilla's pdf.js onto a canvas then encoded as JPG — the same technology as Firefox's PDF viewer.", "Great for turning slides, designs or documents into images for presentations and social media.", "All processing is local — even confidential documents stay on your device."] },
  faq: [
    { q: { ar: "ما جودة الصور الناتجة؟", en: "What is the output image quality?" },
      a: { ar: "تُرسم الصفحات بدقة 2x من العرض الأصلي مع جودة JPG قابلة للضبط حتى 100% — مثالية للطباعة والشاشات العالية.", en: "Pages render at 2x their base width with JPG quality adjustable up to 100% — ideal for print and retina screens." } }
  ],
  related: ["image-to-pdf", "pdf-to-txt", "image-compressor"]
},
{
  slug: "rotate-pdf",
  icon: "🔄",
  category: "media",
  name: { ar: "تدوير صفحات PDF", en: "Rotate PDF", fr: "Pivoter PDF", es: "Rotar PDF", de: "PDF drehen", tr: "PDF Döndür", ru: "Повернуть PDF", zh: "旋转 PDF 页面", hi: "PDF घुमाएं", pt: "Girar PDF" },
  short: { ar: "صحّح اتجاه صفحات PDF بتدوير 90 أو 180 أو 270 درجة.", en: "Fix sideways PDF pages by rotating 90/180/270 degrees.", fr: "Redressez les pages PDF par rotation 90/180/270°.", es: "Corrige páginas PDF rotando 90/180/270°.", de: "PDF-Seiten um 90/180/270° drehen.", tr: "PDF sayfalarını 90/180/270° döndür.", ru: "Поверните страницы PDF на 90/180/270°.", zh: "将 PDF 页面旋转 90/180/270 度。", hi: "PDF पेज 90/180/270 डिग्री घुमाएं।", pt: "Gire páginas PDF em 90/180/270 graus." },
  usage: { ar: ["اختر ملف PDF.", "حدد زاوية التدوير: 90 أو 180 أو 270 درجة.", "اختياري: حدد نطاق صفحات معين (اتركه فارغاً لكل الصفحات).", "اضغط «تدوير» ونزّل النسخة المصححة."], en: ["Pick a PDF file.", "Choose rotation: 90, 180 or 270 degrees.", "Optional: limit to specific page ranges (leave empty for all pages).", "Press Rotate and download the fixed copy."] },
  explanation: { ar: ["يُحفظ التدوير داخل بنية الملف نفسها بشكل دائم — فتظهر الصفحات مستقيمة على أي قارئ وأي جهاز.", "يفيد المستندات الممسوحة ضوئياً باتجاه خاطئ أو الشرائح المقلوبة.", "تُنفَّذ العملية عبر pdf-lib محلياً وبثوانٍ حتى للملفات الكبيرة."], en: ["Rotation is saved permanently into the file structure — pages display upright in any reader on any device.", "Fixes scanned documents with wrong orientation or flipped slides.", "Powered by pdf-lib, local and fast even for large files."] },
  faq: [
    { q: { ar: "هل التدوير دائم أم مؤقت؟", en: "Is the rotation permanent?" },
      a: { ar: "دائم — يُكتب في بيانات الملف نفسها، عكس خاصية العرض المؤقتة في بعض البرامج.", en: "Permanent — it is written into the file's metadata, unlike temporary viewer rotation in some apps." } }
  ],
  related: ["split-pdf", "merge-pdf", "compress-pdf"]
},
{
  slug: "word-to-pdf",
  icon: "📝",
  category: "media",
  name: { ar: "Word إلى PDF", en: "Word to PDF", fr: "Word vers PDF", es: "Word a PDF", de: "Word zu PDF", tr: "Word'den PDF'ye", ru: "Word в PDF", zh: "Word 转 PDF", hi: "Word से PDF", pt: "Word para PDF" },
  short: { ar: "حوّل مستندات DOCX إلى PDF عبر نافذة الطباعة.", en: "Convert DOCX documents to PDF via the print dialog.", fr: "Convertissez des DOCX en PDF via l'impression.", es: "Convierte DOCX a PDF mediante impresión.", de: "DOCX über den Druckdialog zu PDF konvertieren.", tr: "DOCX belgeleri yazdırma ile PDF'ye çevir.", ru: "Конвертируйте DOCX в PDF через печать.", zh: "通过打印对话框将 DOCX 转为 PDF。", hi: "प्रिंट डायलॉग से DOCX को PDF में बदलें।", pt: "Converta DOCX em PDF via diálogo de impressão." },
  usage: { ar: ["اختر ملف .docx.", "ستُعرض معاينة منسّقة لمحتوى المستند.", "اضغط «حفظ كـ PDF» فتفتح نافذة الطباعة.", "اختر «حفظ كـ PDF» من قائمة الطابعة، أو نزّل HTML/نصاً صريحاً."], en: ["Pick a .docx file.", "A formatted preview of the content is rendered.", "Press Save as PDF to open the print dialog.", "Choose Save as PDF in the printer list, or download clean HTML/text instead."] },
  explanation: { ar: ["تعتمد الأداة على mammoth.js المفتوحة المصدر لتحويل DOCX إلى HTML نظيف مع الحفاظ على العناوين والقوائم والجداول.", "التحويل إلى PDF يتم عبر نافذة الطباعة المدمجة في المتصفح — طريقة موثوقة تعطي PDF حقيقياً قابلاً للتحديد والبحث.", "كل ذلك يحدث محلياً: عقودك وسيرتك الذاتية لا تغادر جهازك، بعكس مواقع التحويل التي ترفع المستندات لخوادمها."], en: ["Powered by open-source mammoth.js which turns DOCX into clean HTML preserving headings, lists and tables.", "PDF generation happens through the browser's built-in print dialog — a reliable way to get a real, searchable PDF.", "Everything is local: contracts and CVs never leave your device, unlike upload-based converters."] },
  faq: [
    { q: { ar: "لماذا تفتح نافذة الطباعة بدل تنزيل PDF مباشر؟", en: "Why does the print dialog open instead of a direct PDF download?" },
      a: { ar: "نافذة الطباعة تمنحك PDF حقيقياً بجودة متجهات (نص قابل للتحديد والبحث) مع تحكم بالهوامش والحجم — وهي طريقة أكثر موثوقية من توليد PDF صوري.", en: "The print dialog produces a real vector PDF (selectable, searchable text) with margin and size control — more reliable than a rasterized PDF." } },
    { q: { ar: "هل تدعم الأداة اللغة العربية في المستند؟", en: "Does it support Arabic documents?" },
      a: { ar: "نعم، المعاينة والطباعة تدعمان RTL والخطوط العربية بشكل كامل.", en: "Yes — preview and printing fully support RTL and Arabic fonts." } }
  ],
  related: ["pdf-to-word", "image-to-pdf", "pdf-to-txt"]
},
{
  slug: "resize-image",
  icon: "📐",
  category: "media",
  name: { ar: "تحجيم الصور", en: "Image Resizer", fr: "Redimensionner images", es: "Redimensionar imágenes", de: "Bilder skalieren", tr: "Görsel Boyutlandırıcı", ru: "Изменить размер изображений", zh: "调整图片尺寸", hi: "इमेज रीसाइज़र", pt: "Redimensionar imagens" },
  short: { ar: "غيّر أبعاد الصور بالعرض أو بالنسبة مع تحويل الصيغة.", en: "Resize images by width or percentage with format conversion.", fr: "Redimensionnez par largeur ou pourcentage.", es: "Redimensiona por ancho o porcentaje.", de: "Größe nach Breite oder Prozent ändern.", tr: "Genişlik veya yüzdeye göre boyutlandır.", ru: "Измените размер по ширине или проценту.", zh: "按宽度或百分比调整图片尺寸。", hi: "चौड़ाई या प्रतिशत से इमेज रीसाइज़ करें।", pt: "Redimensione por largura ou porcentagem." },
  usage: { ar: ["اختر صورة أو أكثر.", "حدد العرض الجديد بالبكسل أو نسبة مئوية من الأصل.", "اختر صيغة الإخراج والجودة.", "اضغط «تحجيم» ونزّل النتائج (دفعة كاملة = ZIP)."], en: ["Pick one or more images.", "Set the new width in pixels or a percentage of original.", "Choose output format and quality.", "Press Resize and download (batches arrive as ZIP)."] },
  explanation: { ar: ["يحافظ التحويل تلقائياً على نسبة الأبعاد فلا تتشوه الصورة أبداً.", "الاستخدامات الأشهر: تصغير صور الشبكات الاجتماعية، توحيد أبعاد صور المتجر الإلكتروني، وتقليل حجم المرفقات.", "يعتمد التحويل على محرك Canvas المتجهي في المتصفح مع إعادة تموضع عالية الجودة."], en: ["Aspect ratio is preserved automatically so images never distort.", "Most common uses: sizing social media images, unifying marketplace photo dimensions, and shrinking email attachments.", "Resampling runs on the browser's canvas engine with high-quality smoothing."] },
  faq: [
    { q: { ar: "ماذا لو أدخلت العرض فقط؟", en: "What if I only enter width?" },
      a: { ar: "يُحسب الارتفاع تلقائياً حسب نسبة الأبعاد الأصلية.", en: "Height is computed automatically from the original aspect ratio." } }
  ],
  related: ["image-compressor", "image-converter", "heic-to-jpg"]
},
{
  slug: "excel-to-csv",
  icon: "📊",
  category: "dev",
  name: { ar: "Excel إلى CSV", en: "Excel to CSV", fr: "Excel vers CSV", es: "Excel a CSV", de: "Excel zu CSV", tr: "Excel'den CSV'ye", ru: "Excel в CSV", zh: "Excel 转 CSV", hi: "Excel से CSV", pt: "Excel para CSV" },
  short: { ar: "حوّل جداول XLSX/XLS إلى CSV مع اختيار الورقة والفاصل.", en: "Convert XLSX/XLS sheets to CSV with sheet & delimiter choice.", fr: "Convertissez XLSX/XLS en CSV avec choix de feuille.", es: "Convierte XLSX/XLS a CSV eligiendo hoja y delimitador.", de: "XLSX/XLS zu CSV mit Blatt- und Trennwahl.", tr: "XLSX/XLS'yi CSV'ye çevir (sayfa/ayraç seçimi ile).", ru: "Конвертируйте XLSX/XLS в CSV с выбором листа.", zh: "将 XLSX/XLS 转为 CSV，可选工作表与分隔符。", hi: "XLSX/XLS को CSV में बदलें (शीट और डेलिमिटर चयन)।", pt: "Converta XLSX/XLS para CSV com escolha de planilha." },
  usage: { ar: ["اختر ملف Excel (.xlsx أو .xls).", "اختر الورقة المطلوبة من القائمة.", "حدد الفاصل: فاصلة أو فاصلة منقوطة.", "اضغط «تحويل» ونزّل CSV (كل الأوراق = ZIP)."], en: ["Pick an Excel file (.xlsx or .xls).", "Choose the sheet from the list.", "Pick the delimiter: comma or semicolon.", "Press Convert and download the CSV (all sheets = ZIP)."] },
  explanation: { ar: ["تعتمد الأداة على SheetJS المفتوحة المصدر — نفس المكتبة التي تستخدمها شركات كبرى لمعالجة الجداول في المتصفح.", "الفاصل المنقوطة مفيد للمستخدمين الأوروبيين وعرب Excel حيث الفاصلة فاصلة عشرية.", "معالجة محلية 100%: بياناتك المالية والمشروعات لا تُرفع لأي خادم — ميزة تتفوق فيها على Convertio وFreeConvert."], en: ["Powered by open-source SheetJS — the same library used by major companies for in-browser spreadsheet processing.", "Semicolon delimiter helps European and Arabic Excel users where comma is the decimal separator.", "100% local processing: your financial and project data never uploads — a real edge over Convertio and FreeConvert."] },
  faq: [
    { q: { ar: "هل تدعم ملفات .xls القديمة؟", en: "Does it support legacy .xls files?" },
      a: { ar: "نعم، تدعم XLSX وXLS وXLSB حتى ملفات Excel 97 القديمة.", en: "Yes — XLSX, XLS and XLSB are supported, including legacy Excel 97 files." } }
  ],
  related: ["csv-to-json", "json-to-csv", "csv-to-excel"]
},
{
  slug: "csv-to-excel",
  icon: "📗",
  category: "dev",
  name: { ar: "CSV إلى Excel", en: "CSV to Excel", fr: "CSV vers Excel", es: "CSV a Excel", de: "CSV zu Excel", tr: "CSV'den Excel'e", ru: "CSV в Excel", zh: "CSV 转 Excel", hi: "CSV से Excel", pt: "CSV para Excel" },
  short: { ar: "حوّل ملفات CSV إلى جدول XLSX حقيقي يفتح في Excel.", en: "Turn CSV files into real XLSX spreadsheets that open in Excel.", fr: "Convertissez CSV en véritable XLSX pour Excel.", es: "Convierte CSV a XLSX real que abre en Excel.", de: "CSV in echte XLSX-Tabellen für Excel umwandeln.", tr: "CSV'yi Excel'de açılan gerçek XLSX'e çevir.", ru: "Преобразуйте CSV в настоящий XLSX для Excel.", zh: "将 CSV 转为可在 Excel 打开的 XLSX。", hi: "CSV को Excel में खुलने वाले असली XLSX में बदलें।", pt: "Transforme CSV em XLSX real para abrir no Excel." },
  usage: { ar: ["اختر ملف CSV (يكشف الفاصل تلقائياً).", "راجع عدد الصفوف والأعمدة المكتشفة.", "اضغط «تحويل إلى Excel».", "نزّل ملف XLSX الجاهز للفتح في Excel أو Google Sheets."], en: ["Pick a CSV file (delimiter auto-detected).", "Review detected row and column counts.", "Press Convert to Excel.", "Download the XLSX ready for Excel or Google Sheets."] },
  explanation: { ar: ["المشكلة الشائعة: فتح CSV مباشرة في Excel يكسر الترميز العربي ويضغط كل البيانات في عمود واحد.", "هذه الأداة تنتج XLSX حقيقياً بترميز UTF-8 سليم وخلية لكل قيمة — دون معالجات يدوية.", "يعمل كل شيء عبر SheetJS داخل متصفحك مع كشف تلقائي للفواصل والاقتباسات."], en: ["Common problem: opening CSV directly in Excel breaks Arabic encoding and squeezes everything into one column.", "This tool produces a genuine UTF-8 XLSX with one cell per value — no manual import wizard needed.", "Everything runs via SheetJS in your browser with automatic delimiter and quote handling."] },
  faq: [
    { q: { ar: "أي فاصل يدعم؟", en: "Which delimiters are supported?" },
      a: { ar: "الفاصلة والفاصلة المنقوطة والجدولة (Tab) وغيرها — تُكتشف تلقائياً من الملف نفسه.", en: "Comma, semicolon, tab and more — detected automatically from the file itself." } }
  ],
  related: ["excel-to-csv", "csv-to-json", "json-to-csv"]
},
{
  slug: "excel-to-json",
  icon: "🧾",
  category: "dev",
  name: { ar: "Excel إلى JSON", en: "Excel to JSON", fr: "Excel vers JSON", es: "Excel a JSON", de: "Excel zu JSON", tr: "Excel'den JSON'a", ru: "Excel в JSON", zh: "Excel 转 JSON", hi: "Excel से JSON", pt: "Excel para JSON" },
  short: { ar: "حوّل أوراق Excel إلى JSON جاهز للمبرمجين وواجهات API.", en: "Convert Excel sheets to JSON ready for developers and APIs.", fr: "Convertissez Excel en JSON prêt pour les API.", es: "Convierte Excel a JSON listo para APIs.", de: "Excel zu API-tauglichem JSON konvertieren.", tr: "Excel'i API'lere hazır JSON'a çevir.", ru: "Конвертируйте Excel в JSON для API.", zh: "将 Excel 转为可用于 API 的 JSON。", hi: "Excel को API-रेडी JSON में बदलें।", pt: "Converta Excel em JSON pronto para APIs." },
  usage: { ar: ["اختر ملف Excel.", "اختر الورقة ووضع الإخراج: مصفوفة كائنات (الصف الأول مفاتيح) أو مصفوفة صفوف.", "اضغط «تحويل».", "انسخ JSON أو نزّله مباشرة."], en: ["Pick an Excel file.", "Choose the sheet and output mode: array of objects (first row as keys) or array of rows.", "Press Convert.", "Copy the JSON or download it."] },
  explanation: { ar: ["وضع «مصفوفة كائنات» ينتج JSON بمعرّفات واضحة من صف العناوين — الأنسب لاستيراد البيانات في التطبيقات وقواعد البيانات.", "تُحوَّل القيم الرقمية والتواريخ بأنواعها الصحيحة تلقائياً حيث أمكن.", "أداة أساسية للمطورين والباحثين الذين يبدأون من جداول Excel وينتهون إلى واجهات برمجية."], en: ["Object-array mode produces JSON with clear keys from the header row — ideal for importing data into apps and databases.", "Numeric and date values are auto-typed where possible.", "A must-have for developers and analysts starting from spreadsheets and ending at APIs."] },
  faq: [
    { q: { ar: "ما الفرق بين وضعي الإخراج؟", en: "What is the difference between output modes?" },
      a: { ar: "«كائنات» يفسر الصف الأول كمفاتيح وينتج [{عمود: قيمة}] — «صفوف» ينتج [[صف1],[صف2]] كما هي.", en: "Objects mode treats the first row as keys and outputs [{col: value}]; rows mode outputs [[row1],[row2]] as-is." } }
  ],
  related: ["csv-to-json", "json-formatter", "excel-to-csv"]
},
{
  slug: "zip-files",
  icon: "🗜️",
  category: "dev",
  name: { ar: "ضغط ملفات ZIP", en: "ZIP Files", fr: "Compresser en ZIP", es: "Comprimir en ZIP", de: "Dateien zippen", tr: "ZIP Sıkıştırma", ru: "Сжать в ZIP", zh: "打包 ZIP 文件", hi: "ZIP फ़ाइलें बनाएं", pt: "Compactar em ZIP" },
  short: { ar: "اجمع أي عدد من الملفات في أرشيف ZIP واحد داخل المتصفح.", en: "Pack any number of files into one ZIP archive in your browser.", fr: "Regroupez vos fichiers en un ZIP dans le navigateur.", es: "Empaqueta archivos en un ZIP desde el navegador.", de: "Beliebige Dateien im Browser zu ZIP packen.", tr: "Tarayıcıda dosyaları tek ZIP'te topla.", ru: "Упакуйте файлы в ZIP прямо в браузере.", zh: "在浏览器中将多个文件打包为 ZIP。", hi: "ब्राउज़र में फ़ाइलें एक ZIP में पैक करें।", pt: "Empacote arquivos num ZIP direto no navegador." },
  usage: { ar: ["اختر أي عدد من الملفات من أي نوع.", "اختياري: ضع الملفات داخل مجلد بأسماء محددة.", "اضغط «إنشاء ZIP».", "نزّل الأرشيف الجاهز للإرسال."], en: ["Pick any number of files of any type.", "Optional: place files inside a named folder.", "Press Create ZIP.", "Download the archive ready to share."] },
  explanation: { ar: ["تعتمد الأداة على JSZip — المكتبة المفتوحة الأشهر المستخدمة في ملايين المواقع.", "على الهواتف خصوصاً يصعب إنشاء أرشيفات ZIP دون تطبيقات؛ هنا تنجزها في متصفحك بثوانٍ.", "مثالية لتجميع مستندات طلب وظيفة، أو صور مشروع، أو ملفات واجب جامعي في مرفق واحد."], en: ["Powered by JSZip — the most popular open-source zip library used across millions of sites.", "Especially on phones, creating ZIP archives usually requires apps; here it takes seconds in your browser.", "Perfect for bundling job application documents, project photos or university assignments into one attachment."] },
  faq: [
    { q: { ar: "هل يوجد حد لحجم الملفات؟", en: "Is there a size limit?" },
      a: { ar: "الحد الوحيد ذاكرة جهازك نفسها — لا يوجد حد من جهتنا، عكس مواقع الرفع التي تحدد 100MB أو أقل مجاناً.", en: "The only limit is your device's memory — no caps on our side, unlike upload sites that restrict you to 100MB or less for free." } }
  ],
  related: ["split-pdf", "heic-to-jpg", "image-compressor"]
},
{
  slug: "qr-scanner",
  icon: "📷",
  category: "media",
  name: { ar: "قارئ QR من صورة", en: "QR Reader (Image)", fr: "Lecteur QR (image)", es: "Lector QR (imagen)", de: "QR-Leser (Bild)", tr: "QR Okuyucu (Görsel)", ru: "QR-читатель (изображение)", zh: "QR 读取器（图片）", hi: "QR रीडर (इमेज)", pt: "Leitor QR (imagem)" },
  short: { ar: "اقرأ محتوى رمز QR من صورة أو لقطة شاشة.", en: "Decode a QR code from an image or screenshot.", fr: "Décodez un QR code depuis une image.", es: "Decodifica un QR desde una imagen.", de: "QR-Code aus Bild entschlüsseln.", tr: "Görselden QR kodunu çöz.", ru: "Декодируйте QR-код из изображения.", zh: "从图片或截图解码二维码。", hi: "इमेज या स्क्रीनशॉट से QR डिकोड करें।", pt: "Decodifique um QR de imagem ou print." },
  usage: { ar: ["اختر صورة تحتوي رمز QR (لقطة شاشة أو صورة كاميرا).", "اضغط «فك الرمز».", "اقرأ المحتوى: رابط أو نص أو رقم هاتف.", "انسخه، أو افحص الرابط قبل فتحه."], en: ["Pick an image containing a QR code (screenshot or camera photo).", "Press Decode.", "Read the content: URL, text or phone number.", "Copy it, or inspect the link before opening."] },
  explanation: { ar: ["يعمل فك الترميز عبر jsQR — مكتبة مفتوحة المصدر تعمل محلياً على بيانات البكسل مباشرة.", "الفائدة الأهم للأمان: افحص وجهة روابط QR المجهولة قبل فتحها على هاتفك.", "يعمل مع الصور والقطات من أي جهاز — لا يحتاج كاميرا مباشرة مثل تطبيقات المسح."], en: ["Decoding runs via jsQR — an open-source library operating directly on pixel data, fully local.", "Key security benefit: inspect where an unknown QR link leads before opening it on your phone.", "Works with images from any device — no live camera needed, unlike scanner apps."] },
  faq: [
    { q: { ar: "لماذا لا يقرأ الرمز؟", en: "Why won't it read my code?" },
      a: { ar: "تأكد أن الرمز واضح ومضيء وغير مائل، وقص الصورة حول الرمز إن كانت كبيرة — وجرّب لقطة أوضح.", en: "Make sure the code is sharp, well-lit and straight; crop the image around the code if it's large — or try a sharper shot." } }
  ],
  related: ["qr-code", "base64", "url-encoder"]
},
{
  slug: 'pdf-organize', icon: '🗂️', category: 'media',
  name: { ar: 'ترتيب صفحات PDF', en: 'PDF Page Organizer' },
  short: { ar: 'أعد ترتيب الصفحات أو احذف صفحات محددة من PDF مجاناً داخل متصفحك، دون رفع الملف.', en: 'Reorder or remove PDF pages.' },
  usage: { ar: ["أدخل الملفات أو النص المطلوب.", "اختر الخيارات المناسبة.", "نفّذ العملية واحفظ النتيجة."], en: ["Add the input file or text.", "Choose options.", "Run the action and save the result."] },
  explanation: { ar: ["تعمل الأداة محلياً داخل متصفحك ولا ترفع ملفاتك إلى خادم."], en: ["This tool runs locally in your browser and does not upload files."] },
  faq: [], related: []
},
{
  slug: 'pdf-watermark', icon: '💧', category: 'media',
  name: { ar: 'علامة مائية PDF', en: 'PDF Watermark' },
  short: { ar: 'أضف علامة مائية نصية مائلة إلى صفحات PDF واضبط حجمها وشفافيتها محلياً في المتصفح.', en: 'Add a text watermark to PDF pages.' },
  usage: { ar: ["أدخل الملفات أو النص المطلوب.", "اختر الخيارات المناسبة.", "نفّذ العملية واحفظ النتيجة."], en: ["Add the input file or text.", "Choose options.", "Run the action and save the result."] },
  explanation: { ar: ["تعمل الأداة محلياً داخل متصفحك ولا ترفع ملفاتك إلى خادم."], en: ["This tool runs locally in your browser and does not upload files."] },
  faq: [], related: []
},
{
  slug: 'pdf-page-numbers', icon: '🔢', category: 'media',
  name: { ar: 'ترقيم صفحات PDF', en: 'PDF Page Numbers' },
  short: { ar: 'أضف أرقاماً إلى صفحات ملف PDF وحدد موضعها ورقم البداية قبل تنزيل النسخة المعدّلة.', en: 'Add page numbers to a PDF.' },
  usage: { ar: ["أدخل الملفات أو النص المطلوب.", "اختر الخيارات المناسبة.", "نفّذ العملية واحفظ النتيجة."], en: ["Add the input file or text.", "Choose options.", "Run the action and save the result."] },
  explanation: { ar: ["تعمل الأداة محلياً داخل متصفحك ولا ترفع ملفاتك إلى خادم."], en: ["This tool runs locally in your browser and does not upload files."] },
  faq: [], related: []
},
{
  slug: 'image-crop', icon: '✂️', category: 'media',
  name: { ar: 'قص الصور', en: 'Image Cropper' },
  short: { ar: 'اقص الصور بنسب أبعاد شائعة واحفظها بصيغة PNG أو JPG أو WebP مباشرة في المتصفح.', en: 'Crop images to common aspect ratios or custom dimensions.' },
  usage: { ar: ["أدخل الملفات أو النص المطلوب.", "اختر الخيارات المناسبة.", "نفّذ العملية واحفظ النتيجة."], en: ["Add the input file or text.", "Choose options.", "Run the action and save the result."] },
  explanation: { ar: ["تعمل الأداة محلياً داخل متصفحك ولا ترفع ملفاتك إلى خادم."], en: ["This tool runs locally in your browser and does not upload files."] },
  faq: [], related: []
},
{
  slug: 'image-rotate-flip', icon: '🔄', category: 'media',
  name: { ar: 'تدوير وقلب الصور', en: 'Rotate and Flip Images' },
  short: { ar: 'دوّر الصور بزاوية 90 أو 180 درجة أو اقلبها أفقياً وعمودياً، ثم احفظ النسخة الجديدة.', en: 'Rotate images or flip them horizontally and vertically.' },
  usage: { ar: ["أدخل الملفات أو النص المطلوب.", "اختر الخيارات المناسبة.", "نفّذ العملية واحفظ النتيجة."], en: ["Add the input file or text.", "Choose options.", "Run the action and save the result."] },
  explanation: { ar: ["تعمل الأداة محلياً داخل متصفحك ولا ترفع ملفاتك إلى خادم."], en: ["This tool runs locally in your browser and does not upload files."] },
  faq: [], related: []
},
{
  slug: 'exif-viewer', icon: '🔎', category: 'media',
  name: { ar: 'عارض بيانات EXIF', en: 'EXIF Viewer' },
  short: { ar: 'اعرض بيانات EXIF في صور JPEG، مثل طراز الكاميرا وتاريخ الالتقاط وبعض معلومات الموقع، محلياً.', en: 'Inspect camera and date metadata in JPEG images.' },
  usage: { ar: ["أدخل الملفات أو النص المطلوب.", "اختر الخيارات المناسبة.", "نفّذ العملية واحفظ النتيجة."], en: ["Add the input file or text.", "Choose options.", "Run the action and save the result."] },
  explanation: { ar: ["تعمل الأداة محلياً داخل متصفحك ولا ترفع ملفاتك إلى خادم."], en: ["This tool runs locally in your browser and does not upload files."] },
  faq: [], related: []
},
{
  slug: 'favicon-generator', icon: '⭐', category: 'media',
  name: { ar: 'مولّد Favicon', en: 'Favicon Generator' },
  short: { ar: 'حوّل صورتك إلى أيقونات Favicon متعددة الأحجام وملف ICO ومقتطف HTML جاهز لموقعك.', en: 'Turn an image into multi-size site icons and an ICO file.' },
  usage: { ar: ["أدخل الملفات أو النص المطلوب.", "اختر الخيارات المناسبة.", "نفّذ العملية واحفظ النتيجة."], en: ["Add the input file or text.", "Choose options.", "Run the action and save the result."] },
  explanation: { ar: ["تعمل الأداة محلياً داخل متصفحك ولا ترفع ملفاتك إلى خادم."], en: ["This tool runs locally in your browser and does not upload files."] },
  faq: [], related: []
},
{
  slug: 'svg-to-png', icon: '🖼️', category: 'media',
  name: { ar: 'تحويل SVG إلى PNG', en: 'SVG to PNG' },
  short: { ar: 'حوّل رسومات SVG المتجهة إلى PNG شفاف وحدد العرض بالبكسل ولون الخلفية الاختياري.', en: 'Convert vector graphics into PNG images.' },
  usage: { ar: ["أدخل الملفات أو النص المطلوب.", "اختر الخيارات المناسبة.", "نفّذ العملية واحفظ النتيجة."], en: ["Add the input file or text.", "Choose options.", "Run the action and save the result."] },
  explanation: { ar: ["تعمل الأداة محلياً داخل متصفحك ولا ترفع ملفاتك إلى خادم."], en: ["This tool runs locally in your browser and does not upload files."] },
  faq: [], related: []
},
{
  slug: 'json-yaml', icon: '🔁', category: 'dev',
  name: { ar: 'تحويل JSON وYAML', en: 'JSON to YAML Converter' },
  short: { ar: 'حوّل JSON إلى YAML أو YAML إلى JSON، والصق البيانات أو اختر ملفاً دون رفعه إلى خادم.', en: 'Convert JSON to YAML or back.' },
  usage: { ar: ["أدخل الملفات أو النص المطلوب.", "اختر الخيارات المناسبة.", "نفّذ العملية واحفظ النتيجة."], en: ["Add the input file or text.", "Choose options.", "Run the action and save the result."] },
  explanation: { ar: ["تعمل الأداة محلياً داخل متصفحك ولا ترفع ملفاتك إلى خادم."], en: ["This tool runs locally in your browser and does not upload files."] },
  faq: [], related: []
},
{
  slug: 'markdown-to-html', icon: '📝', category: 'text',
  name: { ar: 'تحويل Markdown إلى HTML', en: 'Markdown to HTML' },
  short: { ar: 'حوّل نص Markdown إلى HTML أساسي، اعرض النتيجة وانسخها أو نزّلها من المتصفح مباشرة.', en: 'Convert Markdown into HTML locally.' },
  usage: { ar: ["أدخل الملفات أو النص المطلوب.", "اختر الخيارات المناسبة.", "نفّذ العملية واحفظ النتيجة."], en: ["Add the input file or text.", "Choose options.", "Run the action and save the result."] },
  explanation: { ar: ["تعمل الأداة محلياً داخل متصفحك ولا ترفع ملفاتك إلى خادم."], en: ["This tool runs locally in your browser and does not upload files."] },
  faq: [], related: []
},
{
  slug: 'slug-generator', icon: '🔗', category: 'text',
  name: { ar: 'مولّد Slug عربي', en: 'Arabic Slug Generator' },
  short: { ar: 'أنشئ Slug صديقاً للروابط من عناوين عربية أو إنجليزية مع اختيار الفاصل والاحتفاظ بالعربية.', en: 'Turn titles into URL-friendly slugs.' },
  usage: { ar: ["أدخل الملفات أو النص المطلوب.", "اختر الخيارات المناسبة.", "نفّذ العملية واحفظ النتيجة."], en: ["Add the input file or text.", "Choose options.", "Run the action and save the result."] },
  explanation: { ar: ["تعمل الأداة محلياً داخل متصفحك ولا ترفع ملفاتك إلى خادم."], en: ["This tool runs locally in your browser and does not upload files."] },
  faq: [], related: []
},
{
  slug: 'list-cleaner', icon: '🧹', category: 'text',
  name: { ar: 'تنظيف القوائم', en: 'List Cleaner' },
  short: { ar: 'نظّف القوائم من الفراغات والتكرار، وتجاهل حالة الأحرف أو رتّب العناصر حسب اختيارك.', en: 'Trim, deduplicate and sort lists.' },
  usage: { ar: ["أدخل الملفات أو النص المطلوب.", "اختر الخيارات المناسبة.", "نفّذ العملية واحفظ النتيجة."], en: ["Add the input file or text.", "Choose options.", "Run the action and save the result."] },
  explanation: { ar: ["تعمل الأداة محلياً داخل متصفحك ولا ترفع ملفاتك إلى خادم."], en: ["This tool runs locally in your browser and does not upload files."] },
  faq: [], related: []
},
{
  slug: 'totp-generator', icon: '🔐', category: 'security',
  name: { ar: 'مولّد رمز TOTP', en: 'TOTP 2FA Code Generator' },
  short: { ar: 'أنشئ رمز TOTP للمصادقة الثنائية من سر Base32 داخل المتصفح دون إرسال السر إلى أي خادم.', en: 'Generate time-based 2FA codes locally.' },
  usage: { ar: ["أدخل الملفات أو النص المطلوب.", "اختر الخيارات المناسبة.", "نفّذ العملية واحفظ النتيجة."], en: ["Add the input file or text.", "Choose options.", "Run the action and save the result."] },
  explanation: { ar: ["تعمل الأداة محلياً داخل متصفحك ولا ترفع ملفاتك إلى خادم."], en: ["This tool runs locally in your browser and does not upload files."] },
  faq: [], related: []
},
{
  slug: 'password-strength', icon: '📊', category: 'security',
  name: { ar: 'فاحص قوة كلمة المرور', en: 'Password Strength Checker' },
  short: { ar: 'اختبر تقدير قوة كلمة المرور محلياً، واطلع على ملاحظات التحسين دون حفظها أو إرسالها.', en: 'Estimate password strength without uploading it.' },
  usage: { ar: ["أدخل الملفات أو النص المطلوب.", "اختر الخيارات المناسبة.", "نفّذ العملية واحفظ النتيجة."], en: ["Add the input file or text.", "Choose options.", "Run the action and save the result."] },
  explanation: { ar: ["تعمل الأداة محلياً داخل متصفحك ولا ترفع ملفاتك إلى خادم."], en: ["This tool runs locally in your browser and does not upload files."] },
  faq: [], related: []
}
];

export const CATEGORIES = [
  { id: "all", label: "cat.all" },
  { id: "dev", label: "cat.dev" },
  { id: "encode", label: "cat.encode" },
  { id: "text", label: "cat.text" },
  { id: "security", label: "cat.security" },
  { id: "color", label: "cat.color" },
  { id: "media", label: "cat.media" }
];

export function getTool(slug) { return TOOLS.find(t => t.slug === slug); }

/* ============================================================
 * v4 enrichment: merge long-form content (js/tool-content.js)
 * into every tool — deeper usage steps, richer explanation,
 * more FAQ, and hashtags for SEO + on-page tag chips.
 * ============================================================ */
for (const tool of TOOLS) {
  const extra = TOOL_CONTENT[tool.slug];
  if (!extra) continue;
  if (extra.usage) tool.usage = extra.usage;
  if (extra.explanation) tool.explanation = extra.explanation;
  if (extra.faq && extra.faq.length) tool.faq = extra.faq;
  tool.tags = extra.tags || [];
}
