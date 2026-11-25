import Script from "next/script";
import { NadooAd } from "@/components/NadooAd";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { OG_IMAGE } from "@/lib/seo";
import { SITE_NAME, SITE_SUB, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { CoupangSticky } from "@/components/CoupangSticky";

const sans = Noto_Sans_KR({ subsets: ["latin"], variable: "--font-noto-sans", weight: ["400", "500", "700"] });
const serif = Noto_Serif_KR({ subsets: ["latin"], variable: "--font-noto-serif", weight: ["400", "600", "700"] });

const description = `${SITE_TAGLINE}. ${SITE_SUB}`;

export const metadata: Metadata = {
  verification: { google: "LglMaYLzS6dacAPQ5ZgZdPgzdtfLbp_1Rk5vh3WNPlM", other: { "naver-site-verification": "eacfb005433838c54bcc3591a96066efbf1b8ac2" } },
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} · 정사와 연의로 읽는 삼국지`, template: `%s · ${SITE_NAME}` },
  description,
  applicationName: SITE_NAME,
  keywords: ["삼국지", "정사 삼국지", "삼국지연의", "진수", "조조", "유비", "제갈량", "적벽대전", "사자성어", "고구려", "관구검", "나두삼국지", "Three Kingdoms"],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} · 정사와 연의로 읽는 삼국지`,
    description,
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title: SITE_NAME, description, images: [OG_IMAGE.url] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${sans.variable} ${serif.variable} min-h-screen bg-bg font-sans text-ink antialiased`}>
        <Header />
        <main>{children}<NadooAd /></main>
        <Footer />
        <CoupangSticky />
        <Analytics />
        <Script src="https://nadoo-ads.vercel.app/ads.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
