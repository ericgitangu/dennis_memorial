import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0B0E1A",
        borderRadius: "6px",
        fontSize: "18px",
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
