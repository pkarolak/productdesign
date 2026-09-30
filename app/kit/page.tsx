import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DoorCards } from "@/components/blocks/DoorCards";
import { Education } from "@/components/blocks/Education";
import { IntroHero } from "@/components/blocks/IntroHero";
import { Journey } from "@/components/blocks/Journey";
import { LetterCard } from "@/components/blocks/LetterCard";
import { OutsideWork } from "@/components/blocks/OutsideWork";
import { Showcase } from "@/components/blocks/Showcase";
import { Statement } from "@/components/blocks/Statement";
import { StoryHeader } from "@/components/blocks/StoryHeader";
import { Testimonials } from "@/components/blocks/Testimonials";
import { Values } from "@/components/blocks/Values";
import { WorkTimeline } from "@/components/blocks/WorkTimeline";
import { WritingList } from "@/components/blocks/WritingList";
import { Primitives } from "@/components/kit/Primitives";
import { PageTransition } from "@/components/motion/PageTransition";
import { Contact } from "@/components/site/Contact";
import { kit } from "@/content/kit";
import { projects } from "@/content/projects";
import { visibleDoors } from "@/lib/blocks";

export const metadata: Metadata = {
  title: "Block library",
  robots: { index: false, follow: false },
};

function Specimen({ name, note, children }: { name: string; note?: string; children: ReactNode }) {
  return (
    <div className="border-t border-hairline">
      <p className="container-page type-label flex flex-wrap gap-x-3 pt-6">
        <span className="text-ink">{name}</span>
        {note && <span>{note}</span>}
      </p>
      {children}
    </div>
  );
}

/** Every block and primitive, filled from content/kit.ts. Not linked from the site and kept out of the sitemap. */
export default function Kit() {
  return (
    <PageTransition>
      <div>
        <header className="container-page pt-(--nav-clear) pb-12 md:pt-44">
          <p className="type-label">Kit</p>
          <p className="type-h2 mt-3 max-w-[24ch] text-ink">The blocks this site is built from, all in one place.</p>
          <p className="type-lede mt-4 max-w-[58ch]">
            Blocks render nothing when their content is empty, so the live pages only show what is filled in.
          </p>
        </header>

        <section id="kit-primitives" aria-labelledby="kit-primitives-title" className="container-page pb-(--section-y)">
          <h2 id="kit-primitives-title" className="type-h3 mb-6 text-ink">
            Primitives
          </h2>
          <Primitives email={kit.links.email} />
        </section>

        <Specimen name="IntroHero" note="Home opener with inline pills">
          <IntroHero hero={kit.hero} />
        </Specimen>
        <Specimen name="DoorCards" note="Only doors whose target has content">
          <div className="pb-(--section-y)">
            <DoorCards doors={visibleDoors(kit, projects.length > 0)} />
          </div>
        </Specimen>
        <Specimen name="Statement">
          <Statement statement={kit.statement} />
        </Specimen>
        <Specimen name="WorkTimeline" note="Cases by year, cover morphs into the case">
          <WorkTimeline intro={kit.work} projects={projects} />
        </Specimen>
        <Specimen name="Showcase" note="Cards that expand into a sheet">
          <Showcase showcase={kit.showcase} />
        </Specimen>
        <Specimen name="WritingList">
          <WritingList writing={kit.writing} />
        </Specimen>
        <Specimen name="Testimonials">
          <Testimonials testimonials={kit.testimonials} />
        </Specimen>
        <Specimen name="LetterCard" note="Closes the home page">
          <LetterCard letter={kit.letter} name={kit.name} links={kit.links} id="letter" />
        </Specimen>
        <Specimen name="StoryHeader and Education" note="About opener">
          <StoryHeader about={kit.about}>
            <Education education={kit.education} i={kit.about.story.length + 2} />
          </StoryHeader>
        </Specimen>
        <Specimen name="Journey">
          <Journey journey={kit.journey} projects={projects} />
        </Specimen>
        <Specimen name="Values">
          <Values values={kit.values} projects={projects} />
        </Specimen>
        <Specimen name="OutsideWork">
          <OutsideWork outside={kit.outside} />
        </Specimen>
        <Specimen name="Contact" note="Used where there is no letter">
          <Contact site={kit} />
        </Specimen>
      </div>
    </PageTransition>
  );
}
