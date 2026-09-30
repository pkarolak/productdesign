#!/usr/bin/env node
// Switches the active design language: `pnpm theme:use <name>`.
// Rewrites both switch points (tsconfig.json "@theme/*" and app/globals.css), then runs theme:check.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const name = process.argv[2];
if (!name || !/^[a-z0-9-]+$/.test(name)) {
  console.error("Usage: pnpm theme:use <name>   (a folder in themes/)");
  process.exit(1);
}
if (!existsSync(join(root, "themes", name))) {
  console.error(`themes/${name} does not exist. Create it with: pnpm theme:new ${name}`);
  process.exit(1);
}

const tsconfigPath = join(root, "tsconfig.json");
const tsconfig = readFileSync(tsconfigPath, "utf8").replace(
  /("@theme\/\*":\s*\[\s*")\.\/themes\/[^/]+\/\*("\s*\])/,
  `$1./themes/${name}/*$2`,
);
writeFileSync(tsconfigPath, tsconfig);

const cssPath = join(root, "app/globals.css");
const css = readFileSync(cssPath, "utf8").replace(
  /@import\s+"\.\.\/themes\/[^/]+\/theme\.css";/,
  `@import "../themes/${name}/theme.css";`,
);
writeFileSync(cssPath, css);

console.log(`Active design language set to "${name}".`);
execFileSync("node", [join(root, "scripts/theme-check.mjs")], { stdio: "inherit" });
