/**
 * DouNest v3 — FAQ data (pure data module)
 * ----------------------------------------------------------
 * Single source of truth for the /faq/ page:
 *  - build.mjs imports it to generate the static SEO landing page
 *    (with FAQPage JSON-LD schema).
 *  - app.js imports it to render the FAQ view inside the SPA.
 *
 * Questions target the highest-volume real search queries in the
 * file-tools space ("كيف أحول", "كيف أضغط", "كيف أزيل الخلفية"...).
 * Answers are written to be self-contained so Google can surface
 * them as rich results.
 */

export const FAQ_CATS = {
  convert: { ar: "التحويل بين الصيغ", en: "Format Conversion" },
  images: { ar: "معالجة الصور", en: "Image Editing" },
  pdf: { ar: "ملفات PDF", en: "PDF Files" },
  privacy: { ar: "الخصوصية والأمان", en: "Privacy & Security" }
};

export const FAQ = [  {
    cat: "convert",
    q: { ar: "كيف أحوّل صورة إلى ملف PDF على الهاتف؟", en: "How do I convert an image to a PDF on my phone?" },
    a: {
      ar: "افتح أداة «صورة إلى PDF» في DouNest من متصفح هاتفك، اختر الصور من معرض الصور (يمكن اختيار أكثر من صورة)، رتّبها بالترتيب الذي تريده، ثم اضغط «تحويل». سيُنشأ ملف PDF واحد يُنزَّل مباشرة إلى جهازك. العملية تتم داخل المتصفح بالكامل ولا تُرفع صورك إلى أي خادم، لذا فهي أسرع وأكثر خصوصية من المواقع التقليدية.",
      en: "Open the Image to PDF tool in DouNest from your mobile browser, pick images from your gallery (multiple allowed), arrange their order, then press Convert. A single PDF is generated and downloaded right on your device. Everything happens inside the browser — your photos are never uploaded to any server."
    }
  },
  {
    cat: "convert",
    q: { ar: "كيف أضغط ملف PDF وتصغير حجمه دون فقدان الجودة؟", en: "How can I compress a PDF without losing quality?" },
    a: {
      ar: "استخدم أداة «ضغط PDF» في DouNest: اختر الملف وحدد مستوى الضغط المناسب (منخفض للجودة العالية، مرتفع لحجم أصغر)، ثم نزّل النسخة المضغوطة. الضغط يتم بمعالجة الصور والبيانات الزائدة داخل المتصفح. إن كان ملفك يحتوي صوراً كبيرة فسيوفّر الضغط حجماً كبيراً مع الحفاظ على وضوح النص.",
      en: "Use the Compress PDF tool in DouNest: pick your file, choose a compression level (low for higher quality, high for smaller size), then download the result. Images and redundant data are re-encoded right inside the browser. Text stays sharp while heavy images shrink dramatically."
    }
  },
  {
    cat: "convert",
    q: { ar: "كيف أفتح ملف HEIC من الآيفون وأحوّله إلى JPG؟", en: "How do I open an iPhone HEIC file and convert it to JPG?" },
    a: {
      ar: "صيغة HEIC هي الصيغة الافتراضية لصور الآيفون الحديثة ولا تُفتح على كثير من الأجهزة. الحل: افتح أداة «تحويل HEIC إلى JPG» في DouNest واسحب الصور أو اخترها، وستحصل على نسخ JPG متوافقة مع جميع الأجهزة خلال ثوانٍ — دون برامج ودون رفع الصور إلى أي موقع.",
      en: "HEIC is the default photo format on modern iPhones and many devices can't open it. Solution: open the HEIC to JPG tool in DouNest, drop or pick your photos, and get universally compatible JPG copies in seconds — no software, no uploads."
    }
  },
  {
    cat: "convert",
    q: { ar: "ما الفرق بين JPG و PNG و WebP وأي صيغة أختار؟", en: "What is the difference between JPG, PNG and WebP?" },
    a: {
      ar: "JPG مناسب للصور الفوتوغرافية (حجم صغير، بلا شفافية). PNG يحافظ على الحواف الحادة ويدعم الشفافية فالمثالي للشعارات ولقطات الشاشة. WebP صيغة حديثة تجمع بين حجم أصغر من JPG وشفافية PNG وتدعمه كل المتصفحات الحديثة. استخدم أداة «محوّل الصور» في DouNest للتحويل بينها فوراً داخل متصفحك.",
      en: "JPG suits photos (small size, no transparency). PNG keeps sharp edges and supports transparency — ideal for logos and screenshots. WebP is the modern format: smaller than JPG, supports transparency like PNG, and works in all modern browsers. Use the Image Converter tool in DouNest to switch between them instantly."
    }
  },
  {
    cat: "convert",
    q: { ar: "كيف أحوّل ملف Excel إلى CSV أو JSON؟", en: "How do I convert Excel to CSV or JSON?" },
    a: {
      ar: "افتح أداة «Excel إلى CSV» أو «Excel إلى JSON» في DouNest، واختر ملف XLSX أو XLS، فتُعرض الأوراق المتاحة لاختيار الورقة المطلوبة، ثم نزّل الناتج. التحويل يتم محلياً عبر مكتبة SheetJS داخل متصفحك، فبيانات جداولك — وقد تكون حساسة — لا تغادر جهازك أبداً.",
      en: "Open the Excel to CSV or Excel to JSON tool in DouNest, pick your XLSX/XLS file, choose the sheet, and download the result. Powered by SheetJS running locally in your browser, so even sensitive spreadsheet data never leaves your device."
    }
  },
  {
    cat: "convert",
    q: { ar: "كيف أحوّل مستند Word إلى PDF مجاناً؟", en: "How do I convert a Word document to PDF for free?" },
    a: {
      ar: "استخدم أداة «Word إلى PDF» في DouNest: اختر ملف .docx وسيُحوَّل محتواه إلى صفحة منسّقة، ثم تفتح نافذة الطباعة فتختار «الحفظ كـ PDF». لا حد لعدد الملفات ولا علامات مائية ولا تسجيل — عكس معظم المواقع التي تضع قيوداً على النسخة المجانية.",
      en: "Use the Word to PDF tool in DouNest: pick your .docx, its content is rendered into a formatted page, then the print dialog opens — choose Save as PDF. No limits, no watermarks, no sign-up, unlike most freemium converters."
    }
  },
  {
    cat: "images",
    q: { ar: "كيف أزيل خلفية الصورة مجاناً دون رفعها إلى الإنترنت؟", en: "How do I remove an image background for free without uploading it?" },
    a: {
      ar: "أداة «إزالة خلفية الصورة» في DouNest تشغّل نموذج ذكاء اصطناعي مفتوح المصدر داخل متصفحك مباشرة: اختر الصورة وانتظر ثوانٍ حتى تُعزل الخلفية تلقائياً، ثم نزّل الصورة بخلفية شفافة (PNG). لأول مرة فقط يُحمَّل النموذج (نحو 40 ميغابايت) ثم يُخزَّن مؤقتاً للاستخدام اللاحق. صورك الشخصية لا تُرسل إلى أي خادم على الإطلاق.",
      en: "The Remove Background tool in DouNest runs an open-source AI model directly in your browser: pick an image, wait a few seconds for automatic subject isolation, then download a transparent PNG. The model (~40MB) downloads only on first use and is cached afterwards. Your photos never touch any server."
    }
  },
  {
    cat: "images",
    q: { ar: "كيف أستخرج النص من صورة (OCR) بالعربية؟", en: "How do I extract text from an image (OCR) in Arabic?" },
    a: {
      ar: "افتح أداة «استخراج نص من صورة» في DouNest، اختر الصورة (لقطة شاشة أو صورة مستند)، وحدد اللغة: العربية أو الإنجليزية أو معاً، ثم اضغط استخراج. يعتمد المحرك على Tesseract مفتوح المصدر ويدعم أكثر من 100 لغة. بعد الاستخراج يمكنك نسخ النص أو تنزيله كملف نصي.",
      en: "Open the Image to Text (OCR) tool in DouNest, pick your image (screenshot or document photo), choose the language — Arabic, English, or both — and press Extract. The engine is the open-source Tesseract OCR supporting 100+ languages. Copy the result or download it as a text file."
    }
  },
  {
    cat: "images",
    q: { ar: "كيف أصغّر حجم الصور لإرسالها أو رفعها بسرعة؟", en: "How do I shrink image sizes for faster sharing or uploads?" },
    a: {
      ar: "لديك أختاران في DouNest: أداة «ضغط الصور» تقلل الحجم بضبط جودة الضغط، وأداة «تحجيم الصور» تغيّر الأبعاد نفسها (بالعرض أو نسبة مئوية) مع الحفاظ على التناسب. كلاهما يدعم التحويل إلى JPG أو PNG أو WebP، ويعملان دفعة واحدة على عدة صور داخل متصفحك.",
      en: "Two options in DouNest: Image Compressor reduces file size via quality tuning, and Image Resizer changes actual dimensions (by width or percentage) while keeping the aspect ratio. Both support JPG, PNG and WebP output and handle batches of images locally in your browser."
    }
  },
  {
    cat: "images",
    q: { ar: "كيف أقرأ محتوى رمز QR من صورة؟", en: "How do I read a QR code from an image?" },
    a: {
      ar: "افتح أداة «قارئ QR من صورة» في DouNest واختر الصورة التي تحتوي الرمز — لقطة شاشة أو صورة من الكاميرا — وسيُستخرج محتوى الرمز فوراً: رابط أو نص أو رقم هاتف، مع إمكانية نسخه. لا تحتاج لتطبيق خارجي ولا لكاميرا مباشرة، ويفيد في فحص الروابط قبل فتحها.",
      en: "Open the QR Reader (from image) tool in DouNest and pick any picture containing a code — a screenshot or camera photo. The content (URL, text, phone number) is extracted instantly and can be copied. No external app, no live camera needed — great for inspecting links before opening them."
    }
  },
  {
    cat: "pdf",
    q: { ar: "كيف أدمج عدة ملفات PDF في ملف واحد؟", en: "How do I merge multiple PDF files into one?" },
    a: {
      ar: "استخدم أداة «دمج PDF» في DouNest: اختر الملفات (اثنان أو أكثر)، رتّبها بالترتيب المطلوب بزرَّي التقديم والتأخير، ثم اضغط دمج. يُنزَّل ملف واحد موحَّد بترتيب الصفحات الصحيح. تعتمد الأداة على مكتبة pdf-lib مفتوحة المصدر وتعمل محلياً بالكامل.",
      en: "Use the Merge PDF tool in DouNest: pick two or more files, arrange their order with the move buttons, then press Merge. One combined PDF is downloaded with pages in the right order. Powered by the open-source pdf-lib library, fully local."
    }
  },
  {
    cat: "pdf",
    q: { ar: "كيف أقسّم ملف PDF أو أستخرج صفحات معينة منه؟", en: "How do I split a PDF or extract specific pages?" },
    a: {
      ar: "افتح أداة «تقسيم PDF» في DouNest، واكتب نطاقات الصفحات بصيغة مثل: 1-3,5,8-10. يمكنك اختيار مخرج واحد يجمع الصفحات المحددة، أو فصل كل صفحة في ملف مستقل (تُنزَّل داخل ملف ZIP واحد). مفيد لاستخراج فصل من كتاب أو إرسال جزء من عقد فقط.",
      en: "Open the Split PDF tool in DouNest and type page ranges like 1-3,5,8-10. Choose a single output with the selected pages, or split every page into its own file (delivered inside one ZIP). Perfect for extracting a book chapter or sharing just part of a contract."
    }
  },
  {
    cat: "pdf",
    q: { ar: "كيف أحوّل PDF إلى صور JPG؟", en: "How do I convert a PDF to JPG images?" },
    a: {
      ar: "استخدم أداة «PDF إلى صور» في DouNest: اختر الملف وسيُحوَّل كل صفحة إلى صورة JPG بجودة قابلة للضبط. صفحة واحدة تُنزَّل مباشرة، أما متعدد الصفحات فيُجمَّع في ملف ZIP. يعتمد التحويل على pdf.js من Mozilla ويعمل داخل متصفحك دون رفع الملف.",
      en: "Use the PDF to Images tool in DouNest: pick a file and every page is rendered to a JPG with adjustable quality. A single page downloads directly; multiple pages arrive as one ZIP. Built on Mozilla's pdf.js, running entirely in your browser."
    }
  },
  {
    cat: "pdf",
    q: { ar: "كيف أدوّر صفحات ملف PDF التي تظهر جانبية؟", en: "How do I rotate pages in a PDF that show sideways?" },
    a: {
      ar: "افتح أداة «تدوير PDF» في DouNest، اختر الملف وحدد زاوية التدوير (90 أو 180 أو 270 درجة) ويمكنك تحديد نطاق صفحات معين إن أردت، ثم نزّل النسخة المصححة. يُحفظ التدوير بشكل دائم في الملف فتظهر الصفحات مستقيمة على أي جهاز.",
      en: "Open the Rotate PDF tool in DouNest, choose the file and the angle (90, 180 or 270 degrees), optionally limit it to specific page ranges, then download the fixed copy. Rotation is saved permanently into the file so pages display upright everywhere."
    }
  },
  {
    cat: "pdf",
    q: { ar: "كيف أضغط عدة ملفات في أرشيف ZIP واحد؟", en: "How do I pack several files into one ZIP archive?" },
    a: {
      ar: "استخدم أداة «ضغط ملفات ZIP» في DouNest: اختر أي عدد من الملفات من أي نوع (صور، مستندات، ملفات PDF)، وحدد اسم الأرشيف إن أردت، وستحصل على ملف ZIP واحد. التنفيذ يتم عبر مكتبة JSZip داخل المتصفح — مفيد جداً على الهاتف حيث إنشاء ZIP أصعب.",
      en: "Use the ZIP Files tool in DouNest: pick any number of files of any type (images, documents, PDFs), optionally name the archive, and get a single ZIP. Powered by JSZip inside your browser — especially handy on phones where creating archives is usually hard."
    }
  },
  {
    cat: "privacy",
    q: { ar: "هل مواقع تحويل الملفات أونلاين آمنة؟ ما خطر رفع الملفات؟", en: "Are online file converter websites safe? What is the risk of uploading files?" },
    a: {
      ar: "معظم مواقع التحويل التقليدية ترفع ملفاتك إلى خوادمها للمعالجة، ما يعني أن مستنداتك وصفورك الشخصية تمر عبر أجهزة غريبة وقد تُحفظ فيها لفترة، وتكون عرضة للاعتراض على الشبكات العامة. نهج DouNest مختلف: كل الأدوات تنفّذ داخل متصفحك بتقنية WebAssembly/JavaScript، فلا يخرج أي بايت من ملفاتك من جهازك أصلاً. يمكنك التحقق حتى من قطع الاتصال بالإنترنت بعد فتح الصفحة والأدوات ستعمل.",
      en: "Most traditional converter sites upload your files to their servers for processing — your documents and personal photos pass through third-party machines where they may be retained, and can be intercepted on public networks. DouNest takes a different approach: every tool runs inside your browser via JavaScript/WebAssembly, so not a single byte of your files ever leaves your device. You can even disconnect from the internet after loading the page and the tools keep working."
    }
  },
  {
    cat: "privacy",
    q: { ar: "هل تعمل أدوات DouNest بدون إنترنت؟", en: "Do DouNest tools work offline?" },
    a: {
      ar: "نعم. الموقع تطبيق ويب تقدمي (PWA): بعد أول زيارة تُخزَّن الأدوات في ذاكرة جهازك، ويمكنك تثبيته كتطبيق من قائمة المتصفح ثم استخدامه دون اتصال. أما الأدوات التي تعتمد مكتبات ضخمة قابلة للتنزيل — مثل إزالة الخلفية وOCR — فتحتاج اتصالاً في أول استخدام فقط لتنزيل النموذج، ثم تعمل دون اتصال بعده.",
      en: "Yes. DouNest is a Progressive Web App (PWA): after your first visit the tools are cached on your device and you can install it as an app from your browser menu and use it offline. Tools relying on large downloadable libraries — like background removal and OCR — need a connection only on first use to fetch the model, then work offline."
    }
  },
  {
    cat: "privacy",
    q: { ar: "هل استخدام DouNest مجاني فعلاً؟ وما المقابل؟", en: "Is DouNest really free? What's the catch?" },
    a: {
      ar: "نعم، جميع الأدوات مجانية بالكامل وبلا حدود يومية أو قيود حجم — لأنها تعمل على جهازك فلا نتكلم تكاليف خوادم أو معالجة. تموّل الموقع من إعلانات غير مزعجة وروابط تابعة مُفصح عنها بوضوح في صفحتي «دليل AI» و«أدوات نادرة»، وزر دعم اختياري. لا تسجيل ولا بريد إلكتروني ولا علامات مائية.",
      en: "Yes — every tool is completely free with no daily limits or size caps, because processing happens on your device and costs us no server time. The site is funded by unobtrusive ads, clearly disclosed affiliate links (AI Directory and Rare Tools pages), and an optional support button. No sign-up, no email, no watermarks."
    }
  },
  {
    cat: "convert",
    q: { ar: "كيف أستخرج جدول من PDF إلى Excel؟", en: "How do I extract a table from PDF into Excel?" },
    a: {
      ar: "المسار الأسرع: حوّل صفحات PDF إلى صور، أو إن كان نص PDF حقيقياً (غير ممسوح) فاستخرج النص عبر أداة «PDF إلى نص» ثم نظّم البيانات، أو استخدم أداة OCR لاستخراج أرقام من مستند ممسوح ضوئياً ثم الصقها في أداة «CSV إلى Excel» لتظهر كجدول Excel جاهز للتنزيل بصيغة XLSX.",
      en: "Fastest path: if your PDF has real text (not scanned), extract it with the PDF to Text tool; if it's scanned, run it through the OCR tool. Paste the result into the CSV to Excel tool to get a clean table you can download as XLSX."
    }
  },
  {
    cat: "privacy",
    q: { ar: "أين تُعالَج ملفاتي؟ وهل تحتفظون بنسخ منها؟", en: "Where are my files processed? Do you keep copies?" },
    a: {
      ar: "تُعالَج جميع الملفات محلياً في ذاكرة المتصفح على جهازك عبر JavaScript وWebAssembly، ولا نحتفظ بأي نسخة لأن الملفات أبداً لا تصل إلينا — لا توجد خوادم تستقبلها أصلاً. البيانات الوحيدة المحفوظة هي تفضيلاتك (اللغة والثيم والمفضلة) في ذاكرة جهازك نفسها، والتحليلات المجهولة إن وافقت عليها في ملف config قابل للتعطيل.",
      en: "All files are processed locally in your browser's memory via JavaScript and WebAssembly. We keep no copies because your files never reach us — there is no server receiving them in the first place. The only data stored is your preferences (language, theme, favorites) on your own device, plus optional anonymous analytics you can disable in config."
    }
  }
];

export function getFAQ() { return FAQ; }
