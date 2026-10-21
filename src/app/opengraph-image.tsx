import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/config/site";

export const alt = "HAX Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [extraBold, medium] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/manrope-800.woff")),
    readFile(join(process.cwd(), "src/app/fonts/manrope-500.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7F5F0",
          fontFamily: "Manrope",
          color: "#0B0F19",
        }}
      >
        <svg width="220" height="220" viewBox="0 0 48 48">
          <rect x="7" y="7" width="8" height="34" rx="2" fill="#0B0F19" />
          <rect x="33" y="7" width="8" height="34" rx="2" fill="#0B0F19" />
          <rect x="15" y="22" width="18" height="4" fill="#0B0F19" />
          <rect x="19.5" y="18.5" width="9" height="11" rx="2.5" fill="#2563EB" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 100 }}>
          <div style={{ fontSize: 190, fontWeight: 800, letterSpacing: 2, lineHeight: 1 }}>HAX</div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 500,
              letterSpacing: 36,
              lineHeight: 1,
              marginTop: 16,
              marginLeft: 6,
            }}
          >
            SYSTEMS
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 44,
            fontSize: 30,
            fontWeight: 500,
            color: "#4B5563",
          }}
        >
          {SITE_CONFIG.tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: extraBold, weight: 800, style: "normal" },
        { name: "Manrope", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
