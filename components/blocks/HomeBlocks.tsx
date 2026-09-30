import { Contact } from "@/components/site/Contact";
import { projects } from "@/content/projects";
import type { Site } from "@/content/schema";
import { suitFor, visibleCards } from "@/lib/blocks";
import { CardHand } from "./CardHand";
import { IntroHero } from "./IntroHero";
import { LetterCard } from "./LetterCard";
import { OutsideWork } from "./OutsideWork";
import { Showcase } from "./Showcase";
import { Statement } from "./Statement";
import { Teaching } from "./Teaching";
import { Testimonials } from "./Testimonials";
import { WorkTimeline } from "./WorkTimeline";
import { WritingList } from "./WritingList";

/** The home composition. /kit renders it from fuller content, so every block shows. */
export function HomeBlocks({ content }: { content: Site }) {
  return (
    <>
      <IntroHero hero={content.hero} avatar={content.avatar} />
      <CardHand cards={visibleCards(content, projects.length > 0)} note={content.handNote} deck={content.deck} />
      <Statement statement={content.statement} />
      <WorkTimeline intro={content.work} projects={projects} suit={suitFor(content, "work")} />
      <Showcase showcase={content.showcase} id="side-projects" suit={suitFor(content, "showcase")} />
      <Teaching teaching={content.teaching} suit={suitFor(content, "teaching")} />
      <OutsideWork outside={content.outside} id="my-world" suit={suitFor(content, "outside")} />
      <WritingList writing={content.writing} />
      <Testimonials testimonials={content.testimonials} />
      {content.letter ? (
        <LetterCard letter={content.letter} name={content.name} links={content.links} />
      ) : (
        <Contact site={content} />
      )}
    </>
  );
}
