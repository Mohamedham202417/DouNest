/**
 * DouNest — practical troubleshooting guide (part 7).
 * Original English guide with editorial translations for every supported locale.
 */
export const ARTICLES_7 = [
  {
    slug: "wifi-connected-no-internet",
    date: "2026-10-15",
    updated: "2026-10-15",
    metaTitle: {
      en: "Wi-Fi Connected but No Internet? Free Fixes",
      ar: "متصل بـ Wi-Fi بلا إنترنت؟ حلول مجانية آمنة",
      fr: "Wi-Fi connecté sans Internet ? Solutions gratuites",
      es: "¿Wi-Fi conectado sin Internet? Soluciones gratis",
      de: "WLAN verbunden, aber kein Internet? Kostenlose Hilfe",
      tr: "Wi-Fi bağlı ama internet yok mu? Ücretsiz çözümler",
      ru: "Wi-Fi подключён, но интернета нет? Бесплатные решения",
      zh: "Wi-Fi 已连接却无法上网？免费排查方法",
      hi: "Wi-Fi जुड़ा है, पर इंटरनेट नहीं? मुफ़्त समाधान",
      pt: "Wi-Fi conectado, mas sem internet? Soluções grátis"
    },
    title: {
      en: "Wi-Fi Connected but No Internet? Free Fixes for Windows, iPhone, and Android",
      ar: "Wi-Fi متصل لكن بلا إنترنت؟ حلول مجانية لـ Windows وiPhone وAndroid",
      fr: "Wi-Fi connecté mais sans Internet ? Solutions gratuites sur Windows, iPhone et Android",
      es: "¿Wi-Fi conectado pero sin Internet? Soluciones gratis para Windows, iPhone y Android",
      de: "WLAN verbunden, aber kein Internet? Kostenlose Lösungen für Windows, iPhone und Android",
      tr: "Wi-Fi bağlı ama internet yok mu? Windows, iPhone ve Android için ücretsiz çözümler",
      ru: "Wi-Fi подключён, но интернета нет? Бесплатные решения для Windows, iPhone и Android",
      zh: "Wi-Fi 已连接却无法上网？Windows、iPhone 和 Android 免费排查指南",
      hi: "Wi-Fi जुड़ा है, पर इंटरनेट नहीं? Windows, iPhone और Android के मुफ़्त उपाय",
      pt: "Wi-Fi conectado, mas sem internet? Soluções gratuitas para Windows, iPhone e Android"
    },
    excerpt: {
      en: "Find out whether the fault is your device, router, or ISP, then try safe, free fixes for Windows, iPhone, and Android. Network resets come last.",
      ar: "اكتشف هل الخلل من الجهاز أم الراوتر أم مزود الخدمة، ثم جرّب حلولاً مجانية آمنة لـWindows وiPhone وAndroid، مع جعل إعادة ضبط الشبكة آخر خطوة.",
      fr: "Déterminez si le problème vient de l'appareil, du routeur ou du fournisseur, puis essayez des solutions gratuites et sûres. La réinitialisation vient en dernier.",
      es: "Averigua si falla el dispositivo, el router o el proveedor y prueba soluciones gratuitas y seguras para Windows, iPhone y Android. Restablecer la red es el último paso.",
      de: "Finde heraus, ob Gerät, Router oder Anbieter die Ursache sind. Probiere sichere kostenlose Schritte für Windows, iPhone und Android; Netzwerk-Resets kommen zuletzt.",
      tr: "Sorunun cihazda mı, yönlendiricide mi yoksa sağlayıcıda mı olduğunu bulun. Windows, iPhone ve Android için güvenli ücretsiz adımları deneyin; ağ sıfırlama son çaredir.",
      ru: "Определите, где проблема — в устройстве, роутере или у провайдера, — и выполните безопасные бесплатные шаги. Сброс сети оставьте напоследок.",
      zh: "先判断问题来自设备、路由器还是运营商，再尝试 Windows、iPhone 和 Android 的安全免费方法；网络重置放在最后。",
      hi: "पहचानें कि समस्या डिवाइस, राउटर या इंटरनेट सेवा में है, फिर Windows, iPhone और Android के सुरक्षित मुफ़्त उपाय आज़माएँ। नेटवर्क रीसेट आख़िरी विकल्प है।",
      pt: "Descubra se a falha está no aparelho, roteador ou provedor e tente soluções gratuitas e seguras para Windows, iPhone e Android. Redefinir a rede fica por último."
    },
    tags: {
      en: ["Wi-Fi troubleshooting", "no internet", "connected without internet", "router troubleshooting", "Windows iPhone Android Wi-Fi"], ar: ["حل مشكلات Wi-Fi", "لا يوجد إنترنت", "متصل بلا إنترنت", "إصلاح الراوتر", "Wi-Fi للهواتف والحاسوب"],
      fr: ["dépannage Wi-Fi", "sans Internet", "connecté sans Internet", "dépannage routeur", "Wi-Fi Windows iPhone Android"], es: ["problemas de Wi-Fi", "sin Internet", "conectado sin Internet", "solución del router", "Wi-Fi Windows iPhone Android"],
      de: ["WLAN-Fehlerbehebung", "kein Internet", "verbunden ohne Internet", "Router-Hilfe", "WLAN Windows iPhone Android"], tr: ["Wi-Fi sorunu", "internet yok", "bağlı ama internet yok", "yönlendirici sorunu", "Windows iPhone Android Wi-Fi"],
      ru: ["проблемы Wi-Fi", "нет интернета", "подключено без интернета", "проблемы роутера", "Wi-Fi Windows iPhone Android"], zh: ["Wi-Fi 故障排查", "无法上网", "已连接但无互联网", "路由器排查", "Windows iPhone Android 网络"],
      hi: ["Wi-Fi समस्या", "इंटरनेट नहीं", "जुड़ा है पर इंटरनेट नहीं", "राउटर समस्या समाधान", "Windows iPhone Android Wi-Fi"], pt: ["problemas de Wi-Fi", "sem Internet", "conectado sem Internet", "solução do roteador", "Wi-Fi Windows iPhone Android"]
    },
    content: {
      en: `Seeing “Connected” beside Wi-Fi does not always mean the internet is working. The quickest safe approach is to test the connection on another device and another website, then narrow the fault to one device, the router, or your internet provider. Try the reversible steps first; a network reset can erase saved settings.

> **Key takeaways**
> - If every device is offline, check the router, modem, and provider before changing one phone or PC.
> - If only one device fails, reconnect it and use that device’s built-in troubleshooting steps.
> - Do not press the router’s factory-reset button or reset network settings until simpler checks fail.

## First: locate the source of the problem

Open a different website and app. Then test Wi-Fi on another phone, tablet, or computer. If only one site or app fails, the network may be fine. If every device on the same Wi-Fi is offline, the issue is more likely in the router, modem, or provider connection. If other devices work, focus on the affected device. This simple split is also the first check in [PCMag’s internet troubleshooting guide](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online).

## Try these low-risk fixes first

1. **Check Wi-Fi and Airplane mode.** Confirm Wi-Fi is on and Airplane mode is off. Move closer to the router and check whether its internet/status light indicates an outage or fault.
2. **Check the provider’s outage notice.** Use mobile data or ask someone on another network to check your ISP’s service-status page. A local outage cannot be fixed by changing settings on your device.
3. **Restart the modem and router.** If all devices are affected, unplug the modem and router from power for about 30 seconds, then reconnect the modem first. Wait for its lights to settle, reconnect the router, and give it time to restart. Use the power plug—not the small factory-reset button, which can erase router settings. Microsoft documents this sequence in its [Wi-Fi troubleshooting guide](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows).
4. **Reconnect the affected device.** Turn Wi-Fi off and on, then select your known network again. If that fails, choose **Forget** and reconnect with the correct password. Do this only when you know the password; menu names vary by device.
5. **Temporarily check VPN or security filtering.** If you use a VPN or security app, briefly disconnect it using its own controls and test again. Do not remove workplace/school software or leave protection off; contact its administrator or provider if the connection works only when it is disabled.

## Device-specific steps

### Windows 11 or Windows 10

Run the **Network and Internet** troubleshooter in the **Get Help** app (Windows 11), and check Wi-Fi status and Airplane mode under **Settings → Network & internet**. Microsoft also recommends forgetting and rejoining the network. If the problem continues, update the Wi-Fi driver through Windows Update or the PC maker. Use **Network reset** only as a last resort: it removes/reinstalls network adapters and may require VPN or virtual-network software to be configured again.

### iPhone or iPad

Open **Settings → Wi-Fi**, confirm Wi-Fi is on, and check for the blue tick beside the intended network. Make sure Airplane Mode is off. If other devices also fail, inspect and restart the router; if only the iPhone fails, test another Wi-Fi network if possible. Apple warns that **Reset Network Settings** removes saved Wi-Fi networks and passwords, cellular settings, and VPN/APN settings. Reserve it for after simpler checks, and ask your organization’s IT team before resetting a managed device. See [Apple’s official Wi-Fi guidance](https://support.apple.com/en-us/111786).

### Android phone or tablet

Restart the phone, then compare Wi-Fi with mobile data: turn Wi-Fi off and mobile data on to test; then switch back. If mobile data works but Wi-Fi does not, reconnect to the saved network or test another Wi-Fi network. Android menu labels differ across manufacturers and versions. Google’s [Android internet troubleshooting steps](https://support.google.com/android/answer/2651367?hl=en) describe this comparison.

## When to contact your ISP

If several devices cannot reach multiple sites after the modem and router have restarted, check the ISP’s outage page or contact support. Tell them whether the router has internet/status lights and whether a wired connection works, if you can test one. If only a work or school device is affected, contact its administrator before changing managed network settings.

## Frequently asked questions

### Why does Wi-Fi say connected but there is no internet?

The device may be connected to the router while the router has lost its upstream internet connection. A device-specific VPN, saved-network issue, or service outage can also be involved. Test another device to narrow it down.

### Should I change DNS settings?

Not as a first step. Incorrect or unnecessary DNS changes can create new problems. Use the network provider’s or device maker’s documented instructions if diagnostics point to DNS.

### Will resetting network settings delete my files?

It generally does not erase photos or documents, but it can remove saved Wi-Fi passwords and network, VPN, or cellular settings. Read the on-screen warning for your device before confirming.

### Should I factory-reset my router?

Not for an ordinary “connected, no internet” symptom. A factory reset can erase the network name, password, and provider settings. Restart it using the power connection first; contact the router maker or ISP before a factory reset.

## Sources

- [Microsoft: Fix Wi-Fi connection issues in Windows](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows) — troubleshooting sequence checked 15 October 2026.
- [Apple: If you can't connect to Wi-Fi on your iPhone or iPad](https://support.apple.com/en-us/111786) — reset effects and device checks checked 15 October 2026.
- [Google Android Help: Fix internet connection problems](https://support.google.com/android/answer/2651367?hl=en) — device comparison steps checked 15 October 2026.
- [PCMag: Internet troubleshooting guide](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online) — independent editorial cross-check, updated July 2026.

Menu labels may vary by OS version and manufacturer. This guide does not replace your ISP’s service-status information or the administrator’s guidance for managed networks.`,
      ar: `ظهور كلمة «متصل» بجوار Wi-Fi لا يعني دائماً أن الإنترنت يعمل. ابدأ باختبار الاتصال على جهاز آخر وموقع آخر، ثم حدّد هل الخلل في جهاز واحد أم الراوتر أم مزود الخدمة. جرّب الخطوات القابلة للعكس أولاً، لأن إعادة ضبط الشبكة قد تمحو إعدادات محفوظة.

> **خلاصة سريعة**
> - إذا انقطعت الشبكة عن كل الأجهزة، افحص الراوتر والمودم ومزود الخدمة قبل تغيير إعداد هاتف أو حاسوب.
> - إذا تعطّل جهاز واحد فقط، أعد اتصاله واستخدم أدوات التشخيص المدمجة فيه.
> - لا تضغط زر إعادة ضبط المصنع في الراوتر ولا تعِد ضبط الشبكة قبل تجربة الحلول الأبسط.

## أولاً: حدّد مصدر الخلل

افتح موقعاً وتطبيقاً مختلفين، ثم اختبر Wi-Fi على هاتف أو جهاز لوحي أو حاسوب آخر. إذا تعطل موقع واحد فقط فقد تكون الشبكة سليمة. وإذا انقطع الإنترنت عن كل الأجهزة على الشبكة نفسها، فالسبب أقرب إلى الراوتر أو المودم أو اتصال المزود. أما إذا كانت الأجهزة الأخرى تعمل، فركّز على الجهاز المتأثر. هذا التفريق هو أيضاً أول خطوة في [دليل PCMag لاستكشاف الإنترنت](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online).

## جرّب هذه الحلول منخفضة المخاطر أولاً

1. **تحقق من Wi-Fi ووضع الطيران.** تأكد من تشغيل Wi-Fi وإيقاف وضع الطيران. اقترب من الراوتر ولاحظ أضواء الإنترنت أو الحالة بحثاً عن عطل.
2. **تحقق من انقطاع الخدمة لدى المزود.** استخدم بيانات الهاتف أو جهازاً على شبكة أخرى لفتح صفحة حالة الخدمة لدى مزودك. لا يحل تغيير إعداد الجهاز انقطاعاً عاماً.
3. **أعد تشغيل المودم والراوتر.** إذا تأثرت كل الأجهزة، افصل الجهازين عن الكهرباء نحو 30 ثانية، ثم صِل المودم أولاً. انتظر استقرار أضوائه، ثم صِل الراوتر وانتظر تشغيله. استخدم قابس الكهرباء، لا زر إعادة ضبط المصنع الصغير الذي قد يمحو إعدادات الراوتر. توثق Microsoft هذا التسلسل في [دليل مشكلات Wi-Fi](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows).
4. **أعد اتصال الجهاز المتأثر.** أوقف Wi-Fi ثم شغّله واختر الشبكة المعروفة. إذا لم ينجح، اختر **نسيان الشبكة** ثم اتصل مجدداً بكلمة المرور الصحيحة. افعل ذلك فقط إذا كنت تعرف كلمة المرور؛ قد تختلف أسماء القوائم.
5. **اختبر VPN أو التصفية الأمنية مؤقتاً.** إذا كنت تستخدم VPN أو تطبيق حماية، افصله مؤقتاً من إعداداته واختبر الاتصال. لا تحذف برامج العمل أو الدراسة ولا تترك الحماية معطلة؛ تواصل مع المسؤول إذا لم يعمل الاتصال إلا عند إيقافها.

## خطوات حسب الجهاز

### Windows 11 أو Windows 10

شغّل مستكشف **الشبكة والإنترنت** من تطبيق **Get Help** في Windows 11، وتحقق من حالة Wi-Fi ووضع الطيران ضمن **الإعدادات ← الشبكة والإنترنت**. توصي Microsoft أيضاً بنسيان الشبكة وإعادة الاتصال. إذا استمرت المشكلة، حدّث تعريف Wi-Fi عبر Windows Update أو الشركة المصنّعة. اجعل **إعادة ضبط الشبكة** آخر خيار؛ فقد تعيد تثبيت محولات الشبكة وتستلزم إعادة إعداد VPN أو برامج الشبكات الافتراضية.

### iPhone أو iPad

افتح **الإعدادات ← Wi-Fi** وتأكد من تشغيل Wi-Fi وظهور علامة الصح الزرقاء بجوار الشبكة المطلوبة، ثم تحقق من إيقاف وضع الطيران. إذا تأثرت أجهزة أخرى أيضاً، افحص الراوتر وأعد تشغيله؛ وإذا كان iPhone وحده متأثراً، جرّب شبكة أخرى إن أمكن. تحذر Apple من أن **إعادة تعيين إعدادات الشبكة** تمحو شبكات Wi-Fi المحفوظة وكلمات مرورها وإعدادات الهاتف وVPN/APN. اتركها لما بعد الحلول الأبسط، واستشر مسؤول تقنية المعلومات قبل إعادة ضبط جهاز تابع للعمل أو المدرسة. راجع [إرشادات Apple الرسمية](https://support.apple.com/en-us/111786).

### هاتف أو جهاز لوحي يعمل بـAndroid

أعد تشغيل الهاتف، ثم قارن بين Wi-Fi وبيانات الهاتف: أوقف Wi-Fi وشغّل بيانات الهاتف للاختبار، ثم أعد التجربة بالعكس. إذا عملت البيانات ولم يعمل Wi-Fi، أعد الاتصال بالشبكة المحفوظة أو اختبر شبكة أخرى. تختلف أسماء القوائم حسب الشركة وإصدار Android. تعرض [خطوات Google الرسمية](https://support.google.com/android/answer/2651367?hl=en) هذه المقارنة.

## متى تتواصل مع مزود الإنترنت؟

إذا لم تستطع عدة أجهزة فتح مواقع مختلفة بعد إعادة تشغيل المودم والراوتر، فتحقق من صفحة الأعطال لدى المزود أو تواصل مع الدعم. أخبرهم بحالة أضواء الإنترنت في الراوتر وما إذا كان الاتصال السلكي يعمل إن أمكن اختباره. وإذا كان الخلل في جهاز عمل أو مدرسة فقط، استشر المسؤول قبل تعديل إعدادات الشبكة المُدارة.

## أسئلة شائعة

### لماذا تظهر الشبكة متصلة دون إنترنت؟

قد يكون الجهاز متصلاً بالراوتر بينما فقد الراوتر اتصاله بالإنترنت من جهة المزود. وقد يكون السبب VPN على الجهاز أو مشكلة في الشبكة المحفوظة أو انقطاع خدمة. جرّب جهازاً آخر لتضييق الاحتمالات.

### هل أغيّر إعدادات DNS؟

ليس كخطوة أولى. قد تسبب إعدادات DNS غير الصحيحة أو غير الضرورية مشكلات جديدة. اتبع تعليمات موثقة من المزود أو الشركة المصنّعة إذا أشارت نتائج التشخيص إلى DNS.

### هل تحذف إعادة ضبط الشبكة ملفاتي؟

عادةً لا تمحو الصور أو المستندات، لكنها قد تزيل كلمات مرور Wi-Fi وإعدادات الشبكة أو VPN أو الهاتف. اقرأ التحذير المعروض على جهازك قبل التأكيد.

### هل أُعيد الراوتر إلى إعدادات المصنع؟

ليس لمجرد ظهور «متصل بلا إنترنت». قد تمحو إعادة ضبط المصنع اسم الشبكة وكلمة المرور وإعدادات المزود. أعد تشغيله من الكهرباء أولاً، واستشر الشركة المصنّعة أو المزود قبل إعادة ضبط المصنع.

## المصادر

- [Microsoft: إصلاح مشكلات اتصال Wi-Fi في Windows](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows) — تحقّقنا من خطوات التشخيص في 15 أكتوبر 2026.
- [Apple: تعذّر الاتصال بشبكة Wi-Fi على iPhone أو iPad](https://support.apple.com/en-us/111786) — راجعنا آثار إعادة الضبط وخطوات الجهاز في 15 أكتوبر 2026.
- [مساعدة Android من Google: إصلاح مشكلات اتصال الإنترنت](https://support.google.com/android/answer/2651367?hl=en) — راجعنا خطوات المقارنة بين الاتصالات في 15 أكتوبر 2026.
- [PCMag: دليل استكشاف مشكلات الإنترنت](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online) — مراجعة تحريرية مستقلة، تحديث يوليو 2026.

قد تختلف أسماء القوائم حسب النظام والشركة المصنّعة. لا يغني هذا الدليل عن صفحة حالة الخدمة لدى المزود أو توجيهات مسؤول الشبكة للأجهزة المُدارة.`,
      fr: `Le mot « connecté » à côté du Wi-Fi ne garantit pas l'accès à Internet. Testez d'abord un autre appareil et un autre site, puis déterminez si le problème vient d'un seul appareil, du routeur ou du fournisseur. Commencez par les actions réversibles : une réinitialisation réseau peut effacer des réglages enregistrés.

> **À retenir**
> - Si tous les appareils sont hors ligne, vérifiez le routeur, le modem et le fournisseur avant de modifier un téléphone ou un PC.
> - Si un seul appareil échoue, reconnectez-le et utilisez ses outils de diagnostic intégrés.
> - N'appuyez pas sur le bouton de réinitialisation d'usine du routeur et ne réinitialisez pas le réseau avant les vérifications simples.

## Commencez par localiser la panne

Essayez un autre site et une autre application, puis testez le Wi-Fi sur un autre téléphone, une tablette ou un ordinateur. Si un seul site échoue, le réseau peut fonctionner. Si tous les appareils du même Wi-Fi n'ont plus Internet, le routeur, le modem ou le fournisseur est plus probablement en cause. Si les autres appareils fonctionnent, concentrez-vous sur celui qui échoue. C'est aussi le premier contrôle du [guide de dépannage Internet de PCMag](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online).

## Essayez d'abord ces solutions peu risquées

1. **Vérifiez le Wi-Fi et le mode Avion.** Vérifiez que le Wi-Fi est activé et le mode Avion désactivé. Rapprochez-vous du routeur et regardez ses voyants Internet/état.
2. **Vérifiez une panne chez le fournisseur.** Utilisez les données mobiles ou un appareil connecté à un autre réseau pour consulter la page d'état de votre opérateur. Modifier l'appareil ne corrigera pas une panne générale.
3. **Redémarrez modem et routeur.** Si tous les appareils sont concernés, débranchez les deux environ 30 secondes. Rebranchez d'abord le modem et attendez la stabilisation des voyants, puis rebranchez le routeur. Utilisez la prise d'alimentation, pas le petit bouton de réinitialisation d'usine qui peut effacer la configuration. Microsoft décrit cette séquence dans son [guide Wi-Fi](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows).
4. **Reconnectez l'appareil concerné.** Désactivez puis réactivez le Wi-Fi et sélectionnez le réseau connu. Si nécessaire, choisissez **Oublier** puis reconnectez-vous avec le bon mot de passe. Faites-le seulement si vous connaissez ce mot de passe ; les menus varient.
5. **Testez temporairement le VPN ou le filtrage de sécurité.** Si vous utilisez un VPN ou une application de sécurité, déconnectez-le brièvement depuis ses propres commandes et réessayez. Ne supprimez pas les logiciels professionnels/scolaires et ne laissez pas la protection désactivée ; contactez l'administrateur si la connexion ne fonctionne que sans eux.

## Étapes selon l'appareil

### Windows 11 ou Windows 10

Lancez l'utilitaire **Réseau et Internet** dans l'application **Get Help** (Windows 11) et vérifiez le Wi-Fi et le mode Avion dans **Paramètres → Réseau et Internet**. Microsoft conseille aussi d'oublier puis de rejoindre le réseau. Si le problème persiste, mettez à jour le pilote Wi-Fi via Windows Update ou le fabricant du PC. La **réinitialisation du réseau** est un dernier recours : elle réinstalle les cartes réseau et peut nécessiter de reconfigurer un VPN ou un réseau virtuel.

### iPhone ou iPad

Dans **Réglages → Wi-Fi**, vérifiez que le Wi-Fi est activé et qu'une coche bleue apparaît à côté du réseau souhaité ; vérifiez aussi que le mode Avion est désactivé. Si d'autres appareils échouent, inspectez et redémarrez le routeur. Si seul l'iPhone est touché, essayez un autre réseau si possible. Apple précise que **Réinitialiser les réglages réseau** supprime les réseaux Wi-Fi et mots de passe enregistrés, ainsi que des réglages cellulaires et VPN/APN. Réservez cette action aux échecs des solutions simples et demandez l'avis du service informatique pour un appareil géré. Voir les [instructions officielles d'Apple](https://support.apple.com/en-us/111786).

### Téléphone ou tablette Android

Redémarrez l'appareil, puis comparez Wi-Fi et données mobiles : coupez le Wi-Fi et activez les données mobiles, puis faites le test inverse. Si les données fonctionnent mais pas le Wi-Fi, reconnectez-vous au réseau enregistré ou testez un autre Wi-Fi. Les menus varient selon le fabricant et la version Android. Les [étapes officielles de Google](https://support.google.com/android/answer/2651367?hl=en) décrivent cette comparaison.

## Quand contacter le fournisseur d'accès ?

Si plusieurs appareils ne peuvent pas atteindre plusieurs sites après le redémarrage du modem et du routeur, consultez l'état du réseau de votre fournisseur ou contactez son assistance. Indiquez l'état des voyants Internet et, si vous pouvez tester, le résultat d'une connexion filaire. Pour un appareil professionnel ou scolaire, consultez l'administrateur avant de modifier les réglages gérés.

## Questions fréquentes

### Pourquoi le Wi-Fi est-il connecté sans Internet ?

L'appareil peut être relié au routeur alors que celui-ci a perdu sa connexion Internet en amont. Un VPN, un réseau enregistré défectueux ou une panne du service peut aussi être en cause. Testez un autre appareil pour isoler le problème.

### Dois-je changer les paramètres DNS ?

Pas en première intention. Des changements DNS incorrects ou inutiles peuvent créer d'autres problèmes. Suivez les instructions documentées du fournisseur ou du fabricant si le diagnostic indique le DNS.

### La réinitialisation réseau supprime-t-elle mes fichiers ?

Elle ne supprime généralement pas les photos ou documents, mais peut effacer les mots de passe Wi-Fi et les paramètres réseau, VPN ou cellulaires. Lisez l'avertissement affiché sur votre appareil avant de confirmer.

### Dois-je réinitialiser le routeur aux paramètres d'usine ?

Pas pour le simple message « connecté, pas d'Internet ». La réinitialisation d'usine peut effacer le nom et le mot de passe du Wi-Fi ainsi que la configuration du fournisseur. Redémarrez d'abord par l'alimentation et demandez conseil avant une réinitialisation d'usine.

## Sources

- [Microsoft : résoudre les problèmes de connexion Wi-Fi dans Windows](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows) — étapes vérifiées le 15 octobre 2026.
- [Apple : impossible de se connecter au Wi-Fi sur iPhone ou iPad](https://support.apple.com/en-us/111786) — effets de la réinitialisation et contrôles vérifiés le 15 octobre 2026.
- [Aide Android de Google : résoudre les problèmes de connexion Internet](https://support.google.com/android/answer/2651367?hl=en) — vérifiée le 15 octobre 2026.
- [PCMag : guide de dépannage Internet](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online) — contrôle éditorial indépendant, mise à jour de juillet 2026.

Les menus varient selon le système et le fabricant. Ce guide ne remplace pas les informations de panne de votre fournisseur ni les consignes du service informatique pour un réseau géré.`,
      es: `Que Wi-Fi aparezca como «Conectado» no siempre significa que haya acceso a Internet. Prueba primero otro dispositivo y otro sitio; después identifica si falla un solo equipo, el router o el proveedor. Empieza por pasos reversibles, porque restablecer la red puede borrar ajustes guardados.

> **Puntos clave**
> - Si todos los dispositivos están desconectados, revisa el router, el módem y el proveedor antes de cambiar el teléfono o el PC.
> - Si solo falla un dispositivo, vuelve a conectarlo y usa sus herramientas de diagnóstico integradas.
> - No pulses el botón de restablecimiento de fábrica del router ni restablezcas la red antes de probar lo sencillo.

## Primero, localiza el origen

Abre otro sitio y otra aplicación. Después prueba el Wi-Fi en otro teléfono, tableta u ordenador. Si solo falla un sitio, la red quizá esté bien. Si todos los equipos de la misma red pierden Internet, es más probable que falle el router, el módem o el proveedor. Si los demás funcionan, céntrate en el dispositivo afectado. Esta separación también es el primer paso de la [guía de PCMag para solucionar problemas de Internet](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online).

## Prueba primero estas soluciones de bajo riesgo

1. **Comprueba el Wi-Fi y el modo avión.** Confirma que Wi-Fi esté activado y el modo avión desactivado. Acércate al router y revisa sus luces de Internet/estado.
2. **Consulta si hay una avería del proveedor.** Usa datos móviles u otro dispositivo conectado a una red distinta para consultar el estado del servicio. Cambiar ajustes del equipo no resuelve una caída general.
3. **Reinicia el módem y el router.** Si afecta a todos los equipos, desconecta ambos de la corriente unos 30 segundos. Conecta primero el módem y espera a que sus luces se estabilicen; después conecta el router y espera a que arranque. Usa el enchufe, no el pequeño botón de restablecimiento de fábrica, que puede borrar la configuración. Microsoft explica el proceso en su [guía de Wi-Fi](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows).
4. **Vuelve a conectar el dispositivo afectado.** Apaga y enciende Wi-Fi y selecciona la red guardada. Si no funciona, elige **Olvidar** y vuelve a conectarte con la contraseña correcta. Hazlo solo si la conoces; los menús varían.
5. **Prueba temporalmente la VPN o el filtro de seguridad.** Si usas VPN o una app de seguridad, desconéctala brevemente desde sus controles y vuelve a probar. No elimines software del trabajo o centro educativo ni dejes la protección desactivada; consulta al administrador si solo funciona al apagarla.

## Pasos según el dispositivo

### Windows 11 o Windows 10

Ejecuta el solucionador de **Red e Internet** desde **Get Help** (Windows 11) y revisa el estado de Wi-Fi y el modo avión en **Configuración → Red e Internet**. Microsoft también recomienda olvidar la red y volver a conectarla. Si continúa, actualiza el controlador Wi-Fi mediante Windows Update o el fabricante. Deja **Restablecimiento de red** como último recurso: reinstala adaptadores y quizá debas configurar de nuevo VPN o redes virtuales.

### iPhone o iPad

Abre **Ajustes → Wi-Fi**, confirma que esté activado y que haya una marca azul junto a la red deseada. Comprueba que el modo avión esté apagado. Si fallan otros equipos, revisa y reinicia el router; si solo falla el iPhone, prueba otra red si puedes. Apple advierte que **Restablecer ajustes de red** elimina redes Wi-Fi y contraseñas guardadas, además de ajustes móviles y VPN/APN. Resérvalo para después de los pasos sencillos y consulta al equipo de TI antes de restablecer un dispositivo administrado. Consulta la [guía oficial de Apple](https://support.apple.com/en-us/111786).

### Teléfono o tableta Android

Reinicia el dispositivo y compara Wi-Fi con datos móviles: apaga Wi-Fi, activa los datos y prueba; luego haz el proceso inverso. Si los datos funcionan pero no el Wi-Fi, vuelve a conectarte a la red guardada o prueba otra red. Los nombres de menú varían según fabricante y versión. Los [pasos oficiales de Google](https://support.google.com/android/answer/2651367?hl=en) describen esta comparación.

## Cuándo contactar con el proveedor

Si varios dispositivos no pueden abrir varios sitios después de reiniciar módem y router, consulta el estado del proveedor o llama a soporte. Indica cómo están las luces de Internet y, si puedes probarlo, si funciona una conexión por cable. Si solo falla un dispositivo del trabajo o de una escuela, pregunta al administrador antes de cambiar ajustes gestionados.

## Preguntas frecuentes

### ¿Por qué el Wi-Fi aparece conectado pero no hay Internet?

El equipo puede estar conectado al router mientras este ha perdido la conexión externa. También puede influir una VPN, una red guardada con problemas o una avería. Prueba otro dispositivo para acotar la causa.

### ¿Debo cambiar el DNS?

No como primer paso. Un cambio DNS innecesario o incorrecto puede crear otros problemas. Sigue instrucciones documentadas del proveedor o fabricante si el diagnóstico apunta al DNS.

### ¿Restablecer la red borrará mis archivos?

Normalmente no borra fotos ni documentos, pero puede eliminar contraseñas Wi-Fi y ajustes de red, VPN o telefonía. Lee el aviso del dispositivo antes de confirmar.

### ¿Debo restablecer el router de fábrica?

No por el mensaje habitual de «conectado, sin Internet». El restablecimiento de fábrica puede borrar el nombre y la contraseña de la red y la configuración del proveedor. Reinícialo desde la corriente y consulta al fabricante o proveedor antes de un restablecimiento de fábrica.

## Fuentes

- [Microsoft: solucionar problemas de conexión Wi-Fi en Windows](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows) — pasos comprobados el 15 de octubre de 2026.
- [Apple: si no puedes conectarte al Wi-Fi en iPhone o iPad](https://support.apple.com/en-us/111786) — comprobaciones y efectos del restablecimiento, revisados el 15 de octubre de 2026.
- [Ayuda de Android de Google: solucionar problemas de conexión a Internet](https://support.google.com/android/answer/2651367?hl=en) — pasos revisados el 15 de octubre de 2026.
- [PCMag: guía para solucionar problemas de Internet](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online) — contraste editorial independiente, actualización de julio de 2026.

Los menús pueden variar según sistema y fabricante. Esta guía no sustituye la información de averías del proveedor ni las indicaciones del administrador para redes gestionadas.`,
      de: `Die Anzeige „Verbunden“ bei WLAN bedeutet nicht immer, dass das Internet funktioniert. Teste zuerst ein anderes Gerät und eine andere Website. So lässt sich unterscheiden, ob ein einzelnes Gerät, der Router oder der Anbieter betroffen ist. Beginne mit umkehrbaren Schritten: Ein Netzwerk-Reset kann gespeicherte Einstellungen löschen.

> **Das Wichtigste**
> - Sind alle Geräte offline, prüfe Router, Modem und Anbieter, bevor du ein einzelnes Gerät änderst.
> - Fällt nur ein Gerät aus, verbinde es neu und nutze die integrierte Diagnose.
> - Drücke nicht die Werkseinstellungs-Taste des Routers und setze das Netzwerk nicht zurück, bevor einfache Schritte scheitern.

## Finde zuerst die Fehlerquelle

Öffne eine andere Website und App und teste das WLAN auf einem weiteren Telefon, Tablet oder Computer. Funktioniert nur eine Website nicht, kann das Netzwerk in Ordnung sein. Sind alle Geräte im selben WLAN offline, liegt es eher am Router, Modem oder Internetanbieter. Funktionieren andere Geräte, konzentriere dich auf das betroffene Gerät. Auch der [Internet-Fehlerbehebungsratgeber von PCMag](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online) beginnt mit dieser Abgrenzung.

## Probiere zuerst diese risikoarmen Lösungen

1. **Prüfe WLAN und Flugmodus.** WLAN muss eingeschaltet und der Flugmodus ausgeschaltet sein. Gehe näher an den Router und prüfe dessen Internet-/Statusleuchten.
2. **Prüfe eine Störung beim Anbieter.** Nutze mobile Daten oder ein Gerät in einem anderen Netzwerk, um die Statusseite des Anbieters aufzurufen. Eine allgemeine Störung lässt sich nicht durch Änderungen am Gerät beheben.
3. **Starte Modem und Router neu.** Sind alle Geräte betroffen, trenne beide etwa 30 Sekunden vom Strom. Schließe zuerst das Modem an, warte auf stabile Anzeigen und schließe dann den Router an. Verwende den Netzstecker, nicht die kleine Werkseinstellungs-Taste, die Konfigurationen löschen kann. Microsoft beschreibt diese Reihenfolge im [WLAN-Leitfaden](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows).
4. **Verbinde das betroffene Gerät neu.** Schalte WLAN aus und wieder ein und wähle das bekannte Netzwerk. Hilft das nicht, wähle **Entfernen/Vergessen** und verbinde dich mit dem richtigen Passwort erneut. Nur tun, wenn du das Passwort kennst; Menüs unterscheiden sich.
5. **Prüfe VPN oder Sicherheitsfilter vorübergehend.** Trenne ein verwendetes VPN oder eine Sicherheits-App kurz über deren eigene Steuerung und teste erneut. Entferne keine Arbeits-/Schulsoftware und lasse den Schutz nicht dauerhaft aus. Frage den Administrator, wenn es nur ohne Schutz funktioniert.

## Schritte je nach Gerät

### Windows 11 oder Windows 10

Starte in Windows 11 die Problembehandlung **Netzwerk und Internet** in der App **Get Help** und prüfe WLAN-Status und Flugmodus unter **Einstellungen → Netzwerk und Internet**. Microsoft empfiehlt auch, das Netzwerk zu vergessen und neu beizutreten. Aktualisiere bei anhaltendem Problem den WLAN-Treiber über Windows Update oder den PC-Hersteller. **Netzwerk zurücksetzen** ist der letzte Ausweg: Adapter werden neu installiert; VPN- oder virtuelle Netzwerke müssen eventuell neu eingerichtet werden.

### iPhone oder iPad

Öffne **Einstellungen → WLAN**, prüfe, ob WLAN aktiv ist und neben dem gewünschten Netzwerk ein blaues Häkchen steht. Der Flugmodus muss aus sein. Sind andere Geräte betroffen, prüfe und starte den Router neu. Fällt nur das iPhone aus, teste möglichst ein anderes WLAN. Apple warnt, dass **Netzwerkeinstellungen zurücksetzen** gespeicherte WLANs und Passwörter sowie Mobilfunk-, VPN- und APN-Einstellungen entfernt. Erst nach einfachen Schritten verwenden und bei verwalteten Geräten vorher die IT fragen. Siehe Apples [offizielle WLAN-Hilfe](https://support.apple.com/en-us/111786).

### Android-Telefon oder -Tablet

Starte das Gerät neu und vergleiche WLAN mit mobilen Daten: WLAN ausschalten, mobile Daten einschalten und testen; danach umgekehrt. Funktionieren mobile Daten, aber WLAN nicht, verbinde dich erneut mit dem gespeicherten Netz oder teste ein anderes WLAN. Menünamen unterscheiden sich nach Hersteller und Android-Version. Googles [offizielle Android-Schritte](https://support.google.com/android/answer/2651367?hl=en) beschreiben den Vergleich.

## Wann solltest du den Internetanbieter kontaktieren?

Können mehrere Geräte nach dem Neustart von Modem und Router mehrere Websites nicht erreichen, prüfe die Störungsseite des Anbieters oder kontaktiere den Support. Nenne den Zustand der Internetleuchten und – falls getestet – ob eine Kabelverbindung funktioniert. Bei einem Arbeits- oder Schulgerät frage den Administrator, bevor du verwaltete Einstellungen änderst.

## Häufige Fragen

### Warum ist das WLAN verbunden, aber das Internet nicht verfügbar?

Das Gerät kann mit dem Router verbunden sein, während dieser die Verbindung zum Internetanbieter verloren hat. Auch ein VPN, ein gespeichertes Netzwerk oder eine Anbieter-Störung kommt infrage. Teste ein anderes Gerät.

### Sollte ich die DNS-Einstellungen ändern?

Nicht als ersten Schritt. Unnötige oder falsche DNS-Werte können neue Probleme verursachen. Folge dokumentierten Anweisungen des Anbieters oder Geräteherstellers, wenn die Diagnose auf DNS hindeutet.

### Löscht ein Netzwerk-Reset meine Dateien?

Fotos und Dokumente bleiben normalerweise erhalten, aber gespeicherte WLAN-Passwörter und Netzwerk-, VPN- oder Mobilfunkeinstellungen können entfernt werden. Lies vor der Bestätigung den Warnhinweis auf dem Gerät.

### Sollte ich den Router auf Werkseinstellungen zurücksetzen?

Nicht bei der gewöhnlichen Meldung „verbunden, kein Internet“. Ein Werksreset kann WLAN-Name, Passwort und Anbietereinstellungen löschen. Starte zuerst über die Stromversorgung neu und frage vor einem Werksreset den Anbieter oder Hersteller.

## Quellen

- [Microsoft: WLAN-Verbindungsprobleme in Windows beheben](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows) — Reihenfolge geprüft am 15. Oktober 2026.
- [Apple: WLAN-Verbindung auf iPhone oder iPad nicht möglich](https://support.apple.com/en-us/111786) — Prüfungen und Reset-Folgen geprüft am 15. Oktober 2026.
- [Google Android-Hilfe: Internetverbindungsprobleme beheben](https://support.google.com/android/answer/2651367?hl=en) — geprüft am 15. Oktober 2026.
- [PCMag: Internetverbindungen prüfen und reparieren](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online) — unabhängiger redaktioneller Vergleich, aktualisiert im Juli 2026.

Menüs unterscheiden sich je nach Betriebssystemversion und Hersteller. Dieser Leitfaden ersetzt weder Störungsmeldungen des Anbieters noch IT-Vorgaben für verwaltete Netzwerke.`,
      tr: `Wi-Fi yanında “Bağlandı” yazması internetin çalıştığı anlamına gelmeyebilir. Önce başka bir cihaz ve başka bir site deneyin; ardından sorunun tek cihazda mı, yönlendiricide mi yoksa internet sağlayıcısında mı olduğunu ayırın. Geri alınabilir adımlarla başlayın; ağ sıfırlama kayıtlı ayarları silebilir.

> **Kısa özet**
> - Tüm cihazlar çevrimdışıysa tek bir telefon veya bilgisayarın ayarını değiştirmeden önce yönlendiriciyi, modemi ve sağlayıcıyı kontrol edin.
> - Yalnızca bir cihaz etkileniyorsa yeniden bağlayın ve cihazın yerleşik sorun gidericisini kullanın.
> - Basit kontroller bitmeden yönlendiricinin fabrika ayarları düğmesine basmayın ve ağ sıfırlamayın.

## Önce arızanın kaynağını bulun

Başka bir site ve uygulama açın; sonra başka bir telefon, tablet veya bilgisayarda aynı Wi-Fi'yi deneyin. Tek bir site açılmıyorsa ağ düzgün olabilir. Aynı Wi-Fi'deki tüm cihazlar internetsizse sorun büyük olasılıkla yönlendirici, modem veya sağlayıcı bağlantısındadır. Diğer cihazlar çalışıyorsa etkilenen cihaza odaklanın. [PCMag internet sorun giderme kılavuzu](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online) da bu ayrımla başlıyor.

## Önce düşük riskli çözümleri deneyin

1. **Wi-Fi ve Uçak modunu kontrol edin.** Wi-Fi açık, Uçak modu kapalı olmalı. Yönlendiriciye yaklaşın ve internet/durum ışıklarını kontrol edin.
2. **Sağlayıcı kesintisini kontrol edin.** Mobil veriyi veya başka bir ağdaki cihazı kullanarak hizmet durumu sayfasına bakın. Genel kesinti, cihaz ayarları değiştirilerek giderilemez.
3. **Modem ve yönlendiriciyi yeniden başlatın.** Tüm cihazlar etkileniyorsa ikisini yaklaşık 30 saniye prizden çekin. Önce modemi bağlayıp ışıkların normale dönmesini bekleyin; sonra yönlendiriciyi takıp açılmasını bekleyin. Küçük fabrika ayarları düğmesi yerine güç fişini kullanın; fabrika sıfırlaması yapılandırmayı silebilir. Microsoft bu sırayı [Wi-Fi sorun giderme kılavuzunda](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows) açıklıyor.
4. **Etkilenen cihazı yeniden bağlayın.** Wi-Fi'yi kapatıp açın ve kayıtlı ağınızı seçin. Olmazsa **Ağı unut** seçeneğini kullanıp doğru parolayla tekrar bağlanın. Parolayı bildiğinizden emin olun; menüler farklı olabilir.
5. **VPN veya güvenlik filtresini kısa süreli test edin.** VPN ya da güvenlik uygulaması kullanıyorsanız kendi denetiminden geçici olarak bağlantıyı kesin ve deneyin. İş/okul yazılımını silmeyin veya korumayı kapalı bırakmayın; yalnızca kapalıyken çalışıyorsa yöneticinize danışın.

## Cihaza göre adımlar

### Windows 11 veya Windows 10

Windows 11'de **Get Help** uygulamasındaki **Ağ ve İnternet** sorun gidericisini çalıştırın; **Ayarlar → Ağ ve İnternet** bölümünde Wi-Fi durumunu ve Uçak modunu kontrol edin. Microsoft ağı unutup yeniden bağlanmayı da öneriyor. Sorun sürerse Wi-Fi sürücüsünü Windows Update veya bilgisayar üreticisi üzerinden güncelleyin. **Ağ sıfırlama** son çare olmalı; bağdaştırıcıları yeniden kurar ve VPN/sanal ağların yeniden yapılandırılmasını gerektirebilir.

### iPhone veya iPad

**Ayarlar → Wi-Fi** bölümünde Wi-Fi'nin açık ve doğru ağın yanında mavi onay işaretinin bulunduğunu kontrol edin; Uçak modu kapalı olmalı. Başka cihazlar da etkileniyorsa yönlendiriciyi inceleyip yeniden başlatın. Yalnızca iPhone sorunluysa başka bir Wi-Fi deneyin. Apple, **Ağ Ayarlarını Sıfırla** işleminin kayıtlı Wi-Fi ağlarını/parolalarını ve hücresel, VPN/APN ayarlarını sildiği konusunda uyarıyor. Basit adımlar başarısız olmadıkça kullanmayın; iş/okul cihazında önce BT ekibine sorun. [Apple'ın resmî kılavuzuna](https://support.apple.com/en-us/111786) bakın.

### Android telefon veya tablet

Telefonu yeniden başlatın ve Wi-Fi ile mobil veriyi karşılaştırın: Wi-Fi'yi kapatıp mobil veriyi açın; sonra tersini deneyin. Mobil veri çalışıyor ama Wi-Fi çalışmıyorsa kayıtlı ağa yeniden bağlanın veya başka Wi-Fi deneyin. Menü adları üreticiye ve sürüme göre değişir. Google'ın [Android internet sorun giderme adımları](https://support.google.com/android/answer/2651367?hl=en) bu karşılaştırmayı içeriyor.

## İnternet sağlayıcısını ne zaman aramalısınız?

Modem ve yönlendirici yeniden başladıktan sonra birden çok cihaz birden çok siteye erişemiyorsa sağlayıcının kesinti sayfasına bakın veya destekle iletişime geçin. İnternet ışıklarının durumunu ve deneyebildiyseniz kablolu bağlantı sonucunu bildirin. Yalnızca iş veya okul cihazı etkileniyorsa yönetilen ağ ayarlarını değiştirmeden önce yöneticiye danışın.

## Sık sorulan sorular

### Wi-Fi bağlı görünüyor ama internet neden yok?

Cihaz yönlendiriciye bağlanmış olsa da yönlendiricinin sağlayıcıya giden bağlantısı kesilmiş olabilir. VPN, kayıtlı ağ sorunu veya hizmet kesintisi de mümkündür. Başka bir cihaz deneyerek kapsamı daraltın.

### DNS ayarlarını değiştirmeli miyim?

İlk adım olarak hayır. Gereksiz ya da yanlış DNS değişiklikleri yeni sorunlar çıkarabilir. Teşhis DNS'i işaret ediyorsa sağlayıcı veya üreticinin belgelenmiş yönergelerini kullanın.

### Ağ ayarlarını sıfırlamak dosyalarımı siler mi?

Genellikle fotoğraf ve belgeleri silmez; ancak Wi-Fi parolalarını, ağ, VPN veya hücresel ayarları kaldırabilir. Onaylamadan önce ekrandaki uyarıyı okuyun.

### Yönlendiriciyi fabrika ayarlarına döndürmeli miyim?

Sıradan “bağlı, internet yok” uyarısında hayır. Fabrika sıfırlaması ağ adını, parolayı ve sağlayıcı ayarlarını silebilir. Önce güç bağlantısından yeniden başlatın; fabrika sıfırlamasından önce sağlayıcıya veya üreticiye danışın.

## Kaynaklar

- [Microsoft: Windows'ta Wi-Fi bağlantı sorunlarını giderme](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows) — sıra 15 Ekim 2026'da kontrol edildi.
- [Apple: iPhone veya iPad Wi-Fi'ye bağlanamıyorsa](https://support.apple.com/en-us/111786) — kontroller ve sıfırlama etkileri 15 Ekim 2026'da incelendi.
- [Google Android Yardım: İnternet bağlantısı sorunlarını giderme](https://support.google.com/android/answer/2651367?hl=en) — 15 Ekim 2026'da incelendi.
- [PCMag: İnternet bağlantısı sorun giderme rehberi](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online) — bağımsız editoryal karşılaştırma, Temmuz 2026 güncellemesi.

Menü adları işletim sistemi sürümüne ve üreticiye göre değişebilir. Bu rehber, sağlayıcının kesinti duyurularının veya yönetilen ağlarda BT ekibinin talimatlarının yerine geçmez.`,
      ru: `Надпись «Подключено» рядом с Wi-Fi не всегда означает, что интернет доступен. Сначала проверьте другое устройство и другой сайт, затем выясните, затронуты ли одно устройство, роутер или провайдер. Начинайте с обратимых действий: сброс сети может удалить сохранённые настройки.

> **Главное**
> - Если отключились все устройства, проверьте роутер, модем и провайдера, прежде чем менять настройки телефона или ПК.
> - Если проблема только на одном устройстве, подключите его заново и используйте встроенную диагностику.
> - Не нажимайте кнопку сброса роутера до заводских настроек и не сбрасывайте сеть до простых проверок.

## Сначала определите источник проблемы

Откройте другой сайт и приложение, затем проверьте Wi-Fi на другом телефоне, планшете или компьютере. Если не открывается только один сайт, сеть может быть исправна. Если на всех устройствах одной сети нет интернета, вероятнее проблема в роутере, модеме или у провайдера. Если другие устройства работают, сосредоточьтесь на проблемном. С такого разделения начинает и [руководство PCMag по диагностике интернета](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online).

## Сначала попробуйте безопасные решения

1. **Проверьте Wi-Fi и режим полёта.** Wi-Fi должен быть включён, режим полёта — выключен. Подойдите ближе к роутеру и проверьте индикаторы интернета/состояния.
2. **Проверьте сбой у провайдера.** Используйте мобильные данные или устройство в другой сети, чтобы открыть страницу состояния услуг. Общий сбой нельзя исправить настройками одного устройства.
3. **Перезапустите модем и роутер.** Если проблема у всех устройств, отключите оба от питания примерно на 30 секунд. Сначала подключите модем, дождитесь стабильных индикаторов, затем роутер. Используйте вилку питания, а не небольшую кнопку заводского сброса, которая может стереть конфигурацию. Microsoft описывает порядок в [руководстве по Wi-Fi](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows).
4. **Подключите устройство заново.** Выключите и включите Wi-Fi, выберите сохранённую сеть. Если не помогло, выберите **Забыть сеть** и подключитесь снова с правильным паролем. Делайте это, только если знаете пароль; названия меню различаются.
5. **Временно проверьте VPN или фильтрацию.** Если используете VPN или защитное приложение, кратко отключите его через штатные настройки и проверьте соединение. Не удаляйте рабочее/учебное ПО и не оставляйте защиту выключенной; если соединение работает только без неё, обратитесь к администратору.

## Шаги для конкретных устройств

### Windows 11 или Windows 10

В Windows 11 запустите средство **Сеть и Интернет** в приложении **Get Help**, а в **Параметры → Сеть и Интернет** проверьте статус Wi-Fi и режим полёта. Microsoft также советует забыть сеть и подключиться заново. Если проблема остаётся, обновите драйвер Wi-Fi через Windows Update или сайт производителя ПК. **Сброс сети** оставьте на крайний случай: сетевые адаптеры будут переустановлены, может потребоваться настройка VPN или виртуальных сетей.

### iPhone или iPad

Откройте **Настройки → Wi-Fi**, убедитесь, что Wi-Fi включён и рядом с нужной сетью стоит синяя галочка; отключите режим полёта. Если не работают и другие устройства, проверьте и перезапустите роутер. Если проблема только на iPhone, попробуйте другую сеть. Apple предупреждает, что **Сбросить настройки сети** удаляет сохранённые сети Wi-Fi и пароли, а также параметры сотовой связи и VPN/APN. Используйте это после простых проверок; для рабочего устройства сначала спросите ИТ-службу. См. [официальную справку Apple](https://support.apple.com/en-us/111786).

### Телефон или планшет Android

Перезапустите устройство и сравните Wi-Fi с мобильными данными: отключите Wi-Fi и включите мобильную передачу данных, затем проверьте наоборот. Если мобильная связь работает, а Wi-Fi нет, подключитесь к сохранённой сети заново или попробуйте другую. Меню зависит от производителя и версии Android. В [официальных рекомендациях Google](https://support.google.com/android/answer/2651367?hl=en) описано такое сравнение.

## Когда обращаться к провайдеру

Если после перезапуска модема и роутера несколько устройств не открывают несколько сайтов, проверьте страницу сбоев провайдера или свяжитесь с поддержкой. Сообщите о состоянии индикаторов интернета и, если удалось проверить, о работе проводного подключения. Если проблема только на рабочем или учебном устройстве, сначала обратитесь к администратору.

## Частые вопросы

### Почему Wi-Fi подключён, а интернета нет?

Устройство может быть подключено к роутеру, а сам роутер — потерять соединение с провайдером. Возможны также VPN, сбой сохранённой сети или авария у поставщика услуг. Проверьте другое устройство.

### Нужно ли менять настройки DNS?

Не в первую очередь. Ненужные или неправильные DNS-настройки могут создать новые проблемы. Следуйте документированным рекомендациям провайдера или производителя, если диагностика указывает на DNS.

### Сброс настроек сети удалит мои файлы?

Обычно фотографии и документы не удаляются, но могут быть стерты пароли Wi-Fi и настройки сети, VPN или мобильной связи. Перед подтверждением прочитайте предупреждение на устройстве.

### Нужно ли сбрасывать роутер к заводским настройкам?

Нет, не при обычном сообщении «подключено, но нет интернета». Заводской сброс может удалить имя и пароль сети и настройки провайдера. Сначала перезапустите питание и проконсультируйтесь с провайдером или производителем.

## Источники

- [Microsoft: устранение проблем с Wi-Fi в Windows](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows) — порядок проверен 15 октября 2026 года.
- [Apple: не удаётся подключиться к Wi-Fi на iPhone или iPad](https://support.apple.com/en-us/111786) — проверено 15 октября 2026 года.
- [Справка Android от Google: устранение проблем с интернетом](https://support.google.com/android/answer/2651367?hl=en) — проверено 15 октября 2026 года.
- [PCMag: руководство по устранению проблем с интернетом](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online) — независимая редакционная сверка, обновлено в июле 2026 года.

Названия меню могут отличаться в зависимости от версии ОС и производителя. Руководство не заменяет информацию провайдера об авариях или указания администратора управляемой сети.`,
      zh: `Wi-Fi 旁显示“已连接”并不代表互联网一定可用。先换一个设备、打开另一个网站，再判断问题来自单个设备、路由器还是运营商。先尝试可撤销的步骤，因为网络重置可能清除已保存的设置。

> **要点**
> - 如果所有设备都无法上网，先检查路由器、调制解调器和运营商，不要先改某一台手机或电脑。
> - 如果只有一台设备出问题，重新连接网络并使用设备自带的诊断工具。
> - 简单检查未完成前，不要按路由器的恢复出厂设置按钮，也不要重置网络。

## 先找出问题来自哪里

打开另一个网站和应用，再用另一部手机、平板或电脑测试同一 Wi-Fi。如果只有一个网站打不开，网络可能正常。如果同一 Wi-Fi 下所有设备都无法上网，问题更可能在路由器、调制解调器或运营商连接。如果其他设备正常，就重点检查故障设备。[PCMag 的网络故障排查指南](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online)也建议先这样区分。

## 先尝试这些低风险方法

1. **检查 Wi-Fi 和飞行模式。** 确认 Wi-Fi 已开启、飞行模式已关闭。靠近路由器，并查看互联网/状态指示灯。
2. **检查运营商是否停机。** 使用移动数据或另一网络上的设备查看运营商服务状态页。大范围故障无法靠修改单台设备设置解决。
3. **重启调制解调器和路由器。** 如果所有设备都受影响，将两者断电约 30 秒。先接通调制解调器，等指示灯稳定后再接通路由器并等待启动。使用电源插头，不要按可能清除配置的小型恢复出厂设置按钮。Microsoft 在其 [Wi-Fi 排障指南](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows)中说明了这一顺序。
4. **重新连接故障设备。** 关闭再打开 Wi-Fi，重新选择已知网络。仍不行时，选择“忘记网络”，再输入正确密码连接。只有确认知道密码时才这样做；不同设备菜单名称不同。
5. **暂时检查 VPN 或安全过滤。** 如果使用 VPN 或安全应用，可通过应用自身控制短暂断开后再测试。不要卸载工作/学校管理软件，也不要让保护长期关闭；如果只有关闭后才能连接，请联系管理员或服务提供方。

## 按设备排查

### Windows 11 或 Windows 10

Windows 11 可在 **Get Help** 应用中运行“网络和 Internet”疑难解答；并在“设置 → 网络和 Internet”检查 Wi-Fi 状态及飞行模式。Microsoft 也建议忘记网络后重新加入。问题仍在时，通过 Windows 更新或电脑厂商更新 Wi-Fi 驱动。**网络重置**只作为最后手段：它会重新安装网络适配器，VPN 或虚拟网络软件可能需要重新配置。

### iPhone 或 iPad

打开“设置 → Wi-Fi”，确认 Wi-Fi 已开启，目标网络旁有蓝色勾号，并关闭飞行模式。如果其他设备也无法连接，检查并重启路由器；如果只有 iPhone 出问题，尽可能测试另一个 Wi-Fi。Apple 提醒，“还原网络设置”会删除已保存的 Wi-Fi 网络和密码，以及蜂窝网络、VPN/APN 设置。先尝试简单方法；受组织管理的设备应先咨询 IT。请参阅 [Apple 官方说明](https://support.apple.com/en-us/111786)。

### Android 手机或平板

重启设备，然后对比 Wi-Fi 和移动数据：关闭 Wi-Fi、开启移动数据测试，再反向测试。如果移动数据正常而 Wi-Fi 不行，重新连接保存的网络或试另一个 Wi-Fi。菜单名称因厂商和系统版本而异。Google 的 [Android 官方排障步骤](https://support.google.com/android/answer/2651367?hl=en)介绍了这种对比方法。

## 何时联系运营商

如果重启调制解调器和路由器后，多台设备仍无法打开多个网站，请查看运营商故障页面或联系客服。说明路由器互联网指示灯状态；若能测试，也告知有线连接是否正常。若只有工作或学校设备出问题，修改受管理的网络设置前先联系管理员。

## 常见问题

### 为什么 Wi-Fi 已连接但没有互联网？

设备可能连上了路由器，但路由器失去了通往运营商的连接。VPN、保存的网络配置或运营商故障也可能导致此情况。先用另一台设备缩小范围。

### 应该更改 DNS 设置吗？

不应作为第一步。错误或不必要的 DNS 更改可能带来新问题。只有诊断指向 DNS 时，才遵循运营商或设备厂商的书面说明。

### 重置网络会删除文件吗？

通常不会删除照片或文档，但可能清除已保存的 Wi-Fi 密码以及网络、VPN 或蜂窝设置。确认前请阅读设备屏幕上的警告。

### 应该将路由器恢复出厂设置吗？

普通“已连接但无互联网”提示不需要这样做。恢复出厂设置可能清除 Wi-Fi 名称、密码和运营商配置。先断电重启，恢复出厂设置前咨询运营商或厂商。

## 来源

- [Microsoft：修复 Windows 中的 Wi-Fi 连接问题](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows) — 排查顺序于 2026 年 10 月 15 日核对。
- [Apple：iPhone 或 iPad 无法连接 Wi-Fi](https://support.apple.com/en-us/111786) — 检查步骤和重置影响于 2026 年 10 月 15 日核对。
- [Google Android 帮助：修复互联网连接问题](https://support.google.com/android/answer/2651367?hl=en) — 于 2026 年 10 月 15 日核对。
- [PCMag：互联网连接故障排查指南](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online) — 独立编辑资料交叉核验，2026 年 7 月更新。

菜单名称可能因系统版本和厂商而异。本指南不能替代运营商的故障状态信息或受管理网络管理员的指引。`,
      hi: `Wi-Fi के आगे “Connected” दिखना हमेशा इंटरनेट चलने की गारंटी नहीं है। पहले किसी दूसरे डिवाइस और वेबसाइट पर जाँचें, फिर पता करें कि समस्या एक डिवाइस, राउटर या इंटरनेट सेवा में है। पहले ऐसे उपाय करें जिन्हें आसानी से वापस बदला जा सके; नेटवर्क रीसेट से सहेजी सेटिंग हट सकती हैं।

> **मुख्य बातें**
> - सभी डिवाइस ऑफ़लाइन हों तो किसी एक फ़ोन या PC की सेटिंग बदलने से पहले राउटर, मॉडेम और सेवा प्रदाता देखें।
> - केवल एक डिवाइस प्रभावित हो तो उसे फिर से जोड़ें और उसके अंतर्निहित समस्या-निवारक का उपयोग करें।
> - आसान जाँच से पहले राउटर का फ़ैक्टरी रीसेट बटन न दबाएँ और नेटवर्क रीसेट न करें।

## पहले समस्या का स्रोत पहचानें

कोई दूसरी वेबसाइट और ऐप खोलें, फिर दूसरे फ़ोन, टैबलेट या कंप्यूटर पर वही Wi-Fi जाँचें। यदि केवल एक वेबसाइट नहीं खुलती, तो नेटवर्क ठीक हो सकता है। उसी Wi-Fi के सभी डिवाइस ऑफ़लाइन हों तो राउटर, मॉडेम या प्रदाता की कड़ी अधिक संभावित है। अन्य डिवाइस चल रहे हों तो प्रभावित डिवाइस पर ध्यान दें। [PCMag की इंटरनेट समस्या-समाधान मार्गदर्शिका](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online) भी इसी जाँच से शुरू होती है।

## पहले कम जोखिम वाले उपाय आज़माएँ

1. **Wi-Fi और Airplane mode देखें।** Wi-Fi चालू और Airplane mode बंद हो। राउटर के पास जाएँ और Internet/status लाइट देखें।
2. **सेवा प्रदाता की आउटेज जाँचें।** मोबाइल डेटा या किसी दूसरे नेटवर्क के डिवाइस से प्रदाता का सेवा-स्थिति पेज खोलें। व्यापक आउटेज को डिवाइस सेटिंग बदलकर ठीक नहीं किया जा सकता।
3. **मॉडेम और राउटर रीस्टार्ट करें।** सभी डिवाइस प्रभावित हों तो दोनों को लगभग 30 सेकंड बिजली से अलग करें। पहले मॉडेम जोड़ें; लाइट स्थिर होने पर राउटर जोड़कर चालू होने दें। पावर प्लग निकालें, छोटा फ़ैक्टरी रीसेट बटन न दबाएँ—वह सेटिंग मिटा सकता है। Microsoft अपने [Wi-Fi समस्या-समाधान मार्गदर्शक](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows) में यह क्रम बताता है।
4. **प्रभावित डिवाइस फिर जोड़ें।** Wi-Fi बंद करके चालू करें और सहेजा नेटवर्क चुनें। न चले तो **Forget network** चुनें और सही पासवर्ड से फिर जुड़ें। ऐसा तभी करें जब पासवर्ड पता हो; मेनू अलग हो सकते हैं।
5. **VPN या सुरक्षा फ़िल्टर अस्थायी रूप से जाँचें।** VPN या सुरक्षा ऐप हो तो उसके अपने नियंत्रण से थोड़ी देर डिस्कनेक्ट कर परीक्षण करें। काम/स्कूल का सॉफ़्टवेयर न हटाएँ और सुरक्षा बंद न छोड़ें; केवल उसके बंद होने पर कनेक्शन चले तो प्रशासक से पूछें।

## डिवाइस के अनुसार उपाय

### Windows 11 या Windows 10

Windows 11 में **Get Help** ऐप का **Network and Internet** समस्या-निवारक चलाएँ; **Settings → Network & internet** में Wi-Fi स्थिति और Airplane mode देखें। Microsoft नेटवर्क भूलकर फिर जोड़ने की भी सलाह देता है। समस्या रहे तो Windows Update या PC निर्माता के माध्यम से Wi-Fi ड्राइवर अपडेट करें। **Network reset** आख़िरी विकल्प है: यह नेटवर्क अडैप्टर फिर स्थापित करता है और VPN/वर्चुअल नेटवर्क दोबारा सेट करने पड़ सकते हैं।

### iPhone या iPad

**Settings → Wi-Fi** में Wi-Fi चालू और चुने नेटवर्क के पास नीला चेकमार्क देखें; Airplane Mode बंद रखें। अन्य डिवाइस भी प्रभावित हों तो राउटर देखें और रीस्टार्ट करें। केवल iPhone प्रभावित हो तो संभव हो तो दूसरे Wi-Fi पर जाँचें। Apple चेतावनी देता है कि **Reset Network Settings** सहेजे Wi-Fi नेटवर्क और पासवर्ड, सेलुलर तथा VPN/APN सेटिंग मिटाता है। आसान उपायों के बाद ही करें और प्रबंधित काम/स्कूल डिवाइस पर पहले IT टीम से पूछें। [Apple की आधिकारिक जानकारी](https://support.apple.com/en-us/111786) देखें।

### Android फ़ोन या टैबलेट

डिवाइस रीस्टार्ट करें और Wi-Fi तथा मोबाइल डेटा की तुलना करें: Wi-Fi बंद करके मोबाइल डेटा चालू करें; फिर उलटा करके जाँचें। मोबाइल डेटा चले पर Wi-Fi न चले तो सहेजे नेटवर्क से फिर जुड़ें या दूसरा Wi-Fi आज़माएँ। मेनू निर्माता और Android संस्करण के अनुसार बदलते हैं। Google के [Android इंटरनेट समस्या-समाधान चरण](https://support.google.com/android/answer/2651367?hl=en) यह तुलना बताते हैं।

## इंटरनेट सेवा प्रदाता से कब संपर्क करें?

मॉडेम और राउटर रीस्टार्ट होने के बाद भी कई डिवाइस कई वेबसाइट न खोल पाएँ तो प्रदाता का आउटेज पेज देखें या सहायता से संपर्क करें। राउटर की Internet लाइट और, यदि जाँच सकें, वायर्ड कनेक्शन का परिणाम बताएं। केवल काम या स्कूल का डिवाइस प्रभावित हो तो प्रबंधित नेटवर्क सेटिंग बदलने से पहले प्रशासक से पूछें।

## अक्सर पूछे जाने वाले सवाल

### Wi-Fi जुड़ा है पर इंटरनेट क्यों नहीं?

डिवाइस राउटर से जुड़ा हो सकता है, जबकि राउटर का बाहरी इंटरनेट कनेक्शन टूट गया हो। VPN, सहेजे नेटवर्क की समस्या या सेवा आउटेज भी कारण हो सकते हैं। दायरा जानने के लिए दूसरा डिवाइस जाँचें।

### क्या DNS सेटिंग बदलनी चाहिए?

पहले कदम के रूप में नहीं। गलत या अनावश्यक DNS बदलाव नई समस्याएँ पैदा कर सकते हैं। जाँच DNS की ओर इशारा करे तभी प्रदाता या निर्माता के लिखित निर्देश अपनाएँ।

### नेटवर्क रीसेट से मेरी फ़ाइलें मिटेंगी?

आमतौर पर फ़ोटो या दस्तावेज़ नहीं मिटते, लेकिन सहेजे Wi-Fi पासवर्ड और नेटवर्क, VPN या मोबाइल सेटिंग हट सकती हैं। पुष्टि से पहले स्क्रीन पर दी चेतावनी पढ़ें।

### क्या राउटर को फ़ैक्टरी रीसेट करना चाहिए?

सामान्य “connected, no internet” स्थिति के लिए नहीं। फ़ैक्टरी रीसेट नेटवर्क नाम, पासवर्ड और प्रदाता सेटिंग मिटा सकता है। पहले बिजली से रीस्टार्ट करें; फ़ैक्टरी रीसेट से पहले निर्माता या प्रदाता से पूछें।

## स्रोत

- [Microsoft: Windows में Wi-Fi कनेक्शन समस्याएँ ठीक करें](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows) — क्रम 15 अक्टूबर 2026 को जाँचा गया।
- [Apple: iPhone या iPad पर Wi-Fi से कनेक्ट न हो पाएँ तो](https://support.apple.com/en-us/111786) — जाँच और रीसेट के प्रभाव 15 अक्टूबर 2026 को देखे गए।
- [Google Android सहायता: इंटरनेट कनेक्शन समस्याएँ ठीक करें](https://support.google.com/android/answer/2651367?hl=en) — 15 अक्टूबर 2026 को जाँचा गया।
- [PCMag: इंटरनेट कनेक्शन समस्या-समाधान मार्गदर्शिका](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online) — स्वतंत्र संपादकीय तुलना, जुलाई 2026 में अद्यतन।

मेनू के नाम OS संस्करण और निर्माता के अनुसार बदल सकते हैं। यह मार्गदर्शिका प्रदाता की आउटेज सूचना या प्रबंधित नेटवर्क के प्रशासक के निर्देशों का विकल्प नहीं है।`,
      pt: `Ver “Conectado” ao lado do Wi-Fi não garante que a Internet esteja funcionando. Teste primeiro outro dispositivo e outro site; depois descubra se a falha está em um aparelho, no roteador ou no provedor. Comece por etapas reversíveis, pois redefinir a rede pode apagar configurações salvas.

> **Pontos principais**
> - Se todos os aparelhos estiverem sem conexão, verifique roteador, modem e provedor antes de alterar um telefone ou PC.
> - Se apenas um dispositivo falhar, reconecte-o e use as ferramentas de diagnóstico integradas.
> - Não aperte o botão de restauração de fábrica do roteador nem redefina a rede antes de tentar o básico.

## Primeiro, localize a origem do problema

Abra outro site e aplicativo e teste o mesmo Wi-Fi em outro telefone, tablet ou computador. Se só um site falhar, a rede pode estar normal. Se todos os aparelhos da mesma rede ficarem sem Internet, o roteador, o modem ou a conexão do provedor são causas mais prováveis. Se os outros funcionarem, concentre-se no dispositivo afetado. O [guia de solução de problemas da PCMag](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online) também começa separando esses cenários.

## Tente primeiro estas soluções de baixo risco

1. **Confira o Wi-Fi e o modo avião.** Confirme que o Wi-Fi está ligado e o modo avião desligado. Aproxime-se do roteador e verifique as luzes de Internet/status.
2. **Verifique se há interrupção no provedor.** Use dados móveis ou um aparelho em outra rede para abrir a página de status do serviço. Uma interrupção geral não se resolve mudando configurações do dispositivo.
3. **Reinicie modem e roteador.** Se todos os aparelhos forem afetados, tire ambos da tomada por cerca de 30 segundos. Ligue primeiro o modem e espere as luzes estabilizarem; depois ligue o roteador e aguarde. Use o cabo de energia, não o pequeno botão de restauração de fábrica, que pode apagar a configuração. A Microsoft documenta essa ordem no [guia de Wi-Fi](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows).
4. **Reconecte o dispositivo afetado.** Desligue e ligue o Wi-Fi e selecione a rede conhecida. Se não funcionar, escolha **Esquecer** e conecte novamente com a senha correta. Faça isso apenas se souber a senha; os menus variam.
5. **Teste temporariamente VPN ou filtro de segurança.** Se usar VPN ou aplicativo de segurança, desconecte-o por alguns instantes pelos controles próprios e teste de novo. Não remova software do trabalho/escola nem deixe a proteção desligada; se só funcionar sem ele, fale com o administrador ou fornecedor.

## Etapas por dispositivo

### Windows 11 ou Windows 10

No Windows 11, execute a solução de problemas **Rede e Internet** no aplicativo **Get Help**; confira o estado do Wi-Fi e o modo avião em **Configurações → Rede e Internet**. A Microsoft também recomenda esquecer e reconectar à rede. Se persistir, atualize o driver Wi-Fi pelo Windows Update ou fabricante do PC. Deixe **Redefinição de rede** como último recurso: ela reinstala adaptadores e talvez exija reconfigurar VPN ou redes virtuais.

### iPhone ou iPad

Abra **Ajustes → Wi-Fi**, confirme que está ligado e que há uma marca azul ao lado da rede desejada; confira também o modo avião. Se outros aparelhos falharem, verifique e reinicie o roteador; se apenas o iPhone falhar, teste outra rede se possível. A Apple alerta que **Redefinir Ajustes de Rede** remove redes e senhas Wi-Fi salvas e ajustes de celular e VPN/APN. Deixe essa etapa para depois das verificações simples e consulte a equipe de TI antes de redefinir um aparelho gerenciado. Veja as [orientações oficiais da Apple](https://support.apple.com/en-us/111786).

### Celular ou tablet Android

Reinicie o aparelho e compare Wi-Fi com dados móveis: desligue o Wi-Fi, ative os dados e teste; depois faça o inverso. Se os dados funcionarem e o Wi-Fi não, reconecte à rede salva ou teste outra. Os nomes dos menus variam conforme fabricante e versão. As [etapas oficiais do Google para Android](https://support.google.com/android/answer/2651367?hl=en) descrevem essa comparação.

## Quando falar com o provedor

Se vários aparelhos não abrirem vários sites mesmo depois de reiniciar modem e roteador, consulte a página de interrupções ou contate o suporte do provedor. Informe o estado das luzes de Internet e, se puder testar, se a conexão cabeada funciona. Se só um aparelho de trabalho ou escola falhar, consulte o administrador antes de alterar configurações gerenciadas.

## Perguntas frequentes

### Por que o Wi-Fi está conectado, mas sem Internet?

O aparelho pode estar conectado ao roteador enquanto o roteador perdeu a conexão externa. VPN, rede salva com problema ou interrupção do serviço também podem ser a causa. Teste outro dispositivo para restringir o diagnóstico.

### Devo mudar as configurações de DNS?

Não como primeiro passo. Alterações desnecessárias ou incorretas de DNS podem gerar novos problemas. Use instruções documentadas do provedor ou fabricante se o diagnóstico apontar para DNS.

### Redefinir a rede apaga meus arquivos?

Em geral, não apaga fotos nem documentos, mas pode remover senhas Wi-Fi e configurações de rede, VPN ou celular. Leia o aviso na tela antes de confirmar.

### Devo restaurar o roteador aos padrões de fábrica?

Não para a mensagem comum “conectado, sem Internet”. A restauração pode apagar o nome e a senha do Wi-Fi e as configurações do provedor. Reinicie pela alimentação primeiro e consulte o fabricante ou provedor antes de restaurar.

## Fontes

- [Microsoft: corrigir problemas de conexão Wi-Fi no Windows](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows) — sequência verificada em 15 de outubro de 2026.
- [Apple: se não conseguir conectar ao Wi-Fi no iPhone ou iPad](https://support.apple.com/en-us/111786) — efeitos da redefinição e verificações revistos em 15 de outubro de 2026.
- [Ajuda do Android do Google: corrigir problemas de conexão à Internet](https://support.google.com/android/answer/2651367?hl=en) — verificado em 15 de outubro de 2026.
- [PCMag: guia de solução de problemas de Internet](https://www.pcmag.com/explainers/13-tips-to-troubleshoot-your-internet-connection-and-get-back-online) — conferência editorial independente, atualizado em julho de 2026.

Os nomes dos menus podem variar conforme o sistema e o fabricante. Este guia não substitui os avisos de interrupção do provedor nem as orientações do administrador de redes gerenciadas.`
    }
  }
];
