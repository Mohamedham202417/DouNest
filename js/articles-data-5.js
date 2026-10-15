/**
 * DouNest v4 — SEO content expansion (part 5)
 * Four bilingual, search-intent articles mapped to high-value utility tools.
 */
export const ARTICLES_5 = [
  {
    slug: "excel-to-json-guide",
    title: {
      ar: "تحويل Excel إلى JSON: دليل عملي للمطورين وواجهات API",
      en: "Excel to JSON: A Practical Guide for Developers and APIs"
    },
    excerpt: {
      ar: "تعلّم تحويل ملفات Excel إلى JSON بطريقة صحيحة، اختيار الصف الأول كمفاتيح، التعامل مع الأوراق المتعددة، وتجنب أخطاء الترميز والبيانات الفارغة.",
      en: "Learn how to convert Excel files to JSON correctly, use the first row as keys, handle multiple sheets, and avoid encoding and empty-data problems."
    },
    date: "2026-10-15",
    tags: ["excel", "json", "api", "تحويل-ملفات", "developer"],
    content: {
      ar: `يبدو تحويل Excel إلى JSON بسيطاً، لكنه يصبح مربكاً عندما يحتوي الملف على أكثر من ورقة أو عناوين غير موحّدة أو خلايا فارغة. JSON هو الشكل الذي تتوقعه معظم واجهات API وتطبيقات الويب، لذلك يحتاج المطور إلى تحويل الجدول مع الحفاظ على أسماء الأعمدة وأنواع القيم قدر الإمكان.

## متى تحتاج إلى تحويل Excel إلى JSON؟

يظهر هذا الاحتياج عند استيراد قائمة منتجات إلى متجر، نقل بيانات العملاء إلى نظام جديد، تجهيز ملف أولي لواجهة API، أو تحويل جدول داخلي إلى بيانات تستخدمها JavaScript. إذا كان الملف صغيراً أو حساساً، فالأفضل تنفيذ التحويل محلياً داخل المتصفح بدلاً من رفعه إلى خدمة غير معروفة.

استخدم [أداة Excel إلى JSON](/tools/excel-to-json/) لاختيار ورقة محددة ومعاينة النتيجة قبل تنزيلها. الأداة تدعم وضعين: مصفوفة كائنات مناسبة للـ API، ومصفوفة صفوف تحافظ على شكل الجدول الأصلي.

## الفرق بين وضع الكائنات ووضع الصفوف

في وضع الكائنات يُعامل الصف الأول على أنه أسماء الحقول. فمثلاً يتحول الجدول التالي: "name | price" إلى كائنات مثل { "name": "Keyboard", "price": 25 }. هذا الشكل سهل القراءة في JavaScript وPython وقواعد البيانات.

أما وضع الصفوف فينتج مصفوفة ثنائية الأبعاد تبدأ بالعناوين ثم القيم. هذا الخيار أفضل عندما تكون بعض الأعمدة بلا أسماء أو عندما تريد الحفاظ على ترتيب الأعمدة كما ظهر في Excel. لا تختَر وضع الكائنات قبل التأكد من أن الصف الأول يحتوي عناوين فريدة وواضحة.

## خطوات تنظيف الملف قبل التحويل

1. اجعل لكل عمود اسماً واحداً وفريداً، مثل "product_name" و"price".
2. احذف الصفوف التوضيحية أعلى الجدول؛ يجب أن يبدأ الجدول الحقيقي من الصف الأول.
3. تجنب دمج الخلايا، لأنه لا يمثل حقلاً واضحاً في JSON.
4. راجع التواريخ والأرقام، خصوصاً أرقام الهواتف والرموز البريدية التي قد تفقد أصفارها الافتتاحية.
5. افحص كل ورقة على حدة، ولا تفترض أن الورقة النشطة هي الورقة المطلوبة.

بعد التحويل، الصق الناتج في [منسق JSON](/tools/json-formatter/) للتحقق من الأقواس والأنواع والقراءة. إذا كنت تنقل البيانات إلى CSV أولاً، يمكنك استخدام [Excel إلى CSV](/tools/excel-to-csv/) ثم [CSV إلى JSON](/tools/csv-to-json/) للمقارنة.

## الخصوصية والتحقق من النتيجة

ملف Excel قد يحتوي على أسماء أو أسعار أو بيانات داخلية. قبل استخدام أي خدمة خارجية، تحقق من سياسة الخصوصية ومكان معالجة الملف. أدوات DouNest تعمل محلياً في المتصفح؛ مع ذلك، مكتبة قراءة Excel تُحمّل من CDN عند أول استخدام، لذلك يحتاج التحويل الأول إلى اتصال بالإنترنت.

تحقق من عدد الصفوف قبل وبعد التحويل، وراجع عينة من أول سجل وآخر سجل، ثم اختبر JSON في التطبيق الذي سيستهلكه. وجود JSON صالح نحوياً لا يعني أن أسماء الحقول أو أنواع القيم مناسبة لنظامك.

## خلاصة سريعة

أفضل نتيجة تأتي من جدول نظيف بعناوين فريدة، اختيار وضع الإخراج المناسب، ثم التحقق من JSON قبل دمجه في API. ابدأ بأداة Excel إلى JSON، واستخدم منسق JSON للمراجعة، ولا ترسل ملفاً حساساً إلى خدمة لا تثق بها.`,
      en: `Converting Excel to JSON looks simple until a workbook contains multiple sheets, inconsistent headers, merged cells, or empty values. JSON is the format expected by most APIs and web applications, so a good conversion should preserve column names and value types as reliably as possible.

## When do you need Excel to JSON?

Common cases include importing products into a store, moving customer data into a new system, preparing seed data for an API, or turning an internal spreadsheet into JavaScript data. For a small or sensitive workbook, local browser processing is preferable to uploading it to an unknown service.

Use the [Excel to JSON tool](/tools/excel-to-json/) to choose a sheet and preview the result before downloading it. It supports object-array output for APIs and row-array output when you need to preserve the original table shape.

## Objects versus rows

Objects mode treats the first row as field names. A table such as "name | price" becomes records like { "name": "Keyboard", "price": 25 }. This is convenient in JavaScript, Python, and database import pipelines.

Rows mode returns a two-dimensional array that starts with the header row. Choose it when some columns have no names or when column order must remain exactly as it appeared in Excel. Do not use objects mode until you have confirmed that the first row contains unique, meaningful headers.

## Clean the workbook before conversion

1. Give every column one unique name, such as "product_name" and "price".
2. Remove explanatory rows above the real table.
3. Avoid merged cells because they do not map cleanly to JSON fields.
4. Check dates and numbers, especially phone numbers and postal codes with leading zeroes.
5. Review each worksheet instead of assuming the active sheet is the right one.

After conversion, paste the output into the [JSON Formatter](/tools/json-formatter/) to inspect syntax and structure. If you need a CSV intermediate, compare [Excel to CSV](/tools/excel-to-csv/) with [CSV to JSON](/tools/csv-to-json/).

## Privacy and validation

A workbook can contain names, prices, or internal business data. Check where a third-party service processes files before using it. DouNest tools process files in your browser, although the spreadsheet library is loaded from a CDN on first use, so the initial conversion needs an internet connection.

Compare row counts before and after conversion, inspect the first and last records, and test the JSON in the system that will consume it. Syntactically valid JSON does not guarantee that field names and data types match your API contract.

## Quick conclusion

The most reliable workflow is a clean table with unique headers, the correct output mode, and a validation pass before the JSON enters an API. Start with Excel to JSON, review the output with JSON Formatter, and never upload sensitive workbooks to a service you do not trust.`
    }
  },
  {
    slug: "pdf-to-word-guide",
    title: {
      ar: "تحويل PDF إلى Word: ما الذي ينجح وما الذي لا ينجح؟",
      en: "PDF to Word: What Works, What Fails, and How to Get Better Results"
    },
    excerpt: {
      ar: "دليل عملي لتحويل PDF إلى Word، مع الفرق بين ملفات PDF النصية والممسوحة ضوئياً، والحفاظ على التنسيق والخصوصية.",
      en: "A practical guide to converting PDF to Word, including text PDFs versus scans, formatting limits, and privacy considerations."
    },
    date: "2026-10-15",
    tags: ["pdf", "word", "تحويل-pdf", "documents", "privacy"],
    content: {
      ar: `تحويل PDF إلى Word مفيد عندما تحتاج إلى تعديل نص موجود أو إعادة استخدام محتوى تقرير. لكن النتيجة تعتمد أولاً على نوع ملف PDF: الملف النصي يمكن استخراج نصه عادةً، بينما الملف الممسوح ضوئياً يحتاج إلى OCR وقد لا يحافظ على التصميم الأصلي بالكامل.

## حدّد نوع PDF أولاً

حاول تحديد النص داخل الملف. إذا استطعت تحديد كلمة ونسخها، فغالباً هو PDF نصي ويمكن تحويله بسرعة. إذا كانت كل صفحة صورة واحدة، فأنت أمام ملف ممسوح ضوئياً، وستحتاج إلى [أداة OCR من صورة إلى نص](/tools/ocr-image-to-text/) أو خدمة متخصصة قبل إعادة بناء مستند Word.

## كيف تحصل على نتيجة قابلة للتحرير؟

ابدأ بنسخة من الملف، ثم استخدم [أداة PDF إلى Word](/tools/pdf-to-word/) للملفات النصية البسيطة. بعد التحويل راجع العناوين والجداول والهوامش، لأن PDF مصمم للعرض الثابت وليس لتخزين تخطيط قابل للتحرير. قد تتحول الأعمدة إلى فقرات متتابعة، وقد تحتاج الجداول إلى إعادة ضبط يدوية.

إذا كان هدفك استخراج النص فقط، فـ [PDF إلى TXT](/tools/pdf-to-txt/) قد يعطي نتيجة أنظف من محاولة الحفاظ على تنسيق معقد. ولتحويل صفحة مصورة إلى مستند، استخرج النص أولاً ثم نسّقه في Word.

## أخطاء شائعة

أكبر خطأ هو توقع نسخة مطابقة مئة بالمئة. الخطوط غير المثبتة، الأعمدة المتعددة، الحواشي، النماذج، واللغة العربية المختلطة بالإنجليزية قد تغير ترتيب المحتوى. راجع الأرقام والتواريخ بعناية، خصوصاً في العقود والفواتير.

لا تحفظ الملف الناتج فوق النسخة الأصلية. احتفظ بالـ PDF كمرجع، وسمِّ النسخة القابلة للتحرير بوضوح، ثم افتحها على جهاز آخر للتأكد من عدم وجود خطوط مفقودة أو صفحات ناقصة.

## الخصوصية

المستندات القانونية والمالية والطبية لا ينبغي رفعها إلى محول عشوائي. أدوات DouNest تعالج الملفات محلياً في المتصفح عندما تكون المكتبات المطلوبة متاحة، ولا تحتاج إلى إنشاء حساب. افحص دائماً ما إذا كانت الأداة تعتمد على مكتبة خارجية تُحمّل عند الاستخدام الأول.

## الخلاصة

PDF النصي هو أفضل حالة للتحويل، أما PDF المصور فيحتاج OCR ومراجعة بشرية. اختر أداة PDF إلى Word للملفات البسيطة، وPDF إلى TXT عندما تكون الأولوية للنص، ثم راجع النتيجة قبل اعتمادها رسمياً.`,
      en: `PDF to Word is useful when you need to edit existing text or reuse a report. The result depends first on the PDF type: a text PDF can usually be extracted, while a scanned PDF needs OCR and may not preserve the original layout.

## Identify the PDF type first

Try selecting and copying a word. If that works, the document is probably text-based and suitable for a quick conversion. If every page behaves like one image, use an [image-to-text OCR tool](/tools/ocr-image-to-text/) or another OCR workflow before rebuilding the Word document.

## How to get an editable result

Keep a copy of the original, then use [PDF to Word](/tools/pdf-to-word/) for simple text-based files. Review headings, tables, and margins afterward because PDF is designed for fixed display, not editable layout. Multi-column pages may become a single text flow and tables may need manual cleanup.

If you only need the words, [PDF to TXT](/tools/pdf-to-txt/) can produce a cleaner result than preserving a complex design. For scanned pages, extract the text first and format it in Word.

## Common failure points

The biggest mistake is expecting a perfect visual copy. Missing fonts, columns, footnotes, forms, and mixed Arabic-English text can change reading order. Check numbers and dates carefully, especially in contracts and invoices.

Never overwrite the original PDF. Keep it as a reference, name the editable copy clearly, and open it on another device to catch missing fonts or incomplete pages.

## Privacy

Legal, financial, and medical documents should not be uploaded to an unknown converter. DouNest tools process files locally in the browser when the required libraries are available and do not require an account. Always check whether an external library is loaded during first use.

## Conclusion

Text PDFs are the best candidates for conversion; scanned PDFs need OCR and human review. Use PDF to Word for simple documents, PDF to TXT when text matters most, and verify the output before relying on it officially.`
    }
  },
  {
    slug: "image-to-pdf-guide",
    title: {
      ar: "تحويل الصور إلى PDF: أفضل الإعدادات للجودة والحجم",
      en: "Convert Images to PDF: The Best Settings for Quality and File Size"
    },
    excerpt: {
      ar: "حوّل صور الهاتف والمستندات إلى PDF مرتب مع اختيار المقاس والاتجاه والجودة، وتجنب الملفات الضخمة أو المشوشة.",
      en: "Turn phone photos and scans into an organized PDF by choosing the right page size, orientation, and quality without huge or blurry files."
    },
    date: "2026-10-15",
    tags: ["images", "pdf", "صور", "documents", "compression"],
    content: {
      ar: `تحويل الصور إلى PDF ليس مجرد وضع كل صورة في صفحة؛ الإعدادات الخاطئة قد تنتج ملفاً ضخماً أو صفحات مقصوصة أو نصاً يصعب قراءته. الاختيار الصحيح يعتمد على هدفك: أرشفة مستند، إرسال صور، طباعة، أو إنشاء ملف يمكن مشاركته بسرعة.

## اختر مقاس الصفحة قبل التصدير

استخدم A4 للمستندات الرسمية والطباعة، وLetter إذا كان جمهورك يعمل وفق المقاس الأمريكي. اختر الاتجاه العمودي للمستندات والصور الفردية، والأفقي للصور العريضة أو لقطات الشاشة. إذا اختلفت أبعاد الصور، فعّل احتواء الصورة داخل الصفحة بدلاً من تمديدها حتى الحواف.

يمكنك استخدام [أداة الصور إلى PDF](/tools/image-to-pdf/) لترتيب عدة صور، اختيار المقاس والهوامش، ثم تنزيل ملف واحد. اسحب الصور بالترتيب الذي تريد ظهوره في المستند قبل التحويل.

## الجودة مقابل حجم الملف

صورة الهاتف الحديثة قد تكون أكبر بكثير من الحاجة للطباعة أو العرض على الشاشة. للأرشفة النصية، تكفي غالباً دقة متوسطة مع ضغط متوازن. للطباعة، احتفظ بدقة أعلى ولا تضغط الصورة الأصلية قبل إنشاء نسخة PDF.

إذا كان الملف الناتج كبيراً، مرّره بعد ذلك إلى [أداة ضغط PDF](/tools/compress-pdf/). لا تضغط مرات كثيرة، لأن الضغط المتكرر قد يسبب ضبابية في النص والصور. وللصور وحدها، استخدم [أداة ضغط الصور](/tools/image-compressor/) قبل جمعها في PDF إذا كان الحجم هو الأولوية.

## ترتيب المستند وفحصه

سمِّ الصور بأرقام أو رتّبها يدوياً قبل الرفع. بعد التصدير، افتح كل صفحة وتحقق من اتجاهها، الهوامش، القص، ووضوح النص. في المستندات متعددة الصفحات، تحقق من الصفحة الأولى والأخيرة لأن أخطاء الترتيب تظهر غالباً عند الدمج.

تذكّر أن تحويل الصور إلى PDF لا ينشئ نصاً قابلاً للبحث تلقائياً. إذا احتجت البحث أو النسخ، استخدم OCR بعد ذلك أو ابدأ من صور واضحة ومضاءة جيداً.

## الخصوصية

صور الوثائق قد تحتوي على هويات أو عناوين أو توقيعات. عالجها محلياً متى أمكن، واحذف النسخ المؤقتة من مجلد التنزيلات بعد الانتهاء، ولا تشارك رابطاً عاماً للملف دون مراجعته.

## خلاصة

حدد المقاس والاتجاه أولاً، رتّب الصور، اختر جودة مناسبة، ثم افحص PDF قبل إرساله. استخدم الضغط فقط عند الحاجة، وطبّق OCR إذا أردت نصاً قابلاً للبحث.`,
      en: `Converting images to PDF is more than placing each image on a page. Poor settings can create a huge file, cropped pages, or unreadable text. The right setup depends on whether you are archiving a document, sending photos, printing, or sharing quickly.

## Choose the page size first

Use A4 for official documents and printing, or Letter for US-based workflows. Portrait works for documents and individual photos; landscape is better for wide images and screenshots. When image dimensions vary, fit the image inside the page instead of stretching it to the edges.

Use the [Image to PDF tool](/tools/image-to-pdf/) to order multiple images, choose page size and margins, and download one PDF. Arrange the images before conversion so the page order is intentional.

## Quality versus file size

A modern phone photo can be much larger than needed for screen viewing. For text archives, medium resolution with balanced compression is often enough. For print, keep a higher-resolution source and create a separate PDF copy.

If the result is too large, run it through [Compress PDF](/tools/compress-pdf/). Avoid repeated compression because it can blur text. For image-heavy workflows, use [Image Compressor](/tools/image-compressor/) before creating the PDF when file size matters most.

## Order and inspect the document

Name images with numbers or arrange them manually before uploading. After export, inspect every page for orientation, margins, cropping, and text clarity. With multi-page documents, check the first and last pages because ordering mistakes often appear there.

Image-to-PDF conversion does not automatically create searchable text. If search and copy are required, use OCR afterward or start with clear, well-lit scans.

## Privacy

Document photos may contain IDs, addresses, or signatures. Process them locally whenever possible, delete temporary downloads when finished, and review a file before sharing it publicly.

## Conclusion

Choose size and orientation, order the images, select an appropriate quality level, and inspect the PDF before sending it. Compress only when needed, and add OCR when searchable text matters.`
    }
  },
  {
    slug: "csv-json-conversion-guide",
    title: {
      ar: "CSV إلى JSON والعكس: دليل اختيار الصيغة الصحيحة",
      en: "CSV to JSON and Back: How to Choose the Right Data Format"
    },
    excerpt: {
      ar: "افهم الفرق بين CSV وJSON، وتعامل مع الفواصل والترميز والحقول الفارغة قبل تحويل بياناتك بين الصيغتين.",
      en: "Understand CSV versus JSON and handle delimiters, encoding, and empty fields before converting data between the two formats."
    },
    date: "2026-10-15",
    tags: ["csv", "json", "data", "api", "تحويل-بيانات"],
    content: {
      ar: `CSV ممتاز للجداول، بينما JSON أفضل للبيانات المتداخلة وواجهات API. المشكلة تبدأ عندما يُستخدم أحدهما في المكان الخطأ: تحويل قائمة بسيطة إلى JSON سهل، لكن الأعمدة التي تحتوي على فواصل أو أسطر جديدة أو قيم فارغة تحتاج إلى مراجعة قبل الاعتماد على النتيجة.

## متى تختار CSV؟

اختر CSV عندما تكون بياناتك جدولاً مستوياً: صفوفاً وأعمدة ثابتة يمكن فتحها في Excel أو Google Sheets. الملف خفيف وسهل التبادل، لكنه لا يمثل العلاقات المتداخلة جيداً. يجب أن تعرف الفاصل المستخدم؛ بعض الملفات تستخدم الفاصلة، وأخرى الفاصلة المنقوطة بسبب إعدادات اللغة.

## متى تختار JSON؟

JSON مناسب للتطبيقات والـ API عندما تحتاج إلى كائنات وقوائم وحقول داخلية. استخدم [CSV إلى JSON](/tools/csv-to-json/) لتحويل الصف الأول إلى مفاتيح، ثم راجع الناتج في [منسق JSON](/tools/json-formatter/). إذا أردت العودة إلى جدول، استخدم [JSON إلى CSV](/tools/json-to-csv/) وتحقق من أن الحقول المتداخلة لا تضيع.

## ثلاث مشكلات يجب فحصها

الأولى هي الترميز: افتح الملفات العربية بترميز UTF-8 لتجنب ظهور حروف غير مفهومة. الثانية هي الفواصل داخل النص؛ يجب أن تكون القيمة محاطة بعلامات اقتباس حتى لا تُقسم إلى عمودين. الثالثة هي القيم الفارغة، إذ قد تتحول إلى نص فارغ أو "null" أو تُحذف حسب الأداة.

بعد التحويل، قارن عدد الصفوف، أسماء الأعمدة، وأول وآخر سجل. لا تكتفِ بكون الملف يفتح؛ اختبره في النظام الذي سيقرأه فعلياً.

## الخصوصية وجودة البيانات

CSV وJSON ملفات نصية وقد تكشف بيانات كاملة عند مشاركتها. احتفظ بنسخة أصلية، أزل الأعمدة الحساسة قبل التصدير، ولا تخلط بين إخفاء العمود وحذف البيانات من الملف فعلاً. المعالجة المحلية تقلل نقل البيانات لكنها لا تعوّض مراجعة المحتوى قبل المشاركة.

## الخلاصة

استخدم CSV للجداول المسطحة وJSON للبيانات المنظمة وواجهات API. افحص UTF-8 والفواصل والقيم الفارغة، ثم تحقق من عدد السجلات والحقول بعد التحويل. بهذه الخطوات يصبح الانتقال بين الصيغتين قابلاً للتكرار وآمناً.`,
      en: `CSV is excellent for tables, while JSON is better for nested data and APIs. Problems begin when one format is used in the wrong place: a simple list is easy to convert, but commas, line breaks, and empty fields need review before you trust the output.

## When should you choose CSV?

Choose CSV for flat data with stable rows and columns that people may open in Excel or Google Sheets. It is lightweight and easy to exchange, but it does not represent nested relationships well. Confirm the delimiter because some files use commas while others use semicolons based on locale settings.

## When should you choose JSON?

JSON fits applications and APIs that need objects, arrays, and nested fields. Use [CSV to JSON](/tools/csv-to-json/) to turn the first row into keys, then review the result in [JSON Formatter](/tools/json-formatter/). To return to a table, use [JSON to CSV](/tools/json-to-csv/) and confirm that nested fields are not being flattened unexpectedly.

## Three problems to check

First is encoding: open Arabic data as UTF-8 or characters may become corrupted. Second is commas inside text; values need quoting or they may split into two columns. Third is empty values, which can become an empty string, "null", or disappear depending on the converter.

After conversion, compare row counts, column names, and the first and last records. A file opening successfully is not enough; test it in the system that will actually read it.

## Privacy and data quality

CSV and JSON are plain-text formats and can expose complete datasets when shared. Keep an original copy, remove sensitive columns before exporting, and remember that hiding a column is not the same as deleting its data. Local processing reduces transfer but does not replace a content review.

## Conclusion

Use CSV for flat tables and JSON for structured data and APIs. Check UTF-8, delimiters, and empty values, then validate row and field counts after conversion. This makes format changes repeatable and safer.`
    }
  }
];
