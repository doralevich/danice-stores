import Link from "next/link";

// 20px bold keeps white on magenta within large-text contrast.
const className =
  "inline-block rounded-[10px] bg-magenta px-6 py-3 text-xl font-bold text-white hover:bg-magenta-deep focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-plum";

export function Button({ href, children }: { href: string; children: React.ReactNode }) {
  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
