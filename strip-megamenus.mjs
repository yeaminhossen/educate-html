import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FLAT = `                    <a href="index.html" class="text-white/90 text-[16px] font-medium font-inter hover:text-secondary transition-all duration-300 flex items-center gap-1.5 py-8">Home</a>
                    <a href="course.html" class="text-white/90 text-[16px] font-medium font-inter hover:text-secondary transition-all duration-300 flex items-center gap-1.5 py-8">Courses</a>
                    <a href="blog.html" class="text-white/90 text-[16px] font-medium font-inter hover:text-secondary transition-all duration-300 flex items-center gap-1.5 py-8">Blog</a>
                    <a href="contact-us.html" class="text-white/90 text-[16px] font-medium font-inter hover:text-secondary transition-all duration-300 flex items-center gap-1.5 py-8">Contact</a>
                    <a href="button.html" class="text-white/90 text-[16px] font-medium font-inter hover:text-secondary transition-all duration-300 flex items-center gap-1.5 py-8">Elements</a>
`;

function strip(t) {
  let s = t;

  const reCpb =
    /\s*<div class="group relative">\s*\n\s*<button type="button"[\s\S]*?<!-- blog section -->[\s\S]*?\n\s*<\/div>\s*\n\s*\n(?=\s*<\/nav>)/g;
  s = s.replace(reCpb, "\n");

  s = s.replace(/<!-- Demos Mega Menu Item -->[\s\S]*?(?=<!-- Mega Menu Item -->)/g, "");

  const endFull =
    /\n\s*<div class="group relative">\s*\n\s*<button type="button"[\s\S]{0,800}?>\s*\n\s*Courses\s*<i class="fa-solid fa-angle-down"/;
  const endSimple = /\n\s*<a href="#"\s*\n\s*class="[^"]*">\s*\n\s*Courses\s*\n\s*<\/a>/;

  let guard = 0;
  while (s.includes("<!-- Mega Menu Item -->") && guard++ < 5) {
    const i = s.indexOf("<!-- Mega Menu Item -->");
    const tail = s.slice(i);
    const mFull = tail.match(endFull);
    const mSimple = tail.match(endSimple);
    let cut = -1;
    if (mFull && mSimple) cut = i + Math.min(mFull.index, mSimple.index);
    else if (mFull) cut = i + mFull.index;
    else if (mSimple) cut = i + mSimple.index;
    else break;
    s = s.slice(0, i) + s.slice(cut);
  }

  return s;
}

function addFlatLinks(s) {
  return s.replace(
    /(<nav class="hidden (?:xl|lg):flex[^"]*"[^>]*>\s*\n)(?![\s\S]*?<a href="index\.html" class="[^"]*">Home<\/a>)/g,
    `$1${FLAT}\n`,
  );
}

let count = 0;
for (const f of fs.readdirSync(__dirname)) {
  if (!f.endsWith(".html")) continue;
  const fp = path.join(__dirname, f);
  const raw = fs.readFileSync(fp, "utf8");
  if (!raw.includes("<!-- Demos Mega Menu Item -->")) continue;
  const next = addFlatLinks(strip(raw));
  if (next !== raw) {
    fs.writeFileSync(fp, next, "utf8");
    count++;
  }
}
console.log("updated", count);
