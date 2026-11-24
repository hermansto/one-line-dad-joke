import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const joke =
  "Why did the function break up with the variable? It needed some space.";

// The bounty allows at most 200 characters and exactly one joke on one line,
// so fail loudly here instead of letting a bad entry reach the judge.
if (joke.length > 200) {
  throw new Error(`Joke is ${joke.length} characters, over the 200 limit`);
}
if (joke.includes("\n") || joke.trim() !== joke) {
  throw new Error("Joke must be a single line with no extra whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, joke, "utf8");

const back = readFileSync(target, "utf8");
if (back !== joke) {
  throw new Error("entry.txt does not match the joke exactly");
}
if (Buffer.byteLength(back, "utf8") !== joke.length) {
  throw new Error("entry.txt byte length does not match the joke");
}

console.log(`Wrote entry.txt (${joke.length} characters) to ${outDir}`);
