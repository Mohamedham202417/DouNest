# DouNest competitor evidence memo — مركز الأمان

**Research date: 16 October 2026.** This comparison covers direct product/tool patterns for password generation, TOTP, breach checks, and browser-delivered security/privacy utilities. Findings below distinguish observed public documentation from product recommendations. Vendor pages are product claims, not independent verification.

## Competitors and observed workflows

### Bitwarden — password/passphrase and username generation

Bitwarden exposes a public web generator and an in-product generator across web, browser extension, desktop, mobile, and CLI. Settings include password length, minimum digits/symbols, character sets, ambiguous-character avoidance, or passphrase word count/separator/capitalization/number. In-product it can generate inline during signup and optionally save the login; it also offers generator history, which is client-specific and cleared on logout. The help article cautions that excessive minimum numbers/symbols constrain strength. The public landing page also includes strength/crack-time feedback and markets saving into a vault. **Observed friction/opportunity:** the public page's interactive controls are not fully represented in extracted text, and the standalone-to-vault conversion messaging competes with the utility itself; clearly state what is computed locally, offer copy/refresh and accessible settings, and avoid implying crack-time estimates are guarantees. [1][2]

### 1Password — standalone password generator and paid manager

The public generator lets users choose Random, Memorable, or PIN and customize character/number/symbol properties, with copy and refresh actions. Product explanation encourages the companion manager, autofill, and generated credentials. Its security page describes dual-key encryption (account password plus Secret Key), audited assessments, verified-browser filling, clipboard clearing, and user-initiated fill/display. These are vendor-described controls. Personal pricing page currently advertises a 14-day free trial, and USD annual-billing promotion at $2.99/month Individual and $4.49/month Families; listed regular prices are $3.99/$5.99. Promotions are restricted to direct web subscriptions and first year; app-store/geographic currency and terms can differ. **Observed friction/opportunity:** standalone tool is a narrow top-of-funnel utility; price/promotion details add decision complexity. DouNest can emphasize transparent standalone use, explain threat boundaries beside each tool, and avoid hard-coded globally universal prices. [3][4][5]

### 2FAS — mobile TOTP plus paired browser extension and diagnostic utilities

2FAS Auth advertises a free, offline-capable, open-source mobile authenticator with no account requirement and token syncing via export files, iCloud, or Google Drive. Its browser extension is paired by scanning a QR code; user initiates token requests in the browser and confirms them on the phone. 2FAS says communication is end-to-end encrypted and no account is required. The documented workflow requires both the phone app and extension; extension site lists Chrome, Brave, Firefox, Edge, Opera, and Safari. Its browser checker walks through installation, QR pairing, test-token enrollment, invoking the extension, and approving a push; a separate test page asks the user to scan a known test secret and compare the generated code. These are unusually concrete onboarding/support workflows, but introduce setup steps and device dependency. **Observed friction/opportunity:** make cross-device requirements and recovery/sync choices explicit before pairing, and offer safe, disposable diagnostics with prominent warning never to scan a real account's secret into a demo. [6][7][8]

### Have I Been Pwned (HIBP) — breach and exposed-password checks

HIBP's Pwned Passwords check is free and open source. Its documented browser/API design hashes a password locally, sends only the first five SHA-1 hash characters, receives matching suffixes, and compares locally. API docs describe optional response padding and warn that incremental lookup as a user types can leak enough prefix information to infer the password; checking only after entry mitigates that risk. The API is documented as having no rate limit for Pwned Passwords, while support for integration is included in Pro/High RPM subscriptions. HIBP explicitly says an unmatched password is not necessarily strong, and its FAQ warns that a missing email in HIBP does not establish that it was never compromised. HIBP's own FAQ acknowledges website searches are not explicitly logged but notes infrastructure/analytics/diagnostic collection. **Observed friction/opportunity:** clearly distinguish breach presence from password strength, disclose exactly what leaves the browser and when, provide actionable next steps, and explain dataset incompleteness without false reassurance. [9][10][11]

## Cross-cutting strengths and gaps

**Observed strengths:** competitors make common tasks immediately actionable: generate/copy/refresh credentials; connect an authenticator to browser workflows; run a check against a defined breach corpus. Bitwarden and 1Password connect generation to save/autofill; 2FAS documents a stepwise pairing validator; HIBP makes its privacy protocol and limits unusually explicit. Across these examples, privacy and trust content is not merely a footer: it describes encryption, local hashing, source code/audits, or explicit user confirmation. [1][3][5][6][9][10]

**Observed weaknesses/friction:** standalone generators can steer users toward account signup; security scoring/crack-time numbers risk being read as guarantees without explanation. A TOTP browser bridge requires two devices and a pairing/approval workflow, so recovery and setup failure deserve first-class guidance. Breach databases are necessarily incomplete, and no-match results need careful language. Pricing is not globally stable: promotional pricing, billing cadence, currencies, taxes, and app-store purchase paths affect comparisons. Public pages sometimes make broad absolute privacy/security assertions; users need concise, testable data-flow descriptions rather than unqualified slogans. These are UX risks inferred from documented workflows, not claims that the services are insecure. [2][5][7][10][11]

## Prioritized DouNest opportunities (recommendations)

1. **Make a privacy-first toolbox usable without account creation:** local password/passphrase/PIN generation, configurable length/character constraints, copy/regenerate, and clear browser-local processing statement. Link to optional storage rather than requiring it. State whether any analytics, clipboard, or remote calls occur.
2. **Add a transparent compromised-password check:** use HIBP's documented range/k-anonymity flow (hash locally; send only prefix; compare suffixes locally), do not check on every keystroke, and show the outbound request behavior and dataset/date caveat. Avoid storing/submitting raw passwords. Confirm current API terms and attribution before production integration.
3. **Provide practical TOTP education and safe diagnostics:** teach setup and recovery-code storage; distinguish authenticator codes from SMS; optionally provide a test-token/demo flow that uses only a clearly labeled dummy secret. If implementing browser pairing, explain why the phone remains necessary, approval steps, and recovery route before setup.
4. **Use warning copy that is specific and non-alarmist:** separate “found in known corpus” from “weak” and from “account breached”; explain false negatives, score uncertainty, and the exact recommended action. Don't promise that a generated password or enabled 2FA makes an account invulnerable.
5. **Earn trust with evidence near controls:** publish a short data-flow/privacy page, source-code or independent-review status where true, dated test coverage, and links to methods/limitations. Use clear consent for any third-party lookup and disclose vendor dependency; don't claim “100% private” absent verifiable specifics.
6. **Reduce friction through content and UX:** Arabic-first plain-language labels for مركز الأمان, keyboard/accessibility support, concise explanations beside settings, one-tap copy/regenerate with feedback, and progressive disclosure. Present free/paid limits only when verified, with region/billing qualifiers.

## References

[1]: https://bitwarden.com/help/generator/ "Bitwarden Username & Password Generator help"
[2]: https://bitwarden.com/password-generator/ "Bitwarden free password generator"
[3]: https://1password.com/password-generator "1Password password generator"
[4]: https://1password.com/security "1Password security overview"
[5]: https://1password.com/pricing/personal "1Password Personal pricing"
[6]: https://2fas.com/auth/ "2FAS Auth product overview"
[7]: https://2fas.com/auth/browser-extension/ "2FAS Auth browser extension"
[8]: https://2fas.com/auth/check-be/ "2FAS browser extension checker"
[9]: https://2fas.com/auth/check-token/ "2FAS test-token utility"
[10]: https://haveibeenpwned.com/Passwords "HIBP Pwned Passwords"
[11]: https://haveibeenpwned.com/API/v3 "HIBP API documentation"
[12]: https://haveibeenpwned.com/FAQs "HIBP frequently asked questions"
[13]: https://bitwarden.com/pricing/ "Bitwarden pricing"
