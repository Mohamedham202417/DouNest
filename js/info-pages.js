const ISSUE_URL = "https://github.com/Mohamedham202417/DouNest/issues/new";

export const INFO_PAGES = {
  about: {
    ar: {
      title: "حول DouNest",
      description: "تعرف على أدوات DouNest التي تعمل في المتصفح، ومبادئ الخصوصية والحدود التي نوضحها للمستخدمين.",
      schema: "AboutPage",
      intro: "DouNest مجموعة من أدوات الويب اليومية التي تساعدك على إنجاز مهام الملفات والنصوص والتطوير والحسابات من صفحة واحدة. يهدف المشروع إلى تقديم واجهات بسيطة، وشرح واضح لما تفعله كل أداة، وإبقاء معالجة الملفات المختارة داخل متصفحك قدر الإمكان.",
      sections: [
        { title: "ما الذي يقدمه الموقع؟", paragraphs: [
          "يضم الموقع مراكز للعمل مع ملفات PDF والصور والتحويلات، إلى جانب أدوات النصوص والمطورين والأمان والحاسبات. وتعرض صفحات الأدوات طريقة الاستخدام والقيود المعروفة والأسئلة الشائعة والبدائل ذات الصلة، حتى تستطيع اختيار الأداة المناسبة قبل تشغيلها.",
          "يُبنى الموقع كمشروع ويب ثابت، وتُنشأ صفحات الأدوات والمقالات من سجل موحد. وهذا يساعد على توفير روابط مباشرة قابلة للمشاركة والفهرسة، مع تحديث الواجهة والمحتوى من مستودع المشروع."
        ]},
        { title: "كيف نتعامل مع الملفات؟", paragraphs: [
          "تعالج الأدوات الملفات داخل المتصفح ولا ترسل محتوى الملفات إلى خادم DouNest. قد يحتاج المتصفح إلى تنزيل مكتبة أو نموذج معالجة من شبكة توصيل محتوى خارجية عند فتح بعض الأدوات أو استخدامها؛ تنزيل البرنامج لا يعني رفع ملفك. وتوضح صفحات المراكز عند وجود اعتماد خارجي أو قيد على الصيغ.",
          "تختلف النتائج حسب المتصفح ونوع الملف وحجمه. راجع الناتج قبل استخدامه في عمل مهم، واحتفظ بنسخة من الملف الأصلي. لا تدّعي DouNest أن كل صيغة أو كل ملف تالف مدعوم."
        ]},
        { title: "اللغات وإمكانية الاستخدام", paragraphs: [
          "تتيح الواجهة اختيار عشر لغات. تتوفر أجزاء من الشروحات باللغتين العربية والإنجليزية، وقد تستخدم بعض النصوص الأخرى الإنجليزية عند عدم توفر ترجمة كاملة. نعمل على تحسين وضوح الخطوات ورسائل الخطأ والتخطيط على الشاشات الصغيرة.",
          "DouNest مشروع ويب متطور باستمرار، وليس بديلاً عن البرامج المتخصصة أو المراجعة البشرية. لا ننشر قصصاً أو اعتمادات مهنية أو أرقام استخدام لا نستطيع التحقق منها.",
          "تتمثل أولوية المشروع في جعل الأدوات واضحة وسهلة الوصول، مع إظهار حدود الصيغ والخصوصية قبل الاستخدام بدلاً من الادعاء بأن أداة واحدة تناسب كل الملفات أو الحالات."
        ]}
      ]
    },
    en: {
      title: "About DouNest",
      description: "Learn about DouNest browser tools, the project's privacy approach, and the limitations we disclose to users.",
      schema: "AboutPage",
      intro: "DouNest is a collection of everyday web tools for file, text, developer, security, and calculation tasks. The project aims to keep interfaces straightforward, explain what each tool does, and process selected files in your browser whenever the tool supports it.",
      sections: [
        { title: "What the site offers", paragraphs: [
          "The site brings together PDF, image, and conversion work centers alongside text, developer, security, and calculator tools. Tool pages explain the workflow, known limitations, frequently asked questions, and related utilities so visitors can choose an appropriate tool before running it.",
          "DouNest is built as a static website. Tool and article pages are generated from shared project data, giving each page a direct, shareable URL while keeping the site content maintainable in its public source repository."
        ]},
        { title: "How files are handled", paragraphs: [
          "Tools process selected files in the browser and do not send their contents to a DouNest file-processing server. Some features may download a processing library or model from an external content-delivery network when needed; downloading code does not mean uploading your file. Center pages identify relevant external dependencies and format limitations.",
          "Results vary with browser support, file type, and file size. Review output before relying on it for important work and keep an original copy. DouNest does not claim to support every format or repair every damaged file."
        ]},
        { title: "Languages and accessibility", paragraphs: [
          "The interface offers ten language choices. Some long-form explanations are available in Arabic and English, while other text may fall back to English when a full translation is not available. We continue to improve instructions, error messages, and small-screen layouts.",
          "DouNest is an evolving web project, not a substitute for specialist software or human review. We do not publish personal biographies, professional endorsements, or usage figures that we cannot substantiate.",
          "The project's priority is to make tools understandable and accessible, and to explain format and privacy limitations before use rather than claim that one tool fits every file or situation."
        ]}
      ]
    }
  },
  privacy: {
    ar: {
      title: "سياسة الخصوصية",
      description: "تفاصيل معالجة الملفات محلياً، وخدمة البريد المؤقت الخادمية، وبيانات المتصفح والاعتمادات الخارجية في DouNest.",
      schema: "WebPage",
      intro: "تشرح هذه السياسة ما يحدث عند استخدام موقع DouNest. صُممت أدوات الملفات لمعالجة المحتوى المختار داخل المتصفح، لكن الموقع يعتمد أيضاً على استضافة وموارد ويب خارجية، لذلك نوضح الفرق بين ملفك وبين طلبات تحميل الموقع.",
      sections: [
        { title: "الملفات التي تختارها", paragraphs: [
          "تعمل عمليات الأدوات التي تتعامل مع الملفات في متصفحك. لا يرسل DouNest محتوى الملفات المختارة إلى خادم خاص لمعالجتها أو تخزينها. تبقى الملفات والنتائج في جهازك ما لم تختر أنت مشاركتها أو فتح رابط خارجي بنفسك. لا ترفع ملفاً حساساً إلى أي خدمة أخرى ما لم تكن قد راجعت سياسة تلك الخدمة.",
          "قد يفشل فتح ملف من مزود تخزين سحابي أو تطبيق صور إذا لم يعد المتصفح قادراً على قراءته. في هذه الحالة نزّل نسخة إلى جهازك ثم اخترها من وحدة التخزين المحلية."
        ]},
        { title: "خدمة البريد المؤقت (استثناء خادمي)", paragraphs: [
          "خدمة البريد المؤقت ليست معالجة محلية: تُستقبل الرسائل عبر Resend وتُخزَّن نسخة مؤقتة من العنوان والرسالة في قاعدة بيانات DouNest الأوروبية، وتنتهي صلاحيتها بعد نحو 60 دقيقة وتُزال بمهمة تنظيف دورية. لا تعرض الواجهة محتوى HTML أو المرفقات للتنزيل.",
          "قد يحتفظ مزود استقبال البريد ببيانات وفق سياسته المنفصلة. تُستخدم بصمة مشفّرة مؤقتة لعنوان الشبكة لتطبيق حد الإنشاء، وتزال بعد نافذة الحد. لا تستخدم الخدمة للمعلومات الحساسة أو المالية أو الطبية أو استعادة كلمات المرور. يُحفظ رمز الوصول في مساحة الجلسة لهذا التبويب، ويمكن حذف الصندوق مبكراً من الواجهة."
        ]},
        { title: "البيانات المخزنة في المتصفح", paragraphs: [
          "قد يحفظ الموقع تفضيلات مثل اللغة والمظهر والأدوات المفضلة وآخر الأدوات المستخدمة، إضافة إلى التقييمات والتعليقات المحلية لبعض الأدوات. تُحفظ هذه البيانات في مساحة التخزين المحلية للمتصفح على جهازك ولا تُزامن مع حساب DouNest. حذف بيانات الموقع أو مساحة التخزين من إعدادات المتصفح يزيلها، وقد يؤدي استخدام نافذة خاصة إلى عدم بقائها بعد إغلاق النافذة.",
          "لا تكتب في التعليقات المحلية معلومات لا تريد أن تظهر على الشاشة أمام مستخدم آخر لجهازك. هذه التعليقات مخصصة لجهازك وليست منشورات عامة ولا تُرسل إلى فريق الموقع."
        ]},
        { title: "الاستضافة والموارد الخارجية", paragraphs: [
          "تُقدَّم صفحات الموقع من GitHub Pages، وقد تُحمَّل بعض المكتبات أو نماذج المعالجة والخطوط من شبكات توصيل محتوى خارجية. عند طلب هذه الموارد، قد يتلقى مزود الاستضافة أو الشبكة بيانات تقنية لازمة لتسليم الطلب، مثل عنوان الشبكة ومعلومات المتصفح. هذه الطلبات لا تتضمن تلقائياً محتوى ملفاتك التي تعالجها الأداة محلياً. تخضع هذه الجهات لسياساتها الخاصة.",
          "إذا منعت اتصالات الشبكة الخارجية فقد لا تعمل ميزة تعتمد على مكتبة أو نموذج لم يُحمّل بعد. قد تعمل الأدوات الأخرى دون اتصال بعد تحميل ملفاتها، بحسب تخزين المتصفح المؤقت ودعم التطبيق لذلك."
        ]},
        { title: "التحليلات والإعلانات والروابط الخارجية", paragraphs: [
          "في إعداد النشر الحالي لا يوجد معرّف Google Analytics أو سكربت تحليلات مفعّل، كما أن معرّفات Google AdSense فارغة؛ لذلك لا يحمّل الموقع حالياً Google Analytics أو إعلانات AdSense. توجد في الشيفرة نقاط اختيارية لإرسال أحداث إذا جرى إعداد مزود تحليلات مستقبلاً، لكنها لا ترسل شيئاً عند غياب ذلك المزود. خدمة البريد المؤقت الخادمية موضحة في قسمها أعلاه.",
          "معرّف الإحالة غير مضبوط حالياً. قد تفتح بعض الروابط الخارجية مواقع أطراف أخرى، وتخضع بياناتك بعد مغادرة DouNest لسياسات تلك المواقع. لا تدخل بيانات خاصة في صفحة عامة أو خدمة خارجية دون مراجعة وجهتها وشروطها."
        ]},
        { title: "الاحتفاظ والاختيارات", paragraphs: [
          "لا يحتفظ DouNest بنسخ من الملفات التي تعالجها الأدوات محلياً. تبقى تفضيلات الموقع المحلية حتى تحذفها من المتصفح أو تمسح بيانات الموقع. ويمكنك حظر الخطوط أو موارد CDN من إعدادات الشبكة، مع احتمال تعطّل الوظائف المرتبطة بها.",
          "للاستفسارات غير الحساسة أو للإبلاغ عن خطأ، استخدم صفحة التواصل. البلاغات على GitHub Issues عامة؛ لا ترفق ملفات أو كلمات مرور أو بيانات شخصية أو أسراراً."
        ]}
      ]
    },
    en: {
      title: "Privacy Policy",
      description: "How DouNest handles local file processing, its server-side temporary email service, browser preferences, and external dependencies.",
      schema: "WebPage",
      intro: "This policy explains what happens when you use DouNest. File tools are designed to process selected content in your browser, but the site also relies on hosting and external web resources, so we distinguish your files from ordinary requests that load the site.",
      sections: [
        { title: "Files you select", paragraphs: [
          "File operations run in your browser. DouNest does not send selected file contents to a dedicated processing server or store copies for you. Files and results remain on your device unless you choose to share them or open an external link yourself. Do not send a sensitive file to another service unless you have reviewed that service's policy.",
          "A file from a cloud-storage provider or photo app may become unreadable if the browser can no longer access its source. If that happens, download a copy to this device and select it from local storage."
        ]},
        { title: "Temporary email (server-side exception)", paragraphs: [
          "Temporary email is not local processing: messages are received through Resend and a temporary copy of the address and message is stored in DouNest's EU database. The inbox expires after about 60 minutes and is removed by a periodic cleanup job. The interface does not render email HTML or offer attachment downloads.",
          "The inbound email provider may retain data under its separate policy. A temporary hashed network address is used to enforce the creation limit and is removed after the limit window. Do not use this service for sensitive, financial, medical, or password-recovery information. The access token is kept in this tab's session storage, and you can delete the inbox early from the interface."
        ]},
        { title: "Data stored in your browser", paragraphs: [
          "The site may save preferences such as language, theme, favorite tools, recently used tools, and local ratings or comments for some tools. This information is kept in browser storage on your device and is not synchronized to a DouNest account. Clearing the site's storage in browser settings removes it; private browsing may discard it when the window closes.",
          "Avoid entering information in local comments that you would not want another person using the same device to see. These comments are device-local, not public posts, and are not sent to the site team."
        ]},
        { title: "Hosting and external resources", paragraphs: [
          "The site is served by GitHub Pages. Some libraries, processing models, or fonts may be downloaded from external content-delivery networks. When these resources are requested, the hosting or delivery provider may receive technical information needed to deliver the request, such as network address and browser details. Such requests do not automatically include the contents of files that a tool processes locally. Those providers have their own policies.",
          "Blocking external network requests can prevent a feature from working if it needs a library or model that has not been downloaded. Other tools may work offline after their assets are available, depending on browser caching and application support."
        ]},
        { title: "Analytics, advertising, and external links", paragraphs: [
          "The current deployment has no Google Analytics measurement ID or active analytics script, and its Google AdSense identifiers are blank; Google Analytics and AdSense are therefore not loaded by the site at this time. Optional event hooks in the source do not send data when no analytics provider is present. The server-side temporary email service is described in its own section above.",
          "No affiliate identifier is currently configured. Some links may lead to external websites, whose policies apply after you leave DouNest. Do not enter private information on a public page or external service without checking where it will go and how it will be handled."
        ]},
        { title: "Retention and your choices", paragraphs: [
          "DouNest does not retain copies of files processed locally. Browser preferences remain on your device until you clear them or remove the site's stored data. You can block fonts or CDN resources in your network settings, though features that rely on them may stop working.",
          "For non-sensitive questions or bug reports, use the Contact page. GitHub Issues are public; do not attach files, passwords, personal data, or secrets."
        ]}
      ]
    }
  },
  terms: {
    ar: {
      title: "شروط الاستخدام",
      description: "شروط استخدام أدوات DouNest، وحدود النتائج والمسؤولية والروابط الخارجية.",
      schema: "WebPage",
      intro: "باستخدام موقع DouNest أو أي أداة فيه، فإنك توافق على هذه الشروط. إذا لم تناسبك، فتوقف عن استخدام الموقع. هذه الشروط وصف عام للاستخدام وليست استشارة قانونية.",
      sections: [
        { title: "الاستخدام المسموح والمسؤول", paragraphs: [
          "يمكنك استخدام الأدوات للأغراض الشخصية أو المهنية المشروعة، مع احترام حقوق الآخرين والقوانين المعمول بها. لا تستخدم الموقع لمحاولة تعطيله أو تجاوز ضوابط المتصفح أو إساءة استخدام الموارد أو تنفيذ نشاط غير قانوني. أنت مسؤول عن التأكد من أن لديك الحق في معالجة الملفات والنصوص التي تختارها.",
          "لا ترفع إلى أدوات DouNest ملفاتك؛ الأدوات التي تقبل ملفات تعالجها في المتصفح. احفظ النسخ الأصلية وراجع نتائج التحويل قبل توزيعها أو استخدامها في إجراء رسمي."
        ]},
        { title: "الدقة والقيود", paragraphs: [
          "تُقدَّم الأدوات كما هي، وقد تحتوي النتائج على أخطاء أو اختلافات بسبب المتصفح أو الصيغة أو حجم الملف أو طريقة التحويل. قد تفقد بعض التحويلات التنسيق أو البيانات الوصفية أو خصائص مثل قابلية البحث والشفافية. اقرأ التنبيهات الظاهرة في صفحة الأداة ولا تعتمد على نتيجة غير متحقق منها.",
          "المحتوى والأدوات لا تشكل نصيحة قانونية أو طبية أو مالية أو مهنية. استخدم برنامجاً متخصصاً أو رأياً مؤهلاً عندما تكون الدقة أو السلامة أو الامتثال إلزامياً."
        ]},
        { title: "التوفر والخدمات الخارجية", paragraphs: [
          "قد تتغير الأدوات أو تتوقف مؤقتاً أو تزال من الموقع دون إشعار مسبق. يعتمد بعض الميزات على مكتبات أو نماذج أو مواقع خارجية؛ ولا نتحكم في توفرها أو شروطها أو ممارساتها. يكون استخدام رابط خارجي على مسؤوليتك ويخضع لشروط الجهة المستقبلة.",
          "لا يجوز استخدام اسم DouNest أو شعاره أو تصميمه بما يوحي برعاية أو اعتماد لم يمنحه المشروع. تبقى حقوق الملفات التي تختارها لك؛ وتخضع شيفرة المشروع المفتوحة المصدر للرخصة المرفقة في المستودع."
        ]},
        { title: "الملفات المدخلة والنتائج", paragraphs: [
          "لا تنقل معالجة الملف في المتصفح ملكيته إلى DouNest، ولا تمنح عملية الاختيار المشروع ترخيصاً لاستخدام محتواه. تُنشأ النتائج لك محلياً، لكن لا نضمن أن كل نتيجة فريدة أو خالية من حقوق الغير أو ملائمة لنظام خارجي بعينه.",
          "قبل نشر النتيجة أو توزيعها، تحقق من حقوق النشر والسرية وإمكانية الوصول وتوافق الصيغة وأي أذونات لازمة. احتفظ بنسخة أصلية وراجع القيم المهمة، خصوصاً في سجلات الأعمال أو البيانات الخاضعة للتنظيم.",
          "المعالجة المحلية تقلل الحاجة إلى رفع الملف، لكنها لا تحميه من جهاز مصاب أو إضافة متصفح ضارة. أنت مسؤول عن أمان الجهاز والمتصفح والملفات التي تحفظها أو تشاركها."
        ]},
        { title: "حدود المسؤولية والتحديثات", paragraphs: [
          "إلى الحد الذي يسمح به القانون، لا يقدم المشروع ضماناً بأن الموقع سيكون متاحاً دائماً أو خالياً من الأخطاء، ولا يتحمل مسؤولية الخسائر الناتجة عن الاعتماد على النتائج أو تعطل الموقع أو خدمة خارجية. لا يمنع هذا النص أي حق لا يجوز استبعاده بموجب القانون.",
          "قد نحدّث هذه الشروط عند تغير الميزات أو طريقة تشغيل الموقع. يشير تاريخ آخر تحديث في النسخة المنشورة إلى أحدث تعديل، ويعني استمرارك في الاستخدام بعد نشر التغيير قبول الشروط المحدثة."
        ]}
      ]
    },
    en: {
      title: "Terms of Use",
      description: "Terms for using DouNest tools, including result limitations, user responsibilities, and external links.",
      schema: "WebPage",
      intro: "By using DouNest or any tool on the site, you agree to these terms. Stop using the site if you do not agree. This is a general description of use, not legal advice.",
      sections: [
        { title: "Permitted and responsible use", paragraphs: [
          "You may use the tools for lawful personal or professional purposes while respecting other people's rights and applicable laws. Do not attempt to disrupt the site, bypass browser safeguards, abuse resources, or use the site for unlawful activity. You are responsible for having the right to process any files or text you select.",
          "Do not upload your files to DouNest: file-enabled tools process them in your browser. Keep original copies and review conversions before distributing them or relying on them for an official process."
        ]},
        { title: "Accuracy and limitations", paragraphs: [
          "Tools are provided as available and may produce errors or differences due to browser support, format, file size, or conversion method. Some conversions can change layout or remove metadata or features such as searchability and transparency. Read the notices on each tool page and verify important output.",
          "The tools and site content are not legal, medical, financial, or other professional advice. Use specialist software or qualified advice when accuracy, safety, or compliance is essential."
        ]},
        { title: "Availability and external services", paragraphs: [
          "Tools may change, be temporarily unavailable, or be removed without notice. Some features depend on external libraries, models, or websites; DouNest does not control their availability, terms, or practices. Opening an external link is your choice and is governed by the destination's terms.",
          "You may not use the DouNest name, logo, or design to imply sponsorship or endorsement that the project has not granted. You retain rights to files you select; the project's open-source code is governed by the license included in its repository."
        ]},
        { title: "Your input and generated output", paragraphs: [
          "Processing a file in your browser does not transfer its ownership to DouNest, and selecting a file does not grant the project a license to use its contents. Outputs are generated for you locally, but the project does not guarantee that every result is unique, free of third-party rights, or suitable for a particular external system.",
          "Before publishing or distributing an output, check copyright, confidentiality, accessibility, format compatibility, and any permissions that apply. Keep an original copy and verify important values, especially when working with business records or regulated data.",
          "Local processing reduces the need to upload a file; it does not protect data from a compromised device or malicious browser extension. You are responsible for securing your device, browser, and any files you save or share."
        ]},
        { title: "Liability and changes", paragraphs: [
          "To the extent permitted by law, the project does not warrant continuous availability or error-free operation and is not responsible for losses caused by reliance on a result, site interruption, or an external service. Nothing in these terms removes a right that cannot legally be excluded.",
          "These terms may be updated as features or operations change. The publication's last-updated date identifies the latest revision. Continued use after a change is published indicates acceptance of the updated terms."
        ]}
      ]
    }
  },
  contact: {
    ar: {
      title: "التواصل والدعم",
      description: "أرسل بلاغاً عن مشكلة أو اقتراحاً لمشروع DouNest عبر قناة الدعم العامة في GitHub.",
      schema: "ContactPage",
      intro: "لأن DouNest مشروع ويب مفتوح المصدر ولا ينشر عنوان بريد دعم مخصصاً، فإن قناة التواصل المتاحة حالياً هي صفحة Issues في مستودع GitHub.",
      sections: [
        { title: "بلاغ عن مشكلة أو اقتراح", paragraphs: [
          "افتح بلاغاً جديداً لشرح ما كنت تحاول فعله، واسم الأداة والمتصفح ونظام التشغيل، والخطوات التي تعيد المشكلة. لا ترفق ملفات شخصية أو كلمات مرور أو رموز تحقق أو بيانات عملاء؛ اكتب عينة مصغرة وغير حساسة إذا احتجت إلى توضيح المشكلة."
        ]},
        { title: "تنبيه الخصوصية", paragraphs: [
          "صفحات GitHub Issues عامة وقد تكون قابلة للفهرسة. لا تستخدمها لإرسال استفسار يتضمن بيانات شخصية أو مستندات خاصة. إذا كان البلاغ أمنياً، لا تنشر تفاصيل الاستغلال علناً؛ تحقق من خيارات الإبلاغ الخاص التي يوفرها GitHub للمستودع."
        ]}
      ],
      actionLabel: "فتح صفحة البلاغات في GitHub"
    },
    en: {
      title: "Contact and Support",
      description: "Report a bug or suggest an improvement to DouNest through the project's public GitHub Issues page.",
      schema: "ContactPage",
      intro: "DouNest is an open-source web project and does not publish a dedicated support email address. The available contact channel is the Issues page in the GitHub repository.",
      sections: [
        { title: "Report a bug or suggest an improvement", paragraphs: [
          "Open a new issue with what you were trying to do, the tool name, browser and operating system, and steps that reproduce the problem. Do not attach personal files, passwords, verification codes, or customer data. If an example is necessary, make it small and non-sensitive."
        ]},
        { title: "Privacy notice", paragraphs: [
          "GitHub Issues are public and may be indexed. Do not use them for questions containing personal information or private documents. If you are reporting a security issue, do not post exploit details publicly; check whether GitHub's private reporting options are available for the repository."
        ]}
      ],
      actionLabel: "Open the GitHub Issues page"
    }
  }
};

const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function getInfoPage(slug, lang = "en") {
  const variants = INFO_PAGES[slug];
  if (!variants) return null;
  return variants[lang] || variants.en || variants.ar;
}

export function renderInfoPage(slug, lang = "en", href = path => path) {
  const page = getInfoPage(slug, lang);
  if (!page) return "";
  const issueUrl = escapeHtml(ISSUE_URL);
  const sections = page.sections.map(section => `
    <section class="info-section">
      <h2>${escapeHtml(section.title)}</h2>
      ${section.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    </section>`).join("");
  const action = page.actionLabel ? `<p class="info-contact-action"><a class="btn btn-primary" href="${issueUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(page.actionLabel)}</a></p>` : "";
  const breadcrumb = `<nav class="breadcrumb" aria-label="breadcrumb"><a href="${escapeHtml(href("/"))}">DouNest</a><span class="sep">›</span><span class="current">${escapeHtml(page.title)}</span></nav>`;
  return `${breadcrumb}<header class="page-head"><h1>${escapeHtml(page.title)}</h1><p class="lead">${escapeHtml(page.intro)}</p></header><div class="info-page" lang="${escapeHtml(lang)}">${sections}${action}</div>`;
}

export function infoPageJsonLd(slug, lang, siteRoot) {
  const page = getInfoPage(slug, lang);
  if (!page) return [];
  const base = siteRoot.replace(/\/$/, "");
  const pageUrl = `${base}/${slug}/`;
  return [
    { "@context": "https://schema.org", "@type": page.schema, "name": page.title, "description": page.description, "url": pageUrl, "inLanguage": lang },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "DouNest", "item": `${base}/` },
      { "@type": "ListItem", "position": 2, "name": page.title, "item": pageUrl }
    ] }
  ];
}
