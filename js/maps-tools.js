/**
 * DouNest v4 — Rare tools: MAPS (خرائط ومشاهدة الأرض)
 * -----------------------------------------------------
 * 2 curated external tools. Pure data module (Node-safe: imported by build.mjs).
 * Part of the unified rare registry in js/rare-tools.js.
 */

export const MAPS_TOOLS = [
  {
    slug: "maplat",
    cat: "maps",
    icon: "🗺️",
    name: { ar: "Maplat — خرائط التاريخ المتداخلة", en: "Maplat — Overlapping Historical Maps" },
    url: "https://maplat.jp/en/maplat/",
    desc: {
      ar: "منصة يابانية مفتوحة المصدر تعرض الخرائط التاريخية فوق الخرائط الحديثة بشكل متداخل ودقيق، فتسمح لك بالتنقل عبر الزمن بين خريطة عمرها مئة عام وصور الأقمار الصناعية الحالية لنفس المكان. تدعم المشروع آلاف الخرائط القديمة من اليابان ومناطق أخرى حول العالم، ويمكن لأي شخص رفع خريطة تاريخية وتحويلها إلى طبقة تفاعلية.",
      en: "An open-source Japanese platform that overlays historical maps on modern ones with precise warping, letting you travel through time between a century-old map and today's satellite imagery of the same spot. Thousands of old maps from Japan and beyond are already supported, and anyone can upload a historical map and turn it into an interactive layer."
    },
    why: {
      ar: "معظم الناس لا يعرفون أن أدوات كهذه موجودة إطلاقاً؛ هي تجمع بين متعة الاستكشاف وقيمة بحثية حقيقية للمؤرخين والصحفيين وعشاق المدن القديمة. الاستخدام بسيط جداً على الهاتف، وكل شيء مجاني ومفتوح المصدر دون تسجيل.",
      en: "Most people have no idea tools like this exist; it blends the joy of exploration with real research value for historians, journalists and city-history lovers. It works smoothly on phones, is completely free, and requires no account."
    },
    how: {
      ar: [
        "افتح موقع Maplat واختر مجموعة خرائط (مثل خرائط طوكيو القديمة).",
        "استخدم شريط الشفافية لتمزيج الخريطة التاريخية مع الخريطة الحديثة.",
        "حرّك الخريطة بإصبعك أو بالفأرة وشاهد كيف تتطابق المعالم عبر الزمن.",
        "اضغط على أي معلم لقراءة معلوماته التاريخية.",
        "إن كنت باحثاً، ارفع خريطتك التاريخية واربطها بإحداثيات مرجعية لتصبح طبقة تفاعلية عامة."
      ],
      en: [
        "Open the Maplat site and pick a map collection (for example old Tokyo maps).",
        "Use the transparency slider to blend the historical map with the modern one.",
        "Pan with your finger or mouse and watch landmarks align across time.",
        "Tap any landmark to read its historical information.",
        "As a researcher, upload your own historical map, georeference it, and publish it as a public layer."
      ]
    },
    tags: ["maplat", "خرائط-تاريخية", "maps", "تاريخ", "open-source", "globe"]
  },
  {
    slug: "gods-eye-view",
    cat: "maps",
    icon: "🛰️",
    name: { ar: "God's Eye View — عين تشاهد العالم مباشرة", en: "God's Eye View — Watching the Planet Live" },
    url: "https://globe.adsbexchange.com/",
    desc: {
      ar: "ليست أداة واحدة بل بوابة تجمع أشهر مصادر البيانات الحية لكوكب الأرض في مكان واحد: كرة أرضية ثلاثية الأبعاد تعرض كل طائرة في السماء الآن عبر ADS-B Exchange، حركة الرياح والطقس عبر Earth، الزلازل اللحظية من USGS، وتتبع الطائرات بتفاصيلها من OpenSky وأدوات tar1090 مفتوحة المصدر. كلها مجانية وقابلة للاستخدام مباشرة من المتصفح.",
      en: "Not a single tool but a gateway to the best live planetary data sources in one place: a 3D globe showing every aircraft in the sky right now via ADS-B Exchange, wind and weather via earth.nullschool, real-time earthquakes from USGS, plus flight tracking from OpenSky and the open-source tar1090 radars. All free and usable straight from the browser."
    },
    why: {
      ar: "الشعور بأنك ترى العالم يتحرك لحظة بلحظة — كل طائرة فوق رأسك، كل هزة أرضية، كل نسيم — تجربة لا تُنسى ومصدر إلهام للمطورين والصحفيين والمعلمين. وهي أيضاً مدخل عملي لفهم كيف تعمل أنظمة التتبع والبيانات المفتوحة.",
      en: "Watching the world move in real time — every plane above you, every tremor, every breeze — is an unforgettable experience and a rich source for developers, journalists and teachers. It is also a practical way to understand how tracking systems and open data actually work."
    },
    how: {
      ar: [
        "افتح globe.adsbexchange.com لترى كل الطائرات الحية على كرة ثلاثية الأبعاد — اضغط أي طائرة لمعرفة نوعها ومسارها.",
        "للتجربة التفاعلية على الطقس، افتح earth.nullschool.net وحرّك طبقات الرياح والأمواج ودرجات الحرارة.",
        "تابع الزلازل اللحظية عبر خريطة USGS على earthquake.usgs.gov.",
        "لإعداد رادارك الخاص، ثبّت مشروع tar1090 المفتوح المصدر على جهاز استقبال RTL-SDR رخيص.",
        "المطورون يمكنهم سحب بيانات حية عبر واجهة OpenSky API المجانية ودمجها في مشاريعهم."
      ],
      en: [
        "Open globe.adsbexchange.com to see every live aircraft on a 3D globe — tap any plane for its type and route.",
        "For an interactive weather experience, open earth.nullschool.net and play with wind, waves and temperature layers.",
        "Follow real-time earthquakes on the USGS map at earthquake.usgs.gov.",
        "To run your own radar, install the open-source tar1090 stack on a cheap RTL-SDR receiver.",
        "Developers can pull live data through the free OpenSky API and embed it in their own projects."
      ]
    },
    tags: ["adsb", "globe", "خريطة-حيّة", "طيران", "earth", "data-visualization"]
  }
];
