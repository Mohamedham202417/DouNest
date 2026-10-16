/**
 * Curated bilingual guidance shared by static SEO pages and interactive center routes.
 * Keep capabilities and limitations explicit; never promise lossless conversion unless verified.
 */
export const CENTER_CONTENT = {
  pdf: {
    ar: {
      intro: "اختر المهمة أولاً ثم حمّل الملفات المناسبة. تظل الملفات على جهازك أثناء المعالجة الأساسية، لكن بعض العمليات تعيد إنشاء الصفحات كصور وقد تفقد النص القابل للتحديد؛ احتفظ دائماً بالأصل وافحص الناتج قبل مشاركته.",
      how: "كيف تستخدم مركز PDF",
      steps: ["اختر عملية PDF من الأزرار أو افتح أداة مستقلة إذا كنت تريد رابطاً مباشراً للمهمة.", "أضف ملفاً واحداً أو أكثر بحسب العملية؛ يمكن ترتيب الملفات قبل دمجها، وتظهر الإعدادات الخاصة بعد اختيار المهمة.", "نفّذ العملية، ثم افتح الملف الناتج وتحقق من ترتيب الصفحات والروابط والنص والجودة قبل اعتماد النسخة."],
      sections: [
        { h: "ماذا يمكنك إنجازه؟", p: "يدعم المركز ضغطاً بصرياً قابلاً للضبط، ودمج الملفات، وتقسيم PDF إلى صفحات منفردة، وتدوير الصفحات، وتحويل الصفحات إلى صور، واستخراج النص، وإنشاء PDF من الصور. تتوفر أيضاً أدوات لترتيب الصفحات وحذفها، وإضافة علامة مائية أو أرقام صفحات." },
        { h: "تنبيه مهم حول الضغط والتحويل", p: "طريقة الضغط المعتمدة هنا تعيد رسم كل صفحة كصورة JPEG؛ لذلك قد لا يبقى النص قابلاً للبحث أو النسخ، وقد تتغير الروابط والعناصر التفاعلية. والضغط ليس مضموناً أن يقلل كل ملف: ملفات النصوص قد تكبر بعد تحويلها إلى صور. اختبر إعدادات الدقة والجودة ولا تستبدل ملفاً أصلياً مهماً." },
        { h: "الخصوصية والتوافق", p: "لا نرسل ملفاتك المختارة إلى خادم DouNest. تُحمّل بعض مكتبات المعالجة عند أول استخدام من شبكة توزيع محتوى؛ يلزم اتصال بالإنترنت للتحميل الأول، كما قد تمنع ملفات PDF المشفرة أو التالفة إتمام العملية." }
      ],
      faq: [
        ["هل يمكن ضغط PDF من دون فقدان النص؟", "أداة الضغط الحالية تعيد رسم الصفحات كصور؛ لا تستخدمها عندما يجب أن يبقى النص قابلاً للبحث أو النسخ. احتفظ بالأصل واستخدم الملف المضغوط فقط بعد فحصه."],
        ["كيف أدمج ملفات PDF بالترتيب الصحيح؟", "أضف الملفات بالترتيب المطلوب؛ وإذا ظهرت أسهم ترتيب الملفات، استخدمها قبل تشغيل الدمج، ثم راجع الملف النهائي."],
        ["هل أستطيع استخراج نص من PDF ممسوح ضوئياً؟", "استخراج النص يعمل عندما يحتوي PDF على طبقة نصية. الصفحات التي هي صور ممسوحة ضوئياً تحتاج OCR، ولا يعني تصديرها إلى TXT أو Word أن OCR قد أُجري."],
        ["هل تُرفع مستنداتي؟", "ملفاتك المختارة تعالج في المتصفح ولا تُرسل إلى خادم DouNest. لا تستخدم جهازاً مشتركاً لمستندات حساسة، وامسح قائمة الملفات بعد الانتهاء."],
        ["لماذا لم يصغر الملف؟", "تحويل صفحات كثيرة إلى صور عالية الدقة قد يزيد الحجم. جرّب دقة أو جودة أقل على نسخة، وقارن الحجم والمقروئية قبل الاحتفاظ بها."]
      ]
    },
    en: {
      intro: "Choose a task, add the appropriate files, and inspect the downloaded result before sharing it. Core processing happens in your browser, but some operations rasterize pages and can remove selectable text; keep the original.",
      how: "How to use the PDF hub",
      steps: ["Choose an operation or open its standalone tool for a direct task page.", "Add one or more files as required. Arrange merge inputs first; operation-specific settings appear after selection.", "Run the task, then verify page order, links, text, and visual quality in the output."],
      sections: [
        { h: "What can you do here?", p: "The hub includes adjustable image-based compression, merge, split-to-pages, rotation, PDF-page-to-image export, text extraction, and image-to-PDF, plus separate tools for organizing pages, adding watermarks, and numbering pages." },
        { h: "Important compression and conversion limits", p: "The current compression method redraws each page as a JPEG image. Text may no longer be searchable or selectable, and links or interactive elements may be lost. Compression is not guaranteed to shrink every file: text-heavy PDFs can grow when rasterized. Test settings on a copy." },
        { h: "Privacy and compatibility", p: "Selected files are not sent to a DouNest server. Some processing libraries are loaded on first use from a content-delivery network, so an initial internet connection is required. Encrypted or damaged PDFs may fail." }
      ],
      faq: [
        ["Can I compress a PDF without losing searchable text?", "The current compressor rasterizes pages. Do not use it when searchable or selectable text must be preserved; keep the original and inspect the output."],
        ["How do I merge PDFs in the right order?", "Add files in the desired order and use the file-order arrows, when shown, before running Merge. Review the resulting document."],
        ["Can this extract text from scanned PDFs?", "Text extraction works when the PDF contains a text layer. Scanned image pages need OCR; exporting to TXT or Word does not perform OCR."],
        ["Are my documents uploaded?", "Selected files are processed in your browser and are not sent to a DouNest server. Avoid sensitive files on shared devices and clear the file list when finished."],
        ["Why did the PDF get larger?", "Many pages rendered at high resolution can increase size. Try lower resolution or quality on a copy and compare readability and file size."]
      ]
    }
  },
  images: {
    ar: {
      intro: "نفّذ مهام الصور الشائعة في مكان واحد: تحويل الصيغة، الضغط، تغيير الأبعاد، إزالة الخلفية، القص والتدوير، وفحص EXIF أو حذفه. اختر النتيجة المطلوبة أولاً، ثم افحص المعاينة أو الملف المحفوظ قبل استخدامه.",
      how: "كيف تستخدم مركز الصور",
      steps: ["أضف صورة أو مجموعة صور بالصيغة المقبولة للعملية؛ تُعرض الملفات وحجومها قبل التنفيذ.", "اختر التحويل أو الجودة أو العرض أو صيغة الإخراج. للمعالجة المجمّعة، راجع ترتيب الصور قبل إنشاء PDF.", "نفّذ العملية وافتح الملفات الناتجة للتحقق من الأبعاد، الشفافية، الألوان، وبيانات الصورة."],
      sections: [
        { h: "تحويل وضغط الصور", p: "يمكن تحويل الصور المدعومة إلى WebP أو JPG، وتقليل أبعادها، أو تصديرها إلى PDF. إعادة الترميز قد تغيّر الألوان أو الشفافية؛ صيغة JPG لا تحتفظ بالشفافية، بينما PNG مناسبة عادةً للرسوم التي تتطلب خلفية شفافة." },
        { h: "القص والاتجاه والبيانات الوصفية", p: "تتيح الأدوات قص الصورة بنسب شائعة، وتدويرها أو قلبها، وقراءة بعض وسوم EXIF من JPEG أو إعادة الترميز لإزالة كثير من بياناتها الوصفية. أزل بيانات الموقع قبل المشاركة إذا كانت الخصوصية مهمة، لكن افحص الملف الناتج ولا تفترض أن كل صيغة تحمل الوسوم نفسها." },
        { h: "إزالة الخلفية والخصوصية", p: "إزالة الخلفية تحتاج تنزيل نموذج معالجة عند الاستخدام الأول وقد تستهلك ذاكرة ووقتاً، خصوصاً للصور الكبيرة. الصورة المختارة لا تُرسل إلى خادم DouNest؛ ملفات النموذج أو مكتبات المعالجة قد تُحمّل من شبكة خارجية." }
      ],
      faq: [
        ["ما أفضل صيغة لضغط صورة للويب؟", "يعتمد الاختيار على الصورة والتوافق المطلوب. جرّب WebP أو JPG للصور الفوتوغرافية وقارن الحجم والجودة؛ استخدم PNG عند الحاجة إلى شفافية أو حواف رسومية دقيقة."],
        ["هل يحافظ JPG على الخلفية الشفافة؟", "لا. عند التصدير إلى JPG تُملأ المساحات الشفافة بخلفية بيضاء. اختر PNG أو WebP إذا كنت تحتاج الشفافية."],
        ["هل إزالة الخلفية ترفع صوري؟", "لا تُرسل الصورة المختارة إلى خادم DouNest؛ قد يُنزّل المتصفح ملفات النموذج من شبكة توصيل خارجية في أول استخدام."],
        ["هل حذف EXIF يزيل موقع الصورة؟", "إعادة ترميز الصورة تزيل كثيراً من البيانات الوصفية في المخرجات المدعومة، لكن افحص الملف الناتج بأداة EXIF قبل نشره إذا كانت إزالة الموقع شرطاً مهماً."],
        ["لماذا لا تعمل صورة HEIC أو AVIF؟", "دعم فك الترميز يختلف باختلاف المتصفح ونظام التشغيل. استخدم أداة HEIC المخصصة أو حوّل الصورة محلياً إلى صيغة مدعومة أولاً."]
      ]
    },
    en: {
      intro: "Handle common image tasks in one place: convert, compress, resize, remove a background, crop or rotate, and inspect or strip metadata. Choose the desired output, then verify the saved result before using it.",
      how: "How to use the image hub",
      steps: ["Add one image or a batch in a format supported by the chosen operation; review the listed files and sizes.", "Choose output format, quality, or width. For batch work, check the image order before creating a PDF.", "Run the operation and inspect dimensions, transparency, colors, and metadata in the exported files."],
      sections: [
        { h: "Convert and compress images", p: "Supported images can be converted to WebP or JPG, resized, or exported to PDF. Re-encoding can change colors or transparency: JPG does not preserve transparency, while PNG is often suitable for transparent graphics." },
        { h: "Crop, orientation, and metadata", p: "Tools crop to common aspect ratios, rotate or flip, read selected EXIF tags from JPEG, or re-encode to remove much of the metadata. Strip location data before sharing when privacy matters, then inspect the output rather than assuming every format carries identical metadata." },
        { h: "Background removal and privacy", p: "Background removal downloads a processing model on first use and can take time or memory, especially for large images. The selected image is not sent to a DouNest server; model files or processing libraries may be downloaded from an external content-delivery network." }
      ],
      faq: [
        ["Which image format is best for web compression?", "It depends on the image and compatibility needs. Compare WebP or JPG for photographs; use PNG when transparency or crisp graphic edges matter."],
        ["Does JPG keep transparency?", "No. Transparent areas are filled with white when exported as JPG. Choose PNG or WebP if you need transparency."],
        ["Are my photos uploaded for background removal?", "The selected image is not sent to a DouNest server. The browser may download model files from a content-delivery network on first use."],
        ["Does stripping EXIF remove photo location?", "Re-encoding removes much of the metadata in supported outputs, but inspect the exported file with an EXIF reader before publication if location removal is essential."],
        ["Why won't my HEIC or AVIF image open?", "Decoder support varies by browser and operating system. Try the dedicated HEIC tool or convert locally to a supported format first."]
      ]
    }
  },
  convert: {
    ar: {
      intro: "اكتشف نوع الملف ثم حوّله إلى صيغة شائعة للعمل أو المشاركة. تختلف التحويلات المدعومة بحسب صيغة المصدر، وقد لا تحتفظ النسخة المحوّلة بالتنسيق أو الخطوط أو الصيغ الحسابية الأصلية.",
      how: "كيف تستخدم مركز التحويل",
      steps: ["أضف ملفاً واحداً؛ تظهر الصيغ التي يدعمها المركز لهذا الامتداد.", "اختر اتجاه التحويل، واضبط الجودة أو الخيارات المتاحة عند ظهورها.", "نزّل الناتج وافتحه في التطبيق المستهدف للتأكد من النصوص والتنسيق والقيم قبل حذف المصدر."],
      sections: [
        { h: "التحويلات المدعومة", p: "تشمل المسارات المتاحة تحويل الصور بين PNG وJPG وWebP، واستخراج النص من PDF أو تصدير صفحاته كصور، وCSV إلى JSON والعكس، وجداول XLSX إلى CSV أو JSON، وDOCX إلى نص، وTXT إلى PDF، إضافةً إلى SVG إلى PNG وJSON ↔ YAML." },
        { h: "ما الذي قد يتغير؟", p: "تحويل PDF إلى Word هنا يستخرج النص وينشئ ملف DOC متوافقاً بصيغة HTML، ولا يحافظ على تخطيط الصفحة الأصلي. كما أن قراءة جداول XLSX مبسطة وقد لا تشمل كل أوراق العمل أو الصيغ والتنسيقات؛ وPDF النصي يدعم الحروف اللاتينية بأفضل شكل. استخدم معاينة للتحقق من النتيجة." },
        { h: "المعالجة والخصوصية", p: "التحويلات الأساسية تتم في المتصفح، ولا تُرسل الملفات المختارة إلى خادم DouNest. قد تُحمّل مكتبات التحويل عند الطلب من شبكة خارجية؛ إذا كانت الشبكة غير متاحة فلن تعمل بعض الصيغ." }
      ],
      faq: [
        ["هل يحافظ تحويل PDF إلى Word على تنسيق الصفحة؟", "لا. المسار الحالي يستخرج النص وينشئ ملف DOC مبنياً على HTML؛ قد لا يحافظ على الأعمدة أو الصور أو التخطيط. راجع المستند وعدّله قبل الاعتماد عليه."],
        ["هل يحوّل PDF الممسوح إلى نص؟", "لا يتضمن مسار PDF إلى TXT OCR؛ يعمل مع طبقة النص الموجودة في PDF. تحتاج الصفحات المصورة إلى أداة OCR منفصلة."],
        ["هل يحافظ تحويل Excel على الصيغ؟", "المسارات الحالية تنقل بيانات الخلايا إلى CSV أو JSON بصورة مبسطة ولا تضمن حفظ الصيغ أو التنسيق أو جميع أوراق المصنف."],
        ["هل تُرفع الملفات إلى الخادم؟", "الملفات المختارة تعالج في المتصفح ولا تُرسل إلى خادم DouNest؛ بعض مكتبات المعالجة تُحمّل من شبكة توصيل محتوى عند الحاجة."],
        ["لماذا لا تظهر صيغة الإخراج التي أريدها؟", "تُعرض فقط التحويلات التي يدعمها المركز لنوع الملف المكتشف. افتح أداة الصيغة المرتبطة أو اختر صيغة مصدر مدعومة."]
      ]
    },
    en: {
      intro: "Detect a file type and convert it to a practical format. Available paths depend on the source format; converted output may not retain original layout, fonts, or formulas.",
      how: "How to use the conversion hub",
      steps: ["Add one file; the hub lists conversions supported for its detected extension.", "Choose a direction and adjust quality or other settings when available.", "Download the output and open it in the target app to verify text, layout, and values before replacing the source."],
      sections: [
        { h: "Supported conversion paths", p: "Available paths include PNG/JPG/WebP image conversion, PDF text extraction or page-image export, CSV ↔ JSON, XLSX to CSV or JSON, DOCX to text, TXT to PDF, SVG to PNG, and JSON ↔ YAML." },
        { h: "What may change?", p: "PDF to Word extracts text into an HTML-based .doc file and does not preserve page layout. XLSX reading is simplified and may omit worksheets, formulas, or formatting; generated text PDFs render Latin characters best. Review converted output before relying on it." },
        { h: "Processing and privacy", p: "Core conversions run in your browser; selected files are not sent to a DouNest server. Some conversion libraries load on demand from a content-delivery network, so those paths need network access." }
      ],
      faq: [
        ["Does PDF-to-Word preserve the original layout?", "No. The current path extracts text into an HTML-based .doc file; columns, images, and layout may not be preserved. Review and edit the document before relying on it."],
        ["Can it OCR a scanned PDF?", "No. PDF-to-TXT reads an existing text layer. Image-only pages need a separate OCR tool."],
        ["Does Excel conversion preserve formulas?", "The current paths move cell data into CSV or JSON in a simplified way and do not guarantee formulas, formatting, or every worksheet."],
        ["Are files uploaded to a server?", "Selected files are processed in your browser and are not sent to a DouNest server; some processing libraries are loaded from a content-delivery network when needed."],
        ["Why is my desired output format missing?", "The hub lists only conversions supported for the detected source type. Open a related format-specific tool or choose a supported source file."]
      ]
    }
  },
  text: {
    ar: {
      intro: "مجموعة أدوات سريعة للكتابة والنصوص: عدّ الكلمات والأحرف، تنظيف القوائم، إنشاء Slug، أو تحويل Markdown إلى HTML. الصق النص، اختر المهمة، وانسخ النتيجة أو نزّلها.",
      how: "طريقة العمل",
      steps: ["الصق النص أو حمّل ملف TXT أو Markdown مدعوماً.", "اختر الإجراء واضبط خياراته، مثل إزالة التكرار أو الفاصل في Slug.", "نفّذ العملية، ثم انسخ النتيجة أو نزّلها وراجعها قبل نشرها."],
      sections: [
        { h: "أدوات النصوص المتاحة", p: "يتضمن المركز إحصاءات النص، وتحويل Markdown إلى HTML، وتنظيف القوائم من الأسطر الفارغة أو المكررة مع خيارات للترتيب، وتوليد Slug مع إمكانية إبقاء الحروف العربية. يمكن فتح أدوات عدّ الكلمات وتغيير حالة الأحرف والنص التجريبي من البطاقات المرتبطة." },
        { h: "نظّف البيانات قبل نشرها", p: "قد يغيّر التنظيف الترتيب أو يحذف عناصر تراها مكررة؛ اختر إعدادات إزالة التكرار والترتيب بعناية. تحويل Markdown إلى HTML ينتج محتوى منظماً، لكن افحص الرابط والوسوم والاقتباسات في التطبيق الذي سيعرض الملف." },
        { h: "الخصوصية", p: "مدخلات النص تعالج داخل المتصفح ولا تُرسل إلى خادم DouNest. لا تستخدم متصفحاً مشتركاً لإدخال أسرار أو بيانات حساسة، وامسح مربع الإدخال عند الانتهاء." }
      ],
      faq: [["هل يُرسل النص إلى خادم؟", "لا، عمليات هذا المركز تعالج النص في المتصفح ولا ترسله إلى خادم DouNest."], ["ما هو Slug؟", "هو الجزء المقروء من رابط الصفحة؛ استخدم كلمات موجزة وافصلها بشرطة، ثم راجع توافقها مع قواعد موقعك."], ["هل يمكن إزالة العناصر المكررة من قائمة؟", "نعم، اختر تنظيف القوائم وفعّل إزالة التكرار؛ يمكنك أيضاً تحديد حساسية حالة الأحرف وطريقة الترتيب."], ["هل يحوّل Markdown إلى HTML آمن؟", "ينشئ المركز HTML من Markdown؛ افحص الناتج قبل إدراجه في موقع، وطبّق سياسات التعقيم الخاصة بمنصتك عند عرض مدخلات غير موثوقة."]]
    },
    en: {
      intro: "A practical text toolkit for word and character counts, list cleanup, URL slugs, and Markdown-to-HTML. Paste or load text, choose a task, then copy or download the result.",
      how: "How to use the text center",
      steps: ["Paste text or load a supported TXT or Markdown file.", "Choose an operation and set options such as deduplication or slug separator.", "Run it, then copy or download and review the result before publishing."],
      sections: [
        { h: "Text tools available", p: "The center includes text statistics, Markdown-to-HTML, list cleanup with duplicate removal and sorting options, and slug generation with optional Arabic letters. Linked standalone pages provide word counts, case conversion, and placeholder text." },
        { h: "Review before publishing", p: "Cleanup can reorder or remove lines you consider duplicates; check the deduplication and sorting settings. Markdown-to-HTML creates structured markup, but review links, tags, and quotations in the application that will display it." },
        { h: "Privacy", p: "Text input is processed in your browser and is not sent to a DouNest server. Avoid entering secrets on shared devices and clear the input when finished." }
      ],
      faq: [["Is my text sent to a server?", "No. This center processes text in your browser and does not send it to a DouNest server."], ["What is a URL slug?", "A readable part of a page URL. Keep it concise, separate words with hyphens, and check your site's URL rules."], ["Can I remove duplicate list entries?", "Yes. Choose list cleanup and enable duplicate removal; you can also choose case sensitivity and sorting."], ["Is Markdown-to-HTML safe?", "The tool produces HTML from Markdown. Review the output and apply your platform's sanitization rules before rendering untrusted content."]]
    }
  },
  dev: {
    ar: {
      intro: "أدوات يومية للمطورين لاختبار JSON، ترميز Base64 وURL، قراءة حمولة JWT، إنشاء Hash وUUID، وتحويل الطوابع الزمنية أو JSON/YAML. اختر الإجراء الصحيح ولا تلصق أسرار الإنتاج في أجهزة لا تثق بها.",
      how: "كيف تستخدم مركز المطورين",
      steps: ["الصق المدخل أو أضف ملف JSON أو YAML مدعوماً.", "اختر العملية واضبط الوضع أو الخوارزمية أو عدد النتائج.", "انسخ المخرجات، ثم تحقّق من الصيغ والقيم داخل بيئة التطوير قبل استخدامها."],
      sections: [
        { h: "تحقق من الصيغة قبل استخدامها", p: "منسق JSON يتحقق من البنية ثم ينسقها أو يصغرها. أدوات Base64 وURL تعكس الترميز وفكّه، وتحويل JSON/YAML مفيد لتبادل البيانات؛ لا يعني نجاح التحليل أن القيم مناسبة لتطبيقك." },
        { h: "JWT وHash: حدود مهمة", p: "فك JWT يعرض الرأس والحمولة فقط ولا يتحقق من التوقيع أو المصدر أو الصلاحية. لا تستخدم هذه النتيجة لاتخاذ قرار مصادقة. Hash هنا يستخدم SHA-1 أو SHA-256 أو SHA-512 للنص؛ لا تستخدم SHA-1 أو هذه الأداة لتخزين كلمات المرور." },
        { h: "بياناتك محلية", p: "تُعالج المدخلات داخل المتصفح ولا تُرسل إلى خادم DouNest. مع ذلك، لا تلصق مفاتيح إنتاج أو رموز وصول في أجهزة عامة أو جلسات متصفح مشتركة." }
      ],
      faq: [["هل فك JWT يتحقق من صحة التوقيع؟", "لا. يعرض المركز الرأس والحمولة فقط؛ لا يتحقق من التوقيع أو جهة الإصدار أو تاريخ الانتهاء."], ["هل SHA-256 مناسب لتخزين كلمات المرور؟", "لا. تخزين كلمات المرور يحتاج خوارزمية مخصصة وبطيئة مثل Argon2id أو bcrypt مع إعداد سليم، وليس hash سريعاً عاماً."], ["هل تغادر شيفرتي أو مدخلاتي المتصفح؟", "لا تُرسل إلى خادم DouNest؛ تجنب مع ذلك لصق أسرار حساسة على أجهزة مشتركة."], ["لماذا يفشل فك Base64؟", "تحقق من أن النص Base64 صالح وأن بيانات UTF-8 مناسبة؛ Base64 ترميز وليس تشفيراً أو حماية للسرية."]]
    },
    en: {
      intro: "Everyday developer utilities for JSON, Base64 and URL encoding, JWT payload inspection, hashes, UUIDs, timestamps, and JSON/YAML conversion. Choose the right operation and do not paste production secrets into untrusted devices.",
      how: "How to use the developer center",
      steps: ["Paste input or add a supported JSON or YAML file.", "Select an operation and adjust its mode, algorithm, or output count.", "Copy the result and validate it in your development environment before use."],
      sections: [
        { h: "Validate syntax before use", p: "The JSON formatter parses data before formatting or minifying it. Base64 and URL utilities encode or decode text; JSON/YAML conversion helps exchange data, but successful parsing does not mean values are valid for your application." },
        { h: "JWT and hashes have limits", p: "JWT decoding displays only the header and payload; it does not verify the signature, issuer, or expiration. Do not use it to make authentication decisions. Hashing here uses SHA-1, SHA-256, or SHA-512 on text; do not use SHA-1 or this tool for password storage." },
        { h: "Your input stays local", p: "Input is processed in the browser and is not sent to a DouNest server. Still avoid pasting production keys or access tokens on public devices or shared browser sessions." }
      ],
      faq: [["Does JWT decoding verify the signature?", "No. It displays the header and payload only; it does not verify the signature, issuer, or expiration."], ["Is SHA-256 suitable for password storage?", "No. Password storage needs a purpose-built slow password-hashing scheme such as Argon2id or bcrypt with sound parameters, not a fast general-purpose hash."], ["Does my input leave the browser?", "It is not sent to a DouNest server; still avoid pasting sensitive secrets on shared devices."], ["Why did Base64 decoding fail?", "Check that the input is valid Base64 and represents decodable UTF-8. Base64 is an encoding, not encryption or confidentiality."]]
    }
  },
  security: {
    ar: {
      intro: "أنشئ كلمة مرور عشوائية باستخدام مولّد المتصفح، وافحص تقديراً أولياً للقوة، أو أنشئ رمز TOTP من سرّك. تعامل مع كلمة المرور أو سر المصادقة بوصفهما بيانات حساسة رغم أن المعالجة محلية.",
      how: "استخدم أدوات الأمان بحذر",
      steps: ["لتوليد كلمة مرور، اختر طولاً ومجموعات المحارف ثم انسخ النتيجة إلى مدير كلمات مرور موثوق.", "لفحص القوة، أدخل كلمة مرور اختبار لا تستخدم كلمة مرورك الفعلية إذا كنت على جهاز غير خاص.", "لـTOTP، أدخل السر من تطبيقك المصدري، طابق مدة الرمز مع إعداد الحساب، ولا تشارك الرمز أو السر."],
      sections: [
        { h: "ما الذي تفعله الأدوات؟", p: "يستخدم مولّد كلمات المرور مولداً عشوائياً تشفيرياً في المتصفح. فاحص القوة تقديري وتعليمي، وليس اختبار اختراق أو ضماناً لعدم التخمين. أداة TOTP تنشئ رمزاً متغيراً اعتماداً على السر والوقت؛ يجب أن تتطابق إعداداتها مع الجهة التي أصدرت السر." },
        { h: "لا تكشف أسرار المصادقة", p: "لا تُرسل القيم إلى خادم DouNest، لكن ابتعد عن أجهزة الآخرين أو تسجيل الشاشة عند إدخال أسرار. لا تستخدم رمزاً مولّداً هنا بديلاً عن تطبيق المصادقة الأساسي لحسابك ما لم تفهم كيفية إدارة السر الاحتياطي." },
        { h: "الخصوصية", p: "المعالجة تتم في المتصفح، وقد تُحمّل مكتبات عامة عند الحاجة في بعض الأدوات. لا يُخزّن المركز كلمة مرورك أو سر TOTP على خادم؛ أزل الإدخال من الصفحة وأغلق التبويب بعد الانتهاء على جهاز مشترك." }
      ],
      faq: [["هل مولّد كلمة المرور آمن؟", "يستخدم عشوائية المتصفح التشفيرية، لكن أمان النتيجة يعتمد أيضاً على طولها، وحفظها في مدير موثوق، وأمن الجهاز والمتصفح."], ["هل تقدير قوة كلمة المرور دقيق؟", "هو تقدير تعليمي مبسط وليس ضماناً لمقاومة الهجمات؛ استخدم كلمة فريدة وطويلة ومديراً موثوقاً للمصادقة متعددة العوامل."], ["هل يُرفع سر TOTP؟", "لا يُرسل إلى خادم DouNest؛ لا تدخله على جهاز أو جلسة لا تثق بها، وتأكد من تطابق إعدادات الوقت والمدة."], ["هل SHA-256 يشفر البيانات؟", "لا. Hash دالة أحادية الاتجاه وليست تشفيراً قابلاً للفك، ولا يصلح hash سريع منفرد لتخزين كلمات المرور."]]
    },
    en: {
      intro: "Generate a random password in the browser, get a rough strength estimate, or calculate a TOTP code from a secret. Treat passwords and authenticator seeds as sensitive even when processing is local.",
      how: "Use security tools carefully",
      steps: ["For a password, choose a length and character sets, then save it in a trusted password manager.", "For a strength estimate, use a test password if you are on a device you do not control.", "For TOTP, enter the seed from its issuer, match the account's period and digits, and never share the code or seed."],
      sections: [
        { h: "What these tools do", p: "The password generator uses the browser's cryptographic random source. The strength checker is a rough educational estimate, not a penetration test or guarantee. TOTP derives a changing code from a secret and time; its settings must match the issuer." },
        { h: "Protect authentication secrets", p: "Values are not sent to a DouNest server, but avoid shared devices and screen recording when entering secrets. Do not replace your primary authenticator workflow unless you understand how the seed and recovery process are managed." },
        { h: "Privacy", p: "Processing happens in the browser; some tools may load public libraries when needed. The hub does not store your password or TOTP secret on a server. Clear the input and close the tab on shared devices." }
      ],
      faq: [["Is the password generator secure?", "It uses the browser's cryptographic random source, but security also depends on length, saving it in a trusted manager, and device security."], ["Is the password-strength score exact?", "It is a rough educational estimate, not a guarantee against attacks. Use a unique long password, a trusted manager, and multifactor authentication."], ["Is my TOTP secret uploaded?", "It is not sent to a DouNest server. Do not enter it on an untrusted device or session, and match the issuer's period and digit settings."], ["Does SHA-256 encrypt data?", "No. A hash is one-way, not reversible encryption, and a fast hash alone is not suitable for password storage."]]
    }
  },
  calculators: {
    ar: {
      intro: "أجرِ حسابات سريعة من المتصفح باستخدام حاسبة العمر وBMI والنسب المئوية ومحوّل الوحدات. راجع الوحدات والمدخلات قبل اعتماد الرقم؛ النتائج التثقيفية ليست بديلاً عن نصيحة متخصصة.",
      how: "طريقة استخدام الحاسبات",
      steps: ["اختر الحاسبة أو محوّل الوحدة المناسب من البطاقات.", "أدخل القيم وتأكد من الوحدات والتاريخ أو الفئة المختارة.", "احسب ثم راجع طريقة التقريب وافهم حدود النتيجة قبل استخدامها في قرار مهم."],
      sections: [
        { h: "الحسابات المتوفرة", p: "يضم المركز حساب العمر، ومؤشر كتلة الجسم، والنسب والتغيرات المئوية، وتحويل وحدات شائعة للطول والوزن والحجم والحرارة. افتح الأداة المنفردة للوصول إلى حقولها وتعليماتها." },
        { h: "فهم النتائج", p: "قد تختلف النتائج قليلاً بسبب التقريب أو طريقة إدخال التاريخ. مؤشر كتلة الجسم رقم فرزي عام لا يشخّص الحالة الصحية، ولا ينبغي استخدامه وحده لاتخاذ قرار طبي. تحقق من العملة أو الوحدة عند نقل نتائج النسب والحسابات." },
        { h: "الخصوصية", p: "تُحسب القيم داخل المتصفح ولا تُرسل إلى خادم DouNest. تجنب الأجهزة المشتركة إذا كانت المدخلات تكشف معلومات شخصية." }
      ],
      faq: [["هل حاسبة BMI تشخّص حالتي الصحية؟", "لا. BMI مقياس فرزي عام ولا يشخّص الصحة بمفرده؛ اطلب تقييماً مناسباً من مختص إذا كان القرار صحياً."], ["كيف أحسب نسبة التغير؟", "استخدم حاسبة النسبة المئوية وأدخل القيمة الأصلية والجديدة؛ راجع إشارة النتيجة لمعرفة الزيادة أو النقصان."], ["هل حاسبة العمر تراعي السنوات الكبيسة؟", "تعتمد النتيجة على تواريخ التقويم التي تدخلها وطريقة تنفيذ الأداة؛ تحقق من تاريخ الميلاد والمنطقة الزمنية عند الحالات القريبة من منتصف الليل."], ["هل تُرسل مدخلاتي؟", "لا، العمليات الحسابية تتم محلياً في متصفحك ولا تُرسل إلى خادم DouNest."]]
    },
    en: {
      intro: "Run quick calculations in your browser with age, BMI, percentage, and unit-conversion tools. Check units and inputs before relying on a result; informational calculations are not professional advice.",
      how: "How to use the calculators",
      steps: ["Choose a calculator or converter from the cards.", "Enter values and confirm units, dates, and selected categories.", "Calculate, review rounding, and understand limitations before using the result for an important decision."],
      sections: [
        { h: "Calculations available", p: "The center links to age, body-mass-index, percentage and percentage-change calculations, and common length, weight, volume, and temperature conversions. Open a standalone tool for its fields and instructions." },
        { h: "Interpreting results", p: "Results may vary slightly because of rounding or date-entry conventions. BMI is a general screening measure, not a diagnosis, and should not be used alone for medical decisions. Check currencies and units when transferring calculated values." },
        { h: "Privacy", p: "Values are calculated in your browser and are not sent to a DouNest server. Avoid shared devices when inputs reveal personal information." }
      ],
      faq: [["Does the BMI calculator diagnose my health?", "No. BMI is a general screening measure and does not diagnose health on its own; consult a qualified professional for health decisions."], ["How do I calculate percentage change?", "Use the percentage calculator with the original and new values; check the sign to distinguish an increase from a decrease."], ["Does the age calculator handle leap years?", "Results depend on the dates entered and the tool's date conventions. Verify the birth date and time zone for dates near midnight."], ["Are my inputs sent to a server?", "No. Calculations run locally in your browser and are not sent to a DouNest server."]]
    }
  }
};

export function centerContentMarkup(center, lang = "ar") {
  const data = CENTER_CONTENT[center]?.[lang] || CENTER_CONTENT[center]?.en;
  if (!data) return "";
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
  return `<section class="section hub-guide" id="center-guide"><p class="hub-guide-intro">${esc(data.intro)}</p><h2>${esc(data.how)}</h2><ol class="hub-steps">${data.steps.map(x => `<li>${esc(x)}</li>`).join("")}</ol>${data.sections.map(x => `<section class="hub-guide-section"><h2>${esc(x.h)}</h2><p>${esc(x.p)}</p></section>`).join("")}<section class="hub-faq"><h2>${lang === "ar" ? "أسئلة شائعة" : "Frequently asked questions"}</h2>${data.faq.map(([q,a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</section></section>`;
}

export function centerFaqSchema(center, lang = "ar", siteRoot = "") {
  const data = CENTER_CONTENT[center]?.[lang] || CENTER_CONTENT[center]?.en;
  if (!data) return null;
  return { "@context":"https://schema.org", "@type":"FAQPage", "mainEntity":data.faq.map(([q,a]) => ({ "@type":"Question", "name":q, "acceptedAnswer":{"@type":"Answer", "text":a} })) };
}
