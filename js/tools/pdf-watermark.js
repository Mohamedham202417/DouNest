import { singleTool } from "../lib/actions.js";
export function render(root) { singleTool(root, "watermark", { accept: ".pdf,application/pdf", multiple: false, icon: "💧" }); }
