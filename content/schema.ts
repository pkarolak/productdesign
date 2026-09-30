import { z } from "zod";

export const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

const words = (max: number) =>
  z
    .string()
    .min(1)
    .refine((s) => wordCount(s) <= max, { message: `At most ${max} words. Cut it, do not raise the limit.` });

const image = z.object({
  src: z.string().startsWith("/"),
  srcDark: z.string().startsWith("/").optional(),
  alt: z.string().min(8),
});

const ratio = z.string().regex(/^\d+(\.\d+)?\/\d+(\.\d+)?$/).optional();

export const assetSchema = z.discriminatedUnion("kind", [
  image.extend({
    kind: z.literal("screenshot"),
    ratio,
    annotations: z.array(z.object({ x: z.number().min(0).max(100), y: z.number().min(0).max(100) })).max(4).optional(),
  }),
  z.object({ kind: z.literal("isometric"), plates: z.array(image).min(1).max(3) }),
  z.object({ kind: z.literal("mobile"), screens: z.array(image).min(2).max(4) }),
  image.extend({ kind: z.literal("photo"), ratio }),
  z.object({ kind: z.literal("diagram"), layers: z.array(words(3)).min(2).max(4), alt: z.string().min(8) }),
  z.object({ kind: z.literal("compare"), before: image, after: image, ratio }),
  z.object({
    kind: z.literal("video"),
    src: z.string().startsWith("/"),
    poster: z.string().startsWith("/"),
    alt: z.string().min(8),
    ratio,
  }),
]);

export type Asset = z.infer<typeof assetSchema>;
export type AssetKind = Asset["kind"];

const metric = z.object({
  value: z.string().regex(/^[\d.,]+$/, "Digits only; put the unit in `unit`."),
  unit: z.string().max(3).optional(),
  label: words(6),
  context: words(8),
});

export type Metric = z.infer<typeof metric>;

const artifact = z.intersection(assetSchema, z.object({ caption: words(14) }));

export type Artifact = z.infer<typeof artifact>;

export const projectSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: words(5),
    company: z.string().min(2),
    year: z.number().int().min(2000).max(2100),
    access: z.enum(["protected", "public"]).default("protected"),
    bottomLine: words(30),
    role: words(5),
    team: words(10),
    timeline: words(3),
    partners: words(18),
    scope: z.array(words(3)).min(2).max(3),
    metrics: z.array(metric).min(2).max(3),
    beats: z.tuple([
      z.object({ label: z.literal("Frame"), text: words(25) }),
      z.object({ label: z.literal("Shape"), text: words(25) }),
      z.object({ label: z.literal("Ship"), text: words(25) }),
    ]),
    artifacts: z.array(artifact).min(2).max(4),
    askMeAbout: z.array(words(10)).min(2).max(3),
    cover: assetSchema,
  })
  .superRefine((p, ctx) => {
    const prefix = `/media/protected/${p.slug}/`;
    const coverSrcs = JSON.stringify(p.cover).match(/"\/[^"]+"/g) ?? [];
    if (coverSrcs.some((s) => s.includes("/media/protected/"))) {
      ctx.addIssue({ code: "custom", path: ["cover"], message: "Covers are public: keep them under /projects/<slug>/." });
    }
    if (p.access === "protected") {
      const srcs = JSON.stringify(p.artifacts).match(/"\/[^"]+"/g) ?? [];
      const leaked = srcs.filter((s) => !s.startsWith(`"${prefix}`));
      if (leaked.length) {
        ctx.addIssue({
          code: "custom",
          path: ["artifacts"],
          message: `Protected artifacts must live under ${prefix}. Found: ${leaked.join(", ")}`,
        });
      }
    }
  });

export type Project = z.infer<typeof projectSchema>;

const href = z
  .string()
  .refine((s) => /^(\/|#|mailto:|https?:\/\/)/.test(s), { message: "Use a /path, #anchor, mailto: or https:// URL." });

const cta = z.object({ label: words(4), href });

const slug = z.string().regex(/^[a-z0-9-]+$/);

const year = z.number().int().min(1990).max(2100);

/** Plain text runs and inline company pills, read as one sentence. */
const introPart = z.union([z.string().min(1), z.object({ pill: z.string().min(2), href })]);

/** A dictionary entry shown when a visitor hovers or taps a highlighted term in the tagline. */
const glossaryEntry = z.object({
  /** Must appear verbatim in the tagline (case-insensitive). */
  term: z.string().min(2),
  phonetic: z.string().min(2).optional(),
  kind: words(3),
  senses: z.array(words(26)).min(1).max(2),
  origin: words(20).optional(),
});

export const heroSchema = z.object({
  greeting: words(5),
  tagline: words(8),
  glossary: z.array(glossaryEntry).max(3).default([]),
  intro: z
    .array(introPart)
    .min(1)
    .max(9)
    .refine((parts) => wordCount(parts.map((p) => (typeof p === "string" ? p : p.pill)).join(" ")) <= 32, {
      message: "The intro sentence is at most 32 words. Cut it, do not raise the limit.",
    }),
  /** Used for metadata and OG images, where the pills cannot render. */
  headline: words(12),
  cta: cta.optional(),
}).refine((h) => h.glossary.every((g) => h.tagline.toLowerCase().includes(g.term.toLowerCase())), {
  message: "Every glossary term must appear in the tagline.",
});

export const handTargets = ["about", "work", "showcase", "teaching", "outside", "writing", "contact"] as const;

/** Card suits; each theme colours them with --suit-1 to --suit-5. The joker blends them all. */
export const suits = ["heart", "spade", "diamond", "club", "joker"] as const;

const art = z.object({ src: z.string().startsWith("/"), srcDark: z.string().startsWith("/").optional() });

/** Illustrated card art for the hand: the frame behind the aces, the joker and the back. Decorative. */
export const deckSchema = z.object({ face: art, joker: art, back: art });

export const handSchema = z
  .array(z.object({ title: words(3), text: words(8), href, target: z.enum(handTargets), suit: z.enum(suits) }))
  .max(5);

export const statementSchema = z.object({
  label: words(5),
  lines: z.array(words(8)).min(1).max(2),
  text: words(32),
  cta: cta.optional(),
});

export const workIntroSchema = z.object({ title: words(5), note: words(10) });

export const showcaseSchema = z.object({
  title: words(6),
  note: words(20),
  items: z
    .array(
      z.object({
        id: slug,
        kicker: words(4),
        title: words(5),
        text: words(14),
        /** Without an image the card shows its suit colour instead. */
        image: image.optional(),
        detail: words(60),
        link: cta.optional(),
      }),
    )
    .max(6),
});

export const writingSchema = z.object({
  title: words(6),
  note: words(20).optional(),
  items: z
    .array(
      z.object({
        title: words(12),
        date: z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/, "Use YYYY-MM or YYYY-MM-DD."),
        href: z.url(),
        source: z.string().min(2).optional(),
      }),
    )
    .max(6),
});

export const testimonialsSchema = z.object({
  title: words(8),
  items: z
    .array(z.object({ quote: words(45), name: z.string().min(3), role: words(5), company: z.string().min(2) }))
    .max(4),
});

export const letterSchema = z.object({
  salutation: words(5),
  paragraphs: z.array(words(34)).min(1).max(3),
  signoff: words(4),
});

export const teachingSchema = z.object({
  title: words(5),
  note: words(20).optional(),
  items: z
    .array(
      z.object({
        place: z.string().min(3),
        role: words(5),
        years: z.string().min(4),
        text: words(30),
        topics: z.array(words(4)).max(4).default([]),
      }),
    )
    .max(3),
});

export const educationSchema = z
  .array(z.object({ school: z.string().min(3), degree: words(6), years: z.string().min(4) }))
  .max(4);

export const journeySchema = z.object({
  title: words(5),
  note: words(24).optional(),
  roles: z
    .array(
      z
        .object({
          from: year,
          /** Omit while the role is current. */
          to: year.optional(),
          company: z.string().min(2),
          role: words(5),
          kind: words(3),
          summary: words(18),
          points: z.array(words(16)).max(2).default([]),
          cases: z.array(slug).max(2).default([]),
        })
        .refine((r) => r.to === undefined || r.to >= r.from, { message: "`to` must not be before `from`." }),
    )
    .min(1)
    .max(8),
});

export const valuesSchema = z.object({
  title: words(6),
  items: z.array(z.object({ title: words(6), text: words(30), evidence: slug.optional() })).max(4),
});

export const outsideSchema = z.object({
  title: words(6),
  note: words(20).optional(),
  items: z.array(z.object({ title: words(8), text: words(40) })).max(3),
});

export const siteSchema = z.object({
  name: z.string().min(2),
  role: words(4),
  /** A square photo of the designer, shown in the nav and beside the intro. */
  avatar: image.optional(),
  url: z.url(),
  description: words(30),
  hero: heroSchema,
  hand: handSchema.default([]),
  handNote: words(8).optional(),
  deck: deckSchema.optional(),
  statement: statementSchema.optional(),
  work: workIntroSchema,
  showcase: showcaseSchema.optional(),
  writing: writingSchema.optional(),
  testimonials: testimonialsSchema.optional(),
  letter: letterSchema.optional(),
  teaching: teachingSchema.optional(),
  about: z.object({
    headline: words(12),
    story: z.array(words(70)).min(1).max(3),
    portrait: image.optional(),
  }),
  education: educationSchema.default([]),
  journey: journeySchema.optional(),
  values: valuesSchema.optional(),
  outside: outsideSchema.optional(),
  links: z.object({
    email: z.email(),
    linkedin: z.url(),
    calendar: z.url().optional(),
  }),
  contact: z.object({ headline: words(10), text: words(24) }),
  footnote: words(16).optional(),
});

export type Site = z.infer<typeof siteSchema>;
export type Hero = Site["hero"];
export type GlossaryEntry = Hero["glossary"][number];
export type HandCard = Site["hand"][number];
export type Deck = NonNullable<Site["deck"]>;
export type HandTarget = (typeof handTargets)[number];
export type Suit = (typeof suits)[number];
export type Statement = z.infer<typeof statementSchema>;
export type WorkIntro = z.infer<typeof workIntroSchema>;
export type Showcase = z.infer<typeof showcaseSchema>;
export type ShowcaseItem = Showcase["items"][number];
export type Writing = z.infer<typeof writingSchema>;
export type Testimonials = z.infer<typeof testimonialsSchema>;
export type Letter = z.infer<typeof letterSchema>;
export type Teaching = z.infer<typeof teachingSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Journey = z.infer<typeof journeySchema>;
export type Values = z.infer<typeof valuesSchema>;
export type Outside = z.infer<typeof outsideSchema>;
