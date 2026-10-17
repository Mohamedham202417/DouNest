/** DouNest v6 — carefully scoped local-first conversion tools. */
export const TOOL_CONTENT_V6 = {
  "image-to-base64": {
    usage: {
      ar: ["اختر صورة من جهازك بصيغة شائعة مثل PNG أو JPEG أو WebP.", "اختر إخراج Base64 خاماً إذا كانت وجهتك تتوقع بايتات مرمّزة، أو Data URL إذا كانت تحتاج بادئة data:image/...;base64.", "اضغط التحويل، ثم انسخ النص الناتج واختبره في التطبيق أو الصفحة التي ستستخدمه فيها."],
      en: ["Choose a local image in a common format such as PNG, JPEG, or WebP.", "Choose raw Base64 when the destination expects encoded bytes, or a Data URL when it needs the data:image/...;base64 prefix.", "Convert, copy the result, and test it in the page or application that will consume it."]
    },
    explanation: {
      ar: ["Base64 طريقة لتمثيل البيانات الثنائية بأحرف نصية. لا تحوّل صيغة الصورة نفسها ولا تضغطها؛ بل ينتج عنها نص أطول من الملف الأصلي، ولذلك قد لا تكون مناسبة للصور الكبيرة أو صفحات الويب التي تحتوي على صور كثيرة.", "استخدم Base64 الخام مع واجهة برمجية تتوقع سلسلة مرمّزة فقط. واستخدم Data URL عند تضمين الصورة في HTML أو CSS أو موضع يقبل عنوان بيانات كاملاً. يتضمن Data URL نوع MIME الذي يقدمه المتصفح.", "تقرأ الأداة الملف محلياً بواجهة File API ولا ترفعه إلى DouNest. حد 8 MiB مقصود لتقليل ضغط الذاكرة، لكن قد يستهلك النص الناتج مساحة كبيرة عند نسخه أو تضمينه. لا تضع بيانات خاصة في وجهة عامة."],
      en: ["Base64 represents binary bytes using text characters. It does not change the image format or compress the picture; the resulting text is larger than the original file, so it may be unsuitable for large images or pages containing many embedded images.", "Use raw Base64 with an API that expects only the encoded string. Use a Data URL when embedding an image in HTML, CSS, or another field that accepts a complete data URL. Its MIME type comes from the browser-provided file type.", "The tool reads the file with the browser File API and does not upload it to DouNest. The 8 MiB limit helps control memory use, but the output can still occupy substantial space when copied or embedded. Avoid placing private data in a public destination."]
    },
    faq: [
      { q: { ar: "هل Base64 يقلل حجم الصورة؟", en: "Does Base64 reduce image size?" }, a: { ar: "لا. الترميز ليس ضغطاً، وغالباً يكون النص أكبر من الملف الثنائي. استخدم أداة ضغط صور إذا كان هدفك تقليل الحجم.", en: "No. Encoding is not compression, and the text is usually larger than the binary file. Use an image compressor if your goal is to reduce size." } },
      { q: { ar: "ما الفرق بين Base64 وData URL؟", en: "What is the difference between Base64 and a Data URL?" }, a: { ar: "Base64 هو النص المرمّز وحده؛ أما Data URL فيضيف بادئة تتضمن نوع المحتوى مثل data:image/png;base64,.", en: "Base64 is the encoded text alone. A Data URL adds a prefix containing the media type, such as data:image/png;base64,." } }
    ],
    tags: ["image to base64", "تحويل صورة إلى Base64", "data URL", "encode image locally"]
  },
  "xml-formatter": {
    usage: {
      ar: ["الصق مستند XML مكتمل الوسوم في مربع الإدخال.", "اختر تنسيق XML؛ يتحقق المتصفح من الصياغة ويرتب العناصر المتداخلة.", "إذا ظهر خطأ، راجع بداية الوسم ونهايته والاقتباسات والمحارف الخاصة. انسخ الناتج بعد التحقق."],
      en: ["Paste a well-formed XML document into the input.", "Choose Format XML; the browser checks the markup and indents nested elements.", "If an error appears, check opening and closing tags, quotes, and special characters. Copy the result after review."]
    },
    explanation: {
      ar: ["يساعد التنسيق المقروء على فهم شجرة XML واكتشاف عناصر مفقودة أو سمات غير صحيحة. لا يغير المنسق أسماء العناصر أو قيم السمات عمداً، لكنه قد يطبع المساحات الاسمية بطريقة تختلف قليلاً حسب المتصفح.", "العناصر التي تحتوي على نص متداخل مع عناصر أخرى تُسلسل دون إضافة فواصل أسطر داخل النص؛ فالمسافات هناك قد تكون جزءاً من القيمة. أما الإدخال غير السليم فيعرض خطأ بدلاً من إخراج XML غير مكتمل.", "لأسباب السلامة والحد من التحميل، يرفض المنسق DTD وتعريفات الكيانات ويقبل نصاً حتى 1 MiB. لا يحمّل ملف XML إلى خادم ولا ينفذ محتوى XML."],
      en: ["Readable formatting makes the XML tree easier to inspect and can reveal missing elements or malformed attributes. The formatter does not intentionally change element names or attribute values, though namespace serialization may vary slightly by browser.", "Elements that mix text with nested elements are serialized without inserted line breaks inside their content because whitespace can be part of the value. Malformed input produces an error instead of a partial document.", "For safety and resource limits, DTD and entity declarations are rejected and input is limited to 1 MiB. XML is not uploaded to a server, and XML content is not executed."]
    },
    faq: [
      { q: { ar: "لماذا يرفض المنسق ملفاً يحتوي على DOCTYPE؟", en: "Why does the formatter reject a document with a DOCTYPE?" }, a: { ar: "يرفض هذا الإصدار DTD والكيانات الخارجية كإجراء احترازي؛ احذف الإعلان فقط إذا كنت تفهم أثره وتستطيع التحقق من المستند الناتج.", en: "This version rejects DTD and external entities as a precaution. Remove the declaration only if you understand its effect and can validate the resulting document." } },
      { q: { ar: "هل التنسيق يغير بيانات XML؟", en: "Does formatting change XML data?" }, a: { ar: "قد يعيد التسلسل ترتيب المسافات أو شكل المساحات الاسمية، لذلك لا تستخدم إعادة التنسيق كتحويل دلالي. قارِن الناتج بمخطط XML أو اختبره في النظام المستهدف.", en: "Serialization can normalize whitespace or namespace presentation, so do not treat formatting as a semantic conversion. Compare the output with an XML schema or test it in the target system." } }
    ],
    tags: ["XML formatter", "تنسيق XML", "XML pretty print", "XML validation"]
  },
  "html-to-markdown": {
    usage: {
      ar: ["الصق مقتطف HTML أو الشيفرة التي تريد نقلها إلى محرر Markdown.", "حوّل النص وراجع بنية العناوين والقوائم والجداول والروابط.", "انسخ الناتج وعدّل التنسيق أو الروابط يدوياً إذا كان HTML الأصلي يستخدم تخطيطاً معقداً."],
      en: ["Paste the HTML fragment or markup you want to move into a Markdown editor.", "Convert it and review heading, list, table, and link structure.", "Copy the result and adjust formatting or links manually if the source HTML uses a complex layout."]
    },
    explanation: {
      ar: ["يحوّل المحول العناصر الشائعة إلى صياغات Markdown: العناوين والفقرات والتأكيد والاقتباسات والقوائم والجداول وفواصل الأسطر. لا يستطيع Markdown تمثيل كل تفاصيل CSS أو التخطيطات المخصصة، لذلك قد تختلف النتيجة بصرياً عن الصفحة الأصلية.", "تُحلل الشيفرة داخل DOM غير نشط في المتصفح ولا تُنفّذ عناصر script. لا تُعرض النتيجة كـ HTML؛ بل كنص داخل حقل، وتُستبعد روابط مثل javascript: ولا تتحول إلى روابط قابلة للنقر.", "تقتصر المدخلات على 1 MiB. راجع الروابط المطلقة وبيانات الصور قبل نشر Markdown، خصوصاً إذا كان المحتوى سينتقل إلى مستودع أو نظام عام."],
      en: ["The converter maps common elements to Markdown syntax: headings, paragraphs, emphasis, quotes, lists, tables, and line breaks. Markdown cannot represent every CSS detail or custom layout, so the visual result may differ from the source page.", "Markup is parsed in an inert browser DOM and script elements are not executed. The result is never rendered as HTML; it is placed in a text field, and links such as javascript: are omitted rather than made clickable.", "Input is limited to 1 MiB. Review absolute links and image references before publishing the Markdown, especially when moving content into a repository or public system."]
    },
    faq: [
      { q: { ar: "هل يحول المحول تصميم CSS إلى Markdown؟", en: "Does the converter turn CSS styling into Markdown?" }, a: { ar: "لا. Markdown يصف المحتوى والبنية الأساسية ولا يمثل معظم التخطيطات أو الأنماط. قد تحتاج إلى تحرير الناتج يدوياً.", en: "No. Markdown represents content and basic structure, not most layouts or styling. You may need to edit the output manually." } },
      { q: { ar: "هل تُنفّذ الشيفرات الموجودة في HTML؟", en: "Is code embedded in the HTML executed?" }, a: { ar: "لا. يُحلل المحتوى في DOM غير نشط، وتُتجاهل عناصر script وstyle ومحتوى التضمين النشط.", en: "No. Content is parsed in an inert DOM, and script, style, and active embedded content are ignored." } }
    ],
    tags: ["HTML to Markdown", "تحويل HTML إلى Markdown", "HTML converter", "Markdown converter"]
  }
};
