import Image from "next/image";

// The client's logo, used exactly as supplied. The file is a square with a lot
// of empty background above and below the artwork; `trimmed` frames the artwork
// without altering it, for use in the header and footer.
const ALT = "Danice. Great style, great price. Est. 1934";

export function Logo({
  trimmed = false,
  priority = false,
  className,
}: {
  trimmed?: boolean;
  priority?: boolean;
  className?: string;
}) {
  if (!trimmed) {
    return (
      <Image
        src="/danice-logo.png"
        alt={ALT}
        width={554}
        height={554}
        priority={priority}
        className={className}
      />
    );
  }
  return (
    <span className={`relative block aspect-[554/208] overflow-hidden ${className ?? ""}`}>
      <Image
        src="/danice-logo.png"
        alt={ALT}
        width={554}
        height={554}
        priority={priority}
        className="absolute left-0 w-full max-w-none"
        style={{ top: "-86.5%" }}
      />
    </span>
  );
}
