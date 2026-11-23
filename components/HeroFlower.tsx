"use client";

import { useRef } from "react";

const PETALS = [0, 60, 120, 180, 240, 300];
const MAX_TILT = 16; // degrees

// The banner flower. Each petal sits at its own depth, the whole flower sways
// slowly, and it tilts toward the pointer. All motion is off under
// prefers-reduced-motion (see globals.css and the check below).
export function HeroFlower() {
  const tilt = useRef<HTMLDivElement>(null);

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    tilt.current?.style.setProperty("--tilt-x", `${(-y * 2 * MAX_TILT).toFixed(1)}deg`);
    tilt.current?.style.setProperty("--tilt-y", `${(x * 2 * MAX_TILT).toFixed(1)}deg`);
  }

  function onPointerLeave() {
    tilt.current?.style.setProperty("--tilt-x", "0deg");
    tilt.current?.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <div
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="hero-flower relative mx-auto aspect-square w-full max-w-xs md:max-w-none"
    >
      <div ref={tilt} className="hero-flower-tilt absolute inset-0">
        <div className="absolute inset-0 rounded-full bg-blush" />
        <div className="hero-flower-sway absolute inset-[9%]">
          {PETALS.map((angle, i) => (
            <svg
              key={angle}
              viewBox="-50 -50 100 100"
              className="absolute inset-0 size-full overflow-visible"
              style={{ transform: `translateZ(${18 + i * 9}px)` }}
            >
              <path
                d="M0 4 C -24 -10 -22 -34 0 -49 C 22 -34 24 -10 0 4 Z"
                transform={`rotate(${angle})`}
                fill="#ed008c"
                fillOpacity="0.3"
              />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}
