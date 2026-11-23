import type { Day, Store } from "@/data/stores";

const DAYS: Day[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type OpenStatus =
  | { open: true; label: string }
  | { open: false; label: string };

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const hour = h % 12 === 0 ? 12 : h % 12;
  const minutes = m === 0 ? "" : `:${String(m).padStart(2, "0")}`;
  return `${hour}${minutes} ${h < 12 ? "am" : "pm"}`;
}

// All stores keep New York time, whatever the visitor's own time zone.
function newYorkNow(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: get("weekday") as Day,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function getOpenStatus(
  hours: NonNullable<Store["hours"]>,
  now: Date,
): OpenStatus | null {
  if (hours.length === 0) return null;
  const { day, minutes } = newYorkNow(now);
  const today = hours.find((h) => h.day === day);

  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, label: `Open now until ${formatTime(today.close)}` };
  }
  if (today && minutes < toMinutes(today.open)) {
    return { open: false, label: `Opens ${formatTime(today.open)}` };
  }
  // Closed for the day: find the next day with hours.
  const start = DAYS.indexOf(day);
  for (let i = 1; i <= 7; i++) {
    const next = DAYS[(start + i) % 7];
    const entry = hours.find((h) => h.day === next);
    if (entry) {
      const when = i === 1 ? "tomorrow" : next;
      return { open: false, label: `Opens ${when} ${formatTime(entry.open)}` };
    }
  }
  return null;
}
