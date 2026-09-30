import { ImageResponse } from "next/og";
import { meta } from "@theme/meta";

export const ogSize = { width: 1200, height: 630 };

type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

async function loadFont(weight: Weight) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(meta.og.fontFamily)}:wght@${weight}`,
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return { name: meta.og.fontFamily, data: await fetch(url).then((r) => r.arrayBuffer()), weight, style: "normal" as const };
  } catch {
    return null;
  }
}

/** Only public teaser fields go in here: never artifacts of a protected case. */
export async function renderOg({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  const c = meta.og;
  const fonts = (await Promise.all(c.fontWeights.map((w) => loadFont(w as Weight)))).filter((f) => f !== null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: c.canvas,
          color: c.ink,
          fontFamily: fonts.length ? c.fontFamily : "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -200,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 240,
            bottom: -320,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${c.glow2} 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle at center, ${c.dot} 1px, transparent 1.6px)`,
            backgroundSize: "26px 22.52px",
          }}
        />
        <div style={{ display: "flex", fontSize: 26, color: c.ink2, letterSpacing: "-0.01em" }}>{eyebrow}</div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 90 ? 50 : 60,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            fontWeight: 400,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: c.ink2 }}>
          <div style={{ width: 12, height: 12, borderRadius: 9999, background: c.accent }} />
          {footer}
        </div>
      </div>
    ),
    { ...ogSize, fonts: fonts.length ? fonts : undefined },
  );
}
