#!/usr/bin/env node
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { TOOLS } from "../js/registry.js";
import * as ops from "../js/lib/ops.js";

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

// Deterministic operation checks (no network, no browser and no AI calls).
const yaml = ops.jsonToYaml({ name: "DouNest", count: 2, tags: ["pdf", "image"] });
assert.deepEqual(ops.yamlToJson(yaml), { name: "DouNest", count: 2, tags: ["pdf", "image"] }); checks++;
assert.equal(ops.slugify("عنوان تجريبي"), "عنوان-تجريبي"); checks++;
assert.deepEqual(ops.cleanList(" a\nA\nb \n\n", { dedupe: true }), ["a", "b"]); checks++;
assert.match(ops.mdToHtml("[x](javascript:alert(1))"), /href="#"/); checks++;
assert.equal((await ops.totp("GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ", { digits: 8, timestamp: 59000 })).code, "94287082"); checks++;
assert.ok(ops.passwordStrength("short").score <= ops.passwordStrength("aLonger-More-Unique-Example-123").score); checks++;

console.log(`✓ ${checks} checks passed for ${TOOLS.length} registered tools, 7 centers and core operations.`);
