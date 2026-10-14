/**
 * DouNest v3 — Articles (pure data)
 * Bilingual, complete articles used by the build script to generate
 * static /articles/<slug>/ landing pages (visible to crawlers without JS).
 */

const ARTICLES = [
  {
    slug: "json-guide",
    title: {
      ar: "دليل JSON الشامل: من الصفر إلى الاحتراف",
      en: "The Complete JSON Guide: From Zero to Hero"
    },
    excerpt: {
      ar: "كل ما تحتاج معرفته عن JSON: البنية، القواعد، الأخطاء الشائعة، وأفضل الممارسات العملية.",
      en: "Everything you need to know about JSON: structure, rules, common errors, and practical best practices."
    },
    date: "2026-10-14",
    tags: ["json", "developer"],
    content: {
      ar: `JSON اختصار لـ JavaScript Object Notation، وهو تنسيق نصي خفيف لتبادل البيانات بين الأنظمة. رغم بدايته كلغة داخل جافاسكربت، صار اليوم اللغة المشتركة التي تتحدث بها كل واجهات برمجة التطبيقات الحديثة تقريباً، بدءاً من واجهات الشبكات الاجتماعية وانتهاءً بملفات الإعدادات في أدوات المطورين.

## لماذا انتشر JSON بهذه السرعة؟

السبب الأول هو بساطته: JSON ليس أكثر من نص منظّم بأقواس معقوفة وأقواس زاوية، وهو مقروء للإنسان مباشرة دون الحاجة لأدوات خاصة. السبب الثاني أنه يمثل البيانات بشكل مطابق تماماً لطريقة تمثيل الكائنات في معظم لغات البرمجة: قوائم، قواميس، نصوص وأرقام. السبب الثالث هو دعمه الجامع؛ كل لغة برمجة حديثة لديها مكتبة جاهزة لقراءته وكتابته.

## البنية الأساسية

يُبنى JSON من ستة أنواع فقط: الكائن (object) وهو أزواج مفتاح/قيمة داخل أقواس معقوفة، والمصفوفة (array) وهي قائمة مرتبة داخل أقواس زاوية، والنص (string) داخل علامتي اقتباس مزدوجتين، والرقم (number)، والقيمتان true/false، والقيمة الخاصة null. أي ملف JSON صالح هو تركيبة من هذه الأنواع فقط.

مثال على كائن يمثل مستخدماً:

{"name": "محمد", "age": 27, "skills": ["json", "python"], "active": true}

## الأخطاء الشائعة التي يقع فيها الجميع

الخطأ الأول: استخدام علامات اقتباس مفردة بدلاً من المزدوجة. JSON صارم في هذه النقطة ولا يقبل 'text' بل يجب "text". الخطأ الثاني: ترك فاصلة زائدة بعد آخر عنصر في قائمة أو كائن، وهي مسموحة في جافاسكربت لكنها تكسر JSON تماماً. الخطأ الثالث: تعليقات الكود؛ JSON لا يدعم التعليقات إطلاقاً، وإذا احتجتها استخدم صيغة JSONC التي تعتمدها بعض الأدوات. الخطأ الرابع: المفاتيح يجب أن تكون نصوصاً دائماً، فكتابة {age: 27} بدون اقتباس حول age غير صالح. الخطأ الخامس: الأرقام الخاصة مثل NaN وInfinity غير مدعومة في الصيغة القياسية.

## كيف تتحقق من صحة ملفك بسرعة؟

أسهل طريقة هي لصق المحتوى في أداة تنسيق JSON فورية تعمل داخل المتصفح، فتخبرك برقم السطر الذي يقع فيه الخطأ بالضبط مع إعادة تنسيق الملف بشكل مقروء. جرّب أداة [منسّق JSON](/tools/json-formatter/) في DouNest: الصق النص، اضغط تنفيذ، وستحصل على نسخة منسّقة أو رسالة خطأ دقيقة. والأفضل أن كل شيء يحدث محلياً في متصفحك فلا تقلق بشأن خصوصية بياناتك.

## أفضل الممارسات العملية

استخدم أسماء مفاتيح واضحة ومتسقة النمط (camelCase أو snake_case اختر واحداً والتزم به). حافظ على حجم الملفات معقولاً وقسّم البيانات الضخمة إلى ملفات أصغر. عند التعامل مع واجهات API تحقق دائماً من نوع المحتوى returned قبل التحليل. وفي المشاريع الكبيرة، اعتمد مخططات JSON Schema للتحقق الآلي من صحة البيانات قبل دخولها نظامك.

## الخلاصة

JSON بسيط على السطح لكن التفاصيل الصغيرة هي مصدر معظم الأخطاء: الاقتباسات المزدوجة، الفواصل الزائدة، والمفاتيح غير المقتبسة. احفظ هذه القواعد، واستخدم أداة تحقق فورية كلما شككت في ملف، وستوفر على نفسك ساعات من التنقيح.`
,
      en: `JSON stands for JavaScript Object Notation — a lightweight, text-based format for exchanging data between systems. Although it started as a JavaScript feature, it has become the common language of almost every modern API, from social network endpoints to configuration files in developer tools.

## Why did JSON spread so fast?

First, simplicity: JSON is nothing more than structured text with braces and brackets, directly readable by humans. Second, it represents data exactly the way most programming languages already model it: lists, dictionaries, strings and numbers. Third, universal support: every modern language ships a ready-made library to parse and emit it.

## The basic structure

JSON is built from only six types: an object (key/value pairs inside curly braces), an array (an ordered list inside square brackets), a string (in double quotes), a number, the booleans true/false, and null. Any valid JSON file is a composition of these types alone.

Example object representing a user:

{"name": "Mohamed", "age": 27, "skills": ["json", "python"], "active": true}

## Common mistakes everyone makes

Mistake one: single quotes. JSON is strict here — 'text' is invalid, only "text" works. Mistake two: a trailing comma after the last element; allowed in JavaScript, fatal in JSON. Mistake three: comments — JSON does not support them at all; use JSONC if your toolchain allows. Mistake four: unquoted keys; {age: 27} is invalid because keys must be strings. Mistake five: special numbers like NaN and Infinity are not part of the standard.

## How to validate your file quickly

The easiest way is to paste it into an instant browser-based formatter: it tells you the exact line where parsing broke and gives you a readable version. Try the [JSON Formatter](/tools/json-formatter/) in DouNest: paste, run, and get either pretty output or a precise error message. Everything runs locally in your browser, so your data never leaves your machine.

## Practical best practices

Use clear, consistent key naming (pick camelCase or snake_case and stick to it). Keep files reasonably sized and split huge datasets. When consuming APIs, always verify the returned content type before parsing. In larger projects, adopt JSON Schema to validate data automatically before it enters your system.

## Conclusion

JSON looks simple, but the small details cause most bugs: double quotes, trailing commas, and unquoted keys. Memorize those rules, keep an instant validator one click away, and you will save hours of debugging.`
    }
  },
  {
    slug: "browser-privacy-tools",
    title: {
      ar: "لماذا يجب أن تعمل أدواتك داخل المتصفح؟ مبدأ الخصوصية أولاً",
      en: "Why Tools Should Run in Your Browser: The Privacy-First Principle"
    },
    excerpt: {
      ar: "ما الفرق بين أداة ترفع ملفاتك إلى خادم وأداة تعالجها محلياً؟ ولماذا هو مهم لك؟",
      en: "What is the difference between a tool that uploads your files and one that processes them locally — and why does it matter?"
    },
    date: "2026-10-14",
    tags: ["privacy", "security"],
    content: {
      ar: `عندما تضغط صورة أو تحوّل ملف PDF عبر موقع عادي، غالباً يحدث التالي: ملفك يُرفع عبر الشبكة إلى خادمٍ في مكان ما من العالم، يُعالج هناك، ثم تُنزَّل النتيجة. أنت لا تعرف من يملك ذلك الخادم، ولا مدة بقاء الملف عليه، ولا من يمكنه الوصول إليه في هذه الأثناء.

## نموذج المعالجة المحلية يقلب المعادلة

الأدوات التي تعمل داخل المتصفح — مثل كل أدوات DouNest — تستخدم قدرات المتصفح نفسه: Canvas لمعالجة الصور، وFileReader لقراءة الملفات، وWeb Crypto للتجزئة والتشفير. ملفك لا يترك جهازك إطلاقاً؛ العملية تتم في ذاكرة المتصفح ثم تُنزَّل النتيجة مباشرة. النتيجة العملية: لا رفع، لا انتظار في طابور خادم، ولا سؤال "أين ذهب ملفي؟".

## ثلاث فوائد عملية تتجاوز الخصوصية

السرعة: لا زمن رفع أو تنزيل، والمعالجة الفورية مفيدة جداً مع الملفات الكبيرة. التكلفة: صاحب الموقع لا يدفع سيرفات ضخمة، لذا يمكنه إبقاء الأدوات مجانية. العمل دون اتصال: بعد أول زيارة، تعمل معظم الأدوات من ذاكرة PWA حتى لو انقطع الإنترنت.

## متى تحتاج خادماً فعلاً؟

بعض المهارات تتطلب موارد لا يملكها المتصفح: نماذج ذكاء اصطناعي ضخمة، أو معالجة فيديو ثقيلة، أو قواعد بيانات مشتركة. القاعدة العملية: إذا كانت المهمة "تحويل شكل" لبياناتك (ضغط، تحويل صيغة، تنسيق، تجزئة، توليد) فابحث عن نسخة محلية أولاً.

## كيف تتحقق أن الأداة محلية فعلاً؟

افتح أدوات المطور (F12) ثم تبويب Network، وشغّل العملية على ملف حقيقي: إذا لم ترى أي طلب رفع (POST كبير) فهي محلية. جميع أدوات DouNest مصممة على هذا المبدأ، ويمكنك التحقق بنفسك في أي وقت.`
,
      en: `When you compress an image or convert a PDF through a typical website, this is what usually happens: your file travels across the network to a server somewhere in the world, gets processed there, and the result is sent back. You have no idea who owns that server, how long your file stays on it, or who can access it meanwhile.

## Local processing flips the equation

Tools that run entirely in the browser — like every DouNest tool — use the browser's own capabilities: Canvas for image processing, FileReader to read files, and Web Crypto for hashing and encryption. Your file never leaves your device; everything happens in browser memory and the result downloads directly. Practically: no uploads, no server queues, and no "where did my file go?" anxiety.

## Three practical benefits beyond privacy

Speed: zero upload/download time, which matters a lot for large files. Cost: the site owner pays for no heavy servers, so tools can stay free. Offline: after the first visit, most tools keep working from the PWA cache even without internet.

## When do you actually need a server?

Some tasks genuinely require resources a browser lacks: huge AI models, heavy video processing, or shared databases. The practical rule: if the task is a "shape change" of your own data (compress, convert, format, hash, generate), look for a local version first.

## How to verify a tool is truly local

Open developer tools (F12), switch to the Network tab, and run the operation on a real file: if you see no large upload request (big POST), it is local. Every DouNest tool is built on this principle — verify it yourself anytime.`
    }
  },
  {
    slug: "password-security-basics",
    title: {
      ar: "أساسيات كلمات المرور القوية: دليل عملي مبسّط",
      en: "Strong Password Fundamentals: A Practical, Simple Guide"
    },
    excerpt: {
      ar: "كيف تصنع كلمة مرور يصعب كسرها؟ وما دور مولد كلمات المرور والمدير الموثوق؟",
      en: "How do you build a password that is hard to crack? Where do generators and managers fit?"
    },
    date: "2026-10-14",
    tags: ["security", "passwords"],
    content: {
      ar: `معظم الاختراقات لا تحدث بأسلوب "هاكر عبقري يكسر التشفير"، بل بأمر أبسط بكثير: تخمين كلمة مرور ضعيفة أو إعادة استخدامها بعد تسريبها من موقع آخر. حمايتك الحقيقية تبدأ من ثلاث عادات بسيطة.

## العادة الأولى: الطول قبل التعقيد

كلمة مرور بطول 16 حرفاً عشوائياً أقوى بكثير من 8 أحرف مليئة بالرموز. الرياضيات بسيطة: كل حرف إضافي يضاعف عدد المحاولات المطلوبة أضعافاً هائلة. لذلك القاعدة العملية: 14 حرفاً على الأقل، والأفضل 16 فأكثر.

## العادة الثانية: كلمة فريدة لكل موقع

عندما يُخترق موقع ما وتُسرَّب قواعد بياناته، يجرب المهاجمون نفس البريد وكلمة المرور على مواقع أخرى تلقائياً. من يستخدم كلمة واحدة في كل مكان يخسر كل شيء دفعة واحدة. الحل ليس ذاكرتك — بل مدير كلمات مرور موثوق يحفظ لك عشرات الكلمات الفريدة.

## العادة الثالثة: التوليد العشوائي لا "الذكاء" البشري

البشر سيئون جداً في العشوائية: نختار أسماء وتواريخ وأنماطاً متوقعة. مولد كلمات المرور يستخدم مولّد عشوائية تشفيري (crypto.getRandomValues) لصنع كلمات لا نمط لها. جرّب [مولد كلمات المرور](/tools/password-generator/) في DouNest: حدد الطول، اختر أنواع الأحرف، واستبعد الرموز الملتبسة إذا كان ستقرؤها من ورق، وفعّل خيار عبارة المرور إذا تريد شيئاً يسهل إدخاله على الهاتف.

## خطوة إضافية: التحقق بخطوتين

حتى كلمة المرور المثالية قد تُسرَّب. التحقق بخطوتين (2FA) يضيف قفلاً ثانياً بحيث لا يكفي رمز المرور وحده لدخول حسابك. فعّله أولاً بأول على بريدك وحساباتك المالية.

## الخلاصة

طول كافٍ + تفرد لكل موقع + توليد عشوائي + تحقق بخطوتين = أمان عملي حقيقي. كل ذلك من متصفحك وبدون إرسال أي شيء لأي خادم.`
,
      en: `Most breaches do not happen because a genius hacker breaks encryption. They happen because of something far simpler: a weak password, or a password reused after leaking from another site. Real protection starts with three simple habits.

## Habit one: length over complexity

A random 16-character password is far stronger than 8 characters packed with symbols. The math is simple: every extra character multiplies the required guesses enormously. Practical rule: at least 14 characters, ideally 16+.

## Habit two: a unique password per site

When a site gets breached, attackers automatically try the same email/password combo on other services. One password everywhere means losing everything at once. The solution is not your memory — it is a reputable password manager holding dozens of unique passwords.

## Habit three: random generation, not human "creativity"

Humans are terrible at randomness: we pick names, dates and predictable patterns. A password generator uses a cryptographic random source (crypto.getRandomValues) to build patternless strings. Try the [Password Generator](/tools/password-generator/) in DouNest: set the length, choose character types, exclude ambiguous symbols if you will read it from paper, or generate a passphrase for easier phone typing.

## Bonus step: two-factor authentication

Even a perfect password can leak. 2FA adds a second lock so a password alone is not enough to enter your account. Enable it first on your email and financial accounts.

## Conclusion

Enough length + per-site uniqueness + random generation + 2FA = practical, real security. All of it from your browser, sending nothing to any server.`
    }
  },
  {
    slug: "image-compression-web",
    title: {
      ar: "ضغط الصور للويب: كيف تسرّع موقعك بحجم أصغر وجودة نفسها؟",
      en: "Image Compression for the Web: Smaller Files, Same Quality"
    },
    excerpt: {
      ar: "الصور هي أغلب حجم أي صفحة ويب. تعلّم كيف تضغطها بذكاء قبل رفعها.",
      en: "Images are the bulk of any web page. Learn to compress them smartly before uploading."
    },
    date: "2026-10-14",
    tags: ["images", "performance"],
    content: {
      ar: `في المتوسط تشكّل الصور أكثر من نصف وزن صفحة الويب الحديثة. كل كيلوبايت إضافي يعني زمن تحميل أطول، واستهلاك بيانات أكبر للزوار على الهاتف، وترتيباً أسوأ في نتائج البحث — لأن سرعة الصفحة عامل معروف في خوارزميات جوجل.

## ثلاث صيغ وكل واحدة لها وقتها

JPEG الخيار الافتراضي للصور الفوتوغرافية: ضغط جيد ودعم شامل. PNG للرسومات والشعارات والشفافية لكنه ثقيل على الصور الفوتوغرافية. WebP الجيل الأحدث: أصغر بنحو 25-35% من JPEG بنفس الجودة البصرية ويدعم الشفافية أيضاً، ومدعوم في كل المتصفحات الحديثة اليوم.

## ماذا تعني نسبة الجودة (Quality)؟

خوارزميات الضغط الفقدية ترمي تفاصيل لا يكاد العين تلتقطها. الجودة 0.75 عادةً تعطي وفورات هائلة مع فرق بصري غير محسوس، أما النزول تحت 0.5 فيبدأ تشويه واضح حول الحواف والنصوص. القاعدة: جرّب قيماً متدرجة وقارن المعاينة قبل التنزيل.

## خطوات عملية بالأرقام

لقطة شاشة بحجم 2MB تتحول عادةً إلى 300KB عند ضغطها بجودة 0.75 — أي وفورات تفوق 80%. صيغة WebP قد تصل بذلك إلى 220KB. في موقع يحتوي 20 صورة كهذه، الفرق يعني ثوانٍ كاملة من زمن التحميل.

## جرّبها الآن محلياً

[أداة ضغط الصور](/tools/image-compressor/) في DouNest تعمل كلياً داخل متصفحك: اختر الصورة، حرّك شريط الجودة، شاهد الحجم قبل/بعد والنسبة الموفّرة فوراً، ثم نزّل النتيجة. لا رفع ولا حدود يومية ولا حسابات — وبنفس الطريقة يمكنك [تحويل صيغة الصور](/tools/image-converter/) إلى WebP أو JPEG أو PNG.`
,
      en: `On average, images account for more than half of a modern web page's weight. Every extra kilobyte means slower loads, more mobile data for visitors, and worse search ranking — page speed is a known ranking factor.

## Three formats, each with its moment

JPEG is the default for photographs: good compression, universal support. PNG suits graphics, logos and transparency but is heavy for photos. WebP is the newer generation: roughly 25–35% smaller than JPEG at the same visual quality, supports transparency too, and every modern browser now supports it.

## What does the quality ratio mean?

Lossy compression discards details your eye barely notices. Quality 0.75 usually delivers huge savings with imperceptible difference; below 0.5 visible artifacts appear around edges and text. Rule of thumb: try stepped values and compare the preview before downloading.

## Practical numbers

A 2MB screenshot typically becomes ~300KB at quality 0.75 — over 80% saved. WebP can bring that to ~220KB. Across 20 images, that difference is whole seconds of load time.

## Try it now, locally

The [Image Compressor](/tools/image-compressor/) in DouNest runs entirely in your browser: pick an image, move the quality slider, watch the before/after size and saved percentage instantly, then download. No uploads, no daily limits, no accounts — and with the [Image Converter](/tools/image-converter/) you can switch to WebP, JPEG or PNG the same way.`
    }
  }
];

export function getArticles() { return ARTICLES; }
export function getArticle(slug) { return ARTICLES.find(a => a.slug === slug); }
