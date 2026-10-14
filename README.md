# DouNest v3 — أدوات مجانية تعمل داخل المتصفح | Free Browser Tools

> نسخة موحّدة ومعاد بناؤها بالكامل: موقع واحد بدل نسختين متنازعتين، روابط حقيقية صديقة لمحركات البحث، **44 أداة** كلها تعمل، صفحة أسئلة شائعة بـSchema، وبنية ربح جاهزة للتشغيل.

---

## 🇸🇦 العربية

### ما الجديد في v3؟

| قبل (v1+v2) | بعد (v3) |
|---|---|
| نسختان متنافرتان (v1 مونوليث + v2 وحداتي) | موقع واحد موحّد بهوية واحدة |
| روابط `#/tools/x` لا تفهرسها جوجل | روابط حقيقية `/tools/json-formatter/` قابلة للفهرسة |
| 11 أداة مُعلنة لكنها مكسورة | **44 أداة كلها تعمل فعلياً** |
| صفحات فارغة بدون JS | محتوى عربي مُصدَّر مسبقاً في HTML يراه الزاحف مباشرة |
| sitemap بروابط hash غير صالحة | sitemap صالح بـ42 رابطاً حقيقياً (يُولَّد آلياً) |
| og:image يشير لملف غير موجود | og-cover.png احترافية 1200×630 + أيقونات PWA |
| Service Worker معطّل فعلياً | PWA يعمل **بدون إنترنت** بعد أول زيارة (مُختبَر) |
| صفر بنية ربح | مواضع AdSense + روابط تابعة + رعاية + زر دعم |
| تسريب ذاكرة في قائمة اللغات | مستمعات مفوَّضة واحدة، بلا تسريب |
| هوية ToolNest/DouNest ممزقة | هوية DouNest موحّدة بتصميم "تقني عصري" زجاجي |

### هيكل المشروع

```
├── index.html            الواجهة الرئيسية (SPA)
├── 404.html              تراجع GitHub Pages للروابط العميقة (يُولَّد)
├── config.js             ★ كل الإعدادات: النطاق، AdSense، التابع، الرعاية، التحليلات
├── build.mjs             ★ مولّد صفحات SEO + sitemap + sw  (node build.mjs)
├── assets/               التصميم + الشعار + og-cover + الأيقونات
├── js/
│   ├── app.js            الراوتر (روابط حقيقية) + الصفحات + SEO الحيوي
│   ├── registry.js       سجل الأدوات (مصدر الحقيقة الوحيد)
│   ├── monetize.js       طبقة الربح: إعلانات، تابع، رعاية، دعم
│   ├── i18n.js           10 لغات (واجهة عربية/إنجليزية كاملة)
│   └── tools/*.js        30 وحدة أداة (19 موروثة + 11 جديدة)
├── tools/<slug>/         ★ 30 صفحة هبوط مولّدة (محتوى مرئي للزاحف)
├── articles/<slug>/      ★ 4 مقالات كاملة (ليست "..." كما في v2)
└── about|privacy|terms/  صفحات قانونية (شرط قبول AdSense)
```

### النشر على GitHub Pages (3 خطوات)

```bash
# 1) عدّل config.js: اجعل repoPath مطابقاً لاسم المستودع
#    origin: "https://mohamedham202417.github.io"  repoPath: "DouNest"

# 2) أعد توليد الصفحات (بعد أي تعديل على registry/articles/config)
node build.mjs

# 3) ارفع كل شيء إلى فرع main — GitHub Pages يخدم الجذر مباشرة
git add -A && git commit -m "DouNest v3" && git push
```

> **نطاق مخصص؟** ضع `repoPath: ""` في config.js ثم `node build.mjs` — كل الروابط والـsitemap ستتحدث تلقائياً.

> **⚠️ مهم — رابط الموقع الصحيح:** `https://mohamedham202417.github.io/DouNest/`
> لا تفتح `.../DouNest/DouNest/` (مسار مكرر) — ستحوّلك الصفحة تلقائياً للرئيسية، لكن استخدم الرابط الأول في النشر والمشاركة وGoogle Search Console.

### نظام «الشفاء الذاتي» من الكاش القديم

كان السبب الأشهر لأعطال «الأزرار لا تعمل / الشريط العلوي / تبديل اللغة» هو **Service Worker قديم** مخزَّن في متصفح الزائر يقدّم ملفات من نسخة سابقة مختلطة بالجديدة.
v3.1 يعالج هذا جذرياً:
- كل صفحة تحمل معرّف بناء (BUILD_ID) — عند اكتشاف تغيّره يُلغى الـSW القديم وتُمسح الكاشات ويعاد التحميل مرة واحدة تلقائياً.
- تثبيت الـSW الجديد أصبح محصّناً: ملف واحد مفقود لا يُفشل التثبيت كله (كان هذا يُبقي الـSW القديم حياً للأبد).
- النتيجة: الزائر الذي كان عالقاً على نسخة قديمة يشفى تلقائياً من أول زيارة بعد النشر — دون أي خطوة يدوية.

### الأدوات الـ14 المضافة في v3.1 (كلها تعمل داخل المتصفح)

| الأداة | المكتبة مفتوحة المصدر | ملاحظات |
|---|---|---|
| إزالة خلفية الصورة | @imgly/background-removal (U²-Net/ONNX) | نموذج ~40MB يُحمَّل مرة واحدة ثم يعمل دون إنترنت |
| استخراج نص من صورة OCR | Tesseract.js | عربي + إنجليزي + مزدوج |
| صورة إلى PDF | pdf-lib | A4/Letter/مطابق للصورة + هوامش + ترتيب |
| تحويل HEIC إلى JPG | heic2any (libheif) | صور الآيفون، دفعات → ZIP |
| تقسيم PDF | pdf-lib + JSZip | نطاقات `1-3,5,8-10` → ملف أو ZIP |
| PDF إلى صور | pdf.js (Mozilla) | جودة قابلة للضبط، دفعات → ZIP |
| تدوير صفحات PDF | pdf-lib | 90/180/270 + نطاقات، تدوير دائم |
| Word إلى PDF | mammoth.js | DOCX → معاينة → نافذة طباعة (PDF حقيقي قابل للبحث) |
| تحجيم الصور | Canvas | بالعرض أو نسبة + صيغة وجودة، دفعات |
| Excel إلى CSV | SheetJS | اختيار الورقة والفاصل، كل الأوراق → ZIP |
| CSV إلى Excel | SheetJS | XLSX حقيقي بترميز UTF-8 سليم للعربية |
| Excel إلى JSON | SheetJS | كائنات أو صفوف، جاهز لـAPI |
| ضغط ملفات ZIP | JSZip | أي عدد ونوع، مجلد داخلي اختياري |
| قارئ QR من صورة | jsQR | لقطات شاشة، فحص الروابط قبل فتحها |

كما أُضيفت صفحة **الأسئلة الشائعة** `/faq/` (20 سؤالاً بأجوبة مفصّلة + Schema `FAQPage` + إدراج في sitemap) مستهدفة أكثر استعلامات البحث في هذا المجال، وأُصلحت روابط CDN مكسورة كانت تُعطّل أدوات PDF وQR في النسخ السابقة.

### تشغيل محلي

```bash
python3 -m http.server 8080
# ثم افتح http://localhost:8080/
```

### 💰 تفعيل مصادر الربح (بالترتيب)

**1. التحليلات أولاً (قبل أي شيء)** — في `config.js`:
```js
analytics: { gaId: "G-XXXXXXXXXX" }   // من analytics.google.com
```

**2. Google AdSense** — يتطلب: نطاق/محتوى حقيقي (مُوفَّر: 37 صفحة) + سياسة خصوصية تذكر الإعلانات (مُوفَّرة) + ترافيك. بعد القبول:
```js
adsense: {
  client: "ca-pub-XXXXXXXXXXXXXXXX",
  slots: { top: "1234567890", inline: "...", footer: "..." }
}
```
المواضع الجاهزة: أعلى صفحة الأداة، وسط الرئيسية، أسفل المحتوى — مخفية أنيقاً كـplaceholders حتى تضع أرقامك.

**3. الروابط التابعة** — أي رابط خارجي في دليل AI/الأدوات النادرة يمكن ربطه بمعرّفك:
```js
affiliateId: "YOUR_ID",
affiliates: { "hostinger.com": "ref", "namecheap.com": "ref" }
```
كل الروابط تُوسم `rel="sponsored"` مع بانر إفصاح تلقائي (متوافق مع سياسات جوجل).

**4. المساحات المميزة (تبيعها لأصحاب الأدوات)**:
```js
featured: [
  { title: "أداة X", desc: "شرح موجز", url: "https://...", img: "https://..." }
]
```
تظهر كبطاقة "رعاية" في الرئيسية والشريط الجانبي لصفحات الأدوات.

**5. زر الدعم**: ضع رابط BuyMeACoffee/Ko-fi في `support.url`.

**6. خارطة طريق Pro** (المرحلة الثانية): معالجة صور بالجملة، ملفات أكبر، بدون إعلانات — عبر Ko-fi/Gumroad.

### توجيهات مستقبلية — الانتقال إلى Next.js (خيار مزدوج)

البنية الحالية مثالية لـGitHub Pages، لكن حين يتجاوز الترافيك X زيارة/يوم:
- **متى تنتقل؟** عند حاجتك لـ: SSR فوري للمحتوى، توطين i18n في الرابط (`/en/tools/...`)، A/B testing، أو قاعدة بيانات (تعليقات حقيقية).
- **كيف؟** registry.js وarticles.js بيانات نقية ES Modules — تُستورد كما هي في Next.js. صفحات build.mjs تتحول لـ`generateStaticParams` + `generateMetadata` بسهولة. الأدوات (وحدات متصفح نقية) تعمل كـClient Components.
- **الترتيب المقترح**: Next.js على Vercel مع الحفاظ على نفس مسارات الروابط `/tools/<slug>/` (تصدر 301 من GitHub Pages عبر ملف _redirects إذا انتقلت لـCloudflare Pages).

---

## 🇬🇧 English (quick start)

**DouNest v3** — unified, SEO-first rebuild: real crawlable URLs for all 44 tools, generated landing pages with prerendered Arabic content, an FAQ page with FAQPage schema, working offline PWA with automatic stale-cache self-healing, and a complete monetization layer (AdSense slots, affiliate links, sponsored placements, support button).

```bash
# configure config.js (repoPath / domain / ads ids) then:
node build.mjs        # regenerates tool pages, sitemap.xml, 404.html, sw.js
python3 -m http.server 8080   # local preview
```

**Deploy:** push to GitHub Pages (set `repoPath: "DouNest"`), or any static host. Custom domain → `repoPath: ""`.

**Monetize:** fill `config.js` → analytics.gaId, adsense.client/slots, affiliateId, featured[], support.url. All placements and disclosures are handled by `js/monetize.js`.

**Adding a tool:** append its metadata to `js/registry.js`, create `js/tools/<slug>.js` exporting `render(root)`, run `node build.mjs` — you get a working tool + an SEO landing page automatically.
