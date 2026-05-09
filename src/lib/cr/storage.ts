const KEY_READ = "cr:read";
const KEY_PROGRESS = "cr:progress";
const KEY_FILTERS = "cr:filters";

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) as T : fallback; } catch { return fallback; }
}
function safeSet(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
}

export function getReadSet(): Record<string, true> { return safeGet(KEY_READ, {}); }
export function isRead(id: string) { return !!getReadSet()[id]; }
export function markRead(id: string) {
  const s = getReadSet(); s[id] = true; safeSet(KEY_READ, s);
  window.dispatchEvent(new CustomEvent("cr:read-changed"));
}
export function unmarkRead(id: string) {
  const s = getReadSet(); delete s[id]; safeSet(KEY_READ, s);
  window.dispatchEvent(new CustomEvent("cr:read-changed"));
}
export function getProgress(id: string): number {
  return safeGet<Record<string, number>>(KEY_PROGRESS, {})[id] ?? 0;
}
export function setProgress(id: string, ratio: number) {
  const m = safeGet<Record<string, number>>(KEY_PROGRESS, {});
  m[id] = Math.max(m[id] ?? 0, ratio);
  safeSet(KEY_PROGRESS, m);
}
export function getFilters(): { tag: string; q: string; view: "grid" | "list" } {
  return safeGet(KEY_FILTERS, { tag: "todas", q: "", view: "grid" as const });
}
export function setFilters(f: { tag: string; q: string; view: "grid" | "list" }) { safeSet(KEY_FILTERS, f); }
