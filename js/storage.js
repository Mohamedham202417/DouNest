/**
 * DouNest v3 — Storage layer
 * Safe localStorage wrapper + favorites / recent / ratings / comments.
 * NOTE: ratings & comments are device-local by design. The UI labels this
 * honestly ("stored on your device") instead of faking community activity.
 */
const NS = "dounest.";

export const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(NS + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(NS + key, JSON.stringify(value)); } catch {}
  },
  remove(key) { localStorage.removeItem(NS + key); }
};

export const favorites = {
  list() { return storage.get("favorites", []); },
  has(slug) { return this.list().includes(slug); },
  toggle(slug) {
    const list = this.list();
    const idx = list.indexOf(slug);
    if (idx >= 0) list.splice(idx, 1); else list.push(slug);
    storage.set("favorites", list);
    return idx < 0;
  }
};

export const recent = {
  list() { return storage.get("recent", []); },
  push(slug) {
    const list = this.list().filter(s => s !== slug);
    list.unshift(slug);
    storage.set("recent", list.slice(0, 8));
  }
};

export const ratings = {
  all() { return storage.get("ratings", {}); },
  get(slug) { return this.all()[slug] || { sum: 0, count: 0, mine: 0 }; },
  rate(slug, value) {
    const all = this.all();
    const cur = all[slug] || { sum: 0, count: 0, mine: 0 };
    if (cur.mine) cur.sum -= cur.mine;
    else cur.count += 1;
    cur.mine = value;
    cur.sum += value;
    all[slug] = cur;
    storage.set("ratings", all);
  }
};

export const comments = {
  all() { return storage.get("comments", {}); },
  forTool(slug) { return this.all()[slug] || []; },
  add(slug, { name, body }) {
    const all = this.all();
    const list = all[slug] || [];
    list.unshift({
      name: name || "…",
      body,
      at: Date.now(),
      id: crypto.randomUUID?.() || String(Date.now())
    });
    all[slug] = list.slice(0, 200);
    storage.set("comments", all);
  }
};
