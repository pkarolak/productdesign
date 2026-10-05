import { Contact } from "@/components/site/Contact";
import { HandDock } from "@/components/site/HandDock";
import { projects } from "@/content/projects";
import type { Site } from "@/content/schema";
import { suitFor, visibleCards } from "@/lib/blocks";
import { organizations } from "@/lib/companies";
import { CardHand } from "./CardHand";
import { FlightLayer } from "./flight";
import { IntroHero } from "./IntroHero";
import { LetterCard } from "./LetterCard";
import { OutsideWork } from "./OutsideWork";
import { Showcase } from "./Showcase";
import { Statement } from "./Statement";
import { Teaching } from "./Teaching";
import { Testimonials } from "./Testimonials";
import { WorkTimeline } from "./WorkTimeline";

/** The home composition. /kit renders it from fuller content, so every block shows. */
export function HomeBlocks({ content }: { content: Site }) {
  const cards = visibleCards(content, projects.length > 0);
  return (
    <>
      <FlightLayer />
      <IntroHero hero={content.hero} avatar={content.avatar} />
      <CardHand cards={cards} note={content.handNote} deck={content.deck} />
      <Statement statement={content.statement} suit={suitFor(content, "about")} />
      <WorkTimeline
        intro={content.work}
        projects={projects}
        orgs={organizations(content)}
        id="big-ones"
        suit={suitFor(content, "work")}
        featured
      />
      <Showcase showcase={content.showcase} id="side-quests" suit={suitFor(content, "showcase")} />
      <Teaching teaching={content.teaching} id="office-hours" suit={suitFor(content, "teaching")} />
      <OutsideWork outside={content.outside} id="off-the-clock" suit={suitFor(content, "outside")} />
      <Testimonials testimonials={content.testimonials} />
      {content.letter ? (
        <LetterCard letter={content.letter} name={content.name} links={content.links} />
      ) : (
        <Contact site={content} />
      )}
      <HandDock cards={cards} />
    </>
  );
}
