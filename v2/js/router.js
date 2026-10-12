// راوتر بسيط قائم على الهاش
const routes = [];
let notFoundHandler = () => {};

export function route(pattern, handler) {
  // pattern: "/tools/:slug"
  const keys = [];
  const regex = new RegExp(
    "^" +
      pattern
        .replace(/\/:([^/]+)/g, (_, k) => { keys.push(k); return "/([^/]+)"; })
        .replace(/\//g, "\\/") +
      "$"
  );
  routes.push({ regex, keys, handler });
}

export function setNotFound(handler) { notFoundHandler = handler; }

export function navigate(path) {
  if (location.hash.slice(1) === path) resolve();
  else location.hash = path;
}

export function resolve() {
  const path = location.hash.slice(1) || "/";
  const [pathname] = path.split("?");
  for (const r of routes) {
    const m = pathname.match(r.regex);
    if (m) {
      const params = {};
      r.keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1])));
      r.handler(params);
      return;
    }
  }
  notFoundHandler();
}

export function initRouter() {
  window.addEventListener("hashchange", resolve);
  resolve();
}