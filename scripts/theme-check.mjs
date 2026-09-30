#!/usr/bin/env node
// Verifies the active design language implements themes/contract.json and that
// app code only talks to themes through the contract. See docs/theming.md.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const read = (p) => readFileSync(join(root, p), "utf8");
const errors = [];

const tsconfig = JSON.parse(read("tsconfig.json"));
const alias = tsconfig.compilerOptions?.paths?.["@theme/*"]?.[0] ?? "";
const tsTheme = alias.match(/themes\/([^/]+)\/\*/)?.[1];
const cssTheme = read("app/globals.css").match(/@import\s+"\.\.\/themes\/([^/]+)\/theme\.css"/)?.[1];

if (!tsTheme) errors.push('tsconfig.json: "@theme/*" must point at "./themes/<name>/*".');
if (!cssTheme) errors.push('app/globals.css: must @import "../themes/<name>/theme.css".');
if (tsTheme && cssTheme && tsTheme !== cssTheme) {
  errors.push(`Switch points disagree: tsconfig uses "${tsTheme}", globals.css uses "${cssTheme}".`);
}

const theme = tsTheme ?? cssTheme;
const contract = JSON.parse(read("themes/contract.json"));
const dir = `themes/${theme}`;

for (const [file, exports] of Object.entries(contract.modules)) {
  const path = `${dir}/${file}`;
  if (!existsSync(join(root, path))) {
    errors.push(`${path}: missing.`);
    continue;
  }
  const src = read(path);
  for (const name of exports) {
    if (!new RegExp(`export\\s+(const|function|async function)\\s+${name}\\b`).test(src)) {
      errors.push(`${path}: must export \`${name}\`.`);
    }
  }
}

if (existsSync(join(root, `${dir}/theme.css`))) {
  const css = read(`${dir}/theme.css`);
  const [lightPart, darkPart = ""] = css.split(/\[data-theme="dark"\]\s*\{/);
  for (const v of contract.variables) {
    if (!new RegExp(`${v}\\s*:`).test(lightPart)) errors.push(`${dir}/theme.css: :root must define ${v}.`);
  }
  for (const v of contract.darkVariables) {
    if (!new RegExp(`${v}\\s*:`).test(darkPart)) errors.push(`${dir}/theme.css: [data-theme="dark"] must define ${v}.`);
  }
  for (const u of contract.utilities) {
    if (!new RegExp(`@utility\\s+${u}\\s*\\{`).test(css)) errors.push(`${dir}/theme.css: missing @utility ${u}.`);
  }
}

if (existsSync(join(root, `${dir}/fonts.ts`))) {
  const fonts = read(`${dir}/fonts.ts`);
  for (const v of contract.fontVariables) {
    if (!fonts.includes(`"${v}"`)) errors.push(`${dir}/fonts.ts: must set the CSS variable ${v}.`);
  }
}

// App code must not reach into a theme folder or use a theme's private names:
// hyphenated classes and custom properties the theme defines beyond the contract.
const themeCss = existsSync(join(root, `${dir}/theme.css`)) ? read(`${dir}/theme.css`) : "";
const contractVars = new Set([...contract.variables, ...contract.fontVariables]);
const privateClasses = [...themeCss.matchAll(/\.([a-z][a-z0-9]*-[a-z0-9-]+)/g)]
  .map((m) => m[1])
  .filter((c) => !contract.utilities.includes(c));
const privateVars = [...themeCss.matchAll(/(--[a-z][a-z0-9-]*)\s*:/g)].map((m) => m[1]).filter((v) => !contractVars.has(v));
const unique = (list) => list.filter((v, i, a) => a.indexOf(v) === i);
const privateNames = [
  ...unique(privateClasses).map((c) => ({ name: c, pattern: new RegExp(`["'\\s\`]${c}["'\\s\`]`) })),
  ...unique(privateVars).map((v) => ({ name: v, pattern: new RegExp(`\\(${v}\\)`) })),
];

function walk(d) {
  return readdirSync(join(root, d)).flatMap((f) => {
    const p = join(d, f);
    return statSync(join(root, p)).isDirectory() ? walk(p) : /\.(tsx?|css)$/.test(f) ? [p] : [];
  });
}

for (const file of ["app", "components", "lib", "content"].flatMap(walk)) {
  const src = read(file);
  if (/from\s+["']@\/themes\/(?!contract)/.test(src) || /from\s+["'](\.\.\/)+themes\/(?!contract)/.test(src)) {
    errors.push(`${relative(root, join(root, file))}: import theme modules via "@theme/*", not a theme folder.`);
  }
  if (file.endsWith("globals.css")) continue;
  for (const { name, pattern } of privateNames) {
    if (pattern.test(src)) {
      errors.push(`${file}: uses ${name}, which is private to themes/${theme}. Use a contract name instead.`);
    }
  }
}

if (errors.length) {
  console.error(`theme:check failed for "${theme}":\n  - ${errors.join("\n  - ")}`);
  process.exit(1);
}
console.log(`theme:check ok. Active design language: "${theme}".`);
