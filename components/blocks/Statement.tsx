import { Rise } from "@/components/motion/Rise";
import { ArrowLink } from "@/components/ui/ArrowLink";
import type { Statement as StatementData } from "@/content/schema";

/** A label, a big one or two line statement (the second in Ink 2), a short text and a link. */
export function Statement({ statement }: { statement?: StatementData }) {
  if (!statement) return null;
  const [first, second] = statement.lines;
  return (
    <section aria-labelledby="statement-title" className="container-page section-y">
      <Rise as="p" className="type-label mb-3">
        {statement.label}
      </Rise>
      <Rise as="h2" id="statement-title" i={1} className="type-h2 max-w-[24ch] text-ink">
        {first}
        {second && <em className="block">{second}</em>}
      </Rise>
      <Rise as="p" i={2} className="type-body mt-5 max-w-[60ch] text-ink-2">
        {statement.text}
      </Rise>
      {statement.cta && (
        <Rise i={3} className="mt-5">
          <ArrowLink href={statement.cta.href} transition="nav-forward">
            {statement.cta.label}
          </ArrowLink>
        </Rise>
      )}
    </section>
  );
}
