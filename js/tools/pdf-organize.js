import { singleTool, PDF_ACTIONS } from "../lib/actions.js";
export function render(root) { singleTool(root, "organize", { accept: ".pdf,application/pdf", multiple: false, icon: "🗂️" }); }
