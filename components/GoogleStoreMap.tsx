"use client";

import { useEffect, useRef } from "react";
import { directionsUrl, type Store } from "@/data/stores";

// Just the parts of the Google Maps JavaScript API this component uses.
type LatLng = { lat: number; lng: number };
type GMap = { fitBounds: (bounds: GBounds, padding?: number) => void };
type GBounds = { extend: (point: LatLng) => void };
type GMarker = { addListener: (event: string, handler: () => void) => void };
type GInfoWindow = {
  setContent: (html: string) => void;
  open: (options: { map: GMap; anchor: GMarker }) => void;
};
type GoogleMaps = {
  Map: new (el: HTMLElement, options: Record<string, unknown>) => GMap;
  Marker: new (options: Record<string, unknown>) => GMarker;
  InfoWindow: new () => GInfoWindow;
  LatLngBounds: new () => GBounds;
  Size: new (width: number, height: number) => unknown;
  Point: new (x: number, y: number) => unknown;
};

declare global {
  interface Window {
    google?: { maps: GoogleMaps };
    __daniceMapsReady?: () => void;
  }
}

// The logo's flower on a magenta pin, as an image Google Maps can use.
const pinSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-60 -60 120 150" width="40" height="50">
<path d="M0 86 C -14 58 -52 40 -52 0 A 52 52 0 1 1 52 0 C 52 40 14 58 0 86 Z" fill="#ed008c"/>
<circle r="40" fill="#fff"/>
${[0, 60, 120, 180, 240, 300]
  .map(
    (a) =>
      `<path d="M0 3 C -16 -7 -15 -24 0 -35 C 15 -24 16 -7 0 3 Z" transform="rotate(${a})" fill="#ed008c" fill-opacity="0.45"/>`,
  )
  .join("")}
</svg>`;
const pinUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(pinSvg)}`;

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

let loading: Promise<GoogleMaps> | null = null;

function loadGoogleMaps(apiKey: string) {
  if (window.google?.maps) return Promise.resolve(window.google.maps);
  loading ??= new Promise<GoogleMaps>((resolve, reject) => {
    window.__daniceMapsReady = () => resolve(window.google!.maps);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&loading=async&callback=__daniceMapsReady`;
    script.async = true;
    script.onerror = () => reject(new Error("Google Maps failed to load"));
    document.head.appendChild(script);
  });
  return loading;
}

export function GoogleStoreMap({ stores, apiKey }: { stores: Store[]; apiKey: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    loadGoogleMaps(apiKey)
      .then((maps) => {
        if (cancelled || !container.current) return;

        const map = new maps.Map(container.current, {
          center: { lat: stores[0].lat, lng: stores[0].lng },
          zoom: 15,
          // Page scrolling stays natural: zooming needs ctrl/cmd + scroll on
          // desktop and two fingers on phones.
          gestureHandling: "cooperative",
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        const info = new maps.InfoWindow();
        const bounds = new maps.LatLngBounds();

        for (const store of stores) {
          const position = { lat: store.lat, lng: store.lng };
          const marker = new maps.Marker({
            position,
            map,
            title: store.streetName,
            icon: {
              url: pinUrl,
              scaledSize: new maps.Size(40, 50),
              anchor: new maps.Point(20, 48),
            },
          });
          marker.addListener("click", () => {
            info.setContent(
              `<div style="font:16px/1.45 inherit;color:#3b0a2a">` +
                `<strong>${escapeHtml(store.streetName)}</strong><br>` +
                `${escapeHtml(store.street)}<br>` +
                `${escapeHtml(`${store.city}, ${store.state} ${store.zip}`)}<br>` +
                `<a href="${directionsUrl(store)}" target="_blank" rel="noopener noreferrer" style="color:#c40074;font-weight:600">Get directions</a>` +
                `</div>`,
            );
            info.open({ map, anchor: marker });
          });
          bounds.extend(position);
        }

        if (stores.length > 1) map.fitBounds(bounds, 48);
      })
      .catch((error) => console.error(error));

    return () => {
      cancelled = true;
    };
  }, [stores, apiKey]);

  return (
    <div
      ref={container}
      role="region"
      aria-label="Map of Danice store locations"
      className="h-80 w-full overflow-hidden rounded-[10px] bg-blush sm:h-[28rem]"
    />
  );
}
