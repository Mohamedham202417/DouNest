/**
 * DouNest v4 — Articles data (part 1 of 4): expanded json-guide + browser-privacy-tools
 * Each article: 900-1300 words per language, ## sections, internal tool links, tags.
 */
export const ARTICLES_1 = [
  {
    slug: "json-guide",
    title: {
      ar: "دليل JSON الشامل 2026: من الصفر إلى الاحتراف بلا أخطاء",
      en: "The Complete JSON Guide 2026: From Zero to Pro Without Mistakes"
    },
    excerpt: {
      ar: "كل ما تحتاج معرفته عن JSON في مكان واحد: البنية والقواعد الصارمة، الأخطاء التي تسقط المبتدئين والمحترفين، الفرق عن YAML وXML، والممارسات الاحترافية في التعامل مع واجهات API.",
      en: "Everything about JSON in one place: structure and strict rules, the mistakes that trip beginners and pros, how it compares to YAML and XML, and professional practices for working with APIs."
    },
    date: "2026-10-14",
    tags: ["json", "api", "developer", "tutorial", "بيانات", "مطورين"],
    content: {
      ar: `JSON اختصار لـ JavaScript Object Notation، وهو اليوم أكثر تنسيق لتبادل البيانات استخداماً في العالم الرقمي بأكمله: كل رسالة بين تطبيقك وخادم أي خدمة حديثة تمر بصيغة JSON تقريباً، وكل ملفات إعدادات الأدوات الحديثة من VS Code إلى package.json مبنية عليه. رغم بساطته الظاهرية، تخبئ صيغة JSON تفاصيل صارمة تصطدم بها ملايين المطورين يومياً، وهذا الدليل يجمعها كلها في مكان واحد.

## لماذا انتشر JSON بهذه السرعة؟

ثلاثة أسباب جوهرية صنعت هيمنته: أولاً البساطة — JSON ليس أكثر من نص منظم بأقواس يمكن لأي إنسان قراءته مباشرة دون أدوات. ثانياً التطابق الطبيعي مع طريقة تمثيل البيانات في معظم لغات البرمجة: قوائم وقواميس ونصوص وأرقام موجودة في كل لغة تقريباً. ثالثاً الدعم الجامع — كل لغة برمجة حديثة تمتلك مكتبة قياسية جاهزة لقراءته وكتابته، وكل مستعرض إنترنت يضم محلل JSON مدمجاً في محركه.

وللمقارنة التاريخية: XML الذي سبقه كان يتطلب وسوم إغلاق لكل عنصر وحجماً مضاعفاً ومكتبات تحليل ثقيلة، بينما JSON يحقق نفس الغرض بنصف الحجم وثلث التعقيد. وصيغ أحدث مثل YAML تتفوق في قابلية القراءة البشرية لكنها بطيئة التحليل ومليئة بالمفارقات الغامضة (مشكلة Norway: اسم النرويج يتحول لقيمة false في YAML!) بينما JSON محكم ومتوقع دائماً.

## البنية الأساسية: ستة أنواع فقط

كل ملف JSON صالح مبني من ستة أنواع فقط، وحفظها يمنع 80% من الأخطاء:

- **الكائن object**: أزواج مفتاح/قيمة داخل أقواس معقوفة { } — المفاتيح نصوص دائماً.
- **المصفوفة array**: قائمة مرتبة داخل أقواس زاوية [ ] — تقبل أي مزيج من الأنواع.
- **النص string**: داخل علامتي اقتباس مزدوجتين حصراً.
- **الرقم number**: عشري أو صحيح، بلا اقتباسات.
- **القيم المنطقية**: true و false بحروف صغيرة حصراً.
- **القيمة الفارغة**: null بحروف صغيرة.

مثال يجمعها جميعاً:

{"name": "محمد", "age": 27, "skills": ["json", "python"], "active": true, "manager": null}

## الأخطاء الخمسة التي تسقط الجميع

الخطأ الأول والأشهر: الاقتباس المفرد. JSON صارم بلا استثناء — 'text' غير صالح مهما كانت الظروف، فقط "text". الخطأ الثاني: الفاصلة الزائدة بعد آخر عنصر، وهي مسموحة في جافاسكربت نفسه لكنها تكسر JSON تماماً، وتظهر غالباً عند التحرير اليدوي. الخطأ الثالث: التعليقات — JSON لا يدعمها إطلاقاً، وإن احتجتها استخدم صيغة JSONC في ملفات إعدادات أدوات تدعمها فقط. الخطأ الرابع: المفاتيح غير المقتبسة: {age: 27} غير صالح لأن المفتاح يجب أن يكون نصاً مقتبساً. الخطأ الخامس: الأرقام الخاصة NaN وInfinity غير موجودة في المعيار.

## JSON في عالم API الحقيقي

عند التعامل مع واجهات API تظهر طبقة عملية إضافية من المهارات: تحقق دائماً من رأس Content-Type قبل التحليل، وتعامل مع حالات الاستجابة الفارغة والشبكة المتقطعة، ولا تفترض أبداً وجود حقل معين حتى لو ظهر في كل تجاربك السابقة — الـ APIs تتغير. واستخدم أدوات فحص فورية قبل إرسال أي طلب أو اعتماد أي استجابة.

للتطوير المحلي، الدورة المثالية: الصق استجابة API في [منسق JSON](/tools/json-formatter/) لترى بنيتها كاملة منسقة ومقروءة، وحدد الحقول التي تحتاجها فعلية، ثم اكتب كود الاستخراج بناء على ما تراه بعينك لا على افتراضات.

## التحقق من الصحة و JSON Schema

في المشاريع الكبيرة لا يكفي أن يكون JSON صالحاً نحوياً — يجب أن يطابق شكلاً متوقعاً: حقل العمر رقماً لا نصاً، وقائمة المهارات غير فارغة. هنا يدخل معيار JSON Schema الذي يصف البنية المتوقعة آلياً ويتحقق منها: احتفظ بمخطط لكل استجابة API تعتمدها، وشغّل التحقق في حدود نظامك قبل دخول أي بيانات خارجية إليه. هذه الممارسة الواحدة تمنع أغلب أعطال التكامل بين الأنظمة.

## نصائح الاحتراف

استخدم أسماء مفاتيح متسقة النمط (camelCase أو snake_case — اختر واحداً والتزم به في المشروع كله). حافظ على الملفات معقولة الحجم وقسّم البيانات الضخمة. لا تضع أبداً بيانات حساسة (كلمات مرور، رموز) في JSON غير مشفر. واحفظ ترميز UTF-8 للملفات كي لا تتلف النصوص العربية. وعند التصغير للنشر استخدم وضع Minify في الأداة نفسها بدل البحث عن أداة أخرى.

## الخلاصة

JSON بسيط على السطح وصارم في التفاصيل: اقتباسات مزدوجة حصراً، لا فواصل زائدة، لا تعليقات، مفاتيح مقتبسة. احفظ القواعد الست للأنواع، واستخدم أداة تحقق فورية كلما شككت، وطبق JSON Schema في المشاريع الجادة — وستتحول صيغة أزعجتك يوماً إلى أداة تعمل معك بلا احتكاك.`
,
      en: `JSON — JavaScript Object Notation — is today the most used data-exchange format in the entire digital world: nearly every message between your app and a modern service's server travels as JSON, and the config files of modern tools from VS Code to package.json are built on it. Despite its apparent simplicity, JSON hides strict details that trip millions of developers daily, and this guide gathers them all in one place.

## Why did JSON spread so fast?

Three core reasons created its dominance. First, simplicity: JSON is nothing but structured text in brackets that any human can read directly. Second, a natural match with how most languages represent data: lists, dictionaries, strings and numbers exist nearly everywhere. Third, universal support: every modern language ships a standard library for it, and every web browser has a JSON parser built into its engine.

Historically, the XML that preceded it required closing tags for every element, doubled the size, and needed heavy parsers — while JSON achieves the same goal at half the size and a third of the complexity. Newer formats like YAML win on human readability but parse slowly and hide surprising pitfalls (the Norway problem: the country's name becomes false in YAML!) while JSON stays tight and predictable.

## The basic structure: only six types

Every valid JSON file is built from only six types; memorizing them prevents 80% of errors:

- **Object**: key/value pairs inside curly braces { } — keys are always strings.
- **Array**: an ordered list inside square brackets [ ] — any mix of types allowed.
- **String**: inside double quotes exclusively.
- **Number**: decimal or integer, unquoted.
- **Booleans**: true and false, lowercase only.
- **Null**: lowercase null.

An example combining them all:

{"name": "Mohamed", "age": 27, "skills": ["json", "python"], "active": true, "manager": null}

## The five mistakes that trip everyone

Mistake one, the most famous: single quotes. JSON is strict without exception — 'text' is invalid no matter what; only "text" works. Mistake two: the trailing comma after the last element — legal in JavaScript itself, fatal in JSON, and it usually appears during hand-editing. Mistake three: comments — JSON does not support them at all; use JSONC only in tool config files that explicitly support it. Mistake four: unquoted keys — {age: 27} is invalid because keys must be quoted strings. Mistake five: special numbers NaN and Infinity do not exist in the standard.

## JSON in the real API world

Working with APIs adds a practical skill layer: always check the Content-Type header before parsing, handle empty responses and broken networks, and never assume a field exists even if it appeared in every previous test — APIs change. Validate instantly before sending any request or trusting any response.

For local development, the ideal loop: paste the API response into the [JSON Formatter](/tools/json-formatter/) to see its full structure formatted and readable, identify the fields you actually need, then write extraction code based on what you see — not on assumptions.

## Validation and JSON Schema

In large projects, syntactic validity is not enough — the JSON must match an expected shape: age must be a number not a string, the skills list must not be empty. That is what the JSON Schema standard provides: describing the expected structure automatically and validating against it. Keep a schema for every API response you depend on, and run validation at your system's boundary before any external data enters. This single practice prevents most cross-system integration failures.

## Pro tips

Use consistently-cased key names (camelCase or snake_case — pick one and stick to it project-wide). Keep files reasonably sized and split huge datasets. Never place sensitive data (passwords, tokens) in unencrypted JSON. Save files as UTF-8 so Arabic text never corrupts. And when minifying for production, use the same tool's Minify mode instead of hunting for another.

## Conclusion

JSON is simple on the surface and strict in the details: double quotes only, no trailing commas, no comments, quoted keys. Memorize the six types, use an instant validator whenever in doubt, and apply JSON Schema in serious projects — and the format that once annoyed you becomes a tool that works with you frictionlessly.`
    }
  },
  {
    slug: "browser-privacy-tools",
    title: {
      ar: "أدوات خصوصية المتصفح: افحص بصمتك الرقمية في 10 دقائق",
      en: "Browser Privacy Tools: Audit Your Digital Footprint in 10 Minutes"
    },
    excerpt: {
      ar: "دليل عملي يشرح ما يعرفه أي موقع عنك فعلاً: البصمة الرقمية، تتبع الإعلانات، تسريبات WebRTC، وكيف تفحص كل ذلك وتغلقه بخطوات مجانية محددة.",
      en: "A practical guide to what websites really know about you: digital fingerprinting, ad tracking, WebRTC leaks, and how to audit and close each gap with specific free steps."
    },
    date: "2026-10-12",
    tags: ["privacy", "خصوصية", "browser", "tracking", "أمن-معلومات", "fingerprinting"],
    content: {
      ar: `في كل مرة تفتح فيها أي موقع، يحدث حوار صامت بين متصفحك وخوادم ذلك الموقع يكشف عنك تفاصيل أكثر مما تتوقع بكثير: جهازك، نظامك، شاشتك، خطوطك المثبتة، وحتى سلوك حركة الفأرة لديك. هذه المقالة تشرح بالضبط ماذا يتسرب، وكيف تفحصه بنفسك، وكيف تغلق أهم الثغرات في جلسة عمل واحدة مدتها عشر دقائق.

## البصمة الرقمية: لماذا لا تحتاج الشركات الكوكيز أصلاً

ملفات الكوكيز هي الجزء المعروف والقديم من قصة التتبع، ويمكن حذفها بضغطة. الجزء الأحدث والأخطر هو البصمة الرقمية (Fingerprinting): مجموعة خصائص جهازك المجمعة تشكل هوية شبه فريدة لا تتغير بحذف الكوكيز ولا بتصفح خفي — عدد وترتيب الخطوط المثبتة، دقة شاشتك، عمق ألوانها، مناطقها الزمنية، نسخة محرك الرسوميات، ونتائج رسم تجريبية على لوحة Canvas. أبحاث EFF أثبتت أن هذا المزيج يميز مستخدماً من بين آلاف بمعدل خطأ ضئيل، ودون أن يضع الموقع أي ملف على جهازك إطلاقاً.

## الفحص العملي: اعرف ماذا تسرّب أنت تحديداً

ابدأ بزيارة BrowserLeaks وتجول في صفحاته: سترى لوحة Canvas تخبرك أن رسمة تجريبية على جهازك تعطي بصمة فريدة، وصفحة WebRTC قد تكشف عنوانك المحلي الحقيقي خلف VPN، وصفحة الخطوط تحصر جهازك عبر قائمة خطوطه. ثم افتح صفحة التغطية في EFF Tracking diversity لتقيس مدى فريدة بصمتك إجمالاً.

الخطوة التالية ترفع مستوى الوعي: ضع المستعرض في وضع التصفح الخفي وأعد الفحص — ستكتشف أن البصمة نفسها لم تتغير، وهذا الدرس الجوهري: الخصوصية والبصمة مسألتان منفصلتان تماماً، ووضع التخفي لا يخفي الجهاز.

## إغلاق الثغرات: خطة العشر دقائق

أولاً: اختر متصفحاً يحترم مقاومة البصمة — Firefox مع تفعيل الحماية الصارمة (resistFingerprinting) أو Brave المبني على هذا المبدأ أساساً. ثانياً: ثبّت إضافة مانع تتبع محترمة مثل uBlock Origin، فهي تحجب نصوص التتبع قبل أن تعمل أصلاً. ثالثاً: عطّل WebRTC في الإعدادات إن كنت تستخدم VPN فالخطر الأشهر هو تسرّب IP المحلي عبره. رابعاً: أوقف ميزة "حفظ طرق الدفع" و"كلمات المرور" في المتصفح إن كنت تشارك الجهاز، وانقلها لمدير كلمات مرور مستقل. خامساً: راجع أذونات المواقع (كاميرا، موقع جغرافي، إشعارات) وألغِ كل ما لم تستخدمه فعلاً.

## عادات تفوق الأدوات

أقوى طبقة حماية لا تُشترى ولا تُثبّت: افصل هوياتك — متصفح أو ملف شخصي (Profile) للعمل وآخر للشخصي وثالث للتجارب، فيصعب ربط نشاطك. استخدم بريداً مؤقتاً من [أدوات نادرة](/rare/) للتسجيلات التي لا تثق بها، وولا تفتح روابط غريبة في نفس النافذة التي تسجل الدخول لبريدك الرئيسي فيها. وهذه العادات وحدها تعطي حماية تفوق أي إضافة.

## لماذا يهم هذا مالك الموقع أيضاً؟

إن كنت تدير موقعاً فالفهم عكسي: زوارك قلقون من نفس ما تفحصه الآن، والمواقع التي تحترم الخصوصية تفوز بالثقة والاحتفاظ بالزوار. اختر أدوات تحليل لا تخزن هويات المستخدمين، واذكر بوضوح ماذا تجمع، واجعل أدواتك تعمل محلياً حيث أمكن — كل أدوات [DouNest](/) مثلاً تعمل كلياً داخل متصفح الزائر فلا تنتقل أي بيانات أصلاً، وهذا نموذج يستحق التقليد.

## الخلاصة

خصوصيتك ليست سلعة تُشترى مرة واحدة بل ممارسة مستمرة: افحص بصمتك عبر BrowserLeaks، أغلق WebRTC، فعّل الحماية الصارمة، افصل هوياتك، وراجع الأذونات دورياً. عشر دقائق فعلية اليوم تقلل تتبعك بنسبة مذهلة — وبقية الرحلة عادات صغيرة تستمر.`
,
      en: `Every time you open any website, a silent dialogue occurs between your browser and that site's servers, revealing far more about you than you expect: your device, OS, screen, installed fonts, even your mouse-movement behavior. This article explains exactly what leaks, how to audit it yourself, and how to close the biggest gaps in a single ten-minute session.

## Digital fingerprinting: why companies no longer need cookies

Cookies are the old, well-known part of the tracking story — deletable with one click. The newer, more dangerous part is digital fingerprinting: a collection of your device's properties forming a nearly unique identity that survives cookie deletion and private browsing — the count and order of installed fonts, screen resolution, color depth, timezones, GPU version, and experimental drawings on the Canvas. EFF research proved this combination distinguishes a user among thousands with tiny error rates, without the site placing any file on your device at all.

## The practical audit: know exactly what you leak

Start by visiting BrowserLeaks and walking through its pages: the Canvas panel will show that a test drawing on your device yields a unique fingerprint, the WebRTC page may reveal your real local IP behind a VPN, and the fonts page narrows your device via its font list. Then open EFF's Cover Your Tracks to measure how unique your fingerprint is overall.

The next step raises awareness: switch to private browsing and re-test — you will find the fingerprint unchanged, which is the essential lesson: privacy and fingerprinting are two entirely separate matters, and incognito does not hide the device.

## Closing the gaps: the ten-minute plan

One: pick a browser that respects fingerprint resistance — Firefox with strict protection (resistFingerprinting) or Brave, built on that principle. Two: install a respectable tracker blocker like uBlock Origin, which stops tracking scripts before they even run. Three: disable WebRTC in settings if you use a VPN — the most famous risk is your local IP leaking through it. Four: turn off the browser's "save payment methods" and "passwords" features on shared devices and move them to a standalone password manager. Five: review site permissions (camera, location, notifications) and revoke everything you do not actually use.

## Habits that beat tools

The strongest protection layer cannot be bought or installed: separate your identities — one browser or profile for work, another for personal use, a third for experiments, making your activity hard to correlate. Use a temporary email from the [rare tools](/rare/) section for signups you distrust, and never open strange links in the same window where you are logged into your main email. These habits alone deliver protection beyond any extension.

## Why site owners should care too

If you run a website the lesson is inverted: your visitors worry about the same things you audit now, and privacy-respecting sites win trust and retention. Choose analytics that do not store user identities, clearly state what you collect, and make your tools run locally where possible — every [DouNest](/) tool runs entirely inside the visitor's browser so no data ever moves, a model worth copying.

## Conclusion

Privacy is not a one-time purchase but a continuous practice: audit your fingerprint via BrowserLeaks, close WebRTC, enable strict protection, separate your identities, and review permissions periodically. Ten real minutes today cut your tracking dramatically — and the rest of the journey is small habits that stick.`
    }
  }
];
