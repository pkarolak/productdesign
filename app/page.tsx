import { Approach } from "@/components/home/Approach";
import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero hero={site.hero} />
      <SelectedWork projects={projects} />
      <Approach principles={site.approach} projects={projects} />
    </>
  );
}
