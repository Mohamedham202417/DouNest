# DouNest implementation TODO

## 1. Taxonomy and navigation

- [x] The site exposes the ten planned centers in this order: PDF, Images & Design, Video & Audio, File Conversion, Text, Developers, Security & Privacy, Calculators, Productivity & Business, and Temporary Email.
- [x] Existing tools are assigned to the correct center; calculators and file conversions no longer appear under Developer Tools.
- [x] `/media/` and `/business/` are crawlable pages with unique English-first descriptions, Arabic fallbacks, FAQ content, and related-tool links.
- [x] The home page displays the ten center cards and keeps the existing articles, rare tools, and temporary-email disclosures intact.

## 2. Language priority

- [x] English is the first language in the language menu and the default when no saved preference exists.
- [x] Arabic is second and keeps RTL behavior; the remaining supported languages stay available after English and Arabic.
- [x] Generated SEO pages use English titles, descriptions, visible copy, `inLanguage: en`, canonical URLs, and English hreflang defaults.
- [x] The selected language does not mix direction settings or reset the user’s local favorites and recent tools.

## 3. Search and reusable UX

- [x] Search matches tool slugs, multilingual names, descriptions, tags, and the common Arabic aliases for key actions.
- [x] `Ctrl+K` and `Cmd+K` focus the current search field without navigating away.
- [x] Recent tools remain stored in `localStorage` and the local-processing badge remains visible on tool pages.

## 4. SEO and delivery surfaces

- [x] Build output contains all center pages, a synchronized sitemap, service-worker asset list, and `manus-routes.json`.
- [x] Static center pages and tool pages pass the existing canonical, H1, JSON-LD, FAQ, and privacy checks.
- [x] The repository builds successfully and `scripts/check-site.mjs` passes before the GitHub commit.

## 5. Next P1 batches

- [x] Add the first Arabic-first tools: Number to Arabic Words, Arabizi to Arabic, Remove Tashkeel, and Hijri/Gregorian Converter. Arabic OCR improvements remain pending.
- [x] Add local-first P1 tools: Remove EXIF, Unzip, Encrypt/Decrypt Text, and Meta Tags. Sign/Edit/Protect PDF and the first video/audio tools remain pending.
- [x] Add business tools: Invoice Generator, CV Builder, Barcode Generator, Signature Maker, WiFi QR, Pomodoro, and Notepad.
- [x] Add the named P2/P3 tools from the supplied plan as local baseline implementations. Further UX refinement can follow real usage data.

## Latest implementation note

The catalog now contains 121 registered tools and covers every named tool in the supplied PDF plan. PDF editing, signing, cropping, raster extraction and grayscale conversion are local browser workflows. PDF protection uses a clearly labelled encrypted DouNest package (`.dnpdf`) rather than pretending to create a standards-based encrypted PDF. Media conversion loads ffmpeg.wasm on demand.
