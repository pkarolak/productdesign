import { Rise } from "@/components/motion/Rise";
import { Emphasis } from "@/components/ui/Emphasis";
import { Icon } from "@/components/ui/Icon";
import { Panel } from "@/components/ui/Panel";
import { PrimaryLink } from "@/components/ui/Button";
import type { Site } from "@/content/schema";
import { CopyEmail } from "./CopyEmail";

export function Contact({ site }: { site: Site }) {
  const secondary = [
    { href: site.links.linkedin, label: "LinkedIn" },
    ...(site.links.calendar ? [{ href: site.links.calendar, label: "Book 30 minutes" }] : []),
  ];
  return (
    <section data-dock-hide id="contact" aria-labelledby="contact-title" className="container-page relative z-10 pb-(--section-y)">
      <Panel rise={0} className="grid gap-12 p-8 md:p-14 lg:grid-cols-12 lg:items-end lg:gap-8 lg:p-16">
        <div className="lg:col-span-7">
          <h2 id="contact-title" className="type-h2 max-w-[16ch] text-ink">
            <Emphasis text={site.contact.headline} />
          </h2>
          <p className="type-lede mt-5 max-w-[38ch]">{site.contact.text}</p>
        </div>
        <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:items-end">
          <PrimaryLink href={`mailto:${site.links.email}`}>Email me</PrimaryLink>
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {secondary.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring group/l inline-flex items-center gap-1.5 rounded-pill text-ink-2 transition-colors duration-(--t-hover-short) ease-slow hover:text-ink"
                >
                  {l.label}
                  <Icon
                    name="arrow-up-right"
                    className="transition-transform duration-(--t-hover-mid) ease-slow group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
          <Rise i={2}>
            <CopyEmail email={site.links.email} />
          </Rise>
        </div>
      </Panel>
    </section>
  );
}
