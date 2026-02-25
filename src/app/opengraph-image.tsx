import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Denis Letian Sekento Memorial — 5 Feb 1985 – 21 Feb 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0B0E1A",
        fontFamily: "serif",
      }}
    >
      {/* Gold border frame */}
      <div
        style={{
          position: "absolute",
          inset: "16px",
          border: "2px solid rgba(212, 170, 106, 0.4)",
          borderRadius: "8px",
          display: "flex",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            color: "#d4aa6a",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          In Loving Memory
        </div>

        <div
          style={{
            fontSize: "56px",
            color: "#E8ECF4",
            fontWeight: 300,
            letterSpacing: "0.02em",
          }}
        >
          Denis Letian Sekento
        </div>

        <div
          style={{
            fontSize: "18px",
            color: "#8B92A8",
            letterSpacing: "0.2em",
            fontFamily: "monospace",
          }}
        >
          1 January 1985 — 21 February 2026
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: "200px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #d4aa6a, transparent)",
            margin: "8px 0",
            display: "flex",
          }}
        />

        <div
          style={{
            fontSize: "24px",
            color: "#d4aa6a",
            fontStyle: "italic",
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          &ldquo;He fought a good fight, finished the course, and kept the faith.&rdquo;
        </div>

        <div
          style={{
            fontSize: "14px",
            color: "#8B92A8",
            letterSpacing: "0.2em",
            fontFamily: "monospace",
          }}
        >
          — 2 Timothy 4:7
        </div>

        <div
          style={{
            marginTop: "16px",
            fontSize: "16px",
            color: "#8B92A8",
          }}
        >
          Burial: Friday 28 February 2026 | Naserian, Kajiado
        </div>
      </div>
    </div>,
    { ...size },
  );
}
