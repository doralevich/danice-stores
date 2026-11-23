import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Petal } from "./Petal";

// The client's logo file goes at public/danice-logo.png (or swap LOGO_FILE for
// a vector when one arrives). It is used exactly as supplied. Until the file is
// in the repo, a typeset stand-in renders so the layout can be reviewed.
const LOGO_FILE = "danice-logo.png";

export function Logo({ className }: { className?: string }) {
  const hasFile = fs.existsSync(path.join(process.cwd(), "public", LOGO_FILE));

  if (hasFile) {
    return (
      <Image
        src={`/${LOGO_FILE}`}
        alt="Danice. Great style, great price. Est. 1934"
        width={554}
        height={554}
        priority
        className={className}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label="Danice. Great style, great price. Est. 1934"
      className={`@container text-magenta ${className ?? ""}`}
    >
      <div className="flex aspect-square flex-col justify-center">
        <div className="font-display text-[20.5cqw] leading-[0.8] tracking-[-0.02em]">
          Danice
        </div>
        <div className="mt-[3cqw] flex items-center justify-between text-[5.6cqw] leading-none font-extrabold whitespace-nowrap uppercase">
          <span>Great style</span>
          <Petal className="-my-[4cqw] w-[13cqw]" />
          <span>Great price</span>
        </div>
        <div className="mt-[2cqw] text-right text-[3.4cqw] font-semibold">
          Est. 1934
        </div>
      </div>
    </div>
  );
}
