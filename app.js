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
      urlError: 'تعذر فك الترميز.'
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
      urlError: 'Could not decode.'
    }
  };

  const HTML_KEYS = new Set(['heroTitle']);

  let lang = localStorage.getItem('toolnest-lang') || 'ar';
  if (!['ar', 'en'].includes(lang)) lang = 'ar';

  let activeCategory = 'all';
  let lastFocused = null;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const modal = $('#toolModal');

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
    $('#toolCount').textContent = `${String(visibleCount).padStart(2, '0')} ${label}`;
  }

  function filterTools() {
    const query = normalizeText($('#searchInput').value);
    let visibleCount = 0;

    $$('.tool-card').forEach((card) => {
      const matchesCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
      const haystack = normalizeText(`${card.dataset.search || ''} ${card.textContent}`);
      const matchesQuery = !query || haystack.includes(query);
      const show = matchesCategory && matchesQuery;

      card.classList.toggle('hidden', !show);
      if (show) visibleCount++;
    });

    $('#noResults').classList.toggle('hidden', visibleCount !== 0);
    updateToolCount(visibleCount);
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

    $('#langBtn').textContent = lang === 'ar' ? 'EN' : 'عربي';
    $('#langBtn').setAttribute('aria-label', t('switchLanguage'));
    $('#themeBtn').setAttribute('aria-label', t('themeLabel'));
    $('#closeModal').setAttribute('aria-label', t('closeDialog'));

    filterTools();

    if (!modal.classList.contains('hidden')) {
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

  function openModal(tool) {
    lastFocused = document.activeElement;
    modal.dataset.currentTool = tool;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');

    renderTool(tool);

    $('#closeModal').focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modal.classList.contains('hidden')) return;

    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    delete modal.dataset.currentTool;

    $('#toolBody').innerHTML = '';
    status('');

    document.body.style.overflow = '';

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
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
      url: 'urlTitle'
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
      qualityInput.addEventListener('input', () => {
        $('#qualityValue').textContent = `${qualityInput.value}%`;
      });
    }

    $('#processImage').addEventListener('click', () => {
      if (!file || !img) {
        status(t('chooseFile'), 'error');
        return;
      }

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
        };

        const quality = isCompress ? Number($('#quality').value) / 100 : 0.92;

        if (mime === 'image/png') {
          canvas.toBlob(done, 'image/png');
        } else {
          canvas.toBlob(done, mime, quality);
        }
      } catch {
        status(t('unsupported'), 'error');
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

    lengthInput.addEventListener('input', () => {
      $('#passwordLengthValue').textContent = lengthInput.value;
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

  function bindEvents() {
    $('#searchInput').addEventListener('input', filterTools);

    $('#categoryRow').addEventListener('click', (event) => {
      const button = event.target.closest('button[data-category]');
      if (!button) return;

      activeCategory = button.dataset.category;

      $$('.category-chip').forEach((chip) => {
        chip.classList.toggle('active', chip === button);
      });

      filterTools();
    });

    $('#langBtn').addEventListener('click', () => {
      lang = lang === 'ar' ? 'en' : 'ar';
      localStorage.setItem('toolnest-lang', lang);
      applyLanguage();
    });

    $('#themeBtn').addEventListener('click', () => {
      const dark = document.documentElement.classList.toggle('dark');
      document.body.classList.toggle('dark', dark);
      localStorage.setItem('toolnest-theme', dark ? 'dark' : 'light');
    });

    $$('.open-tool').forEach((button) => {
      button.addEventListener('click', () => openModal(button.dataset.tool));
    });

    $('#closeModal').addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', (event) => {
      const active = document.activeElement;
      const isEditing = active && (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName) ||
        active.isContentEditable
      );

      if (event.key === '/' && !isEditing && modal.classList.contains('hidden')) {
        event.preventDefault();
        $('#searchInput').focus();
      }

      if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }

      if (event.key === 'Tab' && !modal.classList.contains('hidden')) {
        trapFocus(event);
      }
    });
  }

  function init() {
    applyStoredTheme();
    $('#year').textContent = new Date().getFullYear();
    bindEvents();
    applyLanguage();
  }

  init();
})();
