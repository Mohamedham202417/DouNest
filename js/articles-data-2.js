/**
 * DouNest v4 — Articles data (part 2 of 4): expanded password-security-basics + image-compression-web
 */
export const ARTICLES_2 = [
  {
    slug: "password-security-basics",
    title: {
      ar: "أمان كلمات المرور 2026: الدليل العملي الكامل من التوليد إلى المصادقة الثنائية",
      en: "Password Security 2026: The Complete Practical Guide from Generation to 2FA"
    },
    excerpt: {
      ar: "كيف تُسرق كلمات المرور فعلاً، ولماذا الطول أهم من التعقيد، وكتبت مدير كلمات المرور المناسب وتفعّل المصادقة الثنائية بذكاء — دليل عملي بخطوات محددة.",
      en: "How passwords actually get stolen, why length beats complexity, how to choose the right password manager and enable 2FA smartly — a practical guide with concrete steps."
    },
    date: "2026-10-10",
    tags: ["passwords", "كلمات-المرور", "security", "2fa", "أمان", "privacy"],
    content: {
      ar: `تسريبات كلمات المرور لا تتوقف: مليارات الحسابات المسربة متاحة اليوم في قواعد بيانات المهاجمين، وكل تسرب جديد يغذي محاولات الدخول على خدمات أخرى لا علاقة لها بالتسرب الأصلي. الخبر الجيد أن حمايتك الفعلية ليست معقدة — إنها منظومة من أربع عادات ذكية نشرحها هنا بالتفصيل العملي.

## كيف تُسرق كلمات المرور فعلاً

مناقشة الحماية بلا فهم أساليب الهجوم عملية أعمى. الهجوم الأول والأخطر هو إعادة استخدام كلمة المرور: يتسرب موقع صغير لا يهم، ويجرب المهاجمون نفس الإيميل وكلمة المرور على جيميل وبنكك تلقائياً — ما يسمى Credential Stuffing وهو المسؤول عن أغلب اختراقات الحسابات اليوم. الثاني هجمات القاموس: برامج تجرب ملايين الكلمات والتحويلات الشهيرة (P@ssw0rd، admin123، اسمك+تاريخ ميلادك) خلال دقائق على الأنظمة الضعيفة. الثالث التصيد: صفحة دخول مزيفة تُعطي كلمتك طواعية. الرابع: تسريب من الخادم نفسه — وهنا تعتمد حمايتك على ما خزنه الموقع، وهذا شيء لا تتحكم به، مما يجعل كلمة مختلفة لكل موقع ضرورة لا رفاهية.

## الطول يحكم، والتعقيد يخدع

الحقيقة الرياضية الصادمة: كلمة المرور القصيرة المعقدة أسهل كسراً من الطويلة البسيطة. P@ssw0rd9 تحتاج ساعات للكسر، بينما june-river-lamp-42 تحتاج قروناً — لأن مساحة البحث تنمو أسياً مع كل حرف إضافي. معايير NIST الحديثة (المرجع الأمريكي الرسمي) تخلت رسمياً عن قواعد "حرف كبير ورقم ورمز كل 90 يوماً" لصالح الطول والفحص ضد قوائم التسريبات.

عملياً: 16 حرفاً عشوائياً هو الحد الأدنى الجيد، و20+ للحسابات الحرجة (البريد الرئيسي ومدير كلمات المرور نفسه). أو استخدم جمل المرور: أربع كلمات عشوائية غير مترابطة أسهل حفظاً وأقوى كسراً من كلمة عشوائية قصيرة. ولّد كلماتك بأداة مولد تشفيرية محلية مثل [مولد كلمات المرور](/tools/password-generator/) بدل اختراعها بنفسك — عقل البشر سيئ مذهل في العشوائية، وكلماته "العشوائية" تظهر في قوائم التخمين الأولى دائماً.

## مدير كلمات المرور: الحلقة المركزية

منطق مدير كلمات المرور بسيط وقوي: تتذكر كلمة رئيسية واحدة قوية، وهو يتذكر آلاف الكلمات الفريدة العشوائية عنك، ويملأها تلقائياً في كل موقع. الخيارات الموثوقة: Bitwarden مفتوح المصدر بمجاني سخي، و1Password الأناقة المدفوعة، وKeePassXC للملكية المحلية الكاملة بلا سحابة. القاعدة الذهبية: كلمة مرور المدير الرئيسية هي أطول وأقوى كلمة تملكها (24+ حرفاً) ولن تحتاج كتابتها إلا في جهازك.

لا تخزن كلماتك في متصفح إن كنت تشارك الجهاز، ولا في ملف نصي ولا ورقة — النقطة كلها هي التشفير بمفتاح مشتق من كلمتك الرئيسية. وعند ترحيل من خدمة لآخر، احذف الصادرات المؤقتة فوراً، فملفات التصدير غير مشفرة.

## المصادقة الثنائية: الطبقة التي تنقذك فعلاً

حتى لو سُرقت كلمتك، المصادقة الثنائية (2FA) تمنع الدخول لأنها تطلب عاملاً ثانياً لا يملكه المهاجم. ترتيب الخيارات من الأضعف للأقوى: رسائل SMS ضعيفة (قابلة للاعتراض عبر شبكات الهاتف) لكنها أفضل من لا شيء، وتطبيقات المولدات مثل Google Authenticator وAegis أقوى بكثير، ومفاتيح الأمان الفيزيائية مثل YubiKey هي الأقوى عملياً — لا تصيد يخدعها ولا إعادتها للاستخدام بدون المفتاح الفيزيائي.

فعّلها بالترتيب: البريد الرئيسي أولاً (فهو بوابة استعادة كل شيء)، ثم مدير كلمات المرور، ثم البنك والوسائل الاجتماعية. واحفظ رموز الاستعادة الاحتياطية في مكان آمن ملموس — فقدان هاتفك بلا رموز احتياطية يعني قفلاً خارج حسابك.

## الفحص الدوري: روتين العشر دقائق شهرياً

راجع HaveIBeenPwned شهرياً بإيميلك الرئيسي — يخبرك إن ظهر في تسريبات جديدة فتغير كلمة تلك الخدمة فوراً. راجع جلسات تسجيل الدخول النشطة في حساباتك الكبرى وأغلق الأجهزة القديمة. وافحص أذونات تطبيقات الطرف الثالث المتصلة بحساباتك وألغِ الميتة. ثم شغّل مولد كلمات المرور وبدّل أي كلمة قديمة قصيرة متكررة — عشرة دقائق شهرياً تعادل درعاً لا يقدر بثمن.

## الخلاصة

المنظومة كاملة: كلمة فريدة عشوائية طويلة لكل موقع (مولدة آلياً)، مدير كلمات مرور يتذكرها عنك، مصادقة ثنائية على الحسابات الحرجة (تطبيق أو مفتاح فيزيائي)، وفحص تسريبات شهري. أربع عادات تُبنى في أسبوع وتحميك من 99% من السيناريوهات الواقعية — ابدأ اليوم بالبريد الرئيسي ومدير الكلمات، وسيصبح الباقي روتيناً تلقائياً.`
,
      en: `Password breaches never stop: billions of compromised accounts sit in attackers' databases today, and every new breach feeds login attempts on unrelated services. The good news: your real protection is not complicated — it is a system of four smart habits we cover here in practical detail.

## How passwords actually get stolen

Discussing defense without understanding attack methods is blind. Attack one, the most dangerous, is password reuse: an unimportant small site leaks, and attackers automatically try the same email and password on Gmail and your bank — Credential Stuffing, responsible for most account takeovers today. Two is dictionary attacks: programs testing millions of words and famous transformations (P@ssw0rd, admin123, your name + birthdate) within minutes on weak systems. Three is phishing: a fake login page where you hand over your password willingly. Four is a server-side leak — here your protection depends on what the site stored, something you cannot control, which makes a unique password per site a necessity, not a luxury.

## Length rules, complexity misleads

The shocking mathematical truth: a short complex password is easier to crack than a long simple one. P@ssw0rd9 falls in hours, while june-river-lamp-42 takes centuries — because search space grows exponentially with every added character. Modern NIST standards (the official US reference) formally abandoned "uppercase + digit + symbol every 90 days" rules in favor of length and screening against breach lists.

Practically: 16 random characters is a good minimum, and 20+ for critical accounts (your main email and the password manager itself). Or use passphrases: four random unrelated words, easier to remember and stronger than a short random password. Generate yours with a local cryptographic tool like the [Password Generator](/tools/password-generator/) instead of inventing them — the human mind is spectacularly bad at randomness, and its "random" choices always top guessing lists.

## The password manager: the central link

The manager's logic is simple and powerful: you remember one strong master password, it remembers thousands of unique random ones for you, and auto-fills them everywhere. Trusted options: Bitwarden (open source, generous free tier), 1Password (polished, paid), KeePassXC (full local ownership, no cloud). The golden rule: the manager's master password is your longest, strongest password (24+ characters), typed only on your own devices.

Do not store passwords in the browser on shared devices, nor in text files or paper — the whole point is encryption derived from your master key. When migrating between services, delete temporary exports immediately — export files are unencrypted.

## Two-factor authentication: the layer that actually saves you

Even with a stolen password, 2FA blocks login because it demands a second factor the attacker does not have. Options ranked weakest to strongest: SMS is weak (interceptable via phone networks) but better than nothing; generator apps like Google Authenticator and Aegis are far stronger; physical security keys like YubiKey are the strongest in practice — phishing cannot trick them and login fails without the physical key.

Enable it in order: main email first (it is the recovery gate for everything), then the password manager, then banking and social accounts. Save recovery codes somewhere physically safe — losing your phone without backup codes means being locked out.

## Periodic audit: a ten-minute monthly routine

Check HaveIBeenPwned monthly with your main email — it tells you if you appeared in new breaches so you can change that service's password immediately. Review active login sessions on your major accounts and sign out old devices. Audit third-party app permissions connected to your accounts and revoke the dead ones. Then run the password generator and replace any old short reused password — ten minutes monthly buys an invaluable shield.

## Conclusion

The complete system: a long random unique password per site (machine-generated), a password manager remembering them all, 2FA on critical accounts (app or physical key), and monthly breach checks. Four habits built in a week that protect against 99% of real scenarios — start today with your main email and the manager, and the rest becomes automatic routine.`
    }
  },
  {
    slug: "image-compression-web",
    title: {
      ar: "ضغط الصور للويب: كيف تسرّع موقعك 3 أضعاف وتفوز في SEO",
      en: "Image Compression for the Web: Speed Up Your Site 3x and Win at SEO"
    },
    excerpt: {
      ar: "الصور مسؤولة عن أغلب وزن صفحات الويب. تعلّم أنواع الضغط، واختيار الصيغة المناسبة، وأحجام العرض الصحيحة، وخطوات تطبيق كل ذلك على موقعك اليوم.",
      en: "Images dominate web page weight. Learn compression types, choosing the right format, correct display sizes, and concrete steps to apply it all to your site today."
    },
    date: "2026-10-08",
    tags: ["image-compression", "seo", "performance", "ضغط-الصور", "webp", "web-vitals"],
    content: {
      ar: `افتح أي موقع بطيء وافحص حمل صفحته: ستجد الصور مسؤولة عن 50-70% من الوزن في الغالبية الساحقة من الحالات. الصورة الواحدة من كاميرا الهاتف الحديث تزن 4-8 ميجابايت، بينما الصورة المثالية للويب تزن 100-300 كيلوبايت — الفرق العشرون ضعفاً هذا هو الفرق بين موقع يفتح في ثانية وآخر يُهجر في الثالثة.

## لماذا يهم الضغط لمحركات البحث تحديداً

جوجل أعلنت رسمياً أن تجربة الصفحة عامل ترتيب: مقاييس Core Web Vitals الثلاثة (LCP لسرعة أكبر عنصر مرئي، وINP لاستجابة التفاعل، وCLS لثبات التخطيط) تصبح مؤشرات مراقبة مباشرة. والصور الثقيلة تضر بمقياسين من ثلاثة مباشرة: تؤخر LCP إن كانت العنصر الرئيسي، وتسبب قفزات CLS إن حُملت دون أبعاد محجوزة. المواقع المنافسة المتساوية في المحتوى يفصلها الأداء، وضغط الصور أسرع مكسب أداء يمكن تحقيقه في يوم واحد.

## الضغط التدميري مقابل غير التدميري

الضغط غير التدميري يعيد ترتيب بيانات الملف بكفاءة دون إسقاط أي معلومة — الصورة تُستعاد مطابقة للأصل بكسلاً بكسلاً، لكن التوفير محدود (10-30%). الضغط التدميري يتخلى عن تفاصيل لا تميزها العين البشرية — توفيره هائل (70-90%) لكنه غير قابل للعكس. القاعدة العملية: الضغط التدميري للويب دائماً، واحتفظ بالأصل عالي الجودة في أرشيفك للمستقبل.

الجودة المثالية لضغط JPEG ليست 100 ولا 50 — إنها المنطقة 0.6-0.8 حيث ينحني منحنى التوفير حاداً بينما يظل التدهور غير مرئي. جرّب صورتك عند مستويات مختلفة بأداة [ضغط الصور](/tools/image-compressor/) وراقب الفرق بعينك بدل الأرقام المجردة.

## اختيار الصيغة: شجرة القرار

الصور الفوتوغرافية (طبيعة، أشخاص، منتجات): WebP أولاً بجودة 0.7-0.8، وJPG كبديل احتياطي. الرسومات والشعارات والأيقونات واللقطات: PNG إن احتجت شفافية حادة الحواف، وSVG أصلاً إن كانت أيقونة قابلة للمتجهات، وWebP بوضع الفقد المنخفض كخيار وسط. الشفافية: PNG أو WebP حصراً — JPG لا يدعمها إطلاقاً وتحويل صورة شفافة إليه يمحوها بخلفية بيضاء مفاجئة.

WebP تحديداً يقلل الحجم 25-35% مقابل JPG بنفس الجودة البصرية، وهو مدعوم في كل المتصفحات الحديثة منذ سنوات، وجوجل نفسها توصي به في إرشادات الأداء الرسمية — تحويل مكتبة موقعك إليه أسرع تحسين واحد قابل للتنفيذ، وأداة [تحويل الصور](/tools/image-converter/) تنجز الدفعة كاملة مع تنزيل ZIP واحد.

## الأبعاد الصحيحة: الخطأ الأكثر شيوعاً

صورة معروضة بعرض 800 بكسل لا معنى لتكون مخزنة بـ 4000 بكسل — إنها تستهلك 25 ضعف البكسلات اللازمة وتُصغَّر في المتصفح عبر CSS. الحل: احفظ كل صورة بأبعاد أقصى عرض ستُعرض فيه فعلياً، وللشاشات عالية الكثافة (Retina) احفظ بضعف العرض المعروض. والأهم تحديد سمتَي width وheight في وسم الصورة دائماً كي يحجز المتصفح المساحة قبل التحميل فيمنع قفزات CLS الشهيرة.

## سير العمل العملي الكامل

المسار العملي لأي موقع: أولها تصدير من المصدر بأبعاد الهدف لا أكبر. ثم ضغط تدميري بجودة 0.7 فحص بصري. ثم تحويل إلى WebP مع الاحتفاظ بنسخة JPG احتياطية عبر عنصر picture في HTML. ثم رفع مع lazy loading للصور أسفل الشاشة (سمة loading="lazy"). وأخيراً قياس: افتح PageSpeed Insights وارصد تحسن LCP — النتائج تظهر فوراً وعادة تتجاوز التوقعات.

لمواقع الـ WordPress توجد إضافات تؤتمت الدورة، لكن فهم الخطوات يدوياً (وهذه المقالة نفسها) يجعلك تحكم بجودة النتيجة بدل قبول إعدادات إضافة غامضة. وللصور الفردية أو الدفعات الصغيرة، أدوات DouNest المحلية تعالج كل شيء داخل متصفحك بلا رفع — نفس الجودة، صفر خصوصية مهدورة.

## الخلاصة

ضغط الصور ليس مهارة تقنية معقدة بل سلسلة قرارات بسيطة: صيغة صحيحة (WebP غالباً)، جودة صحيحة (0.7)، أبعاد صحيحة (حجم العرض الفعلي)، وسمات HTML صحيحة (width/height/lazy). طبقها على عشر صور أثقل في موقعك اليوم وراقب فرق السرعة غداً — ثم اجعلها عادة لكل صورة جديدة قبل رفعها.`
,
      en: `Open any slow website and inspect its payload: images account for 50-70% of the weight in the overwhelming majority of cases. A single photo from a modern phone camera weighs 4-8 MB, while the ideal web image weighs 100-300 KB — this twenty-fold difference is the difference between a site opening in one second and one abandoned at the third.

## Why compression matters for search engines specifically

Google officially declared page experience a ranking factor: the three Core Web Vitals metrics (LCP for largest contentful paint, INP for interaction responsiveness, CLS for layout stability) are now direct monitoring targets. Heavy images hurt two of the three directly: they delay LCP when they are the main element, and cause CLS jumps when loaded without reserved dimensions. Competing sites equal in content are separated by performance, and image compression is the fastest performance win achievable in a single day.

## Lossy versus lossless

Lossless compression reorganizes file data efficiently without discarding any information — the image restores pixel-perfect, but savings are limited (10-30%). Lossy compression abandons details human eyes cannot distinguish — savings are massive (70-90%) but irreversible. The practical rule: lossy for the web always, and keep the high-quality original in your archive for the future.

The ideal JPEG quality is neither 100 nor 50 — it is the 0.6-0.8 zone where the savings curve bends sharply while degradation stays invisible. Test your image at different levels with the [Image Compressor](/tools/image-compressor/) and judge with your eyes, not abstract numbers.

## Choosing the format: a decision tree

Photographs (nature, people, products): WebP first at 0.7-0.8 quality, JPG as fallback. Graphics, logos, icons, screenshots: PNG when you need sharp-edged transparency, SVG natively for vector-capable icons, WebP in low-loss mode as a middle ground. Transparency: PNG or WebP exclusively — JPG does not support it at all, and converting a transparent image to it erases the alpha onto a surprise white background.

WebP specifically cuts size 25-35% versus JPG at equal visual quality, is supported in every modern browser for years, and Google itself recommends it in official performance guidance — converting your site's library is the single fastest executable improvement, and the [Image Converter](/tools/image-converter/) batches the whole library with one ZIP download.

## Correct dimensions: the most common mistake

An image displayed at 800px wide has no business being stored at 4000px — it consumes 25 times the needed pixels and gets scaled down in-browser via CSS. The fix: save each image at the maximum width it will actually display, and for high-density (Retina) screens save at double the displayed width. Most importantly, always set the width and height attributes on the img tag so the browser reserves space before loading, preventing the famous CLS jumps.

## The complete practical workflow

The practical path for any site: export from source at target dimensions, not larger. Then lossy compression at 0.7 with visual inspection. Then convert to WebP keeping a JPG fallback via the HTML picture element. Then upload with lazy loading for below-the-fold images (loading="lazy"). Finally measure: open PageSpeed Insights and track your LCP improvement — results appear immediately and usually exceed expectations.

WordPress plugins automate the loop, but understanding the steps manually (this very article) lets you control output quality instead of accepting a plugin's opaque settings. For individual images or small batches, DouNest's local tools process everything inside your browser with zero uploads — same quality, zero privacy cost.

## Conclusion

Image compression is not a complex technical skill but a chain of simple decisions: right format (WebP mostly), right quality (0.7), right dimensions (actual display size), right HTML attributes (width/height/lazy). Apply it to your ten heaviest images today and watch the speed difference tomorrow — then make it a habit for every new image before uploading.`
    }
  }
];
