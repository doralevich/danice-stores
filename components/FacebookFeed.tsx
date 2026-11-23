// Facebook's own Page Plugin: the page's latest posts (photos included) in a
// frame Facebook renders. It needs no API key or login. Facebook limits the
// plugin to 500px wide and to the page timeline; it has no photos-only view.
export function FacebookFeed({ url }: { url: string }) {
  const src =
    "https://www.facebook.com/plugins/page.php?" +
    new URLSearchParams({
      href: url,
      tabs: "timeline",
      width: "500",
      height: "700",
      small_header: "true",
      adapt_container_width: "true",
      hide_cover: "true",
      show_facepile: "false",
    }).toString();

  return (
    <div>
      <iframe
        src={src}
        title="Danice Stores on Facebook"
        width={500}
        height={700}
        loading="lazy"
        className="w-full max-w-[500px] rounded-[10px] border border-plum/20 bg-white"
        allow="encrypted-media; picture-in-picture; web-share"
      />
      <p className="mt-4 text-lg font-semibold">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-magenta-deep"
        >
          See Danice on Facebook
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </div>
  );
}
