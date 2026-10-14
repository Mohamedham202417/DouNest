/**
 * DouNest v3 — Tools Registry (pure data)
 * ----------------------------------------
 * Single source of truth for every tool: multilingual names, descriptions,
 * usage steps, explanations, FAQ and related tools.
 * This module is dependency-free so the build script (build.mjs) can import
 * it in Node to generate per-tool SEO landing pages.
 */


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
    faq: [], related: ["image-to-base64", "pdf-to-txt", "color-picker"]
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
  short: {
    ar: "حوّل ملفات PDF إلى مستندات Word قابلة للتحرير.",
    en: "Convert PDF files to editable Word documents.",
    fr: "Convertir des PDF en documents Word modifiables.",
    es: "Convierte archivos PDF a documentos Word editables.",
    de: "PDF-Dateien in bearbeitbare Word-Dokumente umwandeln.",
    tr: "PDF dosyalarını düzenlenebilir Word belgelerine dönüştür.",
    ru: "Преобразование PDF в редактируемые документы Word.",
    zh: "将 PDF 文件转换为可编辑的 Word 文档。",
    hi: "PDF फ़ाइलों को संपादन योग्य Word दस्तावेज़ों में बदलें।",
    pt: "Converta arquivos PDF em documentos Word editáveis."
  },
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
  short: { ar: "قلّل حجم ملف PDF دون فقدان الجودة.", en: "Reduce PDF file size without losing quality.", fr: "Réduire la taille du PDF sans perte de qualité.", es: "Reduce el tamaño del PDF sin perder calidad.", de: "PDF-Dateigröße ohne Qualitätsverlust reduzieren.", tr: "Kalite kaybı olmadan PDF boyutunu küçült.", ru: "Уменьшение размера PDF без потери качества.", zh: "在不损失质量的情况下减小 PDF 文件大小。", hi: "गुणवत्ता खोए बिना PDF फ़ाइल का आकार कम करें।", pt: "Reduza o tamanho do PDF sem perder qualidade." },
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
  faq: [], related: ["json-to-csv", "json-formatter", "yaml-to-json"]
},
{
  slug: "json-to-csv",
  icon: "📈",
  category: "dev",
  name: { ar: "JSON إلى CSV", en: "JSON to CSV", fr: "JSON en CSV", es: "JSON a CSV", de: "JSON zu CSV", tr: "JSON'dan CSV", ru: "JSON в CSV", zh: "JSON 转 CSV", hi: "JSON से CSV", pt: "JSON para CSV" },
  short: { ar: "حوّل مصفوفات JSON إلى CSV.", en: "Convert JSON arrays to CSV.", fr: "Convertir des tableaux JSON en CSV.", es: "Convierte arrays JSON a CSV.", de: "JSON-Arrays in CSV konvertieren.", tr: "JSON dizilerini CSV'ye dönüştür.", ru: "Преобразование массивов JSON в CSV.", zh: "将 JSON 数组转换为 CSV。", hi: "JSON सरणियों को CSV में बदलें।", pt: "Converta arrays JSON para CSV." },
  usage: { ar: ["الصق JSON.", "اضغط تحويل.", "نزّل CSV."], en: ["Paste JSON.", "Click Convert.", "Download CSV."] },
  explanation: { ar: ["تسطيح الكائنات المتداخلة."], en: ["Flattens nested objects."] },
  faq: [], related: ["csv-to-json", "json-formatter", "yaml-to-json"]
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

