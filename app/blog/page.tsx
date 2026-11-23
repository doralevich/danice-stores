import type { Metadata } from "next";
import { formatPostDate, sortedPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "News and notes from the team at Danice Stores.",
  // Keep an empty blog out of search results until there are posts.
  robots: sortedPosts.length === 0 ? { index: false } : undefined,
};

export default function Blog() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-extrabold tracking-tight">
        Blog
      </h1>
      <p className="mt-5 text-xl leading-relaxed">
        News and notes from the team at Danice.
      </p>

      {sortedPosts.length === 0 ? (
        <p className="mt-10 rounded-[10px] border-l-4 border-magenta bg-blush p-6 text-xl">
          Our first posts are on the way.
        </p>
      ) : (
        <div className="mt-12 divide-y divide-plum/15 border-t border-plum/15">
          {sortedPosts.map((post) => (
            <article key={post.slug} id={post.slug} className="scroll-mt-6 py-10">
              <p className="text-lg font-semibold text-magenta-deep">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              </p>
              <h2 className="mt-2 text-3xl leading-tight font-extrabold sm:text-4xl">
                {post.title}
              </h2>
              <p className="mt-2 text-lg">By {post.author}</p>
              <div className="mt-5 space-y-4 text-xl leading-relaxed">
                {post.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              {post.sourceUrl ? (
                <p className="mt-5 text-lg font-semibold">
                  <a
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-magenta-deep"
                  >
                    Read the original post
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
