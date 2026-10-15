import { singleTool } from "../lib/actions.js";
export function render(root) { singleTool(root, "crop", { accept: "image/*", multiple: true, icon: "✂️" }); }
