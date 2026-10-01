import { Rise } from "@/components/motion/Rise";
import { Contact } from "@/components/site/Contact";
import { PrimaryLink } from "@/components/ui/Button";
import { projects } from "@/content/projects";
import type { Site } from "@/content/schema";
import { Education } from "./Education";
import { Journey } from "./Journey";
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
        <Education education={content.education} title={content.educationTitle} i={content.about.story.length + 3} />
      </StoryHeader>
      <Journey journey={content.journey} projects={projects} />
      <Values values={content.values} projects={projects} />
      <Contact site={content} />
    </>
  );
}
