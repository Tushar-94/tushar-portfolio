import { ImageResponse } from "next/og";
import { identity, socialImage } from "./site";

export function renderSocialImage() {
  // Next.js 16 ships Geist with ImageResponse; no remote font request is needed.
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "64px 72px", background: "#fafafa", color: "#111", fontFamily: "geist", fontWeight: 400 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        <div style={{ fontSize: 26, letterSpacing: "-0.5px" }}>{identity.name}</div>
        <div style={{ fontSize: 21, color: "#666" }}>{identity.role}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 76, fontSize: 76, lineHeight: 1.08, letterSpacing: "-4px" }}>
        <div>Engineering Intelligence.</div>
        <div style={{ color: "#777" }}>Building What Matters.</div>
      </div>
      <div style={{ display: "flex", marginTop: "auto", borderTop: "1px solid #ddd", paddingTop: 22, fontSize: 18, color: "#666" }}>Applied AI · Machine Learning · Computer Vision</div>
    </div>,
    { width: socialImage.width, height: socialImage.height },
  );
}
