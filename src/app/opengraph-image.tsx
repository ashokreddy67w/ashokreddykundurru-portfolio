import { ImageResponse } from "next/og";

export const alt = "Ashok Reddy Kundurru: Building the future, one product at a time.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#060606",
        color: "#f1efe8",
      }}
    >
      <div style={{ fontSize: 22, letterSpacing: 6, color: "#8d8a81" }}>FULL-STACK DEVELOPMENT · AI · SAAS</div>
      <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 0.92, letterSpacing: -4, display: "flex", flexDirection: "column" }}>
        <span>BUILDING THE FUTURE,</span>
        <span style={{ color: "#c8ff3e" }}>ONE PRODUCT AT A TIME.</span>
      </div>
    </div>,
    size,
  );
}
