import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { logoPath } from "@/components/logoPath";

// Social sharing image, generated per language so no text is baked into
// a static picture. Fonts are bundled because the default font lacks
// Hungarian letters such as ő and ű.

export const alt = "Bune Quote";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered at build time: the font files are not readable on Cloudflare Workers.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(hasLocale(lang) ? lang : "hu");
  const fonts = join(process.cwd(), "src/assets/fonts");
  const [fraunces, inter] = await Promise.all([
    readFile(join(fonts, "Fraunces-Medium.ttf")),
    readFile(join(fonts, "Inter-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0e0f13 0%, #1c1712 60%, #4a2410 100%)",
          color: "#f1efe9",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="48" height="48" viewBox="0 0 512 512">
            <path d={logoPath} fill="#fb923c" />
          </svg>
          <span style={{ fontFamily: "Fraunces", fontSize: 40 }}>Bune Quote</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Fraunces", fontSize: 76, lineHeight: 1.05, letterSpacing: -1.5 }}>
            {dict.hero.title}
          </div>
          <div style={{ fontFamily: "Fraunces", fontSize: 76, lineHeight: 1.05, letterSpacing: -1.5, color: "#fb923c" }}>
            {dict.hero.titleAccent}
          </div>
          <div style={{ marginTop: 28, fontSize: 28, lineHeight: 1.4, color: "rgba(241,239,233,0.75)", maxWidth: 900 }}>
            {dict.hero.eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(241,239,233,0.6)" }}>
          <span>bunequote.com</span>
          <span>{dict.footer.partOf}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 500, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    },
  );
}
