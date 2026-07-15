import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: the brand mark, generated so there's no binary asset to maintain. */
export default async function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#06cbb2",
        borderRadius: 7,
      }}
    >
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <circle cx="11" cy="20" r="3.75" fill="#003331" />
        <path d="M13.5 17.5 L18.5 12.5" stroke="#003331" strokeWidth="3" strokeLinecap="round" />
        <circle cx="21" cy="10" r="3.75" fill="#003331" />
      </svg>
    </div>,
    size,
  );
}
