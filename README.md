# DouNest — Free Browser Tools

A mobile-first, bilingual, static tools website.

## Included tools

- Image compressor
- Image format converter
- JSON formatter
- Text comparison
- Word counter
- Unit converter
- Password generator
- Color converter
- Base64 encoder/decoder
- URL encoder/decoder
- CSV/JSON converter
- JWT inspector
- Hash/checksum generator (SHA-256, MD5)
- Regex tester
- Timestamp converter
- Slug generator

## Run locally

Open `index.html` in your browser.

For best clipboard support, use localhost or HTTPS:

```bash
python3 -m http.server 8080
```


## Enhanced modular version

The implementation from the shared design is available at [`v2/`](v2/), while the existing homepage and its current tools remain intact. On GitHub Pages, open `/DouNest/v2/` to use the enhanced version.

The modular version includes bilingual Arabic/English navigation, responsive styling, hash-based tool pages, favorites, recent tools, local ratings/comments, and PWA support. Its included tools are JSON formatter, Base64, URL encoder/decoder, JWT decoder, SHA hash generator, UUID generator, password generator, color converter, word counter, and text-case converter.

Ratings and comments are stored in each visitor's browser (`localStorage`); they are not shared between visitors. The app does not currently use a backend or synchronize that data.
