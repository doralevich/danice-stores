// The petal flower from the logo: five translucent petals that darken where
// they overlap. Used as the site's own mark (favicon, later map pins and
// bullets) in place of a generic icon set.
export function Petal({ className }: { className?: string }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true">
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={angle}
          d="M0 6 C -22 -8 -20 -32 0 -48 C 20 -32 22 -8 0 6 Z"
          transform={`rotate(${angle})`}
          fill="#ec008c"
          fillOpacity="0.42"
        />
      ))}
    </svg>
  );
}
