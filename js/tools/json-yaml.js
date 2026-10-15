import { singleTool } from "../lib/actions.js";
export function render(root) { singleTool(root, "jsonYaml", { accept: ".json,.yaml,.yml,application/json", multiple: false, icon: "🔁" }); }
