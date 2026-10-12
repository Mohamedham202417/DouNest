(() => {
  'use strict';

  const translations = {
    ar: {
      pageTitle: 'ToolNest — أدوات تقنية مجانية',
      metaDescription: 'أدوات تقنية مجانية داخل المتصفح: ضغط الصور، تحويل الصيغ، تنسيق JSON، مقارنة النصوص، محول الوحدات، مولد كلمات المرور، عداد الكلمات، محول الألوان، Base64، وترميز الروابط.',
      explore: 'استكشف الأدوات',
      eyebrow: 'مساحة واحدة لأدواتك اليومية',
      heroTitle: 'أدوات صغيرة.<br><span class="gradient-text">إنجاز أكبر.</span>',
      heroCopy: 'مجموعة أدوات تقنية مجانية وسهلة، تعمل مباشرة في متصفحك — دون تسجيل أو رفع ملفاتك إلى خادم.',
      searchPlaceholder: 'ابحث عن أداة...',
      freeNote: 'مجانية للاستخدام',
      privateNote: 'معالجة محلية للملفات',
      mobileNote: 'مصممة للهاتف',
      collection: 'المجموعة',
      toolsTitle: 'اختر أداتك',
      allTools: 'كل الأدوات',
      images: 'الصور',
      text: 'النصوص والبيانات',
      utilities: 'الحساب والتحويل',
      developer: 'المطورون',
      browserBadge: 'داخل المتصفح',
      instantBadge: 'فوري',
      compressTitle: 'ضغط الصور',
      compressDesc: 'قلّل حجم صورك مع التحكم في الجودة، دون إرسالها إلى أي خادم.',
      convertTitle: 'تحويل صيغ الصور',
      convertDesc: 'حوّل الصور بين PNG وJPEG وWebP بسهولة.',
      jsonTitle: 'منسّق JSON',
      jsonDesc: 'رتّب بيانات JSON وتحقق من صحتها مع رسائل خطأ واضحة.',
      diffTitle: 'مقارنة النصوص',
      diffDesc: 'اعرض الأسطر المضافة والمحذوفة بين نسختين من النص.',
      wordsTitle: 'عداد الكلمات',
      wordsDesc: 'احسب الكلمات والحروف والجمل والفقرات ووقت القراءة.',
      unitsTitle: 'محول الوحدات',
      unitsDesc: 'حوّل الطول والكتلة ودرجة الحرارة بسرعة ودقة.',
      passwordTitle: 'مولد كلمات المرور',
      passwordDesc: 'أنشئ كلمات مرور قوية قابلة للتخصيص بنقرة واحدة.',
      colorTitle: 'محول الألوان',
      colorDesc: 'حوّل الألوان بين HEX وRGB وHSL وانسخها بسهولة.',
      base64Title: 'Base64',
      base64Desc: 'رمّز النصوص إلى Base64 أو فك ترميزها محليًا.',
      urlTitle: 'ترميز الروابط',
      urlDesc: 'رمّز وفك ترميز النصوص والروابط بأمان.',
      openTool: 'فتح الأداة',
      noResults: 'لا توجد أدوات مطابقة لبحثك.',
      privacyTitle: 'ملفاتك تبقى عندك.',
      privacyCopy: 'أدوات الصور تعمل محليًا داخل المتصفح. لا يتم رفع الملفات إلى خادم في هذا الإصدار.',
      footerText: 'أدوات عملية، بلا تعقيد.',
      privacyLink: 'الخصوصية',
      termsLink: 'الشروط',
      aboutLink: 'حول',
      contactLink: 'اتصل بنا',
      faqLink: 'الأسئلة الشائعة',
      workspace: 'مساحة العمل',
      switchLanguage: 'تبديل اللغة',
      themeLabel: 'تبديل المظهر',
      closeDialog: 'إغلاق النافذة',
      selectImage: 'اختر صورة',
      quality: 'الجودة',
      compress: 'ضغط الصورة',
      downloadFile: 'تنزيل الصورة',
      format: 'الصيغة الناتجة',
      convert: 'تحويل الصورة',
      convertUnits: 'حوّل القيمة',
      jsonInput: 'بيانات JSON',
      formatJson: 'تنسيق والتحقق',
      copy: 'نسخ',
      copied: 'تم النسخ.',
      jsonValid: 'JSON صحيح وتم تنسيقه.',
      textA: 'النص الأول',
      textB: 'النص الثاني',
      compare: 'قارن النصين',
      added: 'مضاف',
      removed: 'محذوف',
      same: 'لا توجد تغييرات ظاهرة على مستوى الأسطر.',
      category: 'نوع التحويل',
      length: 'الطول',
      mass: 'الكتلة',
      temperature: 'درجة الحرارة',
      value: 'القيمة',
      from: 'من',
      to: 'إلى',
      result: 'النتيجة',
      invalidJson: 'JSON غير صالح:',
      chooseFile: 'يرجى اختيار صورة أولًا.',
      imageReady: 'اكتملت المعالجة. يمكنك تنزيل الصورة.',
      unsupported: 'تعذر معالجة هذه الصورة في المتصفح.',
      sizeBefore: 'الحجم الأصلي',
      sizeAfter: 'الحجم الجديد',
      sizeSmaller: 'أصغر',
      unitResult: 'النتيجة المحوّلة',
      compareHint: 'تعرض هذه الأداة اختلافات الأسطر، وليست مقارنة لغوية متقدمة.',
      localHint: 'تتم المعالجة على جهازك داخل المتصفح.',
      pwdLength: 'طول كلمة المرور',
      uppercase: 'أحرف كبيرة',
      lowercase: 'أحرف صغيرة',
      numbers: 'أرقام',
      symbols: 'رموز',
      excludeAmbiguous: 'استبعاد الرموز الملتبسة',
      generate: 'توليد',
      strength: 'القوة',
      weak: 'ضعيفة',
      medium: 'متوسطة',
      strong: 'قوية',
      passwordOutput: 'كلمة المرور',
      textInput: 'النص',
      words: 'الكلمات',
      characters: 'الحروف',
      charactersNoSpaces: 'الحروف بدون مسافات',
      sentences: 'الجمل',
      paragraphs: 'الفقرات',
      readingTime: 'وقت القراءة',
      minutes: 'دقيقة',
      pickColor: 'اختر لونًا',
      hex: 'HEX',
      rgb: 'RGB',
      hsl: 'HSL',
      clickToCopy: 'اضغط على أي قيمة لنسخها.',
      input: 'النص',
      output: 'النتيجة',
      encode: 'تشفير',
      decode: 'فك تشفير',
      base64Error: 'تعذر فك الترميز. تحقق من النص.',
      urlEncode: 'تشفير',
      urlDecode: 'فك تشفير',
      urlError: 'تعذر فك الترميز.',
      onboardingTitle: 'ابدأ بسرعة',
      onboardingCopy: 'ابحث عن الأداة، افتحها، ثم انسخ أو نزّل النتيجة — كل شيء محلي داخل متصفحك.',
      gotIt: 'فهمت',
      quickAccess: 'الوصول السريع',
      recentTools: 'آخر الأدوات استخدامًا',
      favoriteTools: 'الأدوات المفضلة',
      emptyRecent: 'لا توجد أدوات حديثة بعد.',
      emptyFavorites: 'أضف أدوات للمفضلة للوصول السريع.',
      localProcessingLink: 'كيف تعمل المعالجة المحلية؟',
      csvJsonTitle: 'CSV ⇄ JSON',
      csvJsonDesc: 'حوّل CSV إلى JSON أو العكس بسرعة مع معاينة النتيجة.',
      jwtTitle: 'JWT Inspector',
      jwtDesc: 'افحص Header وPayload لأي JWT محليًا دون إرسال التوكن.',
      hashTitle: 'Hash & Checksum',
      hashDesc: 'احسب SHA-256 وMD5 للنصوص أو الملفات للتحقق السريع.',
      regexTitle: 'Regex Tester',
      regexDesc: 'اختبر التعبيرات النمطية مباشرة وشاهد المطابقات.',
      timestampTitle: 'Timestamp Converter',
      timestampDesc: 'حوّل Unix timestamp إلى تاريخ والعكس لحظيًا.',
      slugTitle: 'Slug Generator',
      slugDesc: 'نظّف النص وحوّله إلى Slug جاهز للروابط.',
      favAdd: 'أضف للمفضلة',
      favRemove: 'إزالة من المفضلة',
      localPrivacyHint: 'المعالجة تتم محليًا في متصفحك.',
      convertCsvToJson: 'CSV ← JSON',
      convertJsonToCsv: 'JSON ← CSV',
      csvInput: 'CSV',
      jsonInputData: 'JSON',
      tokenInput: 'JWT Token',
      decodeToken: 'فك التوكن',
      header: 'Header',
      payload: 'Payload',
      invalidToken: 'JWT غير صالح.',
      hashAlgorithm: 'الخوارزمية',
      fileOptional: 'ملف (اختياري)',
      calculateHash: 'احسب',
      regexPattern: 'النمط',
      regexFlags: 'Flags',
      regexText: 'النص',
      testRegex: 'اختبر',
      matches: 'النتائج',
      unixTimestamp: 'Unix Timestamp',
      isoDate: 'ISO Date',
      toDate: 'حوّل لتاريخ',
      toTimestamp: 'حوّل لتوقيت',
      sourceText: 'النص الأصلي',
      slugOutputLabel: 'Slug الناتج',
      makeSlug: 'إنشاء Slug',
      cleanText: 'تنظيف النص',
      copiedUrl: 'تم نسخ الرابط المباشر.'
    },

    en: {
      pageTitle: 'ToolNest — Free Browser Tools',
      metaDescription: 'Free browser utilities: image compression, format conversion, JSON formatting, text comparison, unit conversion, password generator, word counter, color converter, Base64, and URL encoding.',
      explore: 'Explore tools',
      eyebrow: 'One place for everyday tools',
      heroTitle: 'Small tools.<br><span class="gradient-text">Bigger impact.</span>',
      heroCopy: 'A collection of free, simple utilities that run right in your browser — no sign-up and no file uploads.',
      searchPlaceholder: 'Search for a tool...',
      freeNote: 'Free to use',
      privateNote: 'Local file processing',
      mobileNote: 'Built for mobile',
      collection: 'The collection',
      toolsTitle: 'Choose your tool',
      allTools: 'All tools',
      images: 'Images',
      text: 'Text & data',
      utilities: 'Calculators & converters',
      developer: 'Developer',
      browserBadge: 'In your browser',
      instantBadge: 'Instant',
      compressTitle: 'Image compressor',
      compressDesc: 'Reduce image file size while controlling quality, without uploading it.',
      convertTitle: 'Image format converter',
      convertDesc: 'Convert images between PNG, JPEG and WebP with ease.',
      jsonTitle: 'JSON formatter',
      jsonDesc: 'Format JSON data and validate it with clear error messages.',
      diffTitle: 'Text comparison',
      diffDesc: 'See lines added or removed between two versions of a text.',
      wordsTitle: 'Word counter',
      wordsDesc: 'Count words, characters, sentences, paragraphs, and reading time.',
      unitsTitle: 'Unit converter',
      unitsDesc: 'Convert length, mass and temperature quickly and accurately.',
      passwordTitle: 'Password generator',
      passwordDesc: 'Generate strong customizable passwords in one click.',
      colorTitle: 'Color converter',
      colorDesc: 'Convert colors between HEX, RGB, and HSL and copy them easily.',
      base64Title: 'Base64',
      base64Desc: 'Encode text to Base64 or decode it locally.',
      urlTitle: 'URL encoder',
      urlDesc: 'Encode and decode text and links safely.',
      openTool: 'Open tool',
      noResults: 'No tools match your search.',
      privacyTitle: 'Your files stay yours.',
      privacyCopy: 'Image tools run locally in your browser. This version does not upload files to a server.',
      footerText: 'Useful tools, without the fuss.',
      privacyLink: 'Privacy',
      termsLink: 'Terms',
      aboutLink: 'About',
      contactLink: 'Contact',
      faqLink: 'FAQ',
      workspace: 'Workspace',
      switchLanguage: 'Change language',
      themeLabel: 'Toggle theme',
      closeDialog: 'Close dialog',
      selectImage: 'Choose an image',
      quality: 'Quality',
      compress: 'Compress image',
      downloadFile: 'Download image',
      format: 'Output format',
      convert: 'Convert image',
      convertUnits: 'Convert value',
      jsonInput: 'JSON data',
      formatJson: 'Format & validate',
      copy: 'Copy',
      copied: 'Copied.',
      jsonValid: 'Valid JSON, formatted successfully.',
      textA: 'First text',
      textB: 'Second text',
      compare: 'Compare texts',
      added: 'Added',
      removed: 'Removed',
      same: 'No line-level changes detected.',
      category: 'Conversion type',
      length: 'Length',
      mass: 'Mass',
      temperature: 'Temperature',
      value: 'Value',
      from: 'From',
      to: 'To',
      result: 'Result',
      invalidJson: 'Invalid JSON:',
      chooseFile: 'Please choose an image first.',
      imageReady: 'Processing complete. You can download the image.',
      unsupported: 'This image could not be processed in your browser.',
      sizeBefore: 'Original size',
      sizeAfter: 'New size',
      sizeSmaller: 'smaller',
      unitResult: 'Converted result',
      compareHint: 'This tool compares lines, not advanced linguistic meaning.',
      localHint: 'Processing happens locally in your browser.',
      pwdLength: 'Password length',
      uppercase: 'Uppercase letters',
      lowercase: 'Lowercase letters',
      numbers: 'Numbers',
      symbols: 'Symbols',
      excludeAmbiguous: 'Exclude ambiguous characters',
      generate: 'Generate',
      strength: 'Strength',
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong',
      passwordOutput: 'Password',
      textInput: 'Text',
      words: 'Words',
      characters: 'Characters',
      charactersNoSpaces: 'Characters without spaces',
      sentences: 'Sentences',
      paragraphs: 'Paragraphs',
      readingTime: 'Reading time',
      minutes: 'min',
      pickColor: 'Pick a color',
      hex: 'HEX',
      rgb: 'RGB',
      hsl: 'HSL',
      clickToCopy: 'Click any value to copy it.',
      input: 'Text',
      output: 'Result',
      encode: 'Encode',
      decode: 'Decode',
      base64Error: 'Could not decode. Check the input.',
      urlEncode: 'Encode',
      urlDecode: 'Decode',
      urlError: 'Could not decode.',
      onboardingTitle: 'Quick start',
      onboardingCopy: 'Find a tool, open it, then copy or download the result — everything runs locally in your browser.',
      gotIt: 'Got it',
      quickAccess: 'Quick access',
      recentTools: 'Recently used',
      favoriteTools: 'Favorites',
      emptyRecent: 'No recent tools yet.',
      emptyFavorites: 'Add tools to favorites for quick access.',
      localProcessingLink: 'How local processing works',
      csvJsonTitle: 'CSV ⇄ JSON',
      csvJsonDesc: 'Convert CSV to JSON or back with instant preview.',
      jwtTitle: 'JWT Inspector',
      jwtDesc: 'Inspect JWT header and payload locally without sending the token.',
      hashTitle: 'Hash & Checksum',
      hashDesc: 'Generate SHA-256 and MD5 for text or files.',
      regexTitle: 'Regex Tester',
      regexDesc: 'Test regex patterns and see matches instantly.',
      timestampTitle: 'Timestamp Converter',
      timestampDesc: 'Convert Unix timestamps to dates and back instantly.',
      slugTitle: 'Slug Generator',
      slugDesc: 'Clean text and generate URL-ready slugs.',
      favAdd: 'Add to favorites',
      favRemove: 'Remove from favorites',
      localPrivacyHint: 'Processing happens locally in your browser.',
      convertCsvToJson: 'CSV ← JSON',
      convertJsonToCsv: 'JSON ← CSV',
      csvInput: 'CSV',
      jsonInputData: 'JSON',
      tokenInput: 'JWT token',
      decodeToken: 'Decode token',
      header: 'Header',
      payload: 'Payload',
      invalidToken: 'Invalid JWT token.',
      hashAlgorithm: 'Algorithm',
      fileOptional: 'File (optional)',
      calculateHash: 'Calculate',
      regexPattern: 'Pattern',
      regexFlags: 'Flags',
      regexText: 'Text',
      testRegex: 'Test',
      matches: 'Matches',
      unixTimestamp: 'Unix timestamp',
      isoDate: 'ISO date',
      toDate: 'To date',
      toTimestamp: 'To timestamp',
      sourceText: 'Source text',
      slugOutputLabel: 'Slug output',
      makeSlug: 'Generate slug',
      cleanText: 'Clean text',
      copiedUrl: 'Direct URL copied.'
    }
  };

  const HTML_KEYS = new Set(['heroTitle']);

  let lang = localStorage.getItem('toolnest-lang') || 'ar';
  if (!['ar', 'en'].includes(lang)) lang = 'ar';

  let activeCategory = 'all';
  let lastFocused = null;
  const TOOL_IDS = [
    'compress', 'convert', 'json', 'diff', 'words', 'units', 'password', 'color', 'base64', 'url',
    'csvjson', 'jwt', 'hash', 'regex', 'timestamp', 'slug'
  ];
  const FAVORITES_KEY = 'toolnest-favorites';
  const RECENTS_KEY = 'toolnest-recents';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const modal = $('#toolModal');

  function readJsonStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return Array.isArray(fallback) ? (Array.isArray(parsed) ? parsed : fallback) : (parsed ?? fallback);
    } catch {
      return fallback;
    }
  }

  function writeJsonStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }

  function getFavorites() {
    return readJsonStorage(FAVORITES_KEY, []).filter((tool) => TOOL_IDS.includes(tool));
  }

  function getRecents() {
    return readJsonStorage(RECENTS_KEY, []).filter((tool) => TOOL_IDS.includes(tool));
  }

  function getToolSetting(key, fallback) {
    try {
      const value = localStorage.getItem(`toolnest-setting:${key}`);
      return value === null ? fallback : value;
    } catch {
      return fallback;
    }
  }

  function setToolSetting(key, value) {
    try {
      localStorage.setItem(`toolnest-setting:${key}`, String(value));
    } catch {}
  }

  function t(key) {
    return translations[lang][key] || translations.en[key] || key;
  }

  function status(message, type = '') {
    const element = $('#statusMessage');
    if (!element) return;
    element.textContent = message;
    element.className = `status-message${type ? ` ${type}` : ''}`;
  }

  function normalizeText(value) {
    return String(value || '').toLowerCase().normalize('NFC').trim();
  }

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes)) return '—';
    if (bytes < 1024) return `${bytes} B`;

    const units = ['KB', 'MB', 'GB'];
    let value = bytes;
    let index = -1;

    do {
      value /= 1024;
      index++;
    } while (value >= 1024 && index < units.length - 1);

    return `${value.toFixed(2)} ${units[index]}`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
  }

  function updateToolCount(visibleCount) {
    const label = lang === 'ar' ? 'أدوات' : 'TOOLS';
    const element = $('#toolCount');
    if (element) {
      element.textContent = `${String(visibleCount).padStart(2, '0')} ${label}`;
    }
  }

  function filterTools() {
    const search = $('#searchInput');
    if (!search) return;
    const query = normalizeText(search.value);
    let visibleCount = 0;

    $$('.tool-card').forEach((card) => {
      const matchesCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
      const haystack = normalizeText(`${card.dataset.search || ''} ${card.textContent}`);
      const matchesQuery = !query || haystack.includes(query);
      const show = matchesCategory && matchesQuery;

      card.classList.toggle('hidden', !show);
      if (show) visibleCount++;
    });

    const noResults = $('#noResults');
    if (noResults) noResults.classList.toggle('hidden', visibleCount !== 0);
    updateToolCount(visibleCount);
  }

  function toggleFavorite(tool) {
    const favorites = getFavorites();
    const exists = favorites.includes(tool);
    const next = exists ? favorites.filter((id) => id !== tool) : favorites.concat(tool);
    writeJsonStorage(FAVORITES_KEY, next);
    renderFavoriteButtons();
    renderQuickAccess();
  }

  function markRecent(tool) {
    const recents = getRecents().filter((id) => id !== tool);
    recents.unshift(tool);
    writeJsonStorage(RECENTS_KEY, recents.slice(0, 8));
    renderQuickAccess();
  }

  function toolTitleById(tool) {
    const keyMap = {
      compress: 'compressTitle',
      convert: 'convertTitle',
      json: 'jsonTitle',
      diff: 'diffTitle',
      words: 'wordsTitle',
      units: 'unitsTitle',
      password: 'passwordTitle',
      color: 'colorTitle',
      base64: 'base64Title',
      url: 'urlTitle',
      csvjson: 'csvJsonTitle',
      jwt: 'jwtTitle',
      hash: 'hashTitle',
      regex: 'regexTitle',
      timestamp: 'timestampTitle',
      slug: 'slugTitle'
    };
    return t(keyMap[tool] || tool);
  }

  function renderQuickAccessRow(containerId, items, emptyText) {
    const container = $('#' + containerId);
    if (!container) return;
    container.innerHTML = '';
    if (!items.length) {
      container.innerHTML = `<span class="quick-empty">${emptyText}</span>`;
      return;
    }
    items.forEach((tool) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quick-btn';
      button.textContent = toolTitleById(tool);
      button.addEventListener('click', () => openModal(tool, true));
      container.appendChild(button);
    });
  }

  function renderQuickAccess() {
    renderQuickAccessRow('recentToolsRow', getRecents(), t('emptyRecent'));
    renderQuickAccessRow('favoriteToolsRow', getFavorites(), t('emptyFavorites'));
  }

  function renderFavoriteButtons() {
    const favorites = getFavorites();
    $$('.tool-card').forEach((card) => {
      const tool = card.querySelector('.open-tool')?.dataset.tool;
      if (!tool) return;
      const button = card.querySelector('.tool-fav');
      if (!button) return;
      const active = favorites.includes(tool);
      button.classList.toggle('active', active);
      button.setAttribute('aria-label', active ? t('favRemove') : t('favAdd'));
      button.textContent = active ? '★' : '☆';
    });
  }

  function attachFavoriteButtons() {
    $$('.tool-card').forEach((card) => {
      const top = $('.card-top', card);
      const tool = $('.open-tool', card)?.dataset.tool;
      if (!top || !tool || $('.tool-fav', card)) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tool-fav';
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleFavorite(tool);
      });
      top.appendChild(button);
    });
    renderFavoriteButtons();
  }

  function applyLanguage() {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);
    document.body.setAttribute('dir', dir);

    document.title = t('pageTitle');

    const metaDescription = $('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('metaDescription'));
    }

    $$('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      const value = t(key);

      if (HTML_KEYS.has(key)) {
        element.innerHTML = value;
      } else {
        element.textContent = value;
      }
    });

    $$('[data-i18n-placeholder]').forEach((element) => {
      element.placeholder = t(element.dataset.i18nPlaceholder);
    });

    const langBtn = $('#langBtn');
    if (langBtn) {
      langBtn.textContent = lang === 'ar' ? 'EN' : 'عربي';
      langBtn.setAttribute('aria-label', t('switchLanguage'));
    }
    const themeBtn = $('#themeBtn');
    if (themeBtn) themeBtn.setAttribute('aria-label', t('themeLabel'));
    const closeBtn = $('#closeModal');
    if (closeBtn) closeBtn.setAttribute('aria-label', t('closeDialog'));

    filterTools();
    renderFavoriteButtons();
    renderQuickAccess();

    if (modal && !modal.classList.contains('hidden')) {
      const currentTool = modal.dataset.currentTool;
      if (currentTool) renderTool(currentTool);
    }
  }

  function applyStoredTheme() {
    const theme = localStorage.getItem('toolnest-theme') || 'light';
    const dark = theme === 'dark';
    document.documentElement.classList.toggle('dark', dark);
    document.body.classList.toggle('dark', dark);
  }

  function openModal(tool, fromQuick = false) {
    if (!TOOL_IDS.includes(tool) || !modal) return;
    lastFocused = document.activeElement;
    modal.dataset.currentTool = tool;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');

    renderTool(tool);
    markRecent(tool);

    const closeButton = $('#closeModal');
    if (closeButton) closeButton.focus();
    document.body.style.overflow = 'hidden';

    const page = location.pathname.endsWith('/tool.html') || location.pathname.endsWith('tool.html')
      ? 'tool.html'
      : 'index.html';
    const query = `?tool=${encodeURIComponent(tool)}`;
    if (!fromQuick || page.includes('index')) {
      history.replaceState({}, '', `${page}${query}`);
    }
  }

  function closeModal() {
    if (!modal || modal.classList.contains('hidden')) return;

    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    delete modal.dataset.currentTool;

    $('#toolBody').innerHTML = '';
    status('');

    document.body.style.overflow = '';

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }

    if (location.pathname.endsWith('/tool.html') || location.pathname.endsWith('tool.html')) {
      const firstTool = getRecents()[0] || 'compress';
      openModal(firstTool, true);
      return;
    }

    history.replaceState({}, '', 'index.html');
  }

  function trapFocus(event) {
    const focusables = $$(
      '#toolModal button, #toolModal [href], #toolModal input, #toolModal select, #toolModal textarea, #toolModal [tabindex]:not([tabindex="-1"])'
    ).filter((element) => !element.disabled && element.getClientRects().length > 0);

    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function renderTool(tool) {
    const body = $('#toolBody');
    body.innerHTML = '';
    status('');

    const titleMap = {
      compress: 'compressTitle',
      convert: 'convertTitle',
      json: 'jsonTitle',
      diff: 'diffTitle',
      words: 'wordsTitle',
      units: 'unitsTitle',
      password: 'passwordTitle',
      color: 'colorTitle',
      base64: 'base64Title',
      url: 'urlTitle',
      csvjson: 'csvJsonTitle',
      jwt: 'jwtTitle',
      hash: 'hashTitle',
      regex: 'regexTitle',
      timestamp: 'timestampTitle',
      slug: 'slugTitle'
    };

    $('#modalTitle').textContent = t(titleMap[tool] || 'workspace');

    if (tool === 'compress' || tool === 'convert') {
      renderImageTool(tool, body);
    } else if (tool === 'json') {
      renderJsonTool(body);
    } else if (tool === 'diff') {
      renderDiffTool(body);
    } else if (tool === 'words') {
      renderWordsTool(body);
    } else if (tool === 'units') {
      renderUnitsTool(body);
    } else if (tool === 'password') {
      renderPasswordTool(body);
    } else if (tool === 'color') {
      renderColorTool(body);
    } else if (tool === 'base64') {
      renderBase64Tool(body);
    } else if (tool === 'url') {
      renderUrlTool(body);
    } else if (tool === 'csvjson') {
      renderCsvJsonTool(body);
    } else if (tool === 'jwt') {
      renderJwtTool(body);
    } else if (tool === 'hash') {
      renderHashTool(body);
    } else if (tool === 'regex') {
      renderRegexTool(body);
    } else if (tool === 'timestamp') {
      renderTimestampTool(body);
    } else if (tool === 'slug') {
      renderSlugTool(body);
    }

    if (!$('.tool-privacy-hint', body)) {
      const hint = document.createElement('p');
      hint.className = 'hint tool-privacy-hint';
      hint.textContent = t('localPrivacyHint');
      body.prepend(hint);
    }
  }

  function renderImageTool(tool, body) {
    const isCompress = tool === 'compress';

    body.innerHTML = `
      <label for="imageFile">${t('selectImage')}</label>
      <input id="imageFile" type="file" accept="image/*">
      <p class="hint">${t('localHint')}</p>

      <img id="imagePreview" class="preview-img hidden" alt="">
      <div id="imageInfo" class="result-box hidden" role="status"></div>

      ${
        isCompress
          ? `
            <label for="quality">${t('quality')}: <span id="qualityValue">75%</span></label>
            <input id="quality" type="range" min="10" max="100" value="75">
          `
          : `
            <label for="imageFormat">${t('format')}</label>
            <select id="imageFormat">
              <option value="image/webp">WebP</option>
              <option value="image/jpeg">JPEG</option>
              <option value="image/png">PNG</option>
            </select>
          `
      }

      <div class="button-row">
        <button type="button" class="action-btn" id="processImage">
          ${t(isCompress ? 'compress' : 'convert')}
        </button>
        <a id="downloadImage" class="secondary-btn hidden" download="toolnest-image.webp">
          ${t('downloadFile')}
        </a>
      </div>
    `;

    let file = null;
    let img = null;
    let objectUrl = null;
    let outUrl = null;

    const fileInput = $('#imageFile');
    const preview = $('#imagePreview');
    const info = $('#imageInfo');
    const download = $('#downloadImage');
    const processButton = $('#processImage');

    const applyDropState = (hover) => fileInput.classList.toggle('drop-hover', hover);
    ['dragenter', 'dragover'].forEach((eventName) => {
      fileInput.addEventListener(eventName, (event) => {
        event.preventDefault();
        applyDropState(true);
      });
    });
    ['dragleave', 'drop'].forEach((eventName) => {
      fileInput.addEventListener(eventName, (event) => {
        event.preventDefault();
        applyDropState(false);
      });
    });
    fileInput.addEventListener('drop', (event) => {
      const files = event.dataTransfer?.files;
      if (!files || !files.length) return;
      fileInput.files = files;
      fileInput.dispatchEvent(new Event('change'));
    });

    fileInput.addEventListener('change', () => {
      const selected = fileInput.files && fileInput.files[0];

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        objectUrl = null;
      }

      if (outUrl) {
        URL.revokeObjectURL(outUrl);
        outUrl = null;
      }

      download.classList.add('hidden');
      preview.classList.add('hidden');
      info.classList.add('hidden');

      file = null;
      img = null;

      if (!selected) {
        status('');
        return;
      }

      if (!selected.type || !selected.type.startsWith('image/')) {
        status(t('unsupported'), 'error');
        return;
      }

      file = selected;
      objectUrl = URL.createObjectURL(file);

      const tempImage = new Image();
      tempImage.decoding = 'async';

      tempImage.onload = () => {
        img = tempImage;
        preview.src = objectUrl;
        preview.alt = file.name || '';
        preview.classList.remove('hidden');
        info.classList.remove('hidden');

        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;

        info.textContent = `${t('sizeBefore')}: ${formatBytes(file.size)} · ${width} × ${height}px`;
        status('');
      };

      tempImage.onerror = () => {
        file = null;
        img = null;
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
          objectUrl = null;
        }
        status(t('unsupported'), 'error');
      };

      tempImage.src = objectUrl;
    });

    if (isCompress) {
      const qualityInput = $('#quality');
      const storedQuality = Number(getToolSetting('compress-quality', qualityInput.value));
      if (Number.isFinite(storedQuality) && storedQuality >= 10 && storedQuality <= 100) {
        qualityInput.value = String(storedQuality);
      }
      $('#qualityValue').textContent = `${qualityInput.value}%`;
      qualityInput.addEventListener('input', () => {
        $('#qualityValue').textContent = `${qualityInput.value}%`;
        setToolSetting('compress-quality', qualityInput.value);
      });
    } else {
      const formatSelect = $('#imageFormat');
      const storedFormat = getToolSetting('convert-format', formatSelect.value);
      if (Array.from(formatSelect.options).some((option) => option.value === storedFormat)) {
        formatSelect.value = storedFormat;
      }
      formatSelect.addEventListener('change', () => setToolSetting('convert-format', formatSelect.value));
    }

    processButton.addEventListener('click', () => {
      if (processButton.disabled) return;
      if (!file || !img) {
        status(t('chooseFile'), 'error');
        return;
      }
      processButton.disabled = true;

      try {
        const canvas = document.createElement('canvas');
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;

        if (!width || !height) {
          status(t('unsupported'), 'error');
          return;
        }

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');
        const mime = isCompress ? 'image/jpeg' : $('#imageFormat').value;

        if (mime === 'image/jpeg') {
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, width, height);
        }

        context.drawImage(img, 0, 0, width, height);

        const done = (blob) => {
          if (!blob) {
            status(t('unsupported'), 'error');
            processButton.disabled = false;
            return;
          }

          if (outUrl) {
            URL.revokeObjectURL(outUrl);
          }

          outUrl = URL.createObjectURL(blob);

          const extensionMap = {
            'image/webp': 'webp',
            'image/jpeg': 'jpg',
            'image/png': 'png'
          };

          const extension = extensionMap[mime] || 'png';
          download.href = outUrl;
          download.download = `toolnest-image.${extension}`;
          download.classList.remove('hidden');

          const sizeLine = `${t('sizeBefore')}: ${formatBytes(file.size)} · ${t('sizeAfter')}: ${formatBytes(blob.size)}`;

          if (blob.size < file.size) {
            const reduction = Math.max(0, Math.round((1 - blob.size / file.size) * 100));
            info.textContent = `${sizeLine} · ${reduction}% ${t('sizeSmaller')}`;
          } else {
            info.textContent = sizeLine;
          }

          status(t('imageReady'), 'success');
          processButton.disabled = false;
        };

        const quality = isCompress ? Number($('#quality').value) / 100 : 0.92;

        if (mime === 'image/png') {
          canvas.toBlob(done, 'image/png');
        } else {
          canvas.toBlob(done, mime, quality);
        }
      } catch {
        status(t('unsupported'), 'error');
        processButton.disabled = false;
      }
    });
  }

  function renderJsonTool(body) {
    body.innerHTML = `
      <label for="jsonInput">${t('jsonInput')}</label>
      <textarea id="jsonInput" spellcheck="false" placeholder='{"name":"ToolNest","free":true}'></textarea>

      <div class="button-row">
        <button type="button" class="action-btn" id="formatJson">${t('formatJson')}</button>
        <button type="button" class="secondary-btn" id="copyJson">${t('copy')}</button>
      </div>

      <pre id="jsonOutput" class="result-box hidden" tabindex="0"></pre>
    `;

    const output = $('#jsonOutput');

    $('#formatJson').addEventListener('click', () => {
      try {
        const parsed = JSON.parse($('#jsonInput').value);
        output.textContent = JSON.stringify(parsed, null, 2);
        output.classList.remove('hidden');
        status(t('jsonValid'), 'success');
      } catch (error) {
        output.classList.add('hidden');
        output.textContent = '';
        status(`${t('invalidJson')} ${error.message}`, 'error');
      }
    });

    $('#copyJson').addEventListener('click', async () => {
      if (output.classList.contains('hidden') || !output.textContent) {
        status(t('invalidJson'), 'error');
        return;
      }

      await copyText(output.textContent);
      status(t('copied'), 'success');
    });
  }

  function renderDiffTool(body) {
    body.innerHTML = `
      <p class="hint">${t('compareHint')}</p>

      <div class="field-row">
        <div>
          <label for="textA">${t('textA')}</label>
          <textarea id="textA"></textarea>
        </div>
        <div>
          <label for="textB">${t('textB')}</label>
          <textarea id="textB"></textarea>
        </div>
      </div>

      <button type="button" class="action-btn" id="compareText">${t('compare')}</button>
      <div id="diffOutput" class="result-box hidden" tabindex="0"></div>
    `;

    $('#compareText').addEventListener('click', () => {
      const a = $('#textA').value.replace(/\r\n?/g, '\n').split('\n');
      const b = $('#textB').value.replace(/\r\n?/g, '\n').split('\n');
      const output = $('#diffOutput');
      const html = [];

      const max = Math.max(a.length, b.length);

      for (let i = 0; i < max; i++) {
        if (a[i] === b[i]) {
          if (a[i] !== undefined) {
            html.push(`<span>${escapeHtml(a[i]) || '&nbsp;'}</span>`);
          }
        } else {
          if (a[i] !== undefined) {
            html.push(`<span class="diff-removed">− ${escapeHtml(a[i]) || '&nbsp;'}</span>`);
          }
          if (b[i] !== undefined) {
            html.push(`<span class="diff-added">+ ${escapeHtml(b[i]) || '&nbsp;'}</span>`);
          }
        }
      }

      if (!html.length) {
        output.textContent = t('same');
      } else {
        output.innerHTML = html.join('');
      }

      output.classList.remove('hidden');
      status('');
    });
  }

  function renderWordsTool(body) {
    body.innerHTML = `
      <label for="wordsInput">${t('textInput')}</label>
      <textarea id="wordsInput"></textarea>
      <div id="wordsResult" class="result-box" role="status"></div>
    `;

    const input = $('#wordsInput');
    const result = $('#wordsResult');

    const update = () => {
      const text = input.value;
      const trimmed = text.trim();

      const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
      const characters = [...text].length;
      const charactersNoSpaces = [...text.replace(/\s/g, '')].length;
      const sentences = text.split(/[.!?؟…]+/).filter((item) => item.trim()).length;
      const paragraphs = text.split(/\n+/).filter((item) => item.trim()).length;
      const reading = words ? Math.ceil(words / 200) : 0;

      result.textContent = [
        `${t('words')}: ${words}`,
        `${t('characters')}: ${characters}`,
        `${t('charactersNoSpaces')}: ${charactersNoSpaces}`,
        `${t('sentences')}: ${sentences}`,
        `${t('paragraphs')}: ${paragraphs}`,
        `${t('readingTime')}: ${reading} ${t('minutes')}`
      ].join('\n');
    };

    input.addEventListener('input', update);
    update();
  }

  function renderUnitsTool(body) {
    body.innerHTML = `
      <label for="unitCategory">${t('category')}</label>
      <select id="unitCategory">
        <option value="length">${t('length')}</option>
        <option value="mass">${t('mass')}</option>
        <option value="temperature">${t('temperature')}</option>
      </select>

      <div class="field-row">
        <div>
          <label for="unitValue">${t('value')}</label>
          <input id="unitValue" type="number" inputmode="decimal" value="1" step="any">
        </div>
        <div>
          <label for="unitFrom">${t('from')}</label>
          <select id="unitFrom"></select>
        </div>
      </div>

      <label for="unitTo">${t('to')}</label>
      <select id="unitTo"></select>

      <div class="result-box" id="unitResult" role="status"></div>

      <button type="button" class="action-btn" id="convertUnits">${t('convertUnits')}</button>
    `;

    const unitOptions = {
      length: [
        ['m', 'm — metre'],
        ['km', 'km — kilometre'],
        ['cm', 'cm — centimetre'],
        ['mm', 'mm — millimetre'],
        ['mi', 'mi — mile'],
        ['ft', 'ft — foot'],
        ['in', 'in — inch']
      ],
      mass: [
        ['kg', 'kg — kilogram'],
        ['g', 'g — gram'],
        ['mg', 'mg — milligram'],
        ['lb', 'lb — pound'],
        ['oz', 'oz — ounce']
      ],
      temperature: [
        ['C', '°C — Celsius'],
        ['F', '°F — Fahrenheit'],
        ['K', 'K — Kelvin']
      ]
    };

    function convertValue(value, from, to, category) {
      if (category === 'temperature') {
        let celsius;

        if (from === 'C') {
          celsius = value;
        } else if (from === 'F') {
          celsius = (value - 32) * 5 / 9;
        } else {
          celsius = value - 273.15;
        }

        if (to === 'C') {
          return celsius;
        }

        if (to === 'F') {
          return celsius * 9 / 5 + 32;
        }

        return celsius + 273.15;
      }

      const factors = {
        length: {
          m: 1,
          km: 1000,
          cm: 0.01,
          mm: 0.001,
          mi: 1609.344,
          ft: 0.3048,
          in: 0.0254
        },
        mass: {
          kg: 1,
          g: 0.001,
          mg: 0.000001,
          lb: 0.45359237,
          oz: 0.028349523125
        }
      };

      return value * factors[category][from] / factors[category][to];
    }

    function formatNumber(value) {
      try {
        return new Intl.NumberFormat(lang === 'ar' ? 'ar' : 'en', {
          maximumFractionDigits: 8
        }).format(value);
      } catch {
        return String(value);
      }
    }

    function updateUnits() {
      const value = Number($('#unitValue').value);
      const resultBox = $('#unitResult');

      if (!Number.isFinite(value)) {
        resultBox.textContent = '—';
        return;
      }

      const result = convertValue(
        value,
        $('#unitFrom').value,
        $('#unitTo').value,
        $('#unitCategory').value
      );

      const pretty = Number(result.toPrecision(12));
      resultBox.textContent = `${t('unitResult')}: ${formatNumber(pretty)}`;
    }

    function fillUnits() {
      const category = $('#unitCategory').value;
      const fromSelect = $('#unitFrom');
      const toSelect = $('#unitTo');

      [fromSelect, toSelect].forEach((select) => {
        const previous = select.value;

        select.innerHTML = unitOptions[category]
          .map(([value, label]) => `<option value="${value}">${label}</option>`)
          .join('');

        if (Array.from(select.options).some((option) => option.value === previous)) {
          select.value = previous;
        }
      });

      if (fromSelect.value === toSelect.value && toSelect.options.length > 1) {
        toSelect.selectedIndex = 1;
      }

      updateUnits();
    }

    $('#unitCategory').addEventListener('change', fillUnits);

    ['unitValue', 'unitFrom', 'unitTo'].forEach((id) => {
      const element = $('#' + id);
      element.addEventListener('input', updateUnits);
      element.addEventListener('change', updateUnits);
    });

    $('#convertUnits').addEventListener('click', updateUnits);

    fillUnits();
  }

  function renderPasswordTool(body) {
    body.innerHTML = `
      <label for="passwordLength">${t('pwdLength')}: <span id="passwordLengthValue">16</span></label>
      <div class="range-row">
        <input id="passwordLength" type="range" min="6" max="64" value="16">
      </div>

      <div class="check-grid">
        <label class="check"><input id="uppercase" type="checkbox" checked> ${t('uppercase')}</label>
        <label class="check"><input id="lowercase" type="checkbox" checked> ${t('lowercase')}</label>
        <label class="check"><input id="numbers" type="checkbox" checked> ${t('numbers')}</label>
        <label class="check"><input id="symbols" type="checkbox" checked> ${t('symbols')}</label>
      </div>

      <label class="check" style="margin-top:10px;">
        <input id="excludeAmbiguous" type="checkbox" checked> ${t('excludeAmbiguous')}
      </label>

      <div class="button-row">
        <button type="button" class="action-btn" id="generatePassword">${t('generate')}</button>
        <button type="button" class="secondary-btn" id="copyPassword">${t('copy')}</button>
      </div>

      <label for="passwordOutput">${t('passwordOutput')}</label>
      <input id="passwordOutput" class="output-input" readonly>

      <p class="hint">${t('strength')}: <span id="passwordStrength" class="strength strong">—</span></p>
    `;

    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{};:,.<>?';
    const ambiguous = 'O0oIl1|`\'"';

    const lengthInput = $('#passwordLength');
    const output = $('#passwordOutput');
    const strengthElement = $('#passwordStrength');
    const optionIds = ['uppercase', 'lowercase', 'numbers', 'symbols', 'excludeAmbiguous'];

    const storedLength = Number(getToolSetting('password-length', lengthInput.value));
    if (Number.isFinite(storedLength) && storedLength >= 6 && storedLength <= 64) {
      lengthInput.value = String(storedLength);
    }
    $('#passwordLengthValue').textContent = lengthInput.value;
    optionIds.forEach((id) => {
      const element = $('#' + id);
      const stored = getToolSetting(`password-${id}`, element.checked ? '1' : '0');
      element.checked = stored === '1';
      element.addEventListener('change', () => setToolSetting(`password-${id}`, element.checked ? '1' : '0'));
    });

    lengthInput.addEventListener('input', () => {
      $('#passwordLengthValue').textContent = lengthInput.value;
      setToolSetting('password-length', lengthInput.value);
    });

    function getStrength(password) {
      let score = 0;
      if (password.length >= 12) score++;
      if (password.length >= 16) score++;
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
      if (/\d/.test(password)) score++;
      if (/[^a-zA-Z0-9]/.test(password)) score++;

      if (score <= 2) return { key: 'weak', className: 'weak' };
      if (score <= 4) return { key: 'medium', className: 'medium' };
      return { key: 'strong', className: 'strong' };
    }

    function generate() {
      let chars = '';

      if ($('#uppercase').checked) chars += upper;
      if ($('#lowercase').checked) chars += lower;
      if ($('#numbers').checked) chars += digits;
      if ($('#symbols').checked) chars += symbols;

      if ($('#excludeAmbiguous').checked) {
        chars = chars.split('').filter((char) => !ambiguous.includes(char)).join('');
      }

      if (!chars) {
        chars = lower;
      }

      const length = Number(lengthInput.value);
      const randomValues = new Uint32Array(length);

      if (window.crypto && window.crypto.getRandomValues) {
        window.crypto.getRandomValues(randomValues);
      } else {
        for (let i = 0; i < length; i++) {
          randomValues[i] = Math.floor(Math.random() * 4294967295);
        }
      }

      let password = '';
      for (let i = 0; i < length; i++) {
        password += chars[randomValues[i] % chars.length];
      }

      output.value = password;

      const strength = getStrength(password);
      strengthElement.textContent = t(strength.key);
      strengthElement.className = `strength ${strength.className}`;
    }

    $('#generatePassword').addEventListener('click', generate);

    $('#copyPassword').addEventListener('click', async () => {
      if (!output.value) {
        generate();
      }
      await copyText(output.value);
      status(t('copied'), 'success');
    });

    generate();
  }

  function renderColorTool(body) {
    body.innerHTML = `
      <label for="colorPicker">${t('pickColor')}</label>
      <div class="color-row">
        <input id="colorPicker" type="color" value="#6e5cf6">
        <input id="hexOutput" class="output-input" readonly>
      </div>

      <label for="rgbOutput">${t('rgb')}</label>
      <input id="rgbOutput" class="output-input" readonly>

      <label for="hslOutput">${t('hsl')}</label>
      <input id="hslOutput" class="output-input" readonly>

      <p class="hint">${t('clickToCopy')}</p>
    `;

    const picker = $('#colorPicker');
    const hexOutput = $('#hexOutput');
    const rgbOutput = $('#rgbOutput');
    const hslOutput = $('#hslOutput');

    function hexToRgb(hex) {
      let value = hex.replace('#', '');

      if (value.length === 3) {
        value = value.split('').map((item) => item + item).join('');
      }

      const int = parseInt(value, 16);

      return {
        r: (int >> 16) & 255,
        g: (int >> 8) & 255,
        b: int & 255
      };
    }

    function rgbToHsl(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          default:
            h = (r - g) / d + 4;
        }

        h *= 60;
      }

      return {
        h: Math.round(h),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
      };
    }

    function update() {
      const hex = picker.value;
      const rgb = hexToRgb(hex);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

      hexOutput.value = hex.toUpperCase();
      rgbOutput.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      hslOutput.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }

    [hexOutput, rgbOutput, hslOutput].forEach((field) => {
      field.addEventListener('click', async () => {
        await copyText(field.value);
        status(t('copied'), 'success');
      });
    });

    picker.addEventListener('input', update);
    update();
  }

  function renderBase64Tool(body) {
    body.innerHTML = `
      <label for="base64Input">${t('input')}</label>
      <textarea id="base64Input"></textarea>

      <div class="button-row">
        <button type="button" class="action-btn" id="base64Encode">${t('encode')}</button>
        <button type="button" class="secondary-btn" id="base64Decode">${t('decode')}</button>
        <button type="button" class="secondary-btn" id="base64Copy">${t('copy')}</button>
      </div>

      <label for="base64Output">${t('output')}</label>
      <textarea id="base64Output" readonly></textarea>
    `;

    const input = $('#base64Input');
    const output = $('#base64Output');

    $('#base64Encode').addEventListener('click', () => {
      try {
        const bytes = new TextEncoder().encode(input.value);
        let binary = '';
        bytes.forEach((byte) => {
          binary += String.fromCharCode(byte);
        });
        output.value = window.btoa(binary);
        status('');
      } catch {
        status(t('base64Error'), 'error');
      }
    });

    $('#base64Decode').addEventListener('click', () => {
      try {
        const binary = window.atob(input.value.trim());
        const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
        output.value = new TextDecoder().decode(bytes);
        status('');
      } catch {
        status(t('base64Error'), 'error');
      }
    });

    $('#base64Copy').addEventListener('click', async () => {
      await copyText(output.value);
      status(t('copied'), 'success');
    });
  }

  function renderUrlTool(body) {
    body.innerHTML = `
      <label for="urlInput">${t('input')}</label>
      <textarea id="urlInput"></textarea>

      <div class="button-row">
        <button type="button" class="action-btn" id="urlEncode">${t('urlEncode')}</button>
        <button type="button" class="secondary-btn" id="urlDecode">${t('urlDecode')}</button>
        <button type="button" class="secondary-btn" id="urlCopy">${t('copy')}</button>
      </div>

      <label for="urlOutput">${t('output')}</label>
      <textarea id="urlOutput" readonly></textarea>
    `;

    const input = $('#urlInput');
    const output = $('#urlOutput');

    $('#urlEncode').addEventListener('click', () => {
      output.value = encodeURIComponent(input.value);
      status('');
    });

    $('#urlDecode').addEventListener('click', () => {
      try {
        output.value = decodeURIComponent(input.value);
        status('');
      } catch {
        status(t('urlError'), 'error');
      }
    });

    $('#urlCopy').addEventListener('click', async () => {
      await copyText(output.value);
      status(t('copied'), 'success');
    });
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let value = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const next = text[i + 1];
      if (char === '"' && inQuotes && next === '"') {
        value += '"';
        i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(value);
        value = '';
      } else if ((char === '\n' || char === '\r') && !inQuotes) {
        if (char === '\r' && next === '\n') i++;
        row.push(value);
        if (row.some((cell) => cell !== '')) rows.push(row);
        row = [];
        value = '';
      } else {
        value += char;
      }
    }
    row.push(value);
    if (row.some((cell) => cell !== '')) rows.push(row);
    return rows;
  }

  function toCsvCell(value) {
    const raw = String(value ?? '');
    if (/[",\n\r]/.test(raw)) {
      return `"${raw.replace(/"/g, '""')}"`;
    }
    return raw;
  }

  function renderCsvJsonTool(body) {
    body.innerHTML = `
      <label for="csvInput">${t('csvInput')}</label>
      <textarea id="csvInput"></textarea>
      <label for="jsonInputData">${t('jsonInputData')}</label>
      <textarea id="jsonInputData"></textarea>
      <div class="button-row">
        <button type="button" class="action-btn" id="csvToJson">${t('convertCsvToJson')}</button>
        <button type="button" class="secondary-btn" id="jsonToCsv">${t('convertJsonToCsv')}</button>
      </div>
      <pre id="csvJsonOutput" class="result-box hidden"></pre>
    `;
    const output = $('#csvJsonOutput');
    $('#csvToJson').addEventListener('click', () => {
      try {
        const rows = parseCsv($('#csvInput').value);
        if (!rows.length) throw new Error('empty');
        const [headers, ...dataRows] = rows;
        const json = dataRows.map((row) => {
          const item = {};
          headers.forEach((header, index) => {
            item[(header || '').trim()] = row[index] ?? '';
          });
          return item;
        });
        output.textContent = JSON.stringify(json, null, 2);
        output.classList.remove('hidden');
        status(t('jsonValid'), 'success');
      } catch {
        output.classList.add('hidden');
        status(t('invalidJson'), 'error');
      }
    });
    $('#jsonToCsv').addEventListener('click', () => {
      try {
        const data = JSON.parse($('#jsonInputData').value);
        if (!Array.isArray(data) || !data.length) throw new Error('invalid');
        const headers = Array.from(new Set(data.flatMap((item) => Object.keys(item || {}))));
        const csvRows = [
          headers.map(toCsvCell).join(','),
          ...data.map((item) => headers.map((header) => toCsvCell(item?.[header] ?? '')).join(','))
        ];
        output.textContent = csvRows.join('\n');
        output.classList.remove('hidden');
        status(t('imageReady'), 'success');
      } catch {
        output.classList.add('hidden');
        status(t('invalidJson'), 'error');
      }
    });
  }

  function decodeBase64Url(value) {
    const pad = '='.repeat((4 - (value.length % 4)) % 4);
    const base64 = (value + pad).replace(/-/g, '+').replace(/_/g, '/');
    const binary = window.atob(base64);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  function renderJwtTool(body) {
    body.innerHTML = `
      <label for="jwtInput">${t('tokenInput')}</label>
      <textarea id="jwtInput" spellcheck="false"></textarea>
      <div class="button-row">
        <button type="button" class="action-btn" id="decodeJwt">${t('decodeToken')}</button>
        <button type="button" class="secondary-btn" id="copyJwt">${t('copy')}</button>
      </div>
      <label>${t('header')}</label>
      <pre id="jwtHeader" class="result-box"></pre>
      <label>${t('payload')}</label>
      <pre id="jwtPayload" class="result-box"></pre>
    `;
    const header = $('#jwtHeader');
    const payload = $('#jwtPayload');
    $('#decodeJwt').addEventListener('click', () => {
      try {
        const token = $('#jwtInput').value.trim();
        const parts = token.split('.');
        if (parts.length < 2) throw new Error('invalid');
        header.textContent = JSON.stringify(JSON.parse(decodeBase64Url(parts[0])), null, 2);
        payload.textContent = JSON.stringify(JSON.parse(decodeBase64Url(parts[1])), null, 2);
        status(t('jsonValid'), 'success');
      } catch {
        header.textContent = '';
        payload.textContent = '';
        status(t('invalidToken'), 'error');
      }
    });
    $('#copyJwt').addEventListener('click', async () => {
      await copyText(`${header.textContent}\n\n${payload.textContent}`.trim());
      status(t('copied'), 'success');
    });
  }

  function md5(text) {
    function rotateLeft(lValue, shiftBits) {
      return (lValue << shiftBits) | (lValue >>> (32 - shiftBits));
    }
    function addUnsigned(lX, lY) {
      const lX4 = lX & 0x40000000;
      const lY4 = lY & 0x40000000;
      const lX8 = lX & 0x80000000;
      const lY8 = lY & 0x80000000;
      const lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
      if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
      if (lX4 | lY4) {
        if (lResult & 0x40000000) return lResult ^ 0xC0000000 ^ lX8 ^ lY8;
        return lResult ^ 0x40000000 ^ lX8 ^ lY8;
      }
      return lResult ^ lX8 ^ lY8;
    }
    function f(x, y, z) { return (x & y) | ((~x) & z); }
    function g(x, y, z) { return (x & z) | (y & (~z)); }
    function h(x, y, z) { return x ^ y ^ z; }
    function i(x, y, z) { return y ^ (x | (~z)); }
    function ff(a, b, c, d, x, s, ac) { return addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, f(b, c, d)), addUnsigned(x, ac)), s), b); }
    function gg(a, b, c, d, x, s, ac) { return addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, g(b, c, d)), addUnsigned(x, ac)), s), b); }
    function hh(a, b, c, d, x, s, ac) { return addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, h(b, c, d)), addUnsigned(x, ac)), s), b); }
    function ii(a, b, c, d, x, s, ac) { return addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, i(b, c, d)), addUnsigned(x, ac)), s), b); }
    function convertToWordArray(string) {
      const lWordCount = (((string.length + 8) - ((string.length + 8) % 64)) / 64 + 1) * 16;
      const lWordArray = Array(lWordCount - 1);
      let lByteCount = 0;
      while (lByteCount < string.length) {
        const lWordIndex = (lByteCount - (lByteCount % 4)) / 4;
        const lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordIndex] = lWordArray[lWordIndex] | (string.charCodeAt(lByteCount) << lBytePosition);
        lByteCount++;
      }
      const lWordIndex = (lByteCount - (lByteCount % 4)) / 4;
      const lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordIndex] = lWordArray[lWordIndex] | (0x80 << lBytePosition);
      lWordArray[lWordCount - 2] = string.length << 3;
      lWordArray[lWordCount - 1] = string.length >>> 29;
      return lWordArray;
    }
    function wordToHex(lValue) {
      let wordToHexValue = '';
      for (let lCount = 0; lCount <= 3; lCount++) {
        const lByte = (lValue >>> (lCount * 8)) & 255;
        const wordToHexValueTemp = `0${lByte.toString(16)}`;
        wordToHexValue += wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2);
      }
      return wordToHexValue;
    }
    const x = convertToWordArray(unescape(encodeURIComponent(text)));
    let a = 0x67452301;
    let b = 0xEFCDAB89;
    let c = 0x98BADCFE;
    let d = 0x10325476;
    for (let k = 0; k < x.length; k += 16) {
      const aa = a; const bb = b; const cc = c; const dd = d;
      a = ff(a, b, c, d, x[k + 0], 7, 0xD76AA478); d = ff(d, a, b, c, x[k + 1], 12, 0xE8C7B756); c = ff(c, d, a, b, x[k + 2], 17, 0x242070DB); b = ff(b, c, d, a, x[k + 3], 22, 0xC1BDCEEE);
      a = ff(a, b, c, d, x[k + 4], 7, 0xF57C0FAF); d = ff(d, a, b, c, x[k + 5], 12, 0x4787C62A); c = ff(c, d, a, b, x[k + 6], 17, 0xA8304613); b = ff(b, c, d, a, x[k + 7], 22, 0xFD469501);
      a = ff(a, b, c, d, x[k + 8], 7, 0x698098D8); d = ff(d, a, b, c, x[k + 9], 12, 0x8B44F7AF); c = ff(c, d, a, b, x[k + 10], 17, 0xFFFF5BB1); b = ff(b, c, d, a, x[k + 11], 22, 0x895CD7BE);
      a = ff(a, b, c, d, x[k + 12], 7, 0x6B901122); d = ff(d, a, b, c, x[k + 13], 12, 0xFD987193); c = ff(c, d, a, b, x[k + 14], 17, 0xA679438E); b = ff(b, c, d, a, x[k + 15], 22, 0x49B40821);
      a = gg(a, b, c, d, x[k + 1], 5, 0xF61E2562); d = gg(d, a, b, c, x[k + 6], 9, 0xC040B340); c = gg(c, d, a, b, x[k + 11], 14, 0x265E5A51); b = gg(b, c, d, a, x[k + 0], 20, 0xE9B6C7AA);
      a = gg(a, b, c, d, x[k + 5], 5, 0xD62F105D); d = gg(d, a, b, c, x[k + 10], 9, 0x02441453); c = gg(c, d, a, b, x[k + 15], 14, 0xD8A1E681); b = gg(b, c, d, a, x[k + 4], 20, 0xE7D3FBC8);
      a = gg(a, b, c, d, x[k + 9], 5, 0x21E1CDE6); d = gg(d, a, b, c, x[k + 14], 9, 0xC33707D6); c = gg(c, d, a, b, x[k + 3], 14, 0xF4D50D87); b = gg(b, c, d, a, x[k + 8], 20, 0x455A14ED);
      a = gg(a, b, c, d, x[k + 13], 5, 0xA9E3E905); d = gg(d, a, b, c, x[k + 2], 9, 0xFCEFA3F8); c = gg(c, d, a, b, x[k + 7], 14, 0x676F02D9); b = gg(b, c, d, a, x[k + 12], 20, 0x8D2A4C8A);
      a = hh(a, b, c, d, x[k + 5], 4, 0xFFFA3942); d = hh(d, a, b, c, x[k + 8], 11, 0x8771F681); c = hh(c, d, a, b, x[k + 11], 16, 0x6D9D6122); b = hh(b, c, d, a, x[k + 14], 23, 0xFDE5380C);
      a = hh(a, b, c, d, x[k + 1], 4, 0xA4BEEA44); d = hh(d, a, b, c, x[k + 4], 11, 0x4BDECFA9); c = hh(c, d, a, b, x[k + 7], 16, 0xF6BB4B60); b = hh(b, c, d, a, x[k + 10], 23, 0xBEBFBC70);
      a = hh(a, b, c, d, x[k + 13], 4, 0x289B7EC6); d = hh(d, a, b, c, x[k + 0], 11, 0xEAA127FA); c = hh(c, d, a, b, x[k + 3], 16, 0xD4EF3085); b = hh(b, c, d, a, x[k + 6], 23, 0x04881D05);
      a = hh(a, b, c, d, x[k + 9], 4, 0xD9D4D039); d = hh(d, a, b, c, x[k + 12], 11, 0xE6DB99E5); c = hh(c, d, a, b, x[k + 15], 16, 0x1FA27CF8); b = hh(b, c, d, a, x[k + 2], 23, 0xC4AC5665);
      a = ii(a, b, c, d, x[k + 0], 6, 0xF4292244); d = ii(d, a, b, c, x[k + 7], 10, 0x432AFF97); c = ii(c, d, a, b, x[k + 14], 15, 0xAB9423A7); b = ii(b, c, d, a, x[k + 5], 21, 0xFC93A039);
      a = ii(a, b, c, d, x[k + 12], 6, 0x655B59C3); d = ii(d, a, b, c, x[k + 3], 10, 0x8F0CCC92); c = ii(c, d, a, b, x[k + 10], 15, 0xFFEFF47D); b = ii(b, c, d, a, x[k + 1], 21, 0x85845DD1);
      a = ii(a, b, c, d, x[k + 8], 6, 0x6FA87E4F); d = ii(d, a, b, c, x[k + 15], 10, 0xFE2CE6E0); c = ii(c, d, a, b, x[k + 6], 15, 0xA3014314); b = ii(b, c, d, a, x[k + 13], 21, 0x4E0811A1);
      a = ii(a, b, c, d, x[k + 4], 6, 0xF7537E82); d = ii(d, a, b, c, x[k + 11], 10, 0xBD3AF235); c = ii(c, d, a, b, x[k + 2], 15, 0x2AD7D2BB); b = ii(b, c, d, a, x[k + 9], 21, 0xEB86D391);
      a = addUnsigned(a, aa); b = addUnsigned(b, bb); c = addUnsigned(c, cc); d = addUnsigned(d, dd);
    }
    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
  }

  function bytesToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  function renderHashTool(body) {
    body.innerHTML = `
      <label for="hashInput">${t('input')}</label>
      <textarea id="hashInput"></textarea>
      <label for="hashFile">${t('fileOptional')}</label>
      <input id="hashFile" type="file">
      <label for="hashAlgo">${t('hashAlgorithm')}</label>
      <select id="hashAlgo">
        <option value="SHA-256">SHA-256</option>
        <option value="MD5">MD5</option>
      </select>
      <div class="button-row">
        <button type="button" class="action-btn" id="hashRun">${t('calculateHash')}</button>
        <button type="button" class="secondary-btn" id="hashCopy">${t('copy')}</button>
      </div>
      <input id="hashOutput" class="output-input" readonly>
    `;
    const output = $('#hashOutput');
    $('#hashRun').addEventListener('click', async () => {
      try {
        const file = $('#hashFile').files?.[0];
        const algo = $('#hashAlgo').value;
        const text = file ? await file.text() : $('#hashInput').value;
        if (algo === 'MD5') {
          output.value = md5(text);
        } else {
          const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
          output.value = bytesToHex(hashBuffer);
        }
        status(t('imageReady'), 'success');
      } catch {
        status(t('unsupported'), 'error');
      }
    });
    $('#hashCopy').addEventListener('click', async () => {
      await copyText(output.value);
      status(t('copied'), 'success');
    });
  }

  function renderRegexTool(body) {
    body.innerHTML = `
      <label for="regexPattern">${t('regexPattern')}</label>
      <input id="regexPattern" type="text" spellcheck="false">
      <label for="regexFlags">${t('regexFlags')}</label>
      <input id="regexFlags" type="text" value="g" spellcheck="false">
      <label for="regexText">${t('regexText')}</label>
      <textarea id="regexText"></textarea>
      <button type="button" class="action-btn" id="regexRun">${t('testRegex')}</button>
      <pre id="regexOutput" class="result-box"></pre>
    `;
    $('#regexRun').addEventListener('click', () => {
      try {
        const pattern = $('#regexPattern').value;
        const flags = $('#regexFlags').value;
        const text = $('#regexText').value;
        const regex = new RegExp(pattern, flags);
        const result = [];
        let match;
        while ((match = regex.exec(text)) !== null) {
          result.push(`${match[0]} @${match.index}`);
          if (!regex.global) break;
          if (match[0] === '') regex.lastIndex++;
        }
        $('#regexOutput').textContent = result.length ? result.join('\n') : '—';
        status('');
      } catch (error) {
        $('#regexOutput').textContent = error.message;
        status(t('unsupported'), 'error');
      }
    });
  }

  function renderTimestampTool(body) {
    body.innerHTML = `
      <label for="unixInput">${t('unixTimestamp')}</label>
      <input id="unixInput" type="text">
      <label for="isoInput">${t('isoDate')}</label>
      <input id="isoInput" type="text" placeholder="2026-10-12T09:00:00Z">
      <div class="button-row">
        <button type="button" class="action-btn" id="tsToDate">${t('toDate')}</button>
        <button type="button" class="secondary-btn" id="dateToTs">${t('toTimestamp')}</button>
      </div>
      <input id="timestampOutput" class="output-input" readonly>
    `;
    const output = $('#timestampOutput');
    $('#tsToDate').addEventListener('click', () => {
      const value = Number($('#unixInput').value.trim());
      if (!Number.isFinite(value)) {
        status(t('unsupported'), 'error');
        return;
      }
      const ms = value > 9999999999 ? value : value * 1000;
      output.value = new Date(ms).toISOString();
      status('');
    });
    $('#dateToTs').addEventListener('click', () => {
      const value = Date.parse($('#isoInput').value.trim());
      if (!Number.isFinite(value)) {
        status(t('unsupported'), 'error');
        return;
      }
      output.value = String(Math.floor(value / 1000));
      status('');
    });
  }

  function renderSlugTool(body) {
    body.innerHTML = `
      <label for="slugSource">${t('sourceText')}</label>
      <textarea id="slugSource"></textarea>
      <div class="button-row">
        <button type="button" class="action-btn" id="generateSlug">${t('makeSlug')}</button>
        <button type="button" class="secondary-btn" id="cleanText">${t('cleanText')}</button>
      </div>
      <label for="slugOutput">${t('slugOutputLabel')}</label>
      <input id="slugOutput" class="output-input" readonly>
    `;
    const source = $('#slugSource');
    const output = $('#slugOutput');
    const normalize = (text) => text
      .normalize('NFKD')
      .replace(/[\u064B-\u0652]/g, '')
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    $('#generateSlug').addEventListener('click', () => {
      output.value = normalize(source.value);
      status('');
    });
    $('#cleanText').addEventListener('click', () => {
      source.value = source.value.replace(/\s+/g, ' ').trim();
      output.value = normalize(source.value);
      status('');
    });
  }

  function bindEvents() {
    const searchInput = $('#searchInput');
    if (searchInput) searchInput.addEventListener('input', filterTools);

    const categoryRow = $('#categoryRow');
    if (categoryRow) {
      categoryRow.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-category]');
        if (!button) return;

        activeCategory = button.dataset.category;

        $$('.category-chip').forEach((chip) => {
          chip.classList.toggle('active', chip === button);
        });

        filterTools();
      });
    }

    const langBtn = $('#langBtn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        lang = lang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('toolnest-lang', lang);
        applyLanguage();
      });
    }

    const themeBtn = $('#themeBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const dark = document.documentElement.classList.toggle('dark');
        document.body.classList.toggle('dark', dark);
        localStorage.setItem('toolnest-theme', dark ? 'dark' : 'light');
      });
    }

    $$('.open-tool').forEach((button) => {
      button.addEventListener('click', () => openModal(button.dataset.tool));
    });

    const closeModalButton = $('#closeModal');
    if (closeModalButton) closeModalButton.addEventListener('click', closeModal);

    if (modal) {
      modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
      });
    }

    document.addEventListener('keydown', (event) => {
      const active = document.activeElement;
      const isEditing = active && (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName) ||
        active.isContentEditable
      );

      if (event.key === '/' && !isEditing && modal && modal.classList.contains('hidden') && $('#searchInput')) {
        event.preventDefault();
        $('#searchInput').focus();
      }

      if (event.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
        closeModal();
      }

      if (event.key === 'Tab' && modal && !modal.classList.contains('hidden')) {
        trapFocus(event);
      }

      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && modal && !modal.classList.contains('hidden')) {
        const action = $('#toolBody .action-btn');
        if (action) action.click();
      }
    });

    const onboarding = $('#onboarding');
    const dismiss = $('#dismissOnboarding');
    if (onboarding && dismiss) {
      const dismissed = localStorage.getItem('toolnest-onboarding-dismissed') === '1';
      onboarding.classList.toggle('hidden', dismissed);
      dismiss.addEventListener('click', () => {
        localStorage.setItem('toolnest-onboarding-dismissed', '1');
        onboarding.classList.add('hidden');
      });
    }
  }

  function init() {
    applyStoredTheme();
    const year = $('#year');
    if (year) year.textContent = new Date().getFullYear();
    attachFavoriteButtons();
    bindEvents();
    applyLanguage();
    renderQuickAccess();

    const params = new URLSearchParams(location.search);
    const requestedTool = params.get('tool');
    if (requestedTool && TOOL_IDS.includes(requestedTool)) {
      openModal(requestedTool, true);
    }
  }

  init();
})();
