// The flower from the logo: translucent petals that deepen where they overlap.
export function Petal({ className }: { className?: string }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <path
          key={angle}
          d="M0 4 C -24 -10 -22 -34 0 -49 C 22 -34 24 -10 0 4 Z"
          transform={`rotate(${angle})`}
          fill="#ed008c"
          fillOpacity="0.3"
        />
      ))}
    </svg>
  );
}
