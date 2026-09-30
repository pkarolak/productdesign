import { Contact } from "@/components/site/Contact";
import { projects } from "@/content/projects";
import type { Site } from "@/content/schema";
import { visibleDoors } from "@/lib/blocks";
import { DoorCards } from "./DoorCards";
import { IntroHero } from "./IntroHero";
import { LetterCard } from "./LetterCard";
import { Showcase } from "./Showcase";
import { Statement } from "./Statement";
import { Testimonials } from "./Testimonials";
import { WorkTimeline } from "./WorkTimeline";
import { WritingList } from "./WritingList";

/** The home composition. /kit renders it from fuller content, so every block shows. */
export function HomeBlocks({ content }: { content: Site }) {
  return (
    <>
      <IntroHero hero={content.hero} />
      <DoorCards doors={visibleDoors(content, projects.length > 0)} />
      <Statement statement={content.statement} />
      <WorkTimeline intro={content.work} projects={projects} />
      <Showcase showcase={content.showcase} />
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
