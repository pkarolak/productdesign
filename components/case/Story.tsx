import { Asset } from "@/components/media/Asset";
import { Rise } from "@/components/motion/Rise";
import type { Artifact, StoryChapter, StoryStep } from "@/content/schema";
import { StoryNav } from "./StoryNav";

function Figure({ artifact }: { artifact: Artifact }) {
  return (
    <figure className="mt-8">
      <Asset asset={artifact} flatIsometric rise={0} sizes="(min-width: 1024px) 60vw, 100vw" />
      <Rise as="figcaption" i={1} className="type-caption mt-4 max-w-[52ch]">
        {artifact.caption}
      </Rise>
    </figure>
  );
}

function Points({ points }: { points: readonly string[] }) {
  return (
    <ul className="mt-5 grid max-w-[62ch] gap-2.5">
      {points.map((p) => (
        <li key={p} className="type-body flex gap-3 text-ink">
          <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-hairline" />
          {p}
        </li>
      ))}
    </ul>
  );
}

function Step({ step }: { step: StoryStep }) {
  return (
    <div id={step.id} data-story="step" className="mt-14 scroll-mt-(--nav-clear) md:mt-16">
      <Rise as="h3" className="type-h3 max-w-[34ch] text-ink">
        {step.title}
      </Rise>
      <Rise as="p" i={1} className="type-body mt-3 max-w-[62ch] text-ink-2">
        {step.text}
      </Rise>
      {step.points && (
        <Rise i={2}>
          <Points points={step.points} />
        </Rise>
      )}
      {step.artifact && <Figure artifact={step.artifact} />}
    </div>
  );
}

/**
 * The full story below the teaser (ADR 0041): chapters titled by what was found or asked, each with the steps that
 * answered it, beside a sticky "On this page" rail.
 */
export function Story({ chapters }: { chapters: readonly StoryChapter[] }) {
  if (!chapters.length) return null;
  const outline = chapters.map((c) => ({ id: c.id, nav: c.nav, steps: c.steps.map((s) => ({ id: s.id, nav: s.nav })) }));
  return (
    <section aria-label="The story" className="container-page section-y grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-3">
        <StoryNav outline={outline} className="lg:sticky lg:top-(--nav-clear)" />
      </div>
      <div className="grid gap-24 md:gap-32 lg:col-span-8 lg:col-start-5">
        {chapters.map((c) => (
          <section key={c.id} id={c.id} data-story="chapter" aria-labelledby={`${c.id}-title`} className="scroll-mt-(--nav-clear)">
            <Rise as="p" className="type-label">
              {c.nav}
            </Rise>
            <Rise as="h2" i={1} id={`${c.id}-title`} className="type-h2 mt-3 max-w-[22ch] text-ink">
              {c.title}
            </Rise>
            {c.lead && (
              <Rise as="p" i={2} className="type-lede mt-5 max-w-[60ch]">
                {c.lead}
              </Rise>
            )}
            {c.quote && (
              <Rise i={3} className="mt-8 border-l border-hairline pl-5">
                <blockquote className="type-bottomline max-w-[32ch] text-ink">{c.quote}</blockquote>
              </Rise>
            )}
            {c.artifact && <Figure artifact={c.artifact} />}
            {c.steps.map((s) => (
              <Step key={s.id} step={s} />
            ))}
          </section>
        ))}
      </div>
    </section>
  );
}
