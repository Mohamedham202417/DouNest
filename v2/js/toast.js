import { t } from "./i18n.js";

export function toast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 200);
  }, 2200);
}

export const toastSuccess = (m) => toast(m, "success");
export const toastError = (m) => toast(m, "error");