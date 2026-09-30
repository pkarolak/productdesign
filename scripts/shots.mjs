#!/usr/bin/env node
// Screenshot gate (DESIGN.md section 11). Run against a running server:
//   pnpm build && pnpm start      (in one terminal)
//   pnpm shots                    (in another; SHOTS_URL defaults to http://localhost:3000)
// Viewport captures go to design/shots/, full-page captures to design/shots/full/ (gitignored).
import { mkdirSync, readFileSync, existsSync } from "node:fs";
import { chromium } from "@playwright/test";

const base = process.env.SHOTS_URL ?? "http://localhost:3000";
const out = new URL("../design/shots/", import.meta.url).pathname;
mkdirSync(`${out}full`, { recursive: true });

function envPassword() {
  if (process.env.CASE_PASSWORD) return process.env.CASE_PASSWORD;
  const file = new URL("../.env.local", import.meta.url);
  if (!existsSync(file)) return undefined;
  return readFileSync(file, "utf8").match(/^CASE_PASSWORD=(.*)$/m)?.[1]?.trim();
}

// Narrow a run with e.g. SHOTS_ONLY=home,case-locked SHOTS_THEMES=light SHOTS_VIEWPORTS=desktop
const only = (list, env) => (process.env[env] ? list.filter((x) => process.env[env].split(",").includes(x.name ?? x)) : list);

const pages = only(
  [
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
    { name: "case-public", path: "/work/accessible-by-default" },
    { name: "case-locked", path: "/work/keel-design-system" },
    { name: "case-unlocked", path: "/work/keel-design-system", unlock: true },
  ],
  "SHOTS_ONLY",
);
const viewports = only(
  [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ],
  "SHOTS_VIEWPORTS",
);
const themes = only(["light", "dark"], "SHOTS_THEMES");

async function settle(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 250));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2600);
}

async function unlock(page, password) {
  await page.fill("#password", password);
  await Promise.all([page.waitForURL(/\/work\//), page.click('button[type="submit"]')]);
  await page.waitForSelector("text=Ask me");
}

const browser = await chromium.launch({ channel: process.env.SHOTS_CHANNEL ?? "chrome" }).catch(() => chromium.launch());
const password = envPassword();
let failures = 0;

for (const theme of themes) {
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      colorScheme: theme,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    for (const p of pages) {
      if (p.unlock && !password) {
        console.warn(`skip ${p.name}: no CASE_PASSWORD`);
        continue;
      }
      await page.goto(base + p.path, { waitUntil: "networkidle" });
      if (p.unlock && !(await page.locator("text=Ask me").count())) await unlock(page, password);
      await page.waitForTimeout(3000);
      const file = `${p.name}-${vp.name}-${theme}.png`;
      await page.screenshot({ path: out + file });
      await settle(page);
      await page.screenshot({ path: `${out}full/${file}`, fullPage: true });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      if (overflow) {
        failures++;
        console.error(`horizontal overflow: ${file}`);
      }
      console.log(`shot ${file}`);
    }
    await context.close();
  }
}

await browser.close();
if (failures) process.exit(1);
