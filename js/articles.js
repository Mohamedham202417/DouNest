/**
 * DouNest v4 — Articles (aggregator)
 * ------------------------------------
 * 8 bilingual long-form articles (900-1300 words each) split across 4 data
 * files. Same public API as v3 (getArticles / getArticle) so app.js and
 * build.mjs keep working unchanged.
 */
import { ARTICLES_1 } from "./articles-data-1.js";
import { ARTICLES_2 } from "./articles-data-2.js";
import { ARTICLES_3 } from "./articles-data-3.js";
import { ARTICLES_4 } from "./articles-data-4.js";

const ARTICLES = [
  ...ARTICLES_1,
  ...ARTICLES_2,
  ...ARTICLES_3,
  ...ARTICLES_4
];

export function getArticles() { return ARTICLES; }
export function getArticle(slug) { return ARTICLES.find(a => a.slug === slug); }
