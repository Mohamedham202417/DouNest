import { singleTool } from "../lib/actions.js";
export function render(root) { singleTool(root, "rotateFlip", { accept: "image/*", multiple: true, icon: "🔄" }); }
