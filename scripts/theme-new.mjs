#!/usr/bin/env node
// Starts a new design language by forking an existing one: `pnpm theme:new <name> [from]`.
// `from` defaults to the active theme. The copy passes theme:check as is; then change its values.
import { cpSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const [name, fromArg] = process.argv.slice(2);
if (!name || !/^[a-z0-9-]+$/.test(name)) {
  console.error("Usage: pnpm theme:new <name> [from]");
  process.exit(1);
}
const active = JSON.parse(readFileSync(join(root, "tsconfig.json"), "utf8")).compilerOptions.paths["@theme/*"][0].match(
  /themes\/([^/]+)\//,
)[1];
const from = fromArg ?? active;
const target = join(root, "themes", name);
if (existsSync(target)) {
  console.error(`themes/${name} already exists.`);
  process.exit(1);
}
cpSync(join(root, "themes", from), target, { recursive: true });
console.log(`Created themes/${name} from themes/${from}.`);
console.log(`Next: edit themes/${name}/theme.css, fonts.ts, motion.ts, icons.ts, meta.ts and the components,`);
console.log(`then run: pnpm theme:use ${name}   (see docs/theming.md)`);
