import { CopyEmail } from "@/components/site/CopyEmail";
import { Rise } from "@/components/motion/Rise";
import { PrimaryLink } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import type { Letter, Site } from "@/content/schema";
import { cn } from "@/lib/cn";
import { LetterPhoto } from "./LetterPhoto";

/** A short personal note that closes the page and carries the contact actions. */
export function LetterCard({
  letter,
  name,
  links,
  id = "contact",
}: {
  letter?: Letter;
  name: string;
  links: Site["links"];
  id?: string;
}) {
  if (!letter) return null;
  return (
    <section data-dock-hide id={id} aria-labelledby={`${id}-title`} className="container-page section-y scroll-mt-(--nav-clear)">
      <Rise as="article" className="card mx-auto max-w-[800px] rounded-card p-7 md:p-12">
        <div className={cn("grid gap-7", letter.photo && "md:grid-cols-[160px_minmax(0,1fr)] md:gap-11")}>
          {letter.photo && (
            <div className="md:mt-1">
              <LetterPhoto photo={letter.photo} calendar={links.calendar} />
            </div>
          )}
          <div>
            <h2 id={`${id}-title`} className="type-h3 text-ink">
              {letter.salutation}
            </h2>
            <div className="type-body mt-5 grid gap-4 text-ink-2">
              {letter.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="type-hand mt-7 -rotate-3 text-[2.5rem] leading-none text-ink">{letter.signoff}</p>
            <p className="type-small mt-2 text-ink-2">{name}</p>
          </div>
        </div>
        <div className="mt-8 border-t border-hairline flex flex-wrap items-center gap-x-5 gap-y-4 pt-6">
          {links.calendar ? (
            <PrimaryLink href={links.calendar}>Book a call</PrimaryLink>
          ) : (
            links.email && <PrimaryLink href={`mailto:${links.email}`}>Write to me</PrimaryLink>
          )}
          {links.email && <CopyEmail email={links.email} />}
          <ArrowLink href={links.linkedin}>LinkedIn</ArrowLink>
        </div>
      </Rise>
    </section>
  );
}
