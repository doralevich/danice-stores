"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { directionsUrl, type Store } from "@/data/stores";

// The logo's flower as a map pin, on a white disc so it reads on any map.
const pinHtml = `
<svg viewBox="-60 -60 120 150" width="40" height="50" aria-hidden="true">
  <path d="M0 86 C -14 58 -52 40 -52 0 A 52 52 0 1 1 52 0 C 52 40 14 58 0 86 Z" fill="#ed008c"/>
  <circle r="40" fill="#fff"/>
  ${[0, 60, 120, 180, 240, 300]
    .map(
      (a) =>
        `<path d="M0 3 C -16 -7 -15 -24 0 -35 C 15 -24 16 -7 0 3 Z" transform="rotate(${a})" fill="#ed008c" fill-opacity="0.45"/>`,
    )
    .join("")}
</svg>`;

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export function StoreMap({ stores }: { stores: Store[] }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    // Leaflet touches `window`, so it is loaded in the browser only.
    import("leaflet").then(({ default: L }) => {
      if (cancelled || !container.current) return;

      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const map = L.map(container.current, {
        // Keep page scrolling natural: no wheel zoom, and no one-finger
        // dragging on phones. The +/- buttons and pinch still work.
        scrollWheelZoom: false,
        dragging: !isTouch,
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const icon = L.divIcon({
        html: pinHtml,
        className: "store-pin",
        iconSize: [40, 50],
        iconAnchor: [20, 48],
        popupAnchor: [0, -44],
      });

      for (const store of stores) {
        L.marker([store.lat, store.lng], { icon, title: store.streetName, alt: store.streetName })
          .addTo(map)
          .bindPopup(
            `<strong>${escapeHtml(store.streetName)}</strong><br>` +
              `${escapeHtml(store.street)}<br>` +
              `${escapeHtml(`${store.city}, ${store.state} ${store.zip}`)}<br>` +
              `<a href="${directionsUrl(store)}" target="_blank" rel="noopener noreferrer">Get directions</a>`,
          );
      }

      if (stores.length === 1) {
        map.setView([stores[0].lat, stores[0].lng], 15);
      } else {
        map.fitBounds(
          L.latLngBounds(stores.map((s) => [s.lat, s.lng] as [number, number])),
          { padding: [40, 40] },
        );
      }

      cleanup = () => map.remove();
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [stores]);

  return (
    <div
      ref={container}
      role="region"
      aria-label="Map of Danice store locations"
      className="store-map h-80 w-full overflow-hidden rounded-[10px] bg-blush sm:h-[28rem]"
    />
  );
}
