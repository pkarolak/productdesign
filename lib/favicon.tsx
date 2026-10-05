import { ImageResponse } from "next/og";
import { meta } from "@theme/meta";

/** The joker's harlequin hat on the canvas tile, in the accent and the ink. */
export function faviconImage(size: number, { rounded = true } = {}) {
  const { canvas, ink, accent } = meta.og;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: canvas,
          borderRadius: rounded ? size * 0.22 : 0,
        }}
      >
        <svg width={size * 0.78} height={size * 0.78} viewBox="0 0 24 24">
          <path fill={accent} d="M3.6 17.5C4.4 12.6 3.9 9 2.6 6.4c3.8.8 6.5 3.4 8 7L12 17.5Z" />
          <path fill={accent} d="M20.4 17.5c-.8-4.9-.3-8.5 1-11.1-3.8.8-6.5 3.4-8 7L12 17.5Z" />
          <circle fill={accent} cx="12" cy="3.2" r="1.6" />
          <path fill={ink} d="M10.6 13.4c.3-4 .8-6.8 1.4-8.8.6 2 1.1 4.8 1.4 8.8L12 17.5Z" />
          <path fill={ink} d="M3.4 18.6h17.2v2.6H3.4Z" />
          <circle fill={ink} cx="2.6" cy="5.2" r="1.6" />
          <circle fill={ink} cx="21.4" cy="5.2" r="1.6" />
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}
