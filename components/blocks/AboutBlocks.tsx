import { Contact } from "@/components/site/Contact";
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
        <Education education={content.education} i={content.about.story.length + 2} />
      </StoryHeader>
      <Journey journey={content.journey} projects={projects} />
      <Values values={content.values} projects={projects} />
      <Contact site={content} />
    </>
  );
}
