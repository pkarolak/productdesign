import { Contact } from "@/components/site/Contact";
import { PrimaryLink } from "@/components/ui/Button";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <>
      <section className="container-page grid min-h-[80dvh] content-center pt-(--nav-clear)">
        <h1 className="type-display max-w-[13ch] text-ink">
          This page is <em>not</em> here.
        </h1>
        <p className="type-lede mt-6 mb-10 max-w-[38ch]">The work is, though.</p>
        <div>
          <PrimaryLink href="/#work">View work</PrimaryLink>
        </div>
      </section>
      <Contact site={site} />
    </>
  );
}
