"use client";

import { useSyncExternalStore } from "react";
import type { Store } from "@/data/stores";
import { getOpenStatus } from "@/lib/hours";

// Re-renders once a minute. Renders nothing on the server, so the static page
// never bakes in a stale "Open now".
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}
const getMinute = () => Math.floor(Date.now() / 60_000);
const getServerMinute = () => null;

export function OpenStatus({ hours }: { hours: NonNullable<Store["hours"]> }) {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);
  if (minute === null) return <p className="h-8" aria-hidden="true" />;

  const status = getOpenStatus(hours, new Date(minute * 60_000));
  if (!status) return null;

  return status.open ? (
    <p className="inline-block bg-petal px-2.5 py-1 font-semibold">{status.label}</p>
  ) : (
    <p className="py-1 font-semibold">{status.label}</p>
  );
}
