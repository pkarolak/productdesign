import { Asset } from "@/components/media/Asset";
import { Rise } from "@/components/motion/Rise";
import type { Artifact } from "@/content/schema";
import { cn } from "@/lib/cn";

type Slot = { span: string; aspect: string; sizes: string };

const full: Slot = { span: "lg:col-span-12", aspect: "2/1", sizes: "100vw" };
const wide: Slot = { span: "lg:col-span-7", aspect: "4/3", sizes: "(min-width: 1024px) 58vw, 100vw" };
const narrow: Slot = { span: "lg:col-span-5", aspect: "1/1", sizes: "(min-width: 1024px) 42vw, 100vw" };

const layouts: Record<number, Slot[]> = {
  2: [wide, narrow],
  3: [full, wide, narrow],
  4: [wide, narrow, narrow, wide],
};

export function Artifacts({ artifacts }: { artifacts: Artifact[] }) {
  const slots = layouts[artifacts.length];
  return (
    <section aria-label="Artifacts" className="container-page py-16 md:py-24">
      <div className="grid gap-x-7 gap-y-14 lg:grid-cols-12">
        {artifacts.map((a, i) => {
          const slot = slots[i];
          return (
            <figure key={i} className={cn(slot.span)}>
              <Asset
                asset={a}
                flatIsometric
                aspect={a.kind === "diagram" && slot === full ? "12/5" : slot.aspect}
                sizes={slot.sizes}
                rise={i % 2}
              />
              <Rise as="figcaption" i={(i % 2) + 1} className="type-caption mt-4 max-w-[52ch]">
                {a.caption}
              </Rise>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
