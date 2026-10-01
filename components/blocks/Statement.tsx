import { Rise } from "@/components/motion/Rise";
import { ArrowLink } from "@/components/ui/ArrowLink";
import type { Statement as StatementData, Suit } from "@/content/schema";
import { BlockHeader } from "./BlockHeader";

/** The short version: a heading, a one or two line statement (the second in Ink 2), a short text and a link. */
export function Statement({
  statement,
  suit,
  id = "short-version",
}: {
  statement?: StatementData;
  suit?: Suit;
  id?: string;
}) {
  if (!statement) return null;
  const [first, second] = statement.lines;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="container-page section-y scroll-mt-(--nav-clear)">
      <BlockHeader id={`${id}-title`} title={statement.title} suit={suit} className="mb-6 md:mb-8" />
      <Rise as="p" i={2} className="type-h3 max-w-[30ch] text-ink">
        {first}
        {second && <em className="block text-ink-2">{second}</em>}
      </Rise>
      <Rise as="p" i={3} className="type-body mt-4 max-w-[60ch] text-ink-2">
        {statement.text}
      </Rise>
      {statement.cta && (
        <Rise i={4} className="mt-5">
          <ArrowLink href={statement.cta.href} transition="nav-forward">
            {statement.cta.label}
          </ArrowLink>
        </Rise>
      )}
    </section>
  );
}
