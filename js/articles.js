/**
 * DouNest v4 — Articles (aggregator)
 * ------------------------------------
 * 14 long-form articles (including 2 ten-locale troubleshooting guides) split across 7 data
 * files. Same public API as before (getArticles / getArticle) so app.js and
 * build.mjs keep working unchanged.
 */
import { ARTICLES_1 } from "./articles-data-1.js";
import { ARTICLES_2 } from "./articles-data-2.js";
import { ARTICLES_3 } from "./articles-data-3.js";
import { ARTICLES_4 } from "./articles-data-4.js";
import { ARTICLES_5 } from "./articles-data-5.js";
import { ARTICLES_6 } from "./articles-data-6.js";
import { ARTICLES_7 } from "./articles-data-7.js";

const ARTICLES = [
  ...ARTICLES_7,
  ...ARTICLES_6,
  ...ARTICLES_1,
  ...ARTICLES_2,
  ...ARTICLES_3,
  ...ARTICLES_4,
  ...ARTICLES_5
];

export function getArticles() { return ARTICLES; }
export function getArticle(slug) { return ARTICLES.find(a => a.slug === slug); }
