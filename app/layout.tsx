import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Atmosphere } from "@theme/Atmosphere";
import { fontVariables } from "@theme/fonts";
import { meta } from "@theme/meta";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import { plain } from "@/components/ui/Emphasis";
import { site } from "@/content/site";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">
        <ThemeProvider>
          <a
            href="#main"
            className="focus-ring sr-only z-[60] rounded-pill bg-ink px-5 py-3 text-canvas focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
          >
            Skip to content
          </a>
          <Atmosphere />
          <Nav name={site.name} />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <Contact site={site} />
          <Footer name={site.name} note={site.footnote} />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
