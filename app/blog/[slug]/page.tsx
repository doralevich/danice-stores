import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { excerpt, formatPostDate, getPost, sortedPosts } from "@/data/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return sortedPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: excerpt(post, 155) };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const at = sortedPosts.findIndex((p) => p.slug === post.slug);
  const newer = sortedPosts[at - 1];
  const older = sortedPosts[at + 1];

  return (
    <article className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-lg font-semibold">
        <Link href="/blog" className="underline underline-offset-4 hover:text-magenta-deep">
          ← All posts
        </Link>
      </p>
      <p className="mt-8 text-lg font-semibold text-magenta-deep">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      </p>
      <h1 className="mt-2 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] font-extrabold tracking-tight">
        {post.title}
      </h1>
      <p className="mt-3 text-lg">By {post.author}</p>

      <div className="mt-8 space-y-5 text-xl leading-relaxed">
        {post.body.map((paragraph, i) => (
          <p key={i} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>

      {post.sourceUrl ? (
        <p className="mt-8 text-lg font-semibold">
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-magenta-deep"
          >
            Read the original post on LinkedIn
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      ) : null}

      {newer || older ? (
        <nav
          aria-label="More posts"
          className="mt-12 grid gap-4 border-t border-plum/15 pt-8 sm:grid-cols-2"
        >
          {older ? (
            <Link
              href={`/blog/${older.slug}`}
              className="rounded-[10px] border border-plum/15 p-5 hover:border-magenta"
            >
              <span className="block text-base font-semibold text-magenta-deep">Older post</span>
              <span className="mt-1 block text-lg font-bold">{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer ? (
            <Link
              href={`/blog/${newer.slug}`}
              className="rounded-[10px] border border-plum/15 p-5 hover:border-magenta sm:text-right"
            >
              <span className="block text-base font-semibold text-magenta-deep">Newer post</span>
              <span className="mt-1 block text-lg font-bold">{newer.title}</span>
            </Link>
          ) : null}
        </nav>
      ) : null}
    </article>
  );
}
