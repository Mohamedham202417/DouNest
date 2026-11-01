# DouNest

**DouNest** is a privacy-first collection of free browser tools for files, text, images, media, developers, security, calculators, productivity, and business workflows. The site is static-first and SEO-friendly: every tool has a real URL, a generated landing page, localized metadata, and a client-side interface.

## What changed

The latest development reorganizes DouNest from a flat collection into clear work centers and updates the catalog to **121 registered tools**. It also adds a Popular Tools section, Arabic-first tool coverage for the new utilities, complete metadata translations for all ten supported languages, and browser verification for every registered tool page.

The project now includes:

- Ten clear work centers: **PDF**, **Images**, **Media**, **Convert**, **Text**, **Developers**, **Security**, **Calculators**, **Business**, and **Temporary Mail**.
- Real crawlable routes such as `/tools/json-formatter/`, `/pdf/`, `/images/`, `/media/`, `/business/`, and `/mail/`.
- Generated SEO pages, canonical URLs, Open Graph metadata, JSON-LD, sitemap, RSS feed, robots.txt, 404 fallback, and a versioned Service Worker.
- English-first localization: English is the primary source language, Arabic is the next priority, followed by French, Spanish, German, Turkish, Russian, Simplified Chinese, Hindi, and Brazilian Portuguese.
- Local processing wherever possible. Files are intended to stay in the browser rather than being uploaded to a DouNest server.
- Responsive tool shells with file/text input, options, progress or preview areas where applicable, download/copy actions, related tools, explanations, and FAQ/SEO content.
- A Popular Tools section and recently used tools stored locally in the browser.

## Tool catalog

The catalog currently contains 121 tools across these areas:

| Center | Examples |
|---|---|
| PDF | Sign, edit, protect, unlock, crop, extract images, grayscale, merge, split, rotate, compress, convert |
| Images | Compress, convert, crop, resize, upscale, remove background, remove EXIF, watermark, blur/pixelate, collage, palette, gradients, memes |
| Media | Video to MP3, compress, trim, GIF conversion, audio conversion, voice recorder, screen recorder |
| Convert | ZIP extraction, Word/text conversion, Excel viewer and PDF conversion, CSV/JSON conversions |
| Text | Arabic number words, Arabizi, tashkeel removal, Hijri conversion, speech-to-text, text-to-speech, find/replace, counters |
| Developers | JSON, UUID, Meta Tags/Open Graph, base conversion, cURL, subnet/IP, robots.txt, sitemap, HTTP status tools |
| Security | AES text/file encryption, password breach check, password tools, random picker and local privacy utilities |
| Calculators | Baccalaureate average, Zakat, loan/installment, discount/VAT, date difference, timezone, compound interest, currency |
| Business | Invoice, CV/resume, barcode, signature, WiFi QR, Pomodoro, online notepad |
| Temporary Mail | Temporary email entry point and related privacy-oriented workflows |

The catalog is defined in [`js/registry.js`](js/registry.js). Shared long-form content is maintained in [`js/tool-content.js`](js/tool-content.js), and the generated metadata translations are stored in [`js/tool-translations.js`](js/tool-translations.js).

## Languages

DouNest supports these ten interface and tool-metadata languages:

1. English (`en`)
2. العربية (`ar`)
3. Français (`fr`)
4. Español (`es`)
5. Deutsch (`de`)
6. Türkçe (`tr`)
7. Русский (`ru`)
8. 中文简体 (`zh`)
9. हिन्दी (`hi`)
10. Português do Brasil (`pt`)

Every registered tool has a translated name, short description, usage steps, and explanation in all ten languages. The UI falls back safely to English only when a future or custom field has not yet been localized.

## Privacy and processing model

DouNest is designed around local browser processing. PDF, image, text, calculator, encryption, signature, recorder, and file-conversion tools use browser APIs or client-side libraries where practical. The interface should make it clear when a feature needs a third-party browser API or an external service, such as currency rates or a password-breach range lookup.

Do not treat a browser-only tool as a guarantee that every third-party dependency is offline. Review the individual tool description before processing sensitive material, and avoid entering secrets into tools or external services unless you understand the result.

## Project structure

```text
├── index.html              Homepage shell
├── config.js               Domain, repository path, analytics and monetization settings
├── build.mjs               Static page, SEO, sitemap, feed and Service Worker generator
├── assets/                 Styles, icons, logo and visual assets
├── js/
│   ├── app.js              Router, homepage, search, language and tool rendering
│   ├── registry.js         Single source of truth for the 121 tools
│   ├── langs.js            The ten supported languages
│   ├── i18n.js             Interface translations and language switching
│   ├── tool-content.js     Long-form descriptions, FAQ and tags
│   ├── tool-translations.js Generated translated tool metadata
│   ├── tools/              Individual tool adapters and implementations
│   ├── hubs/               Work-center pages
│   └── lib/                Shared client-side actions and helpers
├── tools/<slug>/            Generated landing page for each registered tool
├── pdf/, images/, media/…   Generated work-center pages
├── articles/                SEO article pages and translations
├── scripts/check-site.mjs   Static catalog and route validation
└── reports/                 Planning and implementation notes
```

## Local development

The project is a static site and does not require a database or an AI service to run the local tools.

```bash
# Install dependencies used by the build/test scripts
pnpm install

# Regenerate tool pages, center pages, sitemap, feed, routes and sw.js
pnpm build

# Run the static validation suite
pnpm test

# Preview the generated site
python3 -m http.server 8080
# Open http://localhost:8080/
```

`pnpm test` validates the registered tools, generated routes, center links, localization data, and required SEO/site files. A successful current run validates **121 registered tools** and more than one thousand catalog/site checks.

## Adding or changing a tool

1. Add or update the tool record in `js/registry.js`.
2. Add the implementation in `js/tools/<slug>.js` and export `render(root)`.
3. Add the tool to the appropriate work-center list in `build.mjs` or the relevant hub module.
4. Add English and Arabic copy first, then add the remaining language metadata before declaring the tool complete.
5. Run `pnpm build`, `pnpm test`, and a browser smoke test for the generated route.
6. Review generated HTML, sitemap and related-tool links before committing.

The build is the source of generated pages; edit the registry, content, templates, or source modules rather than hand-editing generated HTML.

## GitHub Pages deployment

The repository is configured for a static GitHub Pages-style deployment. Keep the project contents at the repository root; do not nest them under a second `DouNest` directory.

1. Set `repoPath` in `config.js` to `"DouNest"` for `https://<user>.github.io/DouNest/`.
2. Use `repoPath: ""` for a custom domain and rebuild.
3. Run `pnpm build`.
4. Publish the repository root from the selected branch and verify that asset URLs do not contain `/DouNest/DouNest/`.

The generated `sitemap.xml`, `robots.txt`, `feed.xml`, `404.html`, `manus-routes.json`, and `sw.js` should be deployed together with the generated pages.

## Configuration and monetization

Optional analytics, advertising, affiliate, featured-placement, and support settings live in `config.js`. Keep secrets out of the repository. Any advertising or affiliate integration should preserve the privacy policy, disclosure text, and the local-processing promise of the individual tools.

## Current verification

The latest browser sweep loaded all 121 registered tool routes without `tool load failed` or `Something went wrong` errors. The static build and catalog checks also pass after the multilingual metadata update.

## License and credits

DouNest is a browser-tool project. Third-party libraries remain subject to their own licenses. Review the library notices and the individual tool implementation before redistributing bundled dependencies.
