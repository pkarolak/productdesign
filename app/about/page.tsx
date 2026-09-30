import type { Metadata } from "next";
import { AboutBlocks } from "@/components/blocks/AboutBlocks";
import { PageTransition } from "@/components/motion/PageTransition";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: site.about.story[0].split(". ")[0] + ".",
};

export default function About() {
  return (
    <PageTransition>
      <div>
        <AboutBlocks content={site} />
      </div>
    </PageTransition>
  );
}
