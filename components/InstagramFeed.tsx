"use client";

import Script from "next/script";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

// Instagram's own profile embed: the account's header and latest posts,
// rendered by Instagram's script. It needs no API key or login. If the script
// is blocked or fails, the plain link inside the blockquote is what shows.
export function InstagramFeed({ url, handle }: { url: string; handle: string }) {
  const permalink = url.endsWith("/") ? url : `${url}/`;
  return (
    <>
      <blockquote
        className="instagram-media mx-auto w-full max-w-[540px] rounded-[10px] border border-plum/20 bg-white p-6"
        data-instgrm-permalink={permalink}
        data-instgrm-version="14"
      >
        <a href={permalink} className="text-lg font-semibold underline underline-offset-4">
          See {handle} on Instagram
        </a>
      </blockquote>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onReady={() => window.instgrm?.Embeds.process()}
      />
    </>
  );
}
