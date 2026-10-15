import { singleTool } from "../lib/actions.js";
export function render(root) { singleTool(root, "stripExif", { accept: "image/*", multiple: true, icon: "🧼" }); }
