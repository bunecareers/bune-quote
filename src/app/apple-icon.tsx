import { ImageResponse } from "next/og";
import { logoPath } from "@/components/logoPath";

// Home-screen icon for iOS (PNG, since iOS ignores SVG icons).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#c2410c" }}>
        <svg width="128" height="128" viewBox="0 0 512 512">
          <path d={logoPath} fill="#ffffff" />
        </svg>
      </div>
    ),
    size,
  );
}
