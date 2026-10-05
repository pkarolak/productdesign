import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Atmosphere } from "@theme/Atmosphere";
import { fontVariables } from "@theme/fonts";
import { meta } from "@theme/meta";
import { CommandMenu, type CommandGroup } from "@/components/site/CommandMenu";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import { Toaster } from "@/components/site/Toaster";
import { plain } from "@/components/ui/Emphasis";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { organizations } from "@/lib/companies";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}, ${site.role.toLowerCase()}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, title: plain(site.hero.headline), description: site.description },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: meta.themeColor.light },
    { media: "(prefers-color-scheme: dark)", color: meta.themeColor.dark },
  ],
};

const orgs = organizations(site);

const commands: CommandGroup[] = [
  {
    label: "Work",
    items: [
      { id: "work", label: "The big ones", href: "/#big-ones", keywords: "work cases projects", meta: `${projects.length} cases` },
      ...projects.map((p) => ({
        id: p.slug,
        label: p.title,
        href: `/work/${p.slug}`,
        keywords: "case",
        parent: "work",
        locked: p.access === "protected",
        meta: p.company,
        logo: orgs.get(p.company)?.logo,
      })),
    ],
  },
  {
    label: "Pages",
    items: [
      { id: "home", label: "Home", href: "/" },
      { id: "short-version", label: "The short version", href: "/#short-version", keywords: "intro hello" },
      { id: "side-quests", label: "Side quests", href: "/#side-quests", keywords: "side projects gigs freelance" },
      { id: "office-hours", label: "Office hours", href: "/#office-hours", keywords: "teaching tutor lecturer" },
      { id: "off-the-clock", label: "Off the clock", href: "/#off-the-clock", keywords: "hobbies climbing tango dj" },
      { id: "about", label: "About", href: "/about", keywords: "long version journey values cv resume" },
    ],
  },
  {
    label: "Actions",
    items: [
      ...(site.links.email
        ? [{ id: "copy-email", label: "Copy email address", action: "copy-email" as const, keywords: "contact mail" }]
        : []),
      { id: "toggle-theme", label: "Switch light or dark mode", action: "toggle-theme", keywords: "theme appearance" },
    ],
  },
  {
    label: "Links",
    items: [
      { id: "linkedin", label: "LinkedIn", href: site.links.linkedin, meta: new URL(site.links.linkedin).hostname.replace(/^www\./, "") },
      ...(site.links.calendar
        ? [{ id: "calendar", label: "Book a call", href: site.links.calendar, meta: new URL(site.links.calendar).hostname.replace(/^www\./, "") }]
        : []),
    ],
  },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">
        <ThemeProvider>
          <Toaster>
            <a
              href="#main"
              className="focus-ring sr-only z-[60] rounded-pill bg-ink px-5 py-3 text-canvas focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
            >
              Skip to content
            </a>
            <Atmosphere />
            <Nav name={site.name} avatar={site.avatar?.face ?? site.avatar?.src} />
            <main id="main" className="relative z-10">
              {children}
            </main>
            <Footer name={site.name} note={site.footnote} />
            <CommandMenu groups={commands} email={site.links.email} />
          </Toaster>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
