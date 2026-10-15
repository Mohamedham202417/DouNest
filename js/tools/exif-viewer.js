import { singleTool } from "../lib/actions.js";
export function render(root) { singleTool(root, "exif", { accept: "image/jpeg,.jpg,.jpeg", multiple: false, icon: "🔎" }); }
