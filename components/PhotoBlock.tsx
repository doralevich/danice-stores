// Stand-in for a photo until the client's pictures arrive: a solid block with
// its subject set large, in a white mat like a print taped in a window.
// No stock photography. Swap for next/image when real photos exist.
export function PhotoBlock({
  label,
  tone = "magenta",
  className,
}: {
  label: string;
  tone?: "magenta" | "blush";
  className?: string;
}) {
  const tones = {
    magenta: "bg-magenta text-white",
    blush: "bg-blush text-magenta",
  };
  return (
    <div className={`bg-white p-3 sm:p-4 ${className ?? ""}`}>
      <div className={`flex h-full min-h-48 items-end p-5 sm:p-7 ${tones[tone]}`}>
        <span className="font-display text-[clamp(1.75rem,3.6vw,3.25rem)]">{label}</span>
      </div>
    </div>
  );
}
