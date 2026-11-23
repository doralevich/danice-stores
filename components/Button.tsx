import Link from "next/link";

// Solid rectangles, square corners, plain labels. Label is 24px bold because
// white on magenta only meets contrast at large sizes.
const base =
  "inline-block px-7 py-3.5 text-2xl leading-tight font-bold focus-visible:outline-4 focus-visible:outline-offset-4";
const variants = {
  magenta:
    "bg-magenta text-white hover:bg-plum focus-visible:outline-plum",
  white:
    "bg-white text-magenta hover:bg-plum hover:text-white focus-visible:outline-white",
};

export function Button({
  href,
  variant = "magenta",
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  children: React.ReactNode;
}) {
  const className = `${base} ${variants[variant]}`;
  if (href.startsWith("http") || href.startsWith("tel:")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
