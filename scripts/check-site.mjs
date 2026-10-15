#!/usr/bin/env node
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { TOOLS } from "../js/registry.js";
import * as ops from "../js/lib/ops.js";
import { getArticle } from "../js/articles.js";
import { markdownToHtml } from "../js/lib/article-markdown.js";

const ROOT = new URL("../", import.meta.url);
const read = (p) => readFileSync(new URL(p, ROOT), "utf8");
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
  ok(canonical?.[1] === `https://mohamedham202417.github.io/DouNest/tools/${tool.slug}/`, `${path}: wrong canonical URL`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(m[1]);
  checks++;
  if (tool.slug.startsWith("pdf-") || ["image-crop","image-rotate-flip","exif-viewer","favicon-generator","svg-to-png","json-yaml","markdown-to-html","slug-generator","list-cleaner","totp-generator","password-strength"].includes(tool.slug)) {
    ok(existsSync(new URL(`js/tools/${tool.slug}.js`, ROOT)), `missing standalone module: ${tool.slug}`);
  }
}

for (const slug of ["pdf", "images", "convert", "text", "dev", "security", "calculators"]) {
  const p = `${slug}/index.html`;
  const html = read(p);
  ok(html.includes("rel=\"canonical\""), `${p}: canonical missing`);
  ok((html.match(/<h1\b/g) || []).length === 1, `${p}: expected one H1`);
}
const home = read("index.html");
ok((home.match(/<h1\b/g) || []).length === 1, "home needs one H1");
ok(/مراكز العمل/.test(home), "home center links missing");
ok(existsSync(new URL("feed.xml", ROOT)), "RSS feed missing");
ok(existsSync(new URL("robots.txt", ROOT)), "robots.txt missing");
const sitemap = read("sitemap.xml");
for (const p of ["text/", "dev/", "security/", "calculators/", "tools/pdf-organize/"]) ok(sitemap.includes(`/DouNest/${p}`), `sitemap missing ${p}`);

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
    ok(canonical?.[1] === `https://mohamedham202417.github.io/DouNest/${path}`, `${page}: wrong canonical`);
    ok(html.includes(`hreflang="${lang}"`), `${page}: self hreflang missing`);
    ok(html.includes(`hreflang="x-default"`), `${page}: x-default hreflang missing`);
    ok(html.includes(`<article class="section article-body" lang="${lang}">`), `${page}: document language missing`);
    ok(html.includes('<meta property="og:type" content="article" />'), `${page}: Open Graph article type missing`);
    ok(html.includes("<blockquote>") && /<ol>|<ul>/.test(html), `${page}: Markdown callout/list not rendered`);
    ok(html.includes("article-related"), `${page}: related internal article link missing`);
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
    ok(schemas.some(schema => schema["@type"] === "Article" && schema.inLanguage === lang), `${page}: Article JSON-LD missing or wrong language`);
    ok(sitemap.includes(`/DouNest/${path}`), `sitemap missing ${path}`);
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
