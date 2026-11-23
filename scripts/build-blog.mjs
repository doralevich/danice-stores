// Turns content/bj-sara-linkedin-posts.md into data/blog-posts.json.
// Run after editing the markdown:  node scripts/build-blog.mjs
//
// Each post in the markdown is:
//   ## Title
//   **Date:** Month D, YYYY
//   body text
//   **Original post:** https://...
// with posts separated by a line holding only ---

import { readFileSync, writeFileSync } from "node:fs";

const AUTHOR = "BJ Sara";
const SOURCE = new URL("../content/bj-sara-linkedin-posts.md", import.meta.url);
const OUT = new URL("../data/blog-posts.json", import.meta.url);

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

// Leftovers from LinkedIn that make no sense off LinkedIn: the "+5" image
// counter, and a line pointing at a photo the site does not have.
const DROP = [/^- \+\d+$/, /^\(My daughter took this photo/];

function isoDate(text) {
  const m = text.match(/^(\w+) (\d{1,2}), (\d{4})$/);
  const month = m ? MONTHS.indexOf(m[1].toLowerCase()) + 1 : 0;
  if (!month) throw new Error(`Cannot read date: "${text}"`);
  return `${m[3]}-${String(month).padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .split("-")
    .slice(0, 8)
    .join("-")
    .replace(/(-(the|a|m|just|and|to|of))+$/, "");
}

// An all-capitals headline reads as shouting; keep the words, fix the case.
function tidyTitle(title) {
  let t = title.replace(/:$/, "");
  if (t === t.toUpperCase()) {
    t = t.toLowerCase().replace(/(^|[\s-])([a-z])/g, (_, a, b) => a + b.toUpperCase()).replace(/\bP&l\b/g, "P&L");
    t = t.replace(/\b(The|A|An|And|Of|In|On|To)\b/g, (w, _1, at) => (at === 0 ? w : w.toLowerCase()));
  }
  return t;
}

// Blank lines separate blocks. A block of short lines (a list) stays together
// with its line breaks; a block of long lines is really several paragraphs.
function toBody(lines) {
  const blocks = [];
  let current = [];
  for (const line of [...lines, ""]) {
    if (line.trim() === "") {
      if (current.length) blocks.push(current);
      current = [];
    } else if (!DROP.some((re) => re.test(line.trim()))) {
      current.push(line.trim());
    }
  }
  return blocks.flatMap((block) =>
    block.some((line) => line.length > 130) ? block : [block.join("\n")],
  );
}

const sections = readFileSync(SOURCE, "utf8").split(/^---\s*$/m);
const posts = [];
for (const section of sections) {
  const lines = section.split("\n");
  const titleAt = lines.findIndex((l) => l.startsWith("## "));
  if (titleAt === -1) continue;
  const title = tidyTitle(lines[titleAt].slice(3).trim());
  const body = [];
  let date;
  let sourceUrl;
  for (const line of lines.slice(titleAt + 1)) {
    const d = line.match(/^\*\*Date:\*\*\s*(.+)$/);
    const s = line.match(/^\*\*Original post:\*\*\s*(\S+)/);
    if (d) date = isoDate(d[1].trim());
    else if (s) sourceUrl = s[1];
    else body.push(line);
  }
  if (!date) throw new Error(`No date for "${title}"`);
  posts.push({ slug: slugify(title), date, title, author: AUTHOR, body: toBody(body), sourceUrl });
}

const slugs = new Set(posts.map((p) => p.slug));
if (slugs.size !== posts.length) throw new Error("Two posts ended up with the same slug");

writeFileSync(OUT, JSON.stringify(posts, null, 2) + "\n");
console.log(`${posts.length} posts written`);
for (const p of posts) console.log(`  ${p.date}  /blog/${p.slug}  (${p.body.length} blocks)`);
