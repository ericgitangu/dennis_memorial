import type { Metadata } from "next";
import { Cormorant_Garamond, Crimson_Pro, DM_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SharePrintWidget } from "@/components/SharePrintWidget";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

const crimson = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const siteUrl = process.env.APP_URL || "https://denis-sekento-memorial.fly.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Denis Letian Sekento | In Loving Memory (1985 – 2026)",
    template: "%s | Denis Letian Sekento Memorial",
  },
  description:
    "In loving memory of Denis Letian Sekento (5 Feb 1985 – 21 Feb 2026). He fought a good fight, finished the course, and kept the faith. Burial: Thursday 27 Feb 2026, Kipeto, Kajiado.",
  keywords: [
    "Denis Letian Sekento",
    "memorial",
    "obituary",
    "Kipeto",
    "Kajiado",
    "Maasai",
    "burial",
    "2 Timothy 4:7",
  ],
  authors: [{ name: "Eric Gitangu", url: "https://developer.ericgitangu.com" }],
  creator: "Eric Gitangu",
  openGraph: {
    title: "Denis Letian Sekento | In Loving Memory (1985 – 2026)",
    description:
      "He fought a good fight, finished the course, and kept the faith. — 2 Timothy 4:7. Burial: Thursday 27 Feb 2026, Kipeto, Kajiado.",
    url: siteUrl,
    siteName: "Denis Letian Sekento Memorial",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Denis Letian Sekento | In Loving Memory",
    description: "He fought a good fight, finished the course, and kept the faith. — 2 Timothy 4:7",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${crimson.variable} ${dmMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <SharePrintWidget />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
