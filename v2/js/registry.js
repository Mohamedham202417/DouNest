// سجل الأدوات — كل أداة لها تعريف + محتوى الاستخدام والشرح
export const TOOLS = [
  {
    slug: "json-formatter",
    icon: "{}",
    category: "dev",
    name: { ar: "منسّق JSON", en: "JSON Formatter" },
    short: { ar: "تنسيق، تصغير، والتحقق من صحة JSON.", en: "Format, minify, and validate JSON." },
    usage: {
      ar: [
        "الصق نص JSON في مربع الإدخال.",
        "اختر تنسيق (Beautify) أو تصغير (Minify).",
        "اضغط تنفيذ وستظهر النتيجة.",
        "انسخ النتيجة أو نزّلها."
      ],
      en: [
        "Paste your JSON into the input.",
        "Choose Beautify or Minify.",
        "Click Run to see the result.",
        "Copy or download the output."
      ]
    },
    explanation: {
      ar: [
        "JSON هو تنسيق تبادل بيانات شائع الاستخدام في واجهات API والملفات الإعدادية.",
        "هذه الأداة تتحقق من صحة البنية وتُبرز الأخطاء إن وُجدت، ثم تنسّق النص بشكل مقروء أو تصغّره لإرساله في طلب شبكة.",
        "كل شيء يعمل محليًا في متصفحك، لا يُرسل أي شيء إلى أي خادم."
      ],
      en: [
        "JSON is a widely used data-interchange format for APIs and config files.",
        "This tool validates the structure, highlights errors, then pretty-prints or minifies the text.",
        "Everything runs locally in your browser; nothing is sent to any server."
      ]
    },
    faq: [
      { q: { ar: "هل تُرسل بياناتي للخادم؟", en: "Is my data uploaded?" },
        a: { ar: "لا، تعمل الأداة محليًا 100%.", en: "No, it runs 100% locally." } },
      { q: { ar: "هل تدعم JSON كبير الحجم؟", en: "Does it support large JSON?" },
        a: { ar: "نعم، ضمن حدود ذاكرة المتصفح.", en: "Yes, within browser memory limits." } }
    ],
    related: ["base64", "url-encoder", "jwt-decoder"]
  },
  {
    slug: "base64",
    icon: "64",
    category: "encode",
    name: { ar: "ترميز Base64", en: "Base64 Encoder" },
    short: { ar: "ترميز وفك ترميز نصوص Base64.", en: "Encode and decode Base64 text." },
    usage: {
      ar: ["اكتب النص.", "اختر: ترميز أو فك ترميز.", "اضغط تنفيذ.", "انسخ النتيجة."],
      en: ["Type your text.", "Pick Encode or Decode.", "Click Run.", "Copy the result."]
    },
    explanation: {
      ar: [
        "Base64 طريقة لتحويل البيانات الثنائية إلى نص يستخدم 64 حرفًا.",
        "تُستخدم كثيرًا في نقل البيانات عبر JSON أو في روابط الصور المدمجة (Data URLs)."
      ],
      en: [
        "Base64 encodes binary data as text using 64 characters.",
        "Commonly used in JSON APIs and inline Data URLs."
      ]
    },
    faq: [],
    related: ["url-encoder", "jwt-decoder", "hash-generator"]
  },
  {
    slug: "url-encoder",
    icon: "%",
    category: "encode",
    name: { ar: "ترميز URL", en: "URL Encoder" },
    short: { ar: "ترميز وفك ترميز الروابط (URL encoding).", en: "Encode and decode URLs." },
    usage: {
      ar: ["الصق الرابط أو النص.", "اختر ترميز أو فك ترميز.", "اضغط تنفيذ.", "انسخ النتيجة."],
      en: ["Paste a URL or text.", "Choose encode/decode.", "Click Run.", "Copy result."]
    },
    explanation: {
      ar: ["تُحوَّل الأحرف الخاصة إلى %XX حتى تنتقل بأمان عبر الروابط.",
            "استخدم encodeURIComponent للقيم، وencodeURI للروابط الكاملة."],
      en: ["Special characters become %XX so they travel safely in URLs.",
            "Use encodeURIComponent for values and encodeURI for full URLs."]
    },
    faq: [], related: ["base64", "jwt-decoder", "hash-generator"]
  },
  {
    slug: "jwt-decoder",
    icon: "🔑",
    category: "dev",
    name: { ar: "مفكّك JWT", en: "JWT Decoder" },
    short: { ar: "اقرأ محتوى رموز JWT دون تحقق.", en: "Inspect JWT payload without verification." },
    usage: {
      ar: ["الصق رمز JWT.", "اضغط تنفيذ.", "اقرأ الهيدر والحمولة."],
      en: ["Paste a JWT.", "Click Run.", "Read header and payload."]
    },
    explanation: {
      ar: ["JWT يتكون من ثلاث أجزاء مفصولة بنقطتين: Header.Payload.Signature.",
            "هذه الأداة تفك الترميز فقط لعرض المحتوى. لا تتحقق من التوقيع."],
      en: ["A JWT has three parts: Header.Payload.Signature.",
            "This tool only decodes the contents. It does not verify the signature."]
    },
    faq: [], related: ["base64", "hash-generator", "json-formatter"]
  },
  {
    slug: "hash-generator",
    icon: "#",
    category: "security",
    name: { ar: "مولّد Hash", en: "Hash Generator" },
    short: { ar: "أنشئ SHA-1/256/512 للنصوص.", en: "Compute SHA-1/256/512 hashes." },
    usage: {
      ar: ["اكتب النص.", "اختر الخوارزمية.", "اضغط تنفيذ.", "انسخ الناتج."],
      en: ["Type text.", "Choose algorithm.", "Click Run.", "Copy output."]
    },
    explanation: {
      ar: ["Hash دالة تُنتج بصمة ثابتة الطول. مفيدة للتحقق من سلامة الملفات وكلمات المرور.",
            "SHA-256 هي الأكثر استخدامًا اليوم. لا تستخدم MD5/SHA-1 في الأمان الحرج."],
      en: ["A hash is a fixed-length fingerprint, useful for integrity checks.",
            "SHA-256 is the modern default. Avoid MD5/SHA-1 for security-critical cases."]
    },
    faq: [], related: ["password-generator", "uuid-generator", "base64"]
  },
  {
    slug: "uuid-generator",
    icon: "🆔",
    category: "dev",
    name: { ar: "مولّد UUID", en: "UUID Generator" },
    short: { ar: "أنشئ UUID v4 عشوائيًا.", en: "Generate random UUID v4." },
    usage: {
      ar: ["اختر الكمية.", "اضغط تنفيذ.", "انسخ النتيجة."],
      en: ["Choose how many.", "Click Run.", "Copy results."]
    },
    explanation: {
      ar: ["UUID v4 معرّف عشوائي باحتمال تضارب ضئيل جدًا.",
            "يُستخدم في قواعد البيانات والـ APIs كمفتاح أساسي."],
      en: ["UUID v4 is a random identifier with negligible collision chance.",
            "Used in databases and APIs as a primary key."]
    },
    faq: [], related: ["hash-generator", "password-generator", "json-formatter"]
  },
  {
    slug: "password-generator",
    icon: "🔐",
    category: "security",
    name: { ar: "مولّد كلمات المرور", en: "Password Generator" },
    short: { ar: "أنشئ كلمات مرور قوية عشوائية.", en: "Generate strong random passwords." },
    usage: {
      ar: ["اختر الطول والخيارات.", "اضغط تنفيذ.", "انسخ كلمة المرور."],
      en: ["Set length and options.", "Click Run.", "Copy password."]
    },
    explanation: {
      ar: ["يُفضّل استخدام كلمة مرور طويلة (16+ حرفًا) مع رموز وأرقام.",
            "استخدم مدير كلمات مرور لتخزينها بأمان."],
      en: ["Prefer long passwords (16+ chars) with symbols and digits.",
            "Use a password manager to store them safely."]
    },
    faq: [], related: ["hash-generator", "uuid-generator", "base64"]
  },
  {
    slug: "color-converter",
    icon: "🎨",
    category: "color",
    name: { ar: "محوّل الألوان", en: "Color Converter" },
    short: { ar: "تحويل بين HEX و RGB و HSL.", en: "Convert HEX, RGB, HSL." },
    usage: {
      ar: ["أدخل اللون أو اختره.", "اقرأ القيم بكل الصيغ.", "انسخ ما تحتاجه."],
      en: ["Enter or pick a color.", "Read all formats.", "Copy what you need."]
    },
    explanation: {
      ar: ["HEX و RGB و HSL ثلاثة تمثيلات للألوان.",
            "RGB مناسب للشاشات، HSL أسهل للتعديل البشري."],
      en: ["HEX, RGB, HSL are three ways to represent color.",
            "RGB suits screens; HSL is human-friendly for tweaks."]
    },
    faq: [], related: ["text-case", "word-counter", "json-formatter"]
  },
  {
    slug: "word-counter",
    icon: "🔢",
    category: "text",
    name: { ar: "عدّاد الكلمات", en: "Word Counter" },
    short: { ar: "احسب الكلمات والأحرف والأسطر.", en: "Count words, chars, lines." },
    usage: {
      ar: ["الصق النص.", "اضغط تنفيذ.", "شاهد الإحصاءات."],
      en: ["Paste text.", "Click Run.", "See stats."]
    },
    explanation: {
      ar: ["مفيد للكتّاب والمحررين وللتأكد من حدود النشر على المنصات.",
            "يُحسب عدد الكلمات بتقسيم النص على المسافات."],
      en: ["Useful for writers and editors, and platform character limits.",
            "Word count splits text by whitespace."]
    },
    faq: [], related: ["text-case", "json-formatter", "base64"]
  },
  {
    slug: "text-case",
    icon: "Aa",
    category: "text",
    name: { ar: "تحويل حالة النص", en: "Text Case Converter" },
    short: { ar: "UPPER, lower, Title, Sentence.", en: "UPPER, lower, Title, Sentence." },
    usage: {
      ar: ["الصق النص.", "اختر الحالة.", "اضغط تنفيذ.", "انسخ النتيجة."],
      en: ["Paste text.", "Pick a case.", "Click Run.", "Copy result."]
    },
    explanation: {
      ar: ["أدوات تحويل حالة الأحرف مفيدة لتنظيف النصوص والعناوين.",
            "Title Case يرفع أول حرف من كل كلمة، Sentence Case يرفع أول حرف من كل جملة."],
      en: ["Case converters clean up text and headings.",
            "Title Case capitalizes every word; Sentence Case capitalizes each sentence."]
    },
    faq: [], related: ["word-counter", "json-formatter", "base64"]
  }
];

export const CATEGORIES = [
  { id: "all", label: "cat.all" },
  { id: "dev", label: "cat.dev" },
  { id: "encode", label: "cat.encode" },
  { id: "text", label: "cat.text" },
  { id: "security", label: "cat.security" },
  { id: "color", label: "cat.color" }
];

export function getTool(slug) { return TOOLS.find(t => t.slug === slug); }