// Blog posts, shown on /blog newest first. The Blog link appears in the menu
// only once there is at least one post here.
//
// To add a post, append an entry. `date` is the day it was first published,
// written YYYY-MM-DD. `body` is the post's text, one string per paragraph.
// `sourceUrl` is optional: the original post (for example on LinkedIn).

export type BlogPost = {
  slug: string; // short, lowercase, hyphenated: used for the link to the post
  date: string; // YYYY-MM-DD
  title: string;
  author: string;
  body: string[];
  sourceUrl?: string;
};

export const posts: BlogPost[] = [];

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

// "March 4, 2026". Parsed by hand so the date never shifts with time zones.
export function formatPostDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${months[month - 1]} ${day}, ${year}`;
}
