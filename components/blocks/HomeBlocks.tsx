import { Contact } from "@/components/site/Contact";
import { projects } from "@/content/projects";
import type { Site } from "@/content/schema";
import { suitFor, visibleCards } from "@/lib/blocks";
import { AboutTeaser } from "./AboutTeaser";
import { CardHand } from "./CardHand";
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
  return (
    <>
      <IntroHero hero={content.hero} avatar={content.avatar} />
      <CardHand
        cards={visibleCards(content, projects.length > 0)}
        note={content.handNote}
        deck={content.deck}
        panels={{
          about: <AboutTeaser about={content.about} id="card-about" suit={suitFor(content, "about")} />,
          work: <WorkTimeline intro={content.work} projects={projects} id="card-work" suit={suitFor(content, "work")} />,
          showcase: <Showcase showcase={content.showcase} id="card-side-projects" suit={suitFor(content, "showcase")} />,
          teaching: <Teaching teaching={content.teaching} id="card-teaching" suit={suitFor(content, "teaching")} />,
          outside: <OutsideWork outside={content.outside} id="card-my-world" suit={suitFor(content, "outside")} />,
        }}
      />
      <Statement statement={content.statement} suit={suitFor(content, "about")} />
      <WorkTimeline intro={content.work} projects={projects} id="big-ones" suit={suitFor(content, "work")} />
      <Showcase showcase={content.showcase} id="side-quests" suit={suitFor(content, "showcase")} />
      <Teaching teaching={content.teaching} id="office-hours" suit={suitFor(content, "teaching")} />
      <OutsideWork outside={content.outside} id="off-the-clock" suit={suitFor(content, "outside")} />
      <Testimonials testimonials={content.testimonials} />
      {content.letter ? (
        <LetterCard letter={content.letter} name={content.name} links={content.links} />
      ) : (
        <Contact site={content} />
      )}
    </>
  );
}
