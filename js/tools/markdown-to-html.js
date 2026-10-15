import { singleTool } from "../lib/actions.js";
export function render(root) { singleTool(root, "mdToHtml", { accept: ".md,.markdown,.txt,text/*", multiple: false, icon: "📝", textMode: true }); }
