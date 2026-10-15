/**
 * DouNest v4 — Articles data (part 4 of 4): NEW file-formats + remove-background-guide
 */
export const ARTICLES_4 = [
  {
    slug: "file-formats",
    title: {
      ar: "دليل صيغ الملفات الشامل: افهم الفرق بين كل الصيغ واختر الأنسب",
      en: "The Complete File Formats Guide: Understand Every Format and Choose Right"
    },
    excerpt: {
      ar: "لماذا فشل ملفك في الفتح؟ دليل شامل يشرح صيغ الصور والمستندات والصوت والفيديو والبيانات، ومتى تختار كل واحدة، وكيف تحوّل بينها بأمان وبدون فقد جودة.",
      en: "Why did your file fail to open? A comprehensive guide to image, document, audio, video and data formats — when to choose each and how to convert safely without quality loss."
    },
    date: "2026-10-09",
    tags: ["file-formats", "صيغ-الملفات", "conversion", "pdf", "images", "تحويل"],
    content: {
      ar: `رسالة "الملف غير مدعوم" تصادف الجميع: صورة من آيفون لا تفتح على ويندوز قديم، ومستند .docx ترفضه بوابة تطلب PDF، وفيديو MOV يشتغل بصوت بلا صورة. فهم صيغ الملفات ليس ترفاً تقنياً — إنه مهارة يومية توفر ساعات وتمنع خسائر بيانات، وهذا الدليل يرتب الفوضى في خريطة واضحة.

## صيغ الصور: ثلاث عائلات مختلفة الأغراض

العائلة الفوتوغرافية: JPG الملك المتوافق منذ عقود (ضغط تدميري ممتاز للصور الطبيعية، بلا شفافية)، وHEIC خليفته الأحدث من آبل (نصف حجم JPG بجودة أعلى لكن توافق محدود — لذا الصور من آيفون تحتاج أحياناً تحويلاً)، وWebP الوافد الحديث من غوغل (أصغر من JPG بثلث تقريباً بجودة مطابقة، مدعوم الآن في كل المتصفحات — الخيار الأول لمواقع الويب).

عائلة الرسومات: PNG الملك للشفافية والرسومات حادة الحواف (ضغط غير تدميري، أكبر حجماً من JPG للصور الفوتوغرافية)، وSVG صيغة المتجهات التي تتكبر وتصغر بلا أي فقد (مثالية للشعارات والأيقونات، نصية ويمكن تحريرها بأي محرر نصوص).

القاعدة العملية: صور طبيعية → JPG أو WebP، شفافية → PNG أو WebP، شعارات → SVG، توافق أقصى مع الجميع → JPG دائماً. وتذكر القاعدة الذهبية للتحويل: الشفافية تموت في JPG، والتكبير لا يعيد الجودة المفقودة أبداً.

## صيغ المستندات: ما يفتح أين ولماذا

PDF هو لغة التبادل النهائية للمستندات: يثبت شكله على كل جهاز، ويدمج الخطوط والصور، ويُقبل في كل جهة رسمية — لهذا كل التسليمات النهائية تطلبه. DOCX (Word) صيغة التحرير: مرونة كاملة في التعديل لكن شكلها ينكسر بين الأجهزة والخطوط المختلفة — لا ترسلها أبداً كنسخة نهائية. TXT النص الخالص: لا تنسيق إطلاقاً لكنه يفتح في كل شيء منذ سبعينات القرن الماضي. RTF وODT حلول وسطية تقل أهميتها سنوياً.

الترتيب الصحيح لسير العمل: حرر في DOCX، وسلّم النهائي PDF، واحتفظ TXT للأرشيف النصي الخالص. وتحويل DOCX إلى PDF قبل الإرسال يمنع مفاجأة "الخط تغيّر عند الطبيب/الجهة" الأبدية.

## صيغ الصوت والفيديو: الحاويات والترميزات

المفهوم المربك هنا أن صيغة الملف (حاوية) تختلف عن الترميز الداخلي: MP3 ترميز صوتي مشهور، بينما MP4 حاوية قد تحمل فيديو H.264 أو H.265 وصوت AAC أو غيرها — ولهذا يفتح ملف MP4 على جهاز ويشتغل صامتاً على آخر: الحاوية مدعومة والترميز الداخلي لا. WAV وFLAC للصوت غير التدميري (تسجيل وأرشفة موسيقية)، وMP3 وAAC للاستماع اليومي. وMKV حاوية مرنة تقبل كل الترميزات لكن بعض الأجهزة ترفضها.

للمشاركة العامة: MP4 بترميز H.264 وصوت AAC هو المزيج الذي يعمل في كل مكان تقريباً منذ سنوات — إن واجهت مشكلة تشغيل فالتحويل إليه يحل 90% من الحالات.

## صيغ البيانات: لغة الجداول والبرمجة

CSV نص جدولي بسيط بفواصل: يفتح في Excel وكل أدوات البيانات، لكنه قيم فقط (لا صيغ ولا أوراق متعددة) وترميزه مسألة حساسة للعربية — اطلب دائماً UTF-8. XLSX صيغة Excel الكاملة: صيغ حسابية وأوراق متعددة وتنسيق — لغة العمل اليومي. JSON لغة التطبيقات والواجهات البرمجية: بنيوية وكائنات ومصفوفات، وهي ما تتكلمه التطبيقات مع بعضها. XML الجد الأقدم لا يزال حياً في الأنظمة المؤسسية.

مسار البيانات النموذجي: يولد النظام JSON، ويحلل المحلل CSV، ويعرض المدير XLSX — والتحويلات بينها عمليات يومية حقيقية يحتاجها فريق واحد في أسبوع واحد.

## التحويل الآمن: قواعد لا تُكسر

قاعدة واحدة تحكم كل التحويلات: احتفظ بالأصل دائماً قبل أي تحويل — فالضغط التدميري والتحويلات البصرية غير قابلة للعكس، والأصل هو ضمانتك الوحيدة. ثانياً: حوّل للأعلى جودة لا للأسفل عند إعادة الاستخدام (احتفظ بالـ 300 DPI إن كانت الطباعة واردة). ثالثاً: انتبه لترميز النصوص عند التحول بين صيغ البيانات — UTF-8 هو الخيار الصحيح للعربية في كل الحالات تقريباً.

وللتنفيذ الآمن: مركز [التحويل الشامل](/convert/) في DouNest يكتشف نوع ملفك تلقائياً ويعرض التحويلات المتاحة، وكل المعالجة تحدث داخل متصفحك — ملفاتك لا ترفع لأي خادم، وهي ميزة حاسمة عند التعامل مع مستندات رسمية أو شخصية. ولملفات PDF تحديداً يوفر [مركز PDF](/pdf/) كل العمليات من ضغط ودمج وتقسيم في صفحة واحدة.

## الخلاصة

خريطة القرار السريعة: صور طبيعية JPG/WebP، وشفافية PNG، وشعارات SVG، ومستند نهائي PDF، وتحرير DOCX، وجداول للعمل XLSX وCSV للتبادل وJSON للتطبيقات، وفيديو للجميع MP4. احتفظ بالأصول، وحوّل بوعي للصيغة الصحيحة لا الأكثر شهرة، واستخدم أدوات محلية تحترم خصوصية ملفاتك — وستختفي رسالة "الملف غير مدعوم" من حياتك عملياً.`
,
      en: `The "unsupported file" message hits everyone: an iPhone photo not opening on old Windows, a .docx document rejected by a portal demanding PDF, a MOV video playing audio without picture. Understanding file formats is not technical luxury — it is a daily skill saving hours and preventing data losses, and this guide sorts the chaos into a clear map.

## Image formats: three families, three purposes

The photographic family: JPG, the compatible king for decades (excellent lossy compression for natural photos, no transparency); HEIC, Apple's newer successor (half of JPG's size at higher quality but limited compatibility — hence iPhone photos sometimes needing conversion); and WebP, Google's modern arrival (about a third smaller than JPG at equal quality, now supported in every browser — the first choice for the web).

The graphics family: PNG, the king of transparency and sharp-edged graphics (lossless, but larger than JPG for photographs); and SVG, the vector format scaling up and down with zero loss (ideal for logos and icons, text-based and editable in any text editor).

The practical rule: natural photos → JPG or WebP; transparency → PNG or WebP; logos → SVG; maximum universal compatibility → JPG always. And remember the golden conversion rule: transparency dies in JPG, and upscaling never restores lost quality.

## Document formats: what opens where and why

PDF is the final exchange language of documents: it keeps its shape on every device, embeds fonts and images, and is accepted by every official body — hence every final delivery demands it. DOCX (Word) is the editing format: fully flexible for changes but its layout breaks across devices and fonts — never send it as a final version. TXT is plain text: no formatting at all but opens in everything since the 1970s. RTF and ODT are middle-ground solutions fading yearly.

The correct workflow order: edit in DOCX, deliver final as PDF, keep TXT for plain archives. Converting DOCX to PDF before sending prevents the eternal "the font changed at the doctor's office" surprise.

## Audio and video: containers versus codecs

The confusing concept here is that the file format (container) differs from the internal codec: MP3 is a famous audio codec, while MP4 is a container carrying H.264 or H.265 video with AAC or other audio — which is why an MP4 opens on one device and plays silent on another: the container is supported, the inner codec is not. WAV and FLAC serve lossless audio (recording and music archiving), MP3 and AAC daily listening. MKV is a flexible container accepting everything, but some devices reject it.

For general sharing: MP4 with H.264 video and AAC audio is the combination working nearly everywhere for years — facing a playback problem, converting to it solves 90% of cases.

## Data formats: the language of spreadsheets and code

CSV is simple comma-separated tabular text: opens in Excel and every data tool, but values only (no formulas, no multi-sheets) and its encoding is sensitive for Arabic — always request UTF-8. XLSX is full Excel: formulas, multiple sheets, formatting — the daily work language. JSON is the language of apps and APIs: structured objects and arrays, how applications talk to each other. XML, the oldest elder, still lives inside enterprise systems.

The typical data path: the system emits JSON, the analyst handles CSV, the manager views XLSX — conversions between them are genuine daily operations a single team needs in a single week.

## Safe conversion: rules never to break

One rule governs all conversions: always keep the original before converting — lossy compression and visual conversions are irreversible, and the original is your only guarantee. Second: convert toward higher quality, not lower, when reuse is possible (keep the 300 DPI if printing is plausible). Third: mind text encoding when moving between data formats — UTF-8 is the right Arabic choice in virtually every case.

For safe execution: the [conversion hub](/convert/) at DouNest auto-detects your file's type and lists available conversions, with all processing inside your browser — your files never upload to any server, decisive for official or personal documents. For PDFs specifically, the [PDF hub](/pdf/) offers compression, merging and splitting in one page.

## Conclusion

The quick decision map: natural photos JPG/WebP, transparency PNG, logos SVG, final documents PDF, editing DOCX, spreadsheets XLSX for work and CSV for exchange and JSON for apps, universal video MP4. Keep originals, convert deliberately to the right format rather than the most famous one, and use local tools respecting your files' privacy — and the "unsupported file" message practically disappears from your life.`
    }
  },
  {
    slug: "remove-background-guide",
    title: {
      ar: "إزالة خلفية الصور: الدليل الكامل من الفكرة إلى نتيجة احترافية",
      en: "Background Removal: The Complete Guide from Idea to Professional Result"
    },
    excerpt: {
      ar: "كيف تزيل خلفية أي صورة مجاناً وبجودة احترافية: متى تعمل الأدوات الآلية بامتياز، وكيف تجهّز الصورة المثالية، وكيف تستخدم النتيجة في متجرك وسيرتك وتصاميمك.",
      en: "How to remove any photo's background for free at professional quality: when automated tools excel, how to prepare the perfect photo, and how to use results in your store, resume and designs."
    },
    date: "2026-10-07",
    tags: ["remove-background", "إزالة-الخلفية", "images", "ecommerce", "ai", "design"],
    content: {
      ar: `إزالة الخلفية كانت قبل خمس سنوات مهارة فوتوشوب مدفوعة تحتاج ساعات، واليوم تتم في ثوانٍ مجاناً بفضل نماذج الذكاء الاصطناعي المدرّبة على ملايين الصور. لكن "تتم في ثوانٍ" لا تعني "تخرج احترافية دائماً" — الفرق بين نتيجة ممتازة وأخرى متوسطة يقع في التجهيز والمعرفة، وهذا الدليل يغطي كليهما.

## لماذا تُزال الخلفيات أصلاً؟ حالات الاستخدام الحقيقية

المتاجر الإلكترونية هي المستخدم الأكبر: أمازون وإيباي وكل المنصات الكبرى تفرض خلفية بيضاء نقية لصور المنتجات، ومتجر بمئات المنتجات يواجه المئات من الصور التي تحتاج التوحيد. الثاني: السير الذاتية وصور البروفايل المهنية — صورة بخلفية نظيفة تبدو احترافية فوراً وتناسب قوالب السير الرسمية. الثالث: التسويق والمحتوى — دمج شخص أو منتج في تصميم إعلان، وبناء موك أب، وإنشاء رسوم توضيحية. الرابع: العروض التقديمية والوثائق التعليمية حيث الصور المعزولة أنظف بصرياً من اللقطات الخام.

## كيف تعمل الأدوات الآلية: فهم يجعل النتائج متوقعة

النماذج الحديثة (مثل U2-Net وأخواتها) دربت على ملايين الصور الموسومة حتى تعلمت التمييز بين "الهدف" و"الخلفية" بشكل عام: الأشخاص والمنتجات والحيوانات تُتعرف عليها كأهداف بدرجة عالية، بينما المشاهد المعقدة (مجموعات أشخاص متداخلة، أشياء شفافة، شبكات أسلاك) تبقى تحدياً. النموذج ينتج "قناع شفافية" لكل بكسل — منطقة انتقال ناعمة بين الهدف والخلفية هي التي تحدد جودة الحواف النهائية.

الخبر المهم: النموذج يعمل الآن داخل متصفحك مباشرة عبر WebAssembly — أداة [إزالة الخلفية](/tools/remove-background/) في DouNest تحلل صورتك محلياً دون رفعها لأي خادم، وهو فارق جوهري عن المواقع الشهيرة التي ترفع صورك (قد تكون منتجاتك أو وجهك) إلى سيرفراتها لتُخزن وتُستخدم بأغراض غير معلومة.

## تجهيز الصورة: 80% من جودة النتيجة

القاعدة الأولى: تباين واضح بين الهدف والخلفية — شخص بقميص أزرق أمام حائط أزرق يشوش النموذج، بينما نفس الشخص أمام حائط فاتح يُعزل بشكل مثالي. القاعدة الثانية: إضاءة متساوية بلا ظلال قاسية خلف الهدف — الظل المسقط يظنّه النموذج جزءاً من الهدف أحياناً. الثالثة: حدة عالية وصور حادة — الصورة الضبابية تخفي حدود الهدف فيحسبها النموذج خلفية. الرابعة: هدف مكتمل الإطار — لا تقطع رأساً أو يد بطريقة تُربك حدود الهدف.

عند التقاط صور المنتجات تحديداً: خلفية ورقية بيضاء أو لون فاتح موحد، وإضاءة من جهتين متقابلتين، وحامل ثابت — هذه التجهيزات البسيطة ترفع نسبة النتائج المثالية من "معظمها جيد" إلى "كلها ممتازة".

## بعد الإزالة: الفحص والتحسين

افحص النتيجة على خلفية شطرنجية (الأداة توفرها) بدل الأبيض — الشطرنج يكشف الحواف الشبحية والبقايا الشفافة التي تختبئ على الأبيض. ابحث عن ثلاث مشاكل شائعة: هالات ملونة حول الشعر (من انعكاس الخلفية الأصلية)، وحواف مقطوعة حادة بلا انتقال ناعم، وثقوب خاطئة داخل الهدف (قطعة زجاج شفافة تُزالت ظلماً). الحل السريع للثقوب والحالات الصعبة: أداة محرر صور بفرشاة استعادة على طبقة القناع — دقائق معدودة ترفع النتيجة من جيدة إلى مثالية.

الناتج الصحيح دائماً PNG بشفافية كاملة — لا تحفظه JPG أبداً لأنه سيمسح الشفافية بخلفية بيضاء. ولرفعه على الويب مرره بعدها بضاغط الصور لتخفيف حجمه دون فقد الشفافية.

## الاستخدامات المتقدمة للنتيجة

بعد الحصول على PNG نظيف تفتح أبواب متقدمة: خلفية بيضاء قياسية لمتاجرك (الصورة + خلفية بيضاء = مواصفات أمازون)، وخلفيات سياقية (منتجك على خشب أو رخام أو مكتب — تُركب في أي محرر صور)، وموك أب احترافي بإضافة ظل ناعم أسفل المنتج يمنحه ثقلاً واقعياً، وصورة بروفايل بخلفية متدرجة أنيقة تُصنع بمنتقي الألوان وتدرج CSS بسيط. وحتى صور الهوية البصرية: صفحات "من نحن" بموظفين بخلفية موحدة تصنع اتساقاً مؤسسياً فورياً.

## الخلاصة

معادلة النتيجة الاحترافية: صورة مُجهزة جيداً (تباين وإضاءة وحدة) + أداة AI موثوقة تعمل محلياً + فحص على خطرمة + لمسة تنظيف عند الحاجة + حفظ PNG. خمس خطوات، عشر دقائق للصورة، ونتيجة تنافس ما كانت تحتاج مصمماً وساعات — جرّب الآن على صورة منتج أو بروفايل وراقب الفرق بنفسك.`
,
      en: `Background removal was, five years ago, a paid Photoshop skill taking hours; today it takes seconds for free thanks to AI models trained on millions of images. But "takes seconds" does not mean "always professional" — the gap between excellent and mediocre results lies in preparation and knowledge, and this guide covers both.

## Why remove backgrounds at all? Real use cases

E-commerce is the largest user: Amazon, eBay and every major platform enforce pure white backgrounds for product photos, and a store with hundreds of products faces hundreds of images needing unification. Second: resumes and professional profile photos — a clean-background image looks instantly professional and fits formal resume templates. Third: marketing and content — compositing a person or product into ad designs, building mockups, creating illustrations. Fourth: presentations and educational documents where isolated images look cleaner than raw shots.

## How automated tools work: understanding makes results predictable

Modern models (like U2-Net and peers) trained on millions of labeled images until they learned to generally distinguish "subject" from "background": people, products and animals are recognized as subjects at high rates, while complex scenes (overlapping groups, transparent objects, wire meshes) remain challenging. The model produces a per-pixel alpha mask — the soft transition zone between subject and background determines final edge quality.

The important news: the model now runs inside your browser directly via WebAssembly — DouNest's [remove background](/tools/remove-background/) tool analyzes your photo locally without uploading it to any server, a fundamental difference from famous sites that upload your photos (possibly your products or your face) to their servers for storage and unknown uses.

## Photo preparation: 80% of result quality

Rule one: clear contrast between subject and background — a person in a blue shirt against a blue wall confuses the model, while the same person against a light wall isolates perfectly. Rule two: even lighting without harsh shadows behind the subject — a cast shadow is sometimes mistaken for part of the subject. Third: high sharpness — a blurry image hides the subject's edges so the model counts them as background. Fourth: a fully-framed subject — do not cut heads or hands in ways that confuse the subject's boundary.

For product photos specifically: white or uniform light paper backdrop, lighting from two opposing directions, a steady stand — these simple preparations lift perfect-result rates from "mostly good" to "all excellent."

## After removal: inspection and refinement

Inspect the result on a checkerboard background (the tool provides it) rather than white — checkerboard reveals ghost edges and transparent remnants that hide on white. Look for three common problems: colored halos around hair (reflected from the original background), harshly cut edges without soft transition, and wrong holes inside the subject (a transparent glass piece wrongly removed). The fast fix for holes and hard cases: an image editor's restore brush on the mask layer — minutes lifting a result from good to perfect.

The correct output is always full-transparency PNG — never save as JPG, which erases transparency onto white. For web uploads, run it through the image compressor afterward to lighten it without losing alpha.

## Advanced uses of the result

With a clean PNG in hand, advanced doors open: standard white background for your store (image + white = Amazon specs), contextual backgrounds (your product on wood, marble or a desk — composited in any editor), professional mockups by adding a soft shadow under the product for realistic weight, and a profile photo with an elegant gradient backdrop made with a color picker and simple CSS. Even brand identity pages: a "team" section with uniform-background staff creates instant corporate consistency.

## Conclusion

The professional-result equation: a well-prepared photo (contrast, lighting, sharpness) + a trustworthy local AI tool + checkerboard inspection + a cleanup touch when needed + saving as PNG. Five steps, ten minutes per image, and a result that competes with what once needed a designer and hours — try it now on a product or profile photo and judge the difference yourself.`
    }
  }
];
