import { singleTool } from "../lib/actions.js";
export function render(root) { singleTool(root, "favicon", { accept: "image/*", multiple: false, icon: "⭐" }); }
