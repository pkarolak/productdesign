import { z } from "zod";
import { iconNames } from "../themes/contract";

export const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

const words = (max: number) =>
  z
    .string()
    .min(1)
    .refine((s) => wordCount(s) <= max, { message: `At most ${max} words. Cut it, do not raise the limit.` });

const icon = z.enum(iconNames);

const image = z.object({
  src: z.string().startsWith("/"),
  srcDark: z.string().startsWith("/").optional(),
  alt: z.string().min(8),
});

/**
 * A photo of the designer; `cutout` is the same shot as a transparent PNG with the background removed, and `face`
 * a square close-up of the face for small avatars.
 */
const portrait = image.extend({ cutout: z.string().startsWith("/").optional(), face: z.string().startsWith("/").optional() });

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
    dark: z.object({ src: z.string().startsWith("/"), poster: z.string().startsWith("/") }).optional(),
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

const anchor = z.string().regex(/^[a-z0-9-]+$/);

/** One thing that happened inside a chapter, titled by what was done, never "Step 1". */
const storyStep = z.object({
  id: anchor,
  /** Its line under the chapter in the "On this page" rail. */
  nav: words(3),
  title: words(9),
  text: words(60),
  points: z.array(words(16)).min(2).max(5).optional(),
  artifact: artifact.optional(),
});

/**
 * A chapter of the full story below the teaser (ADR 0041). Titles carry the finding or the question of that moment,
 * so the process shows without being named. `quote` is a line from the work itself, such as the brief.
 */
const storyChapter = z.object({
  id: anchor,
  nav: words(3),
  title: words(10),
  lead: words(50).optional(),
  quote: words(16).optional(),
  artifact: artifact.optional(),
  steps: z.array(storyStep).max(4).default([]),
});

export type StoryChapter = z.infer<typeof storyChapter>;
export type StoryStep = z.infer<typeof storyStep>;

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
    /** Public, so a video cover may only show shipped UI (ADR 0042). */
    cover: assetSchema,
    story: z
      .array(storyChapter)
      .min(3)
      .max(6)
      .refine((cs) => new Set(cs.flatMap((c) => [c.id, ...c.steps.map((s) => s.id)])).size === cs.reduce((n, c) => n + 1 + c.steps.length, 0), {
        message: "Chapter and step ids must be unique within a case.",
      })
      .optional(),
  })
  .superRefine((p, ctx) => {
    const prefix = `/media/protected/${p.slug}/`;
    const coverSrcs = JSON.stringify(p.cover).match(/"\/[^"]+"/g) ?? [];
    if (coverSrcs.some((s) => s.includes("/media/protected/"))) {
      ctx.addIssue({ code: "custom", path: ["cover"], message: "Covers are public: keep them under /projects/<slug>/." });
    }
    if (p.access === "protected") {
      const srcs = JSON.stringify([p.artifacts, p.story ?? []]).match(/"\/[^"]+"/g) ?? [];
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

/** A dictionary entry shown when a visitor hovers or taps a highlighted term in the tagline or the intro. */
const glossaryEntry = z.object({
  /** In the tagline glossary, must appear verbatim in the tagline (case-insensitive). */
  term: z.string().min(2),
  phonetic: z.string().min(2).optional(),
  kind: words(3),
  senses: z.array(words(26)).min(1).max(2),
  origin: words(20).optional(),
});

/**
 * A company or product named in the intro. It opens a small note instead of leaving the site.
 * `logo`: a small square mark in `public/logos/`; without it the name's first letter stands in.
 */
const company = z.object({
  pill: z.string().min(2),
  logo: z.string().startsWith("/logos/").optional(),
  kind: words(5),
  about: words(24),
});

/** Plain text runs, inline company notes and dictionary terms, read as one sentence. */
const introPart = z.union([
  z.string().min(1),
  company,
  glossaryEntry,
]);

/** One line of the intro schedule: when, a short phrase with pills, and an optional quieter follow-up. */
const introRow = z.object({
  when: words(2),
  icon: z.enum(["sun", "sunset", "moon"]),
  parts: z.array(introPart).min(1).max(4),
  note: z.array(introPart).min(1).max(4).optional(),
  /** A 5:7 photo on the hero face card while this row is on; without it the card shows `avatar`. */
  photo: portrait.optional(),
});

export const heroSchema = z.object({
  greeting: words(5),
  tagline: words(8),
  glossary: z.array(glossaryEntry).max(3).default([]),
  intro: z
    .array(introRow)
    .min(1)
    .max(3)
    .refine(
      (rows) =>
        wordCount(
          rows
            .flatMap((r) => [...r.parts, ...(r.note ?? [])])
            .map((p) => (typeof p === "string" ? p : "pill" in p ? p.pill : p.term))
            .join(" "),
        ) <= 32,
      { message: "The intro is at most 32 words. Cut it, do not raise the limit." },
    ),
  /** Used for metadata and OG images, where the pills cannot render. */
  headline: words(12),
  cta: cta.optional(),
})
  .refine((h) => h.glossary.every((g) => h.tagline.toLowerCase().includes(g.term.toLowerCase())), {
    message: "Every glossary term must appear in the tagline.",
  });

/** The home chapters a card can lead to, one per card. */
export const handTargets = ["about", "work", "showcase", "teaching", "outside"] as const;

/** Card suits: red hearts and diamonds, ink spades and clubs, as on any deck. */
export const suits = ["heart", "spade", "diamond", "club", "joker"] as const;

const art = z.object({ src: z.string().startsWith("/"), srcDark: z.string().startsWith("/").optional() });

/** Illustrated card art for the hand: the joker's centre emblem and the back. Decorative. */
export const deckSchema = z.object({ joker: art, back: art });

export const handSchema = z
  .array(z.object({ title: words(3), text: words(8), href, target: z.enum(handTargets), suit: z.enum(suits) }))
  .max(5);

/** How many items a chapter shows on home; the rest sit behind its `more` link. */
const featured = z.number().int().min(1).max(6).default(3);

/** The home teaser of About: a lead beside the About portrait, then the About beliefs by title. */
export const statementSchema = z.object({
  title: words(5),
  lead: words(24),
  cta: cta.optional(),
});

export const workIntroSchema = z.object({
  title: words(5),
  note: words(10),
  featured,
  more: words(4),
  /** The /work page's own heading; `ask` ends the note with a link to the contact chapter. */
  index: z
    .object({
      eyebrow: words(4),
      title: words(8),
      note: words(12),
      ask: z.object({ link: words(3), text: words(10) }),
    })
    .optional(),
});

export const showcaseSchema = z.object({
  title: words(6),
  note: words(20),
  featured,
  more: words(4),
  items: z
    .array(
      z.object({
        id: slug,
        kicker: words(4),
        title: words(5),
        text: words(14),
        /** Without an image the card shows its suit colour instead. */
        image: image.optional(),
        /** A 9:19.5 phone recording; the item then renders as a full-width feature with the loop in a phone. */
        loop: z.object({ src: z.string().startsWith("/"), poster: z.string().startsWith("/"), alt: z.string().min(8) }).optional(),
        /** Up to three chips that float beside the phone, each a glyph and a short label. */
        tags: z.array(z.object({ icon, label: words(3) })).max(3).optional(),
        detail: words(60),
        link: cta.optional(),
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
  /** Rendered as a handwritten signature above the full name. */
  signoff: words(4),
  /** A 5:7 photo beside the letter. */
  photo: portrait.optional(),
});

export const teachingSchema = z.object({
  title: words(5),
  note: words(20).optional(),
  items: z
    .array(
      z.object({
        place: z.string().min(3),
        icon: icon.optional(),
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
  /** The label above the side work. */
  alongside: words(3).default("Alongside"),
  roles: z
    .array(
      z
        .object({
          from: year,
          /** Omit while the role is current. */
          to: year.optional(),
          company: z.string().min(2),
          /** For companies the hero intro does not name; `icon` stands in where there is no mark at all. */
          logo: z.string().startsWith("/").optional(),
          icon: icon.optional(),
          /** Work alongside the main job; listed after the main roles. */
          side: z.boolean().default(false),
          role: words(5),
          kind: words(3),
          summary: words(18),
          points: z.array(words(16)).max(4).default([]),
          cases: z.array(slug).max(2).default([]),
        })
        .refine((r) => r.to === undefined || r.to >= r.from, { message: "`to` must not be before `from`." }),
    )
    .min(1)
    .max(9),
});

export const valuesSchema = z.object({
  title: words(6),
  note: words(24).optional(),
  /** The working loop, drawn as connected steps above the principles. */
  loop: z.array(z.object({ icon, title: words(2), text: words(16) })).min(2).max(5).optional(),
  items: z.array(z.object({ title: words(6), text: words(30), evidence: slug.optional() })).max(4),
});

export const outsideSchema = z.object({
  title: words(6),
  note: words(20).optional(),
  items: z
    .array(
      z.object({
        title: words(8),
        text: words(40),
        icon: icon.optional(),
        /** `focus` is the CSS object-position that keeps the subject in frame when the photo is cropped. */
        photo: image.extend({ focus: z.string().regex(/^\d{1,3}% \d{1,3}%$/).optional() }).optional(),
      }),
    )
    .max(4),
});

export const siteSchema = z.object({
  name: z.string().min(2),
  role: words(4),
  /** A square photo of the designer, shown in the nav and beside the intro. */
  avatar: portrait.optional(),
  url: z.url(),
  description: words(30),
  hero: heroSchema,
  hand: handSchema.default([]),
  handNote: words(8).optional(),
  deck: deckSchema.optional(),
  statement: statementSchema.optional(),
  work: workIntroSchema,
  showcase: showcaseSchema.optional(),
  testimonials: testimonialsSchema.optional(),
  letter: letterSchema.optional(),
  teaching: teachingSchema.optional(),
  about: z.object({
    /** The page title above the headline. */
    title: words(4),
    headline: words(18),
    story: z.array(words(70)).min(1).max(3),
    portrait: image.extend({ ratio: z.string().regex(/^\d+\/\d+$/).optional() }).optional(),
    /** A band of plain numbers under the opener. */
    facts: z
      .array(z.object({ value: z.string().regex(/^(\$?[\d.,]+[KMB]?|[A-Z][a-z]{1,11})$/, "A number (`12`, `2,250`, `$10M`) or one word; put the unit in `unit`."), unit: z.string().max(3).optional(), label: words(7) }))
      .max(4)
      .default([]),
    beliefs: z
      .object({
        title: words(5),
        items: z.array(z.object({ icon, title: words(8), text: words(30) })).min(2).max(6),
      })
      .optional(),
  }),
  education: educationSchema.default([]),
  educationTitle: words(4).default("Education"),
  /** A PDF under public/; the About page offers it only when set. */
  resume: z.object({ src: z.string().regex(/^\/.+\.pdf$/, "Use a /path to a PDF."), label: words(4) }).optional(),
  journey: journeySchema.optional(),
  values: valuesSchema.optional(),
  outside: outsideSchema.optional(),
  links: z.object({
    /** Without it, no email action shows anywhere. */
    email: z.email().optional(),
    linkedin: z.url(),
    calendar: z.url().optional(),
  }),
  contact: z.object({ headline: words(10), text: words(24) }),
  footnote: words(16).optional(),
});

export type Site = z.infer<typeof siteSchema>;
export type Hero = Site["hero"];
export type GlossaryEntry = Hero["glossary"][number];
export type Company = z.infer<typeof company>;
export type HandCard = Site["hand"][number];
export type Deck = NonNullable<Site["deck"]>;
export type HandTarget = (typeof handTargets)[number];
export type Suit = (typeof suits)[number];
export type Statement = z.infer<typeof statementSchema>;
export type WorkIntro = z.infer<typeof workIntroSchema>;
export type Showcase = z.infer<typeof showcaseSchema>;
export type ShowcaseItem = Showcase["items"][number];
export type Testimonials = z.infer<typeof testimonialsSchema>;
export type Letter = z.infer<typeof letterSchema>;
export type Teaching = z.infer<typeof teachingSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Journey = z.infer<typeof journeySchema>;
export type Values = z.infer<typeof valuesSchema>;
export type Outside = z.infer<typeof outsideSchema>;
