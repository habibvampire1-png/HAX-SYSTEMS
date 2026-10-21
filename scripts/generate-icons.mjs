// Regenerates the PNG favicon set from public/brand/hax-icon.svg.
// Run: node scripts/generate-icons.mjs   (uses the `sharp` copy bundled with Next.js)
import { readFileSync } from "node:fs";
import sharp from "sharp";

const svg = readFileSync("public/brand/hax-icon.svg");
const appleSvg = Buffer.from(svg.toString().replace(' rx="11"', ""));
const targets = [
  ["public/icons/favicon-16.png", 16],
  ["public/icons/favicon-32.png", 32],
  ["public/icons/icon-192.png", 192],
  ["public/icons/icon-512.png", 512],
  ["src/app/apple-icon.png", 180, appleSvg],
];
for (const [file, size, source = svg] of targets) {
  await sharp(source, { density: 384 }).resize(size, size).png().toFile(file);
  console.log("wrote", file);
}
