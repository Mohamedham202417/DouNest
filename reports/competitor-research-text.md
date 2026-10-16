# DouNest competitor evidence memo: مركز النصوص

**Scope:** direct text-utility competitors requested: WordCounter.net, CharacterCountOnline, EditPad (current site redirects/rebrands to iLoveNote), and LanguageTool. Pages checked 16 October 2026. Findings below distinguish what the pages document from product recommendations; not a claim that this is an exhaustive market census.

## Competitive findings

### WordCounter.net
- **Observed coverage:** real-time words and characters plus unique words, characters excluding spaces, sentences, paragraphs, lines, syllables, page estimate, reading/speaking/handwriting time, reading level, sentence statistics, keyword-density panel, and flow-score highlights. It also exposes case modes (sentence/title/upper/lower), goals, autosave, editing, uploads, text cleanup, find/replace, import/export, and grammar/plagiarism integrations. The page describes cursor/type/paste workflow and explicitly warns accuracy is not guaranteed. [1]
- **Strengths:** unusually complete writing-oriented dashboard; time/reading estimates and keyword-density support practical editing/SEO workflows. Users can configure which details and buttons appear. [1]
- **Friction/gaps:** main surface is a dense editor with many controls, dialogs and account-oriented features, rather than a minimal one-shot utility. Case choices documented are narrower than a dedicated case converter. No list sorting, slug, or Markdown tools were documented in the inspected product page. A Grammarly promotion is embedded in the page; actual ad load/placement may vary by session and geography. The checked privacy URL did not yield readable policy content, so text retention cannot be stated from that page. [1]

### CharacterCountOnline
- **Observed coverage:** instant characters, words, sentences, paragraphs and whitespace, with configurable multilingual keyword density/stopwords. Workflow is type or paste into one area; it has a language selector and links to older versions, an embed, and a word-counter page. [2]
- **Strengths:** fast, uncluttered counting workflow and explicit language/stopword controls. Its privacy policy specifically says entered text stays in the device/browser and is not read, sent or saved by its service. [2] [3]
- **Friction/gaps:** no reading-time, case conversion, sorting/list, slug or Markdown function documented on the inspected tool page. The same privacy policy describes cookies, log files and third-party ad partners, so “text stays local” should not be confused with an ad/tracker-free site. It calls the tool completely free, but no rate/size limits or paid tier details were documented. [2] [3]

### EditPad / iLoveNote (rebrand/current destination)
- **Observed coverage:** editpad.org homepage now renders as iLoveNote, and the page identifies itself as formerly EditPad. The current notepad advertises word and character counts, formatting, upload/download, note persistence and grammar/plagiarism/AI-adjacent features; it describes notes being saved and a content-size limit notice, but does not quantify that limit in the rendered page. [4]
- **Utility coverage:** case converter offers sentence, lower, upper, capitalized, alternating, title and inverse case, with live character/word/line indicators and copy workflow. Alphabetizer offers A–Z/Z–A, short-to-long/long-to-short, and duplicate removal. Tool directory lists many other utilities. [5] [6]
- **Strengths:** broad breadth and several purpose-built standalone pages with straightforward paste → select operation → copy workflow. Its long-form SEO copy explains options and links across related tools. [5] [6]
- **Friction/gaps:** on the notepad, the page says autosave and “save” but also states a maximum content size has been exceeded without a number; privacy claims (“do not save private data”) sit alongside note/cloud/browser storage language, so users must distinguish local/browser/cloud behavior. [4] “EditPad” is no longer a clear current brand destination. Case/alphabetizer pages include substantial boilerplate and an advertisement slot around the tool, increasing page length and visual noise. [5] [6] No slug or dedicated Markdown utility was found in the inspected page/directory; absence from these pages is not proof that no such feature exists elsewhere.

### LanguageTool
- **Observed coverage:** the standalone word-counter URL could not be read by the text fetcher, and the editor statistics URL redirected to a login wall. Consequently, this check could not independently verify a public standalone tool's precise counters, reading-time estimate, list/case/slug/Markdown coverage, or its unauthenticated workflow. [7] [8]
- **Strengths:** the official product prioritizes grammar, punctuation and style feedback in an editor; Premium documents up to 150,000 characters per text field and additional style checks, with free/basic vs paid tiers. [9]
- **Privacy/limits:** current official privacy policy says content entered/uploaded through services may be collected, and says LanguageTool user inputs are not used to train language algorithms/models by default. This is materially different from an explicit local-only promise. Premium page states 150,000 characters per field; prices failed to display in the captured page, so no price is quoted. Limits/prices may depend on plan, locale and promotion. [9] [10]
- **Friction/gaps:** counter-specific evidence is weaker than for the other competitors because the relevant editor/statistics pages require login or fail extraction. Do not infer that an inaccessible statistics page means the feature is absent. Paid plan pricing was not verifiable from the rendered page. [8] [9]

## Capability map (evidence from inspected pages)

| Workflow | WordCounter.net | CharacterCountOnline | EditPad/iLoveNote | LanguageTool |
|---|---|---|---|---|
| Word/character counting | Broad real-time statistics [1] | Basic counts, spaces [2] | Counts on notepad and utility pages [4] [5] | Counter page/editor stats not independently verifiable [7] [8] |
| Reading time | Yes; plus speaking/handwriting estimates [1] | Not documented [2] | Not documented on inspected pages [4]-[6] | Not verified [7] [8] |
| Case conversion | Four modes documented in main editor [1] | Not documented [2] | Seven modes [5] | Not verified [7] [8] |
| Lists | Not documented [1] | Not documented [2] | Sort directions, length, remove duplicates [6] | Not verified [7] [8] |
| Slug generation | Not documented [1] | Not documented [2] | Not found in inspected directory [6] | Not verified [7] [8] |
| Markdown | Not documented [1] | Not documented [2] | Not found in inspected directory [6] | Not verified [7] [8] |

## Prioritized, credible DouNest opportunities (recommendations)

1. **Ship a tight all-in-one text bench:** live words, characters with/without spaces, lines, paragraphs, sentences and adjustable reading-time rate; keep counts visible while switching to case conversion, list sort/deduplicate, slugify and Markdown preview/HTML conversion. Competitors split this breadth across dense editors or separate tools; this is a product hypothesis, not measured demand.
2. **Make privacy understandable and testable:** state whether processing is browser-local, whether input is transmitted, whether anything is retained, and how analytics/ads differ from text processing. Offer a no-upload mode and an explicit clear button. CharacterCountOnline demonstrates the clarity value of a local-processing statement, while its policy also exposes third-party advertising; WordCounter's checked privacy page was unreadable and LanguageTool's policy covers content collection. [3] [10]
3. **Reduce interaction friction:** persistent input/output panes, one-click copy, undo, sample/reset, keyboard access, and mobile layout; avoid ads interrupting the transformation area. This targets the editor density at WordCounter and ad/boilerplate-heavy standalone iLoveNote pages. [1] [5] [6]
4. **Publish precise, useful tool guidance:** explain counting rules (Unicode/emoji, whitespace, hyphens, URLs, Markdown syntax), reading-speed assumption, list sorting behavior, slug handling and limits. Pair each tool with examples and concise FAQs rather than generic repetitive copy. WordCounter itself disclaims guaranteed accuracy; several competitors provide incomplete limits/rule detail. [1] [2] [5] [6]
5. **Build SEO pages around distinct intent, not doorway duplication:** separate word counter, character counter, reading time, case converter, alphabetizer/list cleaner, slug generator and Markdown converter pages that link to one shared working utility, with unique worked examples and accessible tool controls. iLoveNote demonstrates extensive tool-to-tool internal linking and explanatory copy; DouNest can differentiate through compact, technically precise answers and privacy/limit disclosure. [5] [6]

## References

[1]: https://wordcounter.net/ "WordCounter.net main editor and feature documentation"
[2]: https://www.charactercountonline.com/ "Character Count Online product page"
[3]: https://www.charactercountonline.com/privacy-policy/ "Character Count Online privacy policy"
[4]: https://www.editpad.org/ "EditPad destination / current iLoveNote notepad"
[5]: https://www.ilovenote.net/tool/case-converter "iLoveNote Case Converter"
[6]: https://www.ilovenote.net/tool/alphabetizer "iLoveNote Alphabetizer"
[7]: https://languagetool.org/word-counter "LanguageTool word counter URL (page not extractable during review)"
[8]: https://languagetool.org/editor/statistics "LanguageTool editor statistics route (login wall during review)"
[9]: https://languagetool.org/premium "LanguageTool Premium features and character limit"
[10]: https://languagetool.org/legal/privacy "LanguageTool privacy policy"
