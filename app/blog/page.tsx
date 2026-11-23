import type { Metadata } from "next";
import Link from "next/link";
import { excerpt, formatPostDate, sortedPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on retail and running stores from the team at Danice Stores.",
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
        Notes on retail and running stores from the team at Danice.
      </p>

      {sortedPosts.length === 0 ? (
        <p className="mt-10 rounded-[10px] border-l-4 border-magenta bg-blush p-6 text-xl">
          Our first posts are on the way.
        </p>
      ) : (
        <ul className="mt-12 divide-y divide-plum/15 border-t border-plum/15">
          {sortedPosts.map((post) => (
            <li key={post.slug} className="py-9">
              <article>
                <p className="text-lg font-semibold text-magenta-deep">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span className="text-plum"> · {post.author}</span>
                </p>
                <h2 className="mt-2 text-2xl leading-tight font-extrabold sm:text-3xl">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-magenta-deep hover:underline hover:underline-offset-4"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-xl leading-relaxed">{excerpt(post)}</p>
                <p className="mt-4 text-lg font-semibold">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="underline underline-offset-4 hover:text-magenta-deep"
                  >
                    Read more<span className="sr-only">: {post.title}</span>
                  </Link>
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
