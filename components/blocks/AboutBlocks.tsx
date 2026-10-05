import { Rise } from "@/components/motion/Rise";
import { Contact } from "@/components/site/Contact";
import { PrimaryLink } from "@/components/ui/Button";
import { projects } from "@/content/projects";
import type { Site } from "@/content/schema";
import { Beliefs } from "./Beliefs";
import { Journey } from "./Journey";
import { Learning } from "./Learning";
import { OutsideWork } from "./OutsideWork";
import { StoryHeader } from "./StoryHeader";
import { Values } from "./Values";

/** The About composition, shared with /kit. */
export function AboutBlocks({ content }: { content: Site }) {
  return (
    <>
      <StoryHeader about={content.about}>
        {content.resume && (
          <Rise i={content.about.story.length + 2} className="mt-8">
            <PrimaryLink href={content.resume.src} download>
              {content.resume.label}
            </PrimaryLink>
          </Rise>
        )}
      </StoryHeader>
      <Beliefs beliefs={content.about.beliefs} />
      <Values values={content.values} projects={projects} />
      <Journey journey={content.journey} projects={projects} />
      <Learning education={content.education} educationTitle={content.educationTitle} teaching={content.teaching} />
      <OutsideWork outside={content.outside} id="free-time" />
      <Contact site={content} />
    </>
  );
}
