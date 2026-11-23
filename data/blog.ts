// Blog posts, shown on /blog newest first, each with its own page at
// /blog/<slug>. The Blog link appears in the menu once there is a post.
//
// The posts are written in content/bj-sara-linkedin-posts.md. After editing
// that file, run `node scripts/build-blog.mjs` to refresh blog-posts.json.

import postData from "./blog-posts.json";

export type BlogPost = {
  slug: string; // used for the link to the post
  date: string; // YYYY-MM-DD, the day it was first published
  title: string;
  author: string;
  body: string[]; // one string per paragraph; "\n" inside one is a line break
  sourceUrl?: string; // the original post, for example on LinkedIn
};

export const posts: BlogPost[] = postData;

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

// The opening of a post, for the list on /blog.
export function excerpt(post: BlogPost, length = 220) {
  const text = post.body.join(" ").replace(/\s+/g, " ");
  if (text.length <= length) return text;
  return text.slice(0, text.lastIndexOf(" ", length)).replace(/[\s,;:.-]+$/, "") + "…";
}

// "March 4, 2026". Parsed by hand so the date never shifts with time zones.
export function formatPostDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${months[month - 1]} ${day}, ${year}`;
}
