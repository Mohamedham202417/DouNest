#!/usr/bin/env node
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { TOOLS } from "../js/registry.js";
import * as ops from "../js/lib/ops.js";
import { getArticle } from "../js/articles.js";
import { markdownToHtml } from "../js/lib/article-markdown.js";
import { CENTER_CONTENT } from "../js/center-content.js";
import { INFO_PAGES, renderInfoPage, infoPageJsonLd } from "../js/info-pages.js";
import { PDF_ACTIONS, IMAGE_ACTIONS, CONVERT_ACTIONS } from "../js/lib/actions.js";

const ROOT = new URL("../", import.meta.url);
const read = (p) => readFileSync(new URL(p, ROOT), "utf8");
const configSource = read("config.js");
const origin = configSource.match(/\borigin:\s*"([^"]+)"/)?.[1];
const repoPath = configSource.match(/\brepoPath:\s*"([^"]*)"/)?.[1] ?? "";
assert.ok(origin, "site origin missing from config.js");
const siteRoot = `${origin.replace(/\/$/, "")}/${repoPath ? `${repoPath}/` : ""}`;
let checks = 0;
function ok(condition, message) { assert.ok(condition, message); checks++; }

// Every registered utility has a crawlable page, canonical, one H1 and valid JSON-LD.
for (const tool of TOOLS) {
  const path = `tools/${tool.slug}/index.html`;
  ok(existsSync(new URL(path, ROOT)), `missing generated page: ${path}`);
  const html = read(path);
  ok((html.match(/<h1\b/g) || []).length === 1, `${path}: expected exactly one h1`);
  ok(html.includes('rel="canonical"'), `${path}: canonical is missing`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  ok(canonical?.[1] === `${siteRoot}tools/${tool.slug}/`, `${path}: wrong canonical URL`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(m[1]);
  checks++;
  if (tool.slug.startsWith("pdf-") || ["image-crop","image-rotate-flip","exif-viewer","favicon-generator","svg-to-png","json-yaml","markdown-to-html","slug-generator","list-cleaner","totp-generator","password-strength","image-to-base64","xml-formatter","html-to-markdown"].includes(tool.slug)) {
    ok(existsSync(new URL(`js/tools/${tool.slug}.js`, ROOT)), `missing standalone module: ${tool.slug}`);
  }
}

for (const slug of ["pdf", "images", "convert", "text", "dev", "security", "calculators"]) {
  const p = `${slug}/index.html`;
  const html = read(p);
  ok(html.includes("rel=\"canonical\""), `${p}: canonical missing`);
  ok((html.match(/<h1\b/g) || []).length === 1, `${p}: expected one H1`);
  ok(html.includes("hub-guide") && html.includes('class="hub-steps"'), `${p}: detailed, crawlable guide missing`);
  ok(html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"'), `${p}: FAQ structured data missing`);
  ok(html.includes('class="hub-faq"'), `${p}: visible FAQ section missing`);
  for (const [question] of CENTER_CONTENT[slug].ar.faq) ok(html.includes(question), `${p}: FAQ is not visible in page content: ${question}`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(m[1]);
  checks++;
}
const home = read("index.html");
ok((home.match(/<h1\b/g) || []).length === 1, "home needs one H1");
ok(/مراكز العمل/.test(home), "home center links missing");
ok((home.match(/class="explore-card"/g) || []).length >= 7, "home work centers must render as separate cards");
ok(home.includes("id=\"nav-toggle\"") && home.includes("id=\"topnav\""), "mobile navigation toggle/panel missing");
ok(!home.includes("most-searched") && !read("js/i18n.js").includes("most-searched") && !read("js/i18n.js").includes("أكثر الأسئلة بحثاً"), "FAQ copy must not claim unsupported search-volume rankings");
ok(existsSync(new URL("feed.xml", ROOT)), "RSS feed missing");
ok(existsSync(new URL("robots.txt", ROOT)), "robots.txt missing");
const sitemap = read("sitemap.xml");
for (const p of ["text/", "dev/", "security/", "calculators/", "tools/pdf-organize/", "contact/"]) ok(sitemap.includes(`${siteRoot}${p}`), `sitemap missing ${p}`);

// Information pages are rendered in static HTML and use the same content in the SPA.
for (const slug of Object.keys(INFO_PAGES)) {
  const path = `${slug}/index.html`;
  ok(existsSync(new URL(path, ROOT)), `missing information page: ${path}`);
  const html = read(path);
  ok((html.match(/<h1\b/g) || []).length === 1, `${path}: expected exactly one H1`);
  ok(!html.includes("النسخة الكاملة لهذه الصفحة تُعرض داخل التطبيق"), `${path}: placeholder content returned`);
  ok(html.includes('class="breadcrumb"') && html.includes('"@type":"BreadcrumbList"'), `${path}: visible/schema breadcrumb missing`);
  ok(html.includes('name="description"') && html.includes('rel="canonical"'), `${path}: metadata missing`);
  ok((html.match(/<h2\b/g) || []).length >= 2, `${path}: substantive section content missing`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(m[1]);
  checks++;
  ok(renderInfoPage(slug, "ar").includes(INFO_PAGES[slug].ar.title), `${slug}: Arabic SPA content missing`);
  ok(renderInfoPage(slug, "en").includes(INFO_PAGES[slug].en.title), `${slug}: English SPA content missing`);
  ok(infoPageJsonLd(slug, "ar", "https://example.test").some(item => item["@type"] === "BreadcrumbList"), `${slug}: breadcrumb schema helper missing`);
}
for (const [slug, minimum] of [["about", 300], ["privacy", 500], ["terms", 500]]) {
  const page = INFO_PAGES[slug].en;
  const visibleCopy = [page.title, page.intro, ...page.sections.flatMap(section => [section.title, ...section.paragraphs])].join(" ");
  ok(visibleCopy.split(" ").filter(Boolean).length >= minimum, `${slug}: English page content is below the planned substantive minimum`);
}
const contactPage = read("contact/index.html");
ok(contactPage.includes("github.com/Mohamedham202417/DouNest/issues/new") && /public|عامة/.test(contactPage), "contact page must use the public issue channel and warn about privacy");
ok(!read("index.html").includes('name="google-site-verification" content=""'), "empty Search Console token must not produce an empty verification tag");
for (const slug of ["image-to-base64", "xml-formatter", "html-to-markdown"]) {
  const tool = TOOLS.find(item => item.slug === slug);
  ok(tool?.faq?.length >= 2, `${slug}: detailed FAQs missing`);
  const html = read(`tools/${slug}/index.html`);
  ok((html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"')) && html.includes('class="faq-item"'), `${slug}: visible FAQ or FAQ schema missing`);
  const source = read(`js/tools/${slug}.js`);
  ok(!/\bfetch\s*\(|XMLHttpRequest|sendBeacon/.test(source), `${slug}: local-only utility must not transmit user content`);
}

// Core file centers must use one shared queue and a complete, reusable action catalogue.
for (const slug of ["pdf", "images", "convert"]) {
  const source = read(`js/hubs/${slug === "pdf" ? "pdf-hub" : slug === "images" ? "image-hub" : "convert-hub"}.js`);
  ok((source.match(/workbench\(root/g) || []).length === 1, `${slug}: expected one shared workbench`);
  ok(!/id="(?:pdf|img|cv)-(?:drop|input)"|wb-existing-tools/.test(source), `${slug}: legacy duplicate upload area returned`);
}
for (const id of ["compress", "merge", "split", "rotate", "toJpg", "toText", "toWord", "organize", "watermark", "pageNumbers", "imagesToPdf"])
  ok(Boolean(PDF_ACTIONS[id]), `PDF action missing: ${id}`);
for (const id of ["convertWebp", "compressJpg", "resize", "crop", "rotateFlip", "exif", "stripExif", "favicon", "removeBackground", "toPdf"])
  ok(Boolean(IMAGE_ACTIONS[id]), `image action missing: ${id}`);
for (const id of ["imageFormat", "csvToJson", "jsonToCsv", "xlsxToCsv", "xlsxToJson", "docxToText", "textToPdf", "svgToPng", "jsonYaml"])
  ok(Boolean(CONVERT_ACTIONS[id]), `conversion action missing: ${id}`);
ok(read("assets/styles-v4.css").includes(".hub-drop {"), "shared workbench upload styling missing");
ok(read("assets/styles-v4.css").includes(".explore-card {"), "home work center card styling missing");
ok(read("assets/styles-v4.css").includes(".topnav.open { display: flex; }"), "mobile navigation popup styling missing");
ok(read("js/hub-kit.js").includes("FILE_READ_FAILED") && read("js/hub-kit.js").includes("Download it to this device"), "file read errors should provide a clear local-file recovery step");
ok(read("assets/styles.css").includes(".topnav-group > summary"), "center navigation dropdown styling missing");

// The two new troubleshooting guides are statically rendered in all supported locales.
const articleLocales = ["ar", "en", "fr", "es", "de", "tr", "ru", "zh", "hi", "pt"];
for (const slug of ["speed-up-slow-windows-pc", "wifi-connected-no-internet"]) {
  const article = getArticle(slug);
  ok(Boolean(article), `missing article data: ${slug}`);
  for (const lang of articleLocales) {
    const page = lang === "ar" ? `articles/${slug}/index.html` : `articles/${slug}/${lang}/index.html`;
    ok(existsSync(new URL(page, ROOT)), `missing localized article page: ${page}`);
    const html = read(page);
    ok((html.match(/<h1\b/g) || []).length === 1, `${page}: expected exactly one H1`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    const path = lang === "ar" ? `articles/${slug}/` : `articles/${slug}/${lang}/`;
    ok(canonical?.[1] === `${siteRoot}${path}`, `${page}: wrong canonical`);
    ok(html.includes(`hreflang="${lang}"`), `${page}: self hreflang missing`);
    ok(html.includes(`hreflang="x-default"`), `${page}: x-default hreflang missing`);
    ok(html.includes(`<article class="section article-body" lang="${lang}">`), `${page}: document language missing`);
    ok(html.includes('<meta property="og:type" content="article" />'), `${page}: Open Graph article type missing`);
    ok(html.includes("<blockquote>") && /<ol>|<ul>/.test(html), `${page}: Markdown callout/list not rendered`);
    ok(html.includes("article-related"), `${page}: related internal article link missing`);
    ok(html.includes("article-byline") && html.includes(`datetime="${article.date}"`) && html.includes("DouNest"), `${page}: visible author/date byline missing`);
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
    ok(schemas.some(schema => schema["@type"] === "Article" && schema.inLanguage === lang), `${page}: Article JSON-LD missing or wrong language`);
    ok(sitemap.includes(`${siteRoot}${path}`), `sitemap missing ${path}`);
  }
}
const markdownSafety = markdownToHtml("**safe**\n\n[x](javascript:alert(1))\n\n<img src=x onerror=alert(1)>");
ok(markdownSafety.includes("<strong>safe</strong>") && !markdownSafety.includes("javascript:") && !markdownSafety.includes("<img"), "article Markdown must format safely without injecting HTML");

// Deterministic operation checks (no network, no browser and no AI calls).
const yaml = ops.jsonToYaml({ name: "DouNest", count: 2, tags: ["pdf", "image"] });
assert.deepEqual(ops.yamlToJson(yaml), { name: "DouNest", count: 2, tags: ["pdf", "image"] }); checks++;
assert.equal(ops.slugify("عنوان تجريبي"), "عنوان-تجريبي"); checks++;
assert.deepEqual(ops.cleanList(" a\nA\nb \n\n", { dedupe: true }), ["a", "b"]); checks++;
assert.match(ops.mdToHtml("[x](javascript:alert(1))"), /href="#"/); checks++;
assert.equal((await ops.totp("GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ", { digits: 8, timestamp: 59000 })).code, "94287082"); checks++;
assert.ok(ops.passwordStrength("short").score <= ops.passwordStrength("aLonger-More-Unique-Example-123").score); checks++;

console.log(`✓ ${checks} checks passed for ${TOOLS.length} registered tools, 7 centers and core operations.`);
