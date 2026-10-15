import { singleTool } from "../lib/actions.js";
export function render(root) { singleTool(root, "svgToPng", { accept: ".svg,image/svg+xml", multiple: false, icon: "🖼️" }); }
