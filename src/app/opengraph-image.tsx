import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, generated at build time.
 *
 * Rendered by Satori, which supports a subset of CSS — no Tailwind classes, no
 * external assets. Everything here is inline styles and system fonts on
 * purpose, so the image never depends on a network fetch.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0b0e12",
        padding: 80,
        // Faint accent glow in the top-right.
        backgroundImage:
          "radial-gradient(circle at 85% 10%, rgba(6, 203, 178, 0.22), transparent 55%)",
      }}
    >
      {/* Brand mark + wordmark */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "#06cbb2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
            <circle cx="11" cy="20" r="3.25" fill="#003331" />
            <path
              d="M13.5 17.5 L18.5 12.5"
              stroke="#003331"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="21" cy="10" r="3.25" fill="#003331" />
          </svg>
        </div>
        <div style={{ color: "#f6f8f9", fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>
          {siteConfig.name}
        </div>
      </div>

      {/* Headline */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            color: "#ffffff",
            fontSize: 76,
            fontWeight: 600,
            letterSpacing: -3,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          Bridging worlds with premium telecom services
        </div>
        <div style={{ color: "#8595a5", fontSize: 30, maxWidth: 820, lineHeight: 1.35 }}>
          Wholesale voice termination and A2P SMS across Africa, the Middle East, and beyond.
        </div>
      </div>

      {/* Footer strip */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 40, height: 4, background: "#06cbb2", borderRadius: 2 }} />
        <div style={{ color: "#66798a", fontSize: 26 }}>{siteConfig.domain}</div>
      </div>
    </div>,
    size,
  );
}
