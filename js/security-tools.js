/**
 * DouNest v4 — Rare tools: SECURITY (اختبار الاختراق الأخلاقي)
 * -------------------------------------------------------------
 * 10 information-only pages for famous open-source security tools.
 * IMPORTANT: these are NOT interactive tools — each page links out to the
 * official project and carries a mandatory legal warning. All /rare/security/
 * pages are noindex,nofollow and excluded from the sitemap (build.mjs).
 * Pure data module (Node-safe: imported by build.mjs).
 */

export const SECURITY_WARNING = {
  ar: "⚠️ هذه الأدوات مخصصة لاختبار الاختراق الأخلاقي والأنظمة التي تملك إذنًا صريحًا باختبارها. استخدامها على أنظمة لا تملك صلاحية بها يعتبر جريمة في معظم الدول.",
  en: "⚠️ These tools are intended for ethical penetration testing on systems you have explicit permission to test. Using them on systems you are not authorized to access is a crime in most countries."
};

export const SECURITY_TOOLS = [
  {
    slug: "nmap",
    cat: "security",
    icon: "📡",
    name: { ar: "Nmap — ماسح الشبكات الأشهر", en: "Nmap — The Famous Network Scanner" },
    url: "https://nmap.org",
    desc: {
      ar: "Nmap هو ماسح الشبكات الأشهر في التاريخ وأساس أي اختبار اختراق محترم: يكتشف الأجهزة الحية في الشبكة، والمنافذ المفتوحة عليها، والخدمات العاملة، وحتى نظام التشغيل التقريبي لكل جهاز. صدر أول مرة عام 1997 وما زال يتطور باستمرار، ويدعم مئات السكربتات الجاهزة لفحص الثغرات الشائعة عبر محرك NSE.",
      en: "Nmap is the most famous network scanner in history and the foundation of any serious penetration test: it discovers live hosts, open ports, running services and even the approximate operating system of each device. First released in 1997, it is still actively developed and ships hundreds of ready-made vulnerability-check scripts through its NSE engine."
    },
    why: {
      ar: "أي مختبر اختراق أخلاقي يبدأ رحلته بـ Nmap؛ تعلّم قراءة نتائجه يمنحك فهماً عميقاً لكيفية عمل الشبكات وكيف يرى المهاجم شبكتك. كما يستخدمه مدراء الشبكات لاكتشاف الأجهزة غير المصرح بها ومراقبة ما هو مفتوح فعلاً على خوادمهم.",
      en: "Every ethical hacker's journey starts with Nmap; learning to read its output gives you a deep understanding of networks and how an attacker sees your infrastructure. Network admins also use it to find unauthorized devices and audit what is really exposed on their servers."
    },
    how: {
      ar: [
        "نزّل Nmap من الموقع الرسمي nmap.org وثبّته على نظامك (متوفر لويندوز ولينكس وماك).",
        "أنشئ مختبراً شخصياً: جهاز افتراضي أو راوتر خاص بك تملك إذناً صريحاً بفحصه.",
        "ابدأ بأمر بسيط: nmap -sV 192.168.1.1 لفحص المنافذ والخدمات على جهازك.",
        "اقرأ النتائج: كل سطر يوضح منفذاً مفتوحاً واسم الخدمة وإصدارها المحتمل.",
        "جرّب خيارات متقدمة مثل nmap -A للفحص العميق، ووثّق نتائجك دائماً في تقرير مكتوب."
      ],
      en: [
        "Download Nmap from the official site nmap.org and install it (Windows, Linux and macOS are supported).",
        "Build a personal lab: a virtual machine or your own router that you have explicit permission to test.",
        "Start simple: nmap -sV 192.168.1.1 to scan ports and services on your own host.",
        "Read the output: each line shows an open port, the service name and its probable version.",
        "Try advanced flags like nmap -A for a deep scan, and always document your findings in a written report."
      ]
    },
    tags: ["nmap", "network", "أمن-معلومات", "pentest", "ethical-hacking", "مسح-المنافذ"]
  },
  {
    slug: "wireshark",
    cat: "security",
    icon: "🔬",
    name: { ar: "Wireshark — مجهر حزم الشبكة", en: "Wireshark — The Network Packet Microscope" },
    url: "https://www.wireshark.org",
    desc: {
      ar: "Wireshark هو محلل حزم الشبكة الأقوى والأشهر عالمياً، ويسمح لك برؤية كل ما يعبر بطاقة الشبكة لحظة بلحظة: طلبات DNS، مصافحات TLS، حزم TCP، وحتى محتوى الاتصالات غير المشفرة. تدعم مئات البروتوكولات وتعرض كل حزمة بتفاصيلها الكاملة مع فلاتر عرض تُعد من أقوى ما في المجال.",
      en: "Wireshark is the world's most powerful and famous packet analyzer, letting you see everything crossing your network interface in real time: DNS queries, TLS handshakes, TCP segments and even the content of unencrypted traffic. It supports hundreds of protocols, shows every packet in full detail, and its display filters are second to none."
    },
    why: {
      ar: "لا يوجد أسلوب أفضل لفهم كيف تعمل الشبكات فعلاً من مشاهدة الحزم بعينك المجردة. يستخدمه محققو الأمن لتحليل الهجمات، ومديرو الشبكات لتشخيص البطء والأعطال، والمطورين لتصحيح بروتوكولاتهم — أداة واحدة تخدم ثلاث فئات ضخمة.",
      en: "Nothing teaches you how networks truly work like watching raw packets with your own eyes. Security investigators use it to analyze attacks, network admins to diagnose slowness and outages, and developers to debug their own protocols — one tool serving three huge audiences."
    },
    how: {
      ar: [
        "نزّل Wireshark من wireshark.org وثبّته (على ويندوز ثبّت Npcap أيضاً لالتقاط الحزم).",
        "اختر واجهة الشبكة النشطة (Wi-Fi أو Ethernet) واضغط على زر الزعنفة لبدء الالتقاط.",
        "استخدم فلتر العرض مثل http أو dns أو ip.addr == 192.168.1.10 لتصفية الضجيج.",
        "انقر أي حزمة لرؤية طبقاتها: الإيثرنت ثم IP ثم البروتوكول ثم البيانات.",
        "التقط في شبكتك الخاصة فقط، وحلّل ما تجمعه لفهم مصافحة الاتصالات وكيف تسير البيانات فعلاً."
      ],
      en: [
        "Download Wireshark from wireshark.org and install it (on Windows also install Npcap for packet capture).",
        "Pick your active interface (Wi-Fi or Ethernet) and click the fin icon to start capturing.",
        "Use a display filter like http, dns or ip.addr == 192.168.1.10 to cut the noise.",
        "Click any packet to inspect its layers: Ethernet, then IP, then the protocol, then the payload.",
        "Capture only on your own network, and study what you collect to understand handshakes and real data flow."
      ]
    },
    tags: ["wireshark", "packets", "شبكات", "ethical-hacking", "أمن-معلومات", "forensics"]
  },
  {
    slug: "burp-suite",
    cat: "security",
    icon: "🧪",
    name: { ar: "Burp Suite — منصة اختبار تطبيقات الويب", en: "Burp Suite — Web App Testing Platform" },
    url: "https://portswigger.net/burp",
    desc: {
      ar: "Burp Suite من شركة PortSwigger هو المعيار الذهبي لاختبار أمان تطبيقات الويب: يعمل كبروكسي وسيط يمرّر كل طلبات المتصفح عبره، فيتيح لك اعتراض أي طلب وتعديله وإعادة إرساله، واكتشاف الثغرات خطوة بخطوة. النسخة المجانية Community كافية للتعلم، وأكاديمية PortSwigger Web Security Academy تقدم منهاجاً مجانياً كاملاً بالتوازي معها.",
      en: "Burp Suite by PortSwigger is the gold standard for web application security testing: it acts as an intercepting proxy through which all browser traffic flows, letting you capture, modify and replay any request and uncover vulnerabilities step by step. The free Community Edition is enough for learning, and the PortSwigger Web Security Academy offers a complete free curriculum alongside it."
    },
    why: {
      ar: "معظم ثغرات الويب الخطيرة تُكتشف يدوياً بالاعتراض والتحليل، وهذا بالضبط ما تتقنه أداة Burp. من يتعلمها بجدية يفتح نفسه باباً مهنياً حقيقياً، فمختبرو الاختراق في الشركات الكبرى يعيشون داخل هذه الأداة يومياً.",
      en: "Most serious web vulnerabilities are found manually through interception and analysis — exactly the skill Burp builds. Mastering it opens a genuine career door: penetration testers at major companies live inside this tool every day."
    },
    how: {
      ar: [
        "نزّل نسخة Community المجانية من portswigger.net وثبّتها.",
        "شغّل Burp واضبط متصفح Firefox في مختبرك لاستخدام البروكسي على 127.0.0.1:8080.",
        "فعّل تبويب Intercept وتصفح تطبيقاً تجريبياً منPortSwigger Web Security Academy.",
        "عدّل الطلبات المعترضة وأعد إرسالها عبر Repeater ولاحظ اختلاف الاستجابات.",
        "أكمل مسارات الأكاديمية المجانية بالتدرج: SQL Injection ثم XSS ثم منطق التطبيقات."
      ],
      en: [
        "Download the free Community Edition from portswigger.net and install it.",
        "Launch Burp and configure Firefox in your lab to use the proxy at 127.0.0.1:8080.",
        "Enable the Intercept tab and browse a practice app from the PortSwigger Web Security Academy.",
        "Modify intercepted requests and replay them via Repeater, observing how responses change.",
        "Work through the free Academy paths progressively: SQL Injection, then XSS, then application logic."
      ]
    },
    tags: ["burp-suite", "web-security", "أمن-تطبيقات", "pentest", "ethical-hacking", "portswigger"]
  },
  {
    slug: "nuclei",
    cat: "security",
    icon: "⚛️",
    name: { ar: "Nuclei — ماسح الثغرات القائم على القوالب", en: "Nuclei — Template-Based Vulnerability Scanner" },
    url: "https://github.com/projectdiscovery/nuclei",
    desc: {
      ar: "Nuclei من مشروع Discovery هو ماسح ثغرات حديث مفتوح المصدر يعمل بنظام قوالب YAML بسيطة: كل قالب تصف ثغرة معروفة وكيفية فحصها، والمجتمع يضيف آلاف القوالب الجديدة أسبوعياً. سريع جداً، مكتوب بلغة Go، ويمكنه فحص آلاف الأهداف المملوكة لك في دقائق مع تقارير منظمة.",
      en: "Nuclei by ProjectDiscovery is a modern open-source vulnerability scanner driven by simple YAML templates: each template describes a known vulnerability and how to detect it, and the community adds thousands of new templates continuously. Written in Go, it is extremely fast and can scan thousands of assets you own in minutes with organized reports."
    },
    why: {
      ar: "فلسفة القوالب جعلت Nuclei المفضل لدى فرق الأمن الحديثة: يسهل كتابة فحص مخصص لنقطتك الخاصة ونشره لفريقك، ودمجه في خطوط CI/CD لمراقبة الأصول الجديدة تلقائياً. هو أيضاً ممتاز لفهم كيف تبدو الثغرة من زاوية الماسح.",
      en: "The template philosophy made Nuclei a favorite of modern security teams: writing a custom check for your own edge case and sharing it with your team is trivial, and it slots into CI/CD pipelines to watch new assets automatically. It is also a great way to understand what a vulnerability looks like from a scanner's perspective."
    },
    how: {
      ar: [
        "ثبّت Nmap ثم ثبّت Nuclei باتباع تعليمات مستودع GitHub الرسمي (go install أو الملف الجاهز).",
        "حدّث قوالب الفحص بالأمر nuclei -update-templates.",
        "افحص نطاقاً تملكه: nuclei -u example.com -severity medium,high.",
        "اقرأ التقرير الناتج وفهم كل إشعار قبل التعامل معه كحقيقة.",
        "اكتب قالب YAML خاصاً بك لفحص رأس أمني مخصص في تطبيقك."
      ],
      en: [
        "Install Nuclei by following the official GitHub repository instructions (go install or a prebuilt binary).",
        "Update the scan templates with nuclei -update-templates.",
        "Scan a domain you own: nuclei -u example.com -severity medium,high.",
        "Read the resulting report and validate each finding before treating it as fact.",
        "Write your own YAML template to check a custom security header on your app."
      ]
    },
    tags: ["nuclei", "vulnerability", "مسح-الثغرات", "projectdiscovery", "ethical-hacking", "أمن-معلومات"]
  },
  {
    slug: "sqlmap",
    cat: "security",
    icon: "💉",
    name: { ar: "SQLmap — أتمتة اكتشاف SQL Injection", en: "SQLmap — Automated SQL Injection Discovery" },
    url: "https://sqlmap.org",
    desc: {
      ar: "SQLmap هو الأداة المرجعية لاكتشاف واستغلال ثغرات حقن SQL تلقائياً: تعطيها طلباً واحداً تحتوي معاملاً مشتبهاً به، فتجرّب عشرات تقنيات الحقن، وتحدد نوع قاعدة البيانات، ويمكنها سرد الجداول والأعمدة في بيئات مملوكة لك. مفتوحة المصدر بلغة Python وتدعم كل محركات القواعد المعروفة تقريباً.",
      en: "SQLmap is the reference tool for detecting and exploiting SQL injection automatically: feed it a single request containing a suspicious parameter and it tries dozens of injection techniques, fingerprints the database, and can enumerate tables and columns in environments you own. Open source, written in Python, and supporting nearly every known database engine."
    },
    why: {
      ar: "فهم كيف تجد أداة مؤتمتة ثغرة SQL Injection يعلّمك كيف تمنعها في كودك: التحقق من المدخلات، الاستعلامات المعلمة، ومبدأ أقل صلاحية. هي أيضاً أداة أساسية في تقارير اختبار الاختراق المهنية حول العالم.",
      en: "Understanding how an automated tool finds SQL injection teaches you exactly how to prevent it in your code: input validation, parameterized queries and least privilege. It is also a staple of professional penetration test reports worldwide."
    },
    how: {
      ar: [
        "ثبّت Python ثم نزّل SQLmap من sqlmap.org وشغّلها من سطر الأوامر.",
        "أنشئ مختبراً مثل تطبيق DVWA أو bWAPP داخل جهاز افتراضي معزول.",
        "التقط طلباً فيه معامل بحث من المتصفح واحفظه في ملف نصي.",
        "شغّل: python sqlmap.py -r request.txt --batch ودعها تفحص المعاملات.",
        "اقرأ سجل العملية لتفهم كيف بدأت وكيف اكتُشفت الثغرة، ثم أصلح الكود المصاب في تطبيقك التجريبي."
      ],
      en: [
        "Install Python, download SQLmap from sqlmap.org and run it from the command line.",
        "Set up a lab such as DVWA or bWAPP inside an isolated virtual machine.",
        "Capture a browser request containing a search parameter and save it to a text file.",
        "Run: python sqlmap.py -r request.txt --batch and let it analyze the parameters.",
        "Read the log to understand how the injection started and was detected, then fix the vulnerable code in your practice app."
      ]
    },
    tags: ["sqlmap", "sql-injection", "حقن", "databases", "ethical-hacking", "أمن-معلومات"]
  },
  {
    slug: "metasploit",
    cat: "security",
    icon: "🧰",
    name: { ar: "Metasploit — إطار عمل اختبار الاختراق الكامل", en: "Metasploit — The Full Penetration Testing Framework" },
    url: "https://www.metasploit.com",
    desc: {
      ar: "Metasploit هو أشهر إطار عمل لاختبار الاختراق في العالم: يضم آلاف الوحدات لاكتشاف الثغرات واستغلالها وإنشاء الأحمال (payloads) والتعامل مع الجلسات بعد الاستغلال. مفتوح المصدر بنسخته Framework، وتشتري الشركات النسخة الاحترافية لتقاريرها المتقدمة. تعلّمه يشبه تعلم لغة كاملة لمجال الأمن دفعة واحدة.",
      en: "Metasploit is the world's most famous penetration testing framework: thousands of modules for finding vulnerabilities, exploiting them, generating payloads and managing post-exploitation sessions. Open source as the Framework edition, while companies buy the Pro edition for its advanced reporting. Learning it feels like learning an entire language for security in one go."
    },
    why: {
      ar: "Metasploit يعلّمك الدورة الكاملة: من الفحص إلى الاستغلال إلى رفع الصلاحيات إلى كتابة التقرير. فهم آلية عمل الاستغلالات يجعلك مدافعاً أفضل بكثير، لأنك تعرف كيف يفكر الطرف الآخر فعلاً.",
      en: "Metasploit teaches the whole cycle: recon, exploitation, privilege escalation and reporting. Understanding how exploits actually work makes you a far better defender, because you know exactly how the other side thinks."
    },
    how: {
      ar: [
        "ثبّت Metasploit Framework على نظام Kali Linux أو عبر المثبّت الرسمي.",
        "افتح وحدة التحكم msfconsole واستكشف الأوامر الأساسية: search وuse وinfo.",
        "داخل مختبرك المعزول، جرّب وحدة بسيطة مثل ms17_010 ضد جهاز ويندوز قديم تملكه.",
        "اضبط الخيارات بأمر set ثم شغّل exploit وادرس الجلسة الناتجة.",
        "اقرأ وثائق الوحدات لتفهم كل خيار بدل حفظ الأوامر، ووثّق تجاربك."
      ],
      en: [
        "Install Metasploit Framework on Kali Linux or via the official installer.",
        "Open the msfconsole and explore the core commands: search, use and info.",
        "Inside your isolated lab, try a simple module like ms17_010 against an old Windows machine you own.",
        "Set the options with the set command, run the exploit, and study the resulting session.",
        "Read module documentation to truly understand each option instead of memorizing commands, and document your experiments."
      ]
    },
    tags: ["metasploit", "exploitation", "اختراق-أخلاقي", "kali", "ethical-hacking", "أمن-معلومات"]
  },
  {
    slug: "hashcat",
    cat: "security",
    icon: "🔓",
    name: { ar: "Hashcat — فك تشفير الهاش بأقصى سرعة", en: "Hashcat — World's Fastest Password Recovery" },
    url: "https://hashcat.net/hashcat/",
    desc: {
      ar: "Hashcat هو أسرع أداة في العالم لكسر البصمات المشفرة (hashes): يستغل كامل قوة كرت الشاشة GPU لاختبار مليارات التخمينات في الثانية، ويدعم أكثر من 300 خوارزمية تشفير وأنماط هجوم متعددة من القاموس إلى القناع إلى القواعد التوليدية. مفتوح المصدر ويعمل على لينكس وويندوز وماك.",
      en: "Hashcat is the world's fastest password recovery tool: it harnesses the full power of your GPU to test billions of guesses per second, supports over 300 hashing algorithms and multiple attack modes from dictionary to mask to rule-based. Open source, running on Linux, Windows and macOS."
    },
    why: {
      ar: "أفضل طريقة لإقناع المستخدمين وأصحاب الأنظمة بأهمية كلمات المرور الطويلة أن يروا بأعينهم كم سرعة كسر كلمة مرور ضعيفة. يستخدمه فرق الاستجابة للحوادث للتحقق من بصمات كلمات المرور المسربة قبل فرض إعادة تعيينها.",
      en: "Nothing convinces users and system owners to adopt long passwords like seeing how fast a weak one falls. Incident response teams also use it to verify leaked password hashes before forcing resets."
    },
    how: {
      ar: [
        "نزّل Hashcat من hashcat.net وتأكد من تثبيت تعريفات GPU الصحيحة.",
        "أنشئ ملف هاش اختباري في مختبرك (مثلاً MD5 لنص معروف).",
        "شغّل هجوماً بسيطاً: hashcat -m 0 -a 0 hashes.txt wordlist.txt بقاموس مثل rockyou.",
        "راقب سرعة الاختبار الظاهرة على الشاشة وفهم رمز وضع الخوارزمية.",
        "جرّب نمط القناع -a 3 لفهم كيف تختصر الأنماط المعروفة زمن الكسر، ثم اربط النتيجة بسياسات كلمات المرور."
      ],
      en: [
        "Download Hashcat from hashcat.net and make sure the right GPU drivers are installed.",
        "Create a test hash file in your lab (for example an MD5 of a known string).",
        "Run a simple attack: hashcat -m 0 -a 0 hashes.txt wordlist.txt with a wordlist like rockyou.",
        "Watch the reported testing speed and learn the algorithm mode code.",
        "Try mask mode -a 3 to see how known patterns cut cracking time, then connect the result to password policy design."
      ]
    },
    tags: ["hashcat", "passwords", "كلمات-المرور", "gpu", "ethical-hacking", "أمن-معلومات"]
  },
  {
    slug: "john-the-ripper",
    cat: "security",
    icon: "🗝️",
    name: { ar: "John the Ripper — الأداة الكلاسيكية لكسر الهاش", en: "John the Ripper — The Classic Password Cracker" },
    url: "https://www.openwall.com/john/",
    desc: {
      ar: "John the Ripper هو الأداة الكلاسيكية الأقدم لاختبار قوة كلمات المرور، صدرت عام 1996 وما زالت قلب حزمة Jumbo الموسعة التي تدعم مئات الصيغ. تعمل على المعالج CPU بشكل ممتاز، مما يجعلها الخيار المفضل على الأنظمة بدون كرت شاشة قوي، ومعروفة بذكائها في تخمين الأنماط الشائعة تلقائياً.",
      en: "John the Ripper is the classic, veteran password strength testing tool, first released in 1996 and still the heart of the expanded Jumbo package supporting hundreds of formats. It performs excellently on CPU, making it the go-to choice on machines without a strong GPU, and it is famous for smartly guessing common patterns automatically."
    },
    why: {
      ar: "تقدم John مقاربة تعليمية رائعة: أوضاع الهجوم الثلاثة (قاموس، وضع أحادي Incremental، وخلط القواعد) تشرح لك مفاهيم أساسية في أمن كلمات المرور أفضل من أي كتاب. وهي أخف وزناً بكثير من Hashcat للتجارب السريعة على أي جهاز.",
      en: "John offers a wonderful learning curve: its three attack modes (dictionary, incremental and rule-based) explain core password security concepts better than any book. It is also much lighter than Hashcat for quick experiments on any machine."
    },
    how: {
      ar: [
        "ثبّت نسخة John the Ripper Jumbo من مستودع openwall الرسمي أو من مستودعات لينكس.",
        "جهّز ملف هاش من نظامك التجريبي (مثل unshadow لدمج المستخدمين وكلمات المرور).",
        "ابدأ بالوضع التلقائي: john hashes.txt ودعه يجرب استراتيجياته الافتراضية.",
        "راقب الأمر john --show لعرض ما تم كسره حتى الآن.",
        "جرّب وضع القاموس مع قواعد: john --wordlist=rockyou.txt --rules hashes.txt وقارن النتائج."
      ],
      en: [
        "Install John the Ripper Jumbo from the official openwall repository or your Linux distro's packages.",
        "Prepare a hash file from your test system (for example unshadow to merge users and passwords).",
        "Start with automatic mode: john hashes.txt and let its default strategies run.",
        "Use john --show to display what has been cracked so far.",
        "Try dictionary mode with rules: john --wordlist=rockyou.txt --rules hashes.txt and compare results."
      ]
    },
    tags: ["john-the-ripper", "passwords", "كلمات-المرور", "classic-tools", "ethical-hacking", "أمن-معلومات"]
  },
  {
    slug: "sherlock",
    cat: "security",
    icon: "🔎",
    name: { ar: "Sherlock — تعقب اسم المستخدم عبر المئات من المواقع", en: "Sherlock — Hunt a Username Across Hundreds of Sites" },
    url: "https://github.com/sherlock-project/sherlock",
    desc: {
      ar: "Sherlock مشروع مفتوح المصدر بلغة Python يبحث عن اسم مستخدم واحد في أكثر من 400 موقع اجتماعي ومنصة دفعة واحدة، ويخبرك أين تم تسجيله وأين لا. أداة OSINT كلاسيكية يستخدمها محققو الأمن والصحفيون للتحقق من الحسابات المرتبطة بهوية رقمية معينة.",
      en: "Sherlock is an open-source Python project that searches a single username across 400+ social networks and platforms at once, reporting where it is registered and where it is not. A classic OSINT tool used by security investigators and journalists to verify accounts tied to a digital identity."
    },
    why: {
      ar: "غالبية الناس يستخدمون نفس اسم المستخدم في كل مكان، وهذا يجعل Sherlock نافذة صادمة على حجم بصمتك الرقمية الحقيقية. جرّبه على اسمك لتكتشف كم حساباً نسيته وما زال مفتوحاً — ثم أغلقه فعلاً.",
      en: "Most people reuse the same username everywhere, which makes Sherlock a shocking window into your real digital footprint. Run it on your own name to discover how many forgotten accounts are still alive — then actually close them."
    },
    how: {
      ar: [
        "ثبّت Python ثم نزّل Sherlock من مستودع GitHub الرسمي.",
        "شغّل: python sherlock اسم-المستخدم ولاحظ قائمة المواقع المفحوصة.",
        "افتح كل نتيجة موجبة وتحقق يدوياً أنها لك فعلاً وليست شخصاً بنفس الاسم.",
        "سجّل الحسابات المنسية وقرر إغلاقها أو تأمينها.",
        "استخدم النتائج لتحسين خصوصيتك: أسماء مستخدم مختلفة للسياقات المختلفة."
      ],
      en: [
        "Install Python, then clone Sherlock from its official GitHub repository.",
        "Run: python sherlock <username> and watch the list of checked sites.",
        "Open each positive hit and manually confirm it is really you and not a namesake.",
        "Log forgotten accounts and decide to close or secure them.",
        "Use the results to improve privacy: different usernames for different contexts."
      ]
    },
    tags: ["sherlock", "osint", "بحث-مفتوح", "privacy", "ethical-hacking", "أمن-معلومات"]
  },
  {
    slug: "theharvester",
    cat: "security",
    icon: "📧",
    name: { ar: "theHarvester — جمع الإيميلات والنطاقات من المصادر المفتوحة", en: "theHarvester — Harvest Emails and Domains from Open Sources" },
    url: "https://github.com/laramies/theHarvester",
    desc: {
      ar: "theHarvester أداة OSINT شهيرة بلغة Python تجمع عناوين البريد الإلكتروني وأسماء النطاقات الفرعية والمضيفين المرتبطين بأي شركة من مصادر عامة مثل محركات البحث وشهادات TLS وقواعد البيانات العامة. هي عادة أول خطوة في مرحلة الاستطلاع السلبي لاختبار الاختراق المهني.",
      en: "theHarvester is a well-known Python OSINT tool that collects email addresses, subdomains and hosts linked to a company from public sources such as search engines, TLS certificate logs and public databases. It is typically the first step of passive reconnaissance in a professional penetration test."
    },
    why: {
      ar: "البريد الإلكتروني المكشوف هو أول ما يستهدفه التصيد؛ رؤية قائمة إيميلات شركتك التي يجمعها الغرباء في ثوانٍ تقدم حجة قوية لصالح تدريب الموظفين وتقليل النشر العلني. كما تعلّم الأداة كيف تبدو بصمة المؤسسة من الخارج.",
      en: "Exposed email addresses are phishing's first target; seeing how quickly outsiders can compile a list of your company's emails is a powerful argument for staff training and reducing public exposure. The tool also teaches you how an organization looks from the outside."
    },
    how: {
      ar: [
        "ثبّت Python ثم theHarvester من مستودع GitHub الرسمي (pip install).",
        "افحص نطاقاً تملكه: theHarvester -d example.com -b crtsh.",
        "راجع قائمة الإيميلات والنطاقات الفرعية المستخرجة من شهادات TLS.",
        "جرّب مصادر أخرى مثل bing وduckduckgo وقارن التغطية.",
        "حوّل النتائج إلى خطة: إخفاء الإيميلات العامة، مراقبة النطاقات الفرعية المنسية، وتدريب الفريق على التصيد."
      ],
      en: [
        "Install Python, then install theHarvester from its official GitHub repository (pip install).",
        "Scan a domain you own: theHarvester -d example.com -b crtsh.",
        "Review the emails and subdomains harvested from TLS certificate transparency logs.",
        "Try other sources like bing and duckduckgo and compare coverage.",
        "Turn findings into action: hide public emails, monitor forgotten subdomains, and train the team against phishing."
      ]
    },
    tags: ["theharvester", "osint", "استطلاع", "emails", "ethical-hacking", "أمن-معلومات"]
  }
];
