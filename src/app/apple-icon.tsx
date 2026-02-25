import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0B0E1A",
        borderRadius: "32px",
        fontSize: "100px",
        fontWeight: 300,
        color: "#d4aa6a",
        fontFamily: "serif",
      }}
    >
      D
    </div>,
    { ...size },
  );
}
