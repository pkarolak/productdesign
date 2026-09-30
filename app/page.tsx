import { HomeBlocks } from "@/components/blocks/HomeBlocks";
import { PageTransition } from "@/components/motion/PageTransition";
import { site } from "@/content/site";

export default function Home() {
  return (
    <PageTransition>
      <div>
        <HomeBlocks content={site} />
      </div>
    </PageTransition>
  );
}
