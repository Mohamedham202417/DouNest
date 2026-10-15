/**
 * DouNest v4 — Rare tools: GEMS (جواهر GitHub)
 * ----------------------------------------------
 * 10 underrated open-source projects worth knowing. Pure data module
 * (Node-safe: imported by build.mjs). Part of js/rare-tools.js registry.
 */

export const GEMS_TOOLS = [
  {
    slug: "dsq",
    cat: "gems",
    icon: "🗃️",
    name: { ar: "dsq — نفّذ SQL على أي ملف بيانات", en: "dsq — Run SQL on Any Data File" },
    url: "https://github.com/multiprocessio/dsq",
    desc: {
      ar: "dsq أداة سطر أوامر مدهشة تجعل ملفات CSV وJSON وTSV وExcel وParquet قاعدة بيانات فورية: مرّر أي ملف إليها واكتب استعلام SQL عادي، فتحصل على نتائج منظمة خلال ثوانٍ دون إعداد أي خادم قواعد بيانات. مكتوبة بلغة Go وتدعم دمج عدة ملفات في استعلام واحد كأنها جداول مترابطة.",
      en: "dsq is a delightful command-line tool that turns CSV, JSON, TSV, Excel and Parquet files into an instant database: pipe any file in, write a plain SQL query, and get structured results in seconds without setting up any database server. Written in Go, it can even join multiple files in one query as if they were related tables."
    },
    why: {
      ar: "كل من تعامل مع ملفات بيانات يعانق فكرة إجراء تحليل سريع دون تحويل الصيغ أو كتابة سكربتات. dsq تحوّل مهمة كانت تحتاج نصف ساعة إلى سطر واحد، وهي مثالية للصحفيين والمحللين والمطورين على حد سواء.",
      en: "Everyone who works with data files dreams of quick analysis without format conversion or throwaway scripts. dsq turns a half-hour chore into a one-liner, perfect for journalists, analysts and developers alike."
    },
    how: {
      ar: [
        "نزّل الملف التنفيذي المناسب لنظامك من صفحة الإصدارات في المستودع.",
        "جرّب: dsq data.csv 'SELECT * FROM {} LIMIT 10' لعرض أول عشرة صفوف.",
        "ادمج ملفين: dsq users.csv orders.csv 'SELECT u.name, count(*) FROM {} u JOIN {} o ON u.id = o.user_id GROUP BY u.name'.",
        "وجّه الناتج إلى أدوات أخرى عبر الأنابيب لسير عمل Unix كامل.",
        "استبدل {} بالاسم المناسب عند الاستعلام عن أكثر من ملف."
      ],
      en: [
        "Download the executable for your OS from the repository's releases page.",
        "Try: dsq data.csv 'SELECT * FROM {} LIMIT 10' to show the first ten rows.",
        "Join two files: dsq users.csv orders.csv 'SELECT u.name, count(*) FROM {} u JOIN {} o ON u.id = o.user_id GROUP BY u.name'.",
        "Pipe the output into other tools for a complete Unix workflow.",
        "Replace {} with the right alias when querying more than one file."
      ]
    },
    tags: ["dsq", "sql", "بيانات", "cli", "open-source", "github"]
  },
  {
    slug: "polargraph",
    cat: "gems",
    icon: "🖋️",
    name: { ar: "Polargraph — آلة رسم معلقة تصنعها بنفسك", en: "Polargraph — Build Your Own Hanging Drawing Machine" },
    url: "https://github.com/euphy/polargraph",
    desc: {
      ar: "Polargraph مشروع مفتوح المصدر يحوّل لوحة وأقلام رصاص ومحركين خطوتين إلى آلة رسم معلقة ترسم أي صورة على حائط كامل بأسلوب فني مميز. يشمل المشروع فيرموير Arduino وبرنامج تحكم سطح مكتب وسيرفر ويب، وكل التصميمات الإلكترونية والميكانيكية معلنة مجاناً.",
      en: "Polargraph is an open-source project that turns a whiteboard, a pen and two stepper motors into a hanging drawing machine that renders any image on a whole wall with a distinctive artistic style. It ships Arduino firmware, a desktop controller and a web server, with all electronic and mechanical designs published for free."
    },
    why: {
      ar: "هو الجمع المثالي بين النحت الميكانيكي والبرمجة والفن، ومشروع عطلة نهاية أسبوع لا يُنسى لأي هاوٍ. الأطفال يقعون في حبه فوراً، وهو مدخل عملي رائع لفهم الإحداثيات القطبية والمحركات الخطوية وأتمتة العتاد.",
      en: "It is the perfect blend of mechanics, code and art — an unforgettable weekend project for any hobbyist. Kids fall in love instantly, and it is a wonderful practical introduction to polar coordinates, stepper motors and hardware automation."
    },
    how: {
      ar: [
        "اطلع على المستودع وقسّم الطلب: قطع إلكترونية (Arduino UNO وshield ومحركين خطوتين).",
        "جمّع الآلة وفق التصميمات المجانية المرفقة وعلّقها على لوحة عمودية.",
        "حمّل الفيرموير على Arduino وشغّل برنامج التحكم على حاسوبك.",
        "عاير طولي الخيط وموضع القلم بدقة عبر خطوات المعايرة.",
        "ارسم أول صورة تجريبية ثم استكشف أنماط التظليل المختلفة لتطوير أسلوبك الفني."
      ],
      en: [
        "Study the repository and gather the electronics (Arduino UNO, a motor shield and two stepper motors).",
        "Assemble the machine using the included free designs and hang it on a vertical board.",
        "Flash the firmware to the Arduino and run the controller software on your computer.",
        "Calibrate cord lengths and pen position precisely through the calibration steps.",
        "Draw your first test image, then explore shading styles to develop your own artistic voice."
      ]
    },
    tags: ["polargraph", "arduino", "روبوت", "diy", "open-source", "github"]
  },
  {
    slug: "kata-containers",
    cat: "gems",
    icon: "📦",
    name: { ar: "Kata Containers — حاويات بعزل الأجهزة الافتراضية", en: "Kata Containers — Containers with VM-Grade Isolation" },
    url: "https://github.com/kata-containers/kata-containers",
    desc: {
      ar: "Kata Containers مشروع يوحد أفضل عالمين: يشغّل الحاويات بنفس الخفة والسرعة المعتادة، لكن كل حاوية تعمل داخل جهاز افتراضي خفي خاص بها، فتحصل على عزل على مستوى العتاد بدل عزل النواة المشتركة. تدعمه أكبر شركات السحابة وهي معتمدة في Kubernetes عبر containerd.",
      en: "Kata Containers unites the best of both worlds: containers run with the usual lightness and speed, but each one lives inside its own lightweight virtual machine, giving you hardware-level isolation instead of a shared kernel. Backed by major cloud companies and supported in Kubernetes through containerd."
    },
    why: {
      ar: "أي منشئ منصة متعددة المستأجرين يفهم قيمة العزل الحقيقي دون التضحية بتجربة الحاويات. المشروع أيضاً مدرسة عملية في أنظمة المحاكاة الافتراضية الحديثة وكيف تتكامل KVM مع عالم Kubernetes.",
      en: "Anyone building a multi-tenant platform understands the value of true isolation without giving up the container experience. The project is also a hands-on school for modern virtualization internals and how KVM integrates with the Kubernetes world."
    },
    how: {
      ar: [
        "جهّز مضيف لينكس يدعم المحاكاة الافتراضية (KVM).",
        "ثبّت Kata عبر الحزم الرسمية أو مصدرها من المستودع.",
        "اضبط containerd أو CRI-O لاستخدام runtime خطة kata-runtime.",
        "شغّل حاوية اختبارية عبر Kubernetes أو مباشرة وأكد أنها تعمل داخل QEMU.",
        "قارن زمن الإقلاع واستهلاك الذاكرة مع الحاويات العادية لتفهم المقايضة."
      ],
      en: [
        "Prepare a Linux host with virtualization support (KVM).",
        "Install Kata via the official packages or build it from the repository.",
        "Configure containerd or CRI-O to use the kata-runtime runtime class.",
        "Run a test container via Kubernetes or directly and confirm it boots inside QEMU.",
        "Compare startup time and memory with plain containers to understand the trade-off."
      ]
    },
    tags: ["kata-containers", "docker", "kubernetes", "أمان-السحابة", "open-source", "github"]
  },
  {
    slug: "linkding",
    cat: "gems",
    icon: "🔖",
    name: { ar: "Linkding — حافظة روابط ذاتية الاستضافة ببساطة فائقة", en: "Linkding — Delightfully Simple Self-Hosted Bookmarks" },
    url: "https://github.com/sissbruecker/linkding",
    desc: {
      ar: "Linkding خادم علامات مرجعية ذاتي الاستضافة مصمم ليكون سريعاً وخفيفاً بشكل استثنائي: واجهة نظيفة، بحث فوري، وسوم، أرشفة نصية للصفحات، وإضافة متصفح وتطبيق جوال. يعمل من حاوية Docker واحدة بموارد زهيدة تصلح لأرخص VPS أو حتى Raspberry Pi قديم.",
      en: "Linkding is a self-hosted bookmark server designed to be remarkably fast and light: a clean interface, instant search, tags, full-text page archiving, plus a browser extension and mobile apps. It runs from a single Docker container on minimal resources — fine for the cheapest VPS or even an old Raspberry Pi."
    },
    why: {
      ar: "خدمات الحفظ السحابية تغلق أو تقتطع مزايا باستمرار، بينما Linkding يعطيك ملكية كاملة لبياناتك بلا اشتراك ولا إعلانات. بساطته المقصودة — بلا ميزات منتفخة — هي بالضبط سبب محبته وثباته.",
      en: "Cloud bookmarking services keep shutting down or paywalling features, while Linkding gives you full ownership of your data with no subscription and no ads. Its deliberate simplicity — no bloated features — is exactly why people love it and stick with it."
    },
    how: {
      ar: [
        "جهّز خادماً صغيراً أو Raspberry Pi عليه Docker.",
        "شغّل الحاوية الرسمية بضغطة واحدة كما في تعليمات المستودع.",
        "أنشئ حسابك الأول وابدأ بحفظ روابطك مع الوسوم.",
        "ثبّت إضافة المتصفح للتخزين الفوري من أي صفحة.",
        "فعّل الأرشفة النصية ليبحث الخادم داخل محتوى الصفحات لا في العناوين فقط."
      ],
      en: [
        "Set up a small server or a Raspberry Pi with Docker.",
        "Launch the official container with the single command from the repository docs.",
        "Create your first account and start saving bookmarks with tags.",
        "Install the browser extension for one-click saving from any page.",
        "Enable text archiving so the server searches inside page content, not just titles."
      ]
    },
    tags: ["linkding", "bookmarks", "استضافة-ذاتية", "docker", "open-source", "github"]
  },
  {
    slug: "reverse-engineering-book",
    cat: "gems",
    icon: "🧩",
    name: { ar: "كتاب الهندسة العكسية المجاني", en: "The Free Reverse-Engineering Book" },
    url: "https://github.com/mytechnotalent/Reverse-Engineering",
    desc: {
      ar: "مستودع Reverse-Engineering للمؤلف Kevin Thomas كتاب جامعي كامل مجاني بأكثر من 900 صفحة يعلّم الهندسة العكسية للأنظمة x64 خطوة بخطوة: من لغة التجميع إلى تحليل الذاكرة إلى كسر الحمايات في مختبرات عملية بأدوات مفتوحة المصدر بالكامل. يُحدَّث باستمرار ويُقرأ مباشرة من GitHub أو PDF.",
      en: "The Reverse-Engineering repository by Kevin Thomas is a complete, free, 900+ page university-grade book teaching x64 reverse engineering step by step: from assembly language to memory analysis to defeating protections, with hands-on labs built entirely on open-source tools. Continuously updated and readable straight from GitHub or PDF."
    },
    why: {
      ar: "المصادر الجادة في الهندسة العكسية نادرة ومكلفة، وهذا الكتاب يقدمها مجاناً بجودة مناهج الشهادات المدفوعة. هو أيضاً أفضل دفاع عملي: من يفهم كيف تُكسر البرامج يكتب برامج أكثر صلابة.",
      en: "Serious reverse-engineering material is rare and expensive; this book delivers it free at the quality of paid certifications. It is also the best practical defense: understanding how software is broken teaches you to build it stronger."
    },
    how: {
      ar: [
        "افتح المستودع وحمّل أحدث نسخة PDF أو اقرأها على GitHub مباشرة.",
        "أنشئ جهاز Ubuntu افتراضياً معزولاً كمختبر تجارب.",
        "ثبّت الأدوات المذكورة: GDB مع تمديدات GEF، ولينكس مخصص للتجارب.",
        "اقرأ الفصول بالترتيب ونفّذ كل مختبر عملي بيدك — لا تتجاوز التمارين.",
        "وثّق ملاحظاتك وابنِ من الخبرة مساراً نحو التحليل الثنائي المتقدم."
      ],
      en: [
        "Open the repository and grab the latest PDF or read it directly on GitHub.",
        "Create an isolated Ubuntu virtual machine as your lab.",
        "Install the listed tooling: GDB with the GEF extension and related utilities.",
        "Read the chapters in order and complete every hands-on lab yourself — never skip exercises.",
        "Keep notes and build from the fundamentals toward advanced binary analysis."
      ]
    },
    tags: ["reverse-engineering", "assembly", "هندسة-عكسية", "security", "open-source", "github"]
  },
  {
    slug: "jan",
    cat: "gems",
    icon: "🤖",
    name: { ar: "Jan — مساعد AI كامل يعمل دون إنترنت", en: "Jan — A Full AI Assistant That Runs Offline" },
    url: "https://github.com/janhq/jan",
    desc: {
      ar: "Jan بديل مفتوح المصدر لتطبيقات ChatGPT يعمل بالكامل على جهازك: ينزّل نماذج لغوية مفتوحة مثل Llama وMistral ويشغّلها محلياً بواجهة دردشة أنيقة، مع خادم API متوافق مع OpenAPI لاستخدامه في تطبيقاتك. لا رسوم اشتراك، لا إرسال بيانات، ولا حاجة لإنترنت بعد التنزيل.",
      en: "Jan is an open-source ChatGPT alternative that runs entirely on your machine: it downloads open models like Llama and Mistral and serves them locally behind a polished chat UI, plus an OpenAI-compatible API server for your own apps. No subscription, no data leaving the device, and no internet needed after download."
    },
    why: {
      ar: "الخصوصية الكاملة مع ذكاء اصطناعي قوي كانت حلماً، وJan يجعلها حقيقة على لابتوب عادي. مثالي للعمل على بيانات حساسة، والسفر دون اتصال، وفهم كيف تعمل النماذج اللغوية من الداخل فعلاً.",
      en: "Full privacy with a capable AI was a dream; Jan makes it real on an ordinary laptop. Perfect for sensitive data, offline travel, and genuinely understanding how language models work under the hood."
    },
    how: {
      ar: [
        "نزّل Jan لنظامك من المستودع أو الموقع الرسمي jan.ai.",
        "افتح مركز النماذج ونزّل نموذجاً مناسباً لذاكرتك (مثل Llama 3 صغير الحجم).",
        "ابدأ دردشة محلية وتحقق من سرعة الاستجابة على جهازك.",
        "فعّل خادم API المحلي واستخدمه من أي تطبيق يدعم واجهة OpenAI.",
        "جرّب نماذج متعددة وقارن الجودة بالسرعة لتختار ما يناسب مهامك."
      ],
      en: [
        "Download Jan for your OS from the repository or the official site jan.ai.",
        "Open the Hub and pull a model that fits your memory (like a small Llama 3).",
        "Start a local chat and check response speed on your hardware.",
        "Enable the local API server and use it from any OpenAI-compatible app.",
        "Experiment with several models and compare quality versus speed for your tasks."
      ]
    },
    tags: ["jan", "ai", "ذكاء-اصطناعي", "local-llm", "privacy", "open-source"]
  },
  {
    slug: "windmill",
    cat: "gems",
    icon: "🌬️",
    name: { ar: "Windmill — حوّل السكربتات إلى تطبيقات وسير عمل", en: "Windmill — Turn Scripts into Apps and Workflows" },
    url: "https://github.com/windmill-labs/windmill",
    desc: {
      ar: "Windmill منصة مفتوحة المصدر تحوّل سكربتات Python وTypeScript وGo وBash إلى واجهات داخلية وسير عمل مجدولة في دقائق: اكتب دالة عادية، فيولّد النظام لها واجهة مستخدم تلقائياً، ويربطها بخطوات أخرى بمرئيات جميلة. بديل مغرٍ لـ Zapier وAirflow ذاتي الاستضافة يخدم فرق العمليات الداخلية.",
      en: "Windmill is an open-source platform that turns Python, TypeScript, Go and Bash scripts into internal apps and scheduled workflows in minutes: write a normal function and the system auto-generates its UI and links it into other steps through beautiful visual flows. A compelling self-hosted alternative to Zapier and Airflow for internal operations teams."
    },
    why: {
      ar: "أتمتة الفرق الصغيرة تُدفن عادة في كرون وأوراق جوجل؛ Windmill يمنحها منصة قوية بنفس جودة أدوات المؤسسات الكبيرة لكن مجاناً وعلى خادمك. أسرع طريق من فكرة سكربت إلى أداة يستخدمها الزملاء فعلاً.",
      en: "Small-team automation usually drowns in cron jobs and spreadsheets; Windmill gives it an enterprise-grade platform for free, on your own server. It is the fastest path from a script idea to a tool colleagues actually use."
    },
    how: {
      ar: [
        "شغّل الخادم عبر Docker Compose من تعليمات المستودع الرسمية.",
        "اكتب سكربت Python بسيطاً داخل المحرر ولاحظ توليد واجهته تلقائياً.",
        "اربط عدة سكربتات في سير عمل مرئي بشرطات ومسارات بديلة.",
        "جدّل التشغيل أو اربطه بخطاف ويب خارجي.",
        "شارك التطبيق الناتج مع فريقك بصلاحيات محددة."
      ],
      en: [
        "Start the server with Docker Compose following the official repository docs.",
        "Write a simple Python script in the editor and watch its UI generate automatically.",
        "Chain several scripts into a visual workflow with conditions and alternative paths.",
        "Schedule runs or trigger them from external webhooks.",
        "Share the resulting app with your team under fine-grained permissions."
      ]
    },
    tags: ["windmill", "automation", "أتمتة", "self-hosted", "open-source", "github"]
  },
  {
    slug: "memos",
    cat: "gems",
    icon: "🗒️",
    name: { ar: "Memos — تويتر خاص لملاحظاتك الذهنية", en: "Memos — A Private Twitter for Your Thoughts" },
    url: "https://github.com/usememos/memos",
    desc: {
      ar: "Memos خدمة ملاحظات ذاتية الاستضافة بتجربة شبيهة بتدوينة مصغرة: تكتب فكرة سريعة، تُخزن فوراً في قاعدة بيانات ملكك، وتبقى قابلة للبحث بالوسوم والروابط بين الملاحظات. واجهتها خفيفة وجميلة، وتعمل من حاوية واحدة على أي خادم صغير.",
      en: "Memos is a self-hosted note service with a micro-blog feel: jot a quick thought, it is stored instantly in a database you own, and stays searchable through tags and note-to-note links. The interface is light and lovely, running from a single container on any small server."
    },
    why: {
      ar: "أفكارك ليست محتوى لمنصة تملكها شركة أخرى؛ Memos يعيد مفهوم التدوين المصغر لصاحبه. سرعة الكتابة فيه تفوق تطبيقات الملاحظات التقليدية، وهذا وحده يضمن أن تسجل أفكارك فعلاً بدل تأجيلها.",
      en: "Your thoughts are not content for a platform owned by someone else; Memos gives micro-blogging back to its owner. Writing there is faster than classic note apps, which alone ensures you actually capture ideas instead of postponing them."
    },
    how: {
      ar: [
        "شغّل حاوية Memos عبر Docker على خادمك أو Raspberry Pi.",
        "أنشئ حسابك وابدأ بتدوين أول ملاحظة خلال دقائق.",
        "نظّم الوسوم والروابط بين الملاحظات لبناء شبكة معرفتك.",
        "فعّل النسخ الاحتياطي الدوري لمجلد البيانات.",
        "استخدم التطبيقات المتوافقة من الجوال للكتابة من أي مكان."
      ],
      en: [
        "Run the Memos container via Docker on your server or a Raspberry Pi.",
        "Create your account and write your first memo within minutes.",
        "Organize tags and inter-note links to grow your knowledge web.",
        "Enable periodic backups of the data directory.",
        "Use the compatible mobile clients to write from anywhere."
      ]
    },
    tags: ["memos", "notes", "ملاحظات", "self-hosted", "open-source", "github"]
  },
  {
    slug: "excalidraw",
    cat: "gems",
    icon: "✏️",
    name: { ar: "Excalidraw — سبورة برمجية بأسلوب يدوي ساحر", en: "Excalidraw — Virtual Whiteboard with a Hand-Drawn Charm" },
    url: "https://github.com/excalidraw/excalidraw",
    desc: {
      ar: "Excalidraw سبورة افتراضية مفتوحة المصدر ترسم الأشكال بأسلوب اليد الحر الذي يجعل المخططات التقنية ودودة ومقروءة. تعمل مباشرة في المتصفح بدون حساب، وتدعم التعاون الحي عبر رابط مشاركة، ويمكن استضافتها ذاتياً أو دمجها في تطبيقاتك كمكتبة React.",
      en: "Excalidraw is an open-source virtual whiteboard whose hand-drawn style makes technical diagrams friendly and readable. It runs in the browser with no account, supports live collaboration via a share link, and can be self-hosted or embedded in your apps as a React library."
    },
    why: {
      ar: "المخططات الجميلة جداً تخيف القارئ والمحرجة القديمة تشوشه؛ أسلوب Excalidraw في المنتصف تماماً: جدي في المحتوى لطيف في الشكل. أصبح لغة موحدة لشرح الأنظمة في مئات الشركات والمجتمعات المفتوحة.",
      en: "Over-polished diagrams intimidate readers while messy ones confuse them; Excalidraw nails the middle: serious content with a friendly face. It has become the shared language for explaining systems across hundreds of companies and open communities."
    },
    how: {
      ar: [
        "افتح excalidraw.com وابدأ الرسم فوراً — لا تسجيل.",
        "ارسم معمارية مشروعك: صناديق ووصلات وملاحظات.",
        "شارك رابطاً حياً ليرى الزملاء الرسم يتشكل لحظة بلحظة.",
        "صدّر الناتج PNG أو SVG وأدرجه في التوثيق.",
        "للفرق: استضف نسختك الخاصة أو استخدم المكتبة داخل منتجك."
      ],
      en: [
        "Open excalidraw.com and start drawing immediately — no sign-up.",
        "Sketch your project architecture: boxes, connectors and notes.",
        "Share a live link so colleagues watch the drawing form in real time.",
        "Export to PNG or SVG and embed it in documentation.",
        "For teams: self-host it or embed the library inside your product."
      ]
    },
    tags: ["excalidraw", "diagrams", "مخططات", "whiteboard", "open-source", "github"]
  },
  {
    slug: "markwhen",
    cat: "gems",
    icon: "📅",
    name: { ar: "Markwhen — جدول زمني من نص ماركداون", en: "Markwhen — Timelines from Markdown Text" },
    url: "https://github.com/kochrt/markwhen",
    desc: {
      ar: "Markwhen أداة عبقرية ببساطتها: تكتب تواريخ وأحداثاً في نص ماركداون عادي، فتحولها فوراً إلى مخطط جانت زمني أنيق قابل للتصدير. لا حسابات ولا خوادم، والمستودع مفتوح للاستضافة الذاتية والدمج، والصيغة النصية تعني أن خططك تبقى قابلة للإصدار في Git.",
      en: "Markwhen is brilliantly simple: you write dates and events as plain Markdown text and it instantly turns them into an elegant, exportable timeline/Gantt view. No accounts, no servers, the repository is open for self-hosting and embedding, and the text format means your plans stay versionable in Git."
    },
    why: {
      ar: "أدوات إدارة المشاريع التقليدية بطيئة وثقيلة لخطط صغيرة؛ Markwhen يعطيك صورة زمنية واضحة بسرعة الكتابة. مثالي لخطط المحتوى وجداول الإصدارات وتخطيط الرحلات وأي شيء يُشرح أفضل بخط زمني.",
      en: "Traditional project tools are heavy for small plans; Markwhen gives you a clear time picture at typing speed. Perfect for content calendars, release schedules, trip planning and anything explained best on a timeline."
    },
    how: {
      ar: [
        "افتح markwhen.com واكتب نطاق تاريخاً في أول سطر.",
        "أضف الأحداث أسفله كل حدث في سطر مع تاريخه.",
        "شاهد المخطط يتشكل يساراً/يميناً أثناء الكتابة.",
        "استخدم الوسوم والألوان لتجميع المسارات.",
        "صدّر الصورة أو SVG أو انسخ النص إلى مستودع مشروعك كوثيقة حية."
      ],
      en: [
        "Open markwhen.com and write a date range on the first line.",
        "Add events below, one per line with its date.",
        "Watch the timeline build itself as you type.",
        "Use tags and colors to group tracks.",
        "Export PNG or SVG, or keep the text in your project repository as living documentation."
      ]
    },
    tags: ["markwhen", "gantt", "جدولة", "markdown", "open-source", "github"]
  }
];
