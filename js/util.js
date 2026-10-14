/** DouNest v3 — small shared utilities */

/** Escape a string for safe HTML interpolation. */
export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

/** Format bytes into a human readable string. */
export function formatBytes(b) {
  if (!b && b !== 0) return "";
  const u = ["B", "KB", "MB", "GB"];
  let i = 0, n = b;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return `${n.toFixed(i ? 1 : 0)} ${u[i]}`;
}

/** Trigger a client-side file download from a Blob. */
export function downloadBlob(blob, filename) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

/** Lazy-load an external script once (used by PDF/QR tools). */
const loaded = new Map();
export function loadScript(src) {
  if (loaded.has(src)) return loaded.get(src);
  const p = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error("failed to load " + src));
    document.head.appendChild(s);
  });
  loaded.set(src, p);
  return p;
}

/** Lazy-import an ESM module from CDN. */
const loadedEsm = new Map();
export function loadEsm(src) {
  if (loadedEsm.has(src)) return loadedEsm.get(src);
  const p = import(/* @vite-ignore */ src);
  loadedEsm.set(src, p);
  return p;
}
