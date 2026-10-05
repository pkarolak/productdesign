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

const sections = (parent: string, base: string, list: { id: string; label?: string; keywords?: string; meta?: string }[]) =>
  list.flatMap(({ label, ...c }) => (label ? [{ ...c, label, parent, href: `${base}#${c.id}` }] : []));

const commands: CommandGroup[] = [
  {
    label: "Pages",
    items: [
      { id: "home", label: "Home", href: "/" },
      ...sections("home", "/", [
        { id: "about-me", label: site.statement?.title, meta: "Short version", keywords: "intro hello" },
        { id: "side-gigs", label: site.showcase?.title, keywords: "side projects quests freelance" },
        { id: "teaching", label: site.teaching?.title, keywords: "tutor lecturer workshops talks" },
        { id: "free-time", label: site.outside?.title, keywords: "hobbies climbing tango dj" },
      ]),
      { id: "work", label: "Work", href: "/work", keywords: "big projects cases", meta: `${projects.length} cases` },
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
      { id: "about", label: "About me", href: "/about", keywords: "long version cv resume" },
      ...sections("about", "/about", [
        { id: "beliefs", label: site.about.beliefs?.title, keywords: "principles" },
        { id: "values", label: site.values?.title, keywords: "process loop" },
        { id: "journey", label: site.journey?.title, keywords: "experience roles companies career" },
      ]),
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
            <Nav
              name={site.name}
              avatar={site.avatar?.face ?? site.avatar?.src}
              sections={site.hand.map(({ title, href, suit }) => ({ title, href, suit }))}
            />
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
