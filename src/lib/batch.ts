// Next-batch wording shared by the course pages and the courses list.
/** Day difference in India time, identical on server and browser. */
export function istDay(d: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
}
export function batchStatus(iso?: string) {
  if (!iso) return { label: "Next batch", date: "Starting soon", pill: "Reserve your seat", short: "Starting soon" };
  const d = new Date(iso);
  const days = Math.round((Date.parse(istDay(d)) - Date.parse(istDay(new Date()))) / 86400000);
  const date = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", weekday: "short", day: "numeric", month: "long", year: "numeric" }).format(d);
  const short = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short" }).format(d);
  if (days > 0) return { label: "Next batch starts", date, pill: days === 1 ? "Starts tomorrow" : days <= 60 ? `Starts in ${days} days` : "", short: `Starts ${short}` };
  if (days === 0) return { label: "Batch starts", date: "Today", pill: "Starts today", short: "Starts today" };
  if (days >= -21) return { label: "Batch started", date, pill: "Join now · recordings of earlier classes included", short: "Join now" };
  return { label: "Next batch", date: "Starting soon", pill: "Reserve your seat", short: "Starting soon" };
}

