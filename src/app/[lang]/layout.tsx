import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Inter, Source_Serif_4 } from "next/font/google";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ogLocale, siteUrl } from "@/lib/seo";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Bune Quote",
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${lang}`,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${serif.variable} antialiased`}
    >
      <body className="min-h-screen">
        {children}
        {/* Cloudflare Web Analytics: cookieless, aggregate visit statistics (see the privacy notice). */}
        {process.env.NODE_ENV === "production" && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "fa3198b7ed5845e78f7a35661ed88409"}'
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
