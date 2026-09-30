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

export const siteSchema = z.object({
  name: z.string().min(2),
  role: words(4),
  url: z.url(),
  description: words(30),
  hero: z.object({
    headline: words(12),
    lede: words(20),
    metrics: z.array(metric).length(3),
    plates: z.array(image).min(1).max(3).optional(),
  }),
  approach: z
    .array(z.object({ title: words(6), text: words(24), long: words(50), evidence: z.string() }))
    .length(3),
  about: z.object({
    headline: words(12),
    bio: words(80),
    portrait: image,
    experience: z.array(z.object({ role: words(5), company: z.string(), years: z.string() })).min(2).max(6),
  }),
  links: z.object({
    email: z.email(),
    linkedin: z.url(),
    calendar: z.url().optional(),
  }),
  contact: z.object({ headline: words(10), text: words(24) }),
  footnote: words(16).optional(),
});

export type Site = z.infer<typeof siteSchema>;
