/**
 * DouNest v4 — Tool content aggregator
 * --------------------------------------
 * Merges the 4 long-form content parts into one lookup consumed by
 * js/registry.js to enrich every tool's usage/explanation/faq/tags.
 * Node-safe (imported by build.mjs through registry.js).
 */
import { TOOL_CONTENT_A } from "./tool-content-a.js";
import { TOOL_CONTENT_B } from "./tool-content-b.js";
import { TOOL_CONTENT_C } from "./tool-content-c.js";
import { TOOL_CONTENT_D } from "./tool-content-d.js";
import { TOOL_CONTENT_V5 } from "./tool-content-v5.js";

export const TOOL_CONTENT = {
  ...TOOL_CONTENT_A,
  ...TOOL_CONTENT_B,
  ...TOOL_CONTENT_C,
  ...TOOL_CONTENT_D,
  ...TOOL_CONTENT_V5
};
