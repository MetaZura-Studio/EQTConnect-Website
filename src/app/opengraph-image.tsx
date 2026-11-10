import { ImageResponse } from "next/og";

export const alt = "EQTConnect — Run every AGM from one connected platform.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social sharing image for every route. Replace with approved brand artwork when available. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #0c0618 0%, #150a2a 55%, #4c1d95 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="9" fill="rgba(255,255,255,0.1)" />
            <path d="M10 11c8 0 4 10 12 10" stroke="#a78bfa" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <circle cx="10" cy="11" r="3" fill="#fff" />
            <circle cx="22" cy="21" r="3" fill="#7c3aed" />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>EQTConnect</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.04, letterSpacing: -3, maxWidth: 940 }}>
            Run every AGM from one connected platform.
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.65)", maxWidth: 900 }}>
            Shareholder data · AGM invitations · Dispatch tracking · Reporting
          </div>
        </div>
      </div>
    ),
    size,
  );
}
