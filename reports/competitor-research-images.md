# DouNest competitor evidence memo — مركز الصور

**Reviewed:** 16 Oct 2026. Scope is image compression, resize/crop/convert, transparency/background, batching, local/browser handling, free limits, UI and educational/SEO content. Findings below separate documented facts from recommendations; web pages can change.

## Squoosh

**Observed.** Squoosh is a focused compressor: its homepage offers drag/paste, sample images, side-by-side difference inspection and adjustable codec settings before saving. It explicitly says images stay on-device; its GitHub README confirms local compression and notes Google Analytics collects basic visitor data plus before/after size values. This makes a reassuring privacy story more precise than simply saying “no uploads.” The interface is oriented around comparing quality/size, rather than a bulk transformation suite. [1] [2]

**Constraints / friction.** It is a codec-oriented single-image workflow rather than an obvious batch suite; no batch limit, account tier or conversion/resize/crop menu is documented on the reviewed product page. No claim is made here that other capabilities are impossible. The app emphasizes “smaller,” “simple,” and privacy, with little visible task-specific learning content on its landing page.

## TinyPNG / Tinify

**Observed.** TinyPNG’s web compressor supports JPEG, PNG and WebP (homepage product statement also includes AVIF); its upload panel states **up to 20 images, 5 MB each** and exposes an automatic-conversion option. This is an easy, clear batch affordance. The Tinify developer API explicitly supports AVIF/WebP/JPEG/PNG compression and conversion, resizing, smart cropping around areas of interest, and freestanding-object-aware resizing that can add background space or crop. Its conversion documentation says transparent backgrounds can be filled with a specified color. The API supports upload or source URL and documents a 500 MB maximum file and 256 MP canvas. [3] [4]

**Limits / friction.** Do not conflate API and web limits: API pricing grants 500 free compressions monthly, then pay-per-successful-compression pricing ($0.009 for next 9,500; $0.002 for next 10,000 as listed), whereas the consumer web panel advertises 20 files per batch and 5 MB each. Tinify’s public pricing is in USD and payment options differ by geography; the pricing page lists WeChat Pay/Alipay for Chinese customers and iDEAL for Dutch customers on credit bundles. API resize/crop sophistication is not evidence that those controls are available in the basic web compressor. [3] [4] [5]

## iLoveIMG

**Observed.** iLoveIMG is a broad task suite: the homepage presents bulk editing; dedicated compressor page accepts JPG/PNG/SVG/GIF and describes selecting/dropping images then compressing. Its pricing comparison lists compress, resize, crop, convert, editor, and batch processing, with per-tool free/premium counts and per-task file sizes. For example, free-plan rows list 30 compress/resize/convert operations, 1 crop operation, and 200 MB per compress/resize task; Premium rows list 120 and up to 4 GB for those tasks. The same page lists Premium at $5/month billed annually ($60 annual) or $9 billed monthly, but prices and availability may vary by locale/account. It also lists region-specific processing regions for paid tiers. [6] [7]

**Limits / friction.** The plan matrix is unusually concrete but complex: counts differ by task, and some free tools are one-per-task while others allow 30. The home page and pricing page describe “free” and “limited” processing, so avoid implying all tools or capacities are unlimited free. Web workflow uses upload/processing language, unlike local-first Squoosh/Photopea. The compression page promises a quality/filesize ratio but does not explain codec choices or give user control comparable to Squoosh in the visible page. [6] [7]

## Photopea

**Observed.** Photopea is a general-purpose editor, not a dedicated compression utility. It documents local, on-device work, no uploads, and offline use after loading. Product page lists crop/resize, layers/masks and broad file-format support, including PNG, JPG, WebP, SVG, AVIF, HEIC, TIFF and many design formats. Its Learn section offers step-by-step instruction from basic through advanced tasks. It is useful when a user needs editing or compositing before export, rather than just quick batch optimization. [8] [9]

**Limits / friction.** The reviewed official pages do not document a simple batch compression quota, batch resize/crop workflow, or explicit free tier limits. Do not promise these based on its broad editing feature set. The extensive editor feature surface creates more interaction overhead than a focused “drop, optimize, download” flow for routine image-center jobs.

## Cross-competitor implications

**Documented strengths:** Squoosh makes local privacy and visual quality comparison central; TinyPNG combines low-friction batch compression with a richer API for format conversion and smart resize/crop; iLoveIMG covers common jobs in one UI and publishes task-level limits; Photopea brings local/offline editing and unusually broad format support plus tutorials.

**Evidence-based gaps/friction:** Local-first products have the clearest privacy benefit but the reviewed pages do not foreground batch operation. Upload suites offer batch breadth, but the free ceilings vary by tool, product tier, and surface (web vs API), making comparisons easy to misunderstand. Advanced format/resize features sometimes belong to APIs rather than the basic consumer workflow. Photopea’s power comes with a steeper workflow than a utility hub. Educational/SEO content is most explicit in Photopea’s Learn library; the reviewed utility landing pages largely sell the tool and its speed/performance rather than teaching image-selection decisions.

## Prioritized DouNest opportunities (recommendations, not competitor facts)

1. **Lead with a transparent privacy mode choice:** local-in-browser processing by default where technically feasible, clear file-retention statement, and an explicit upload/cloud option only when needed. Explain any analytics separately; never promise “no upload” unless verified end-to-end.
2. **Make a cohesive image-center workflow:** batch queue with per-file before/after size and percentage, preview slider, then resize/crop/convert and download individually or as ZIP. State exact per-file, batch-count, and pixel limits beside the drop zone; distinguish free local features from any server-backed quotas.
3. **Expose practical conversion and transparency controls:** preserve alpha by default, offer an explicit background color only when converting to a non-alpha format, and warn before transparency loss. Include dimensions, aspect-ratio lock, crop presets and output format/quality in one predictable flow.
4. **Teach while users act:** concise in-product explanations of lossy vs lossless, format choice, transparency and image dimensions, plus focused help pages that answer “which format/quality for this use?” This is a credible content/SEO opportunity, not a claim about search rankings.
5. **Avoid unsupported parity claims:** document browser/device compatibility, offline/local behavior, supported formats, and realistic free limits. Benchmark perceptual quality on representative photos, graphics and alpha images before claiming savings or “best” quality.

## References

[1]: https://squoosh.app/ "Squoosh official app"
[2]: https://github.com/GoogleChromeLabs/squoosh "Squoosh source repository and privacy README"
[3]: https://tinypng.com/ "TinyPNG official online compressor"
[4]: https://tinypng.com/developers/how-it-works "Tinify API feature and constraint documentation"
[5]: https://tinify.com/pricing/api "Tinify API pricing"
[6]: https://www.iloveimg.com/compress-image "iLoveIMG compression workflow"
[7]: https://www.iloveimg.com/pricing "iLoveIMG pricing and task limits"
[8]: https://www.photopea.com/ "Photopea official editor"
[9]: https://www.photopea.com/learn/ "Photopea official learning guide"
