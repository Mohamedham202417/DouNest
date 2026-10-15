import { singleTool } from "../lib/actions.js";
export function render(root) { singleTool(root, "totp", { icon: "🔐", textMode: true, multiple: false }); }
