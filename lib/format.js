export function initials(name = "?") {
  return String(name).trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join("") || "?";
}
export function timeAgo(date) {
  if (!date) return "";
  const then = new Date(date).getTime();
  if (!Number.isFinite(then)) return "";
  const secs = Math.max(0, Math.round((Date.now() - then) / 1000));
  if (secs < 60) return "just now";
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  if (secs < 604800) return `${Math.floor(secs / 86400)}d ago`;
  return new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
export function friendlyDate(date) {
  if (!date) return "Present";
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString(undefined, { month: "short", year: "numeric", timeZone: "UTC" });
}
export function cleanHttpUrl(input) {
  if (typeof input !== "string") return null;
  try { const u = new URL(input); return ["https:", "http:"].includes(u.protocol) ? u.href : null; }
  catch { return null; }
}
