import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "./providers";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/lib/auth/config";
import { SessionWrapper } from "./SessionWrapper";
import { TRPCProvider } from "@/providers/trpc-provider";
import { GeistSans } from "geist/font/sans";

// DM Mono - Used for code, terminal, and monospace text
const dmMono = localFont({
  src: [
    {
      path: "./fonts/DMMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/DMMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-dm-mono",
  display: "swap",
});

// Geist Sans - Primary font for body text and UI
const geistSans = GeistSans;

export const metadata: Metadata = {
  title: "Opensox",
  description: "Find the perfect open source project to contribute",
  icons: {
    icon: "/images/os-image.ico",
  },
  keywords: [
    "opensox",
    "Opensox",
    "Opensox AI",
    "Open Source Projects",
    "Search Open Source Projects",
    "Gsoc Organizations",
    "Open source Startups",
    "trpc",
    "nextjs",
    "open source",
    "Tailwind CSS",
    "TypeScript",
    "React",
    "GSOC mentorship",
    "GSOC proposal",
    "LFX Mentorship",
    "Outreachy",
  ],
  metadataBase: new URL("https://opensox.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: new URL("https://opensox.ai"),
    siteName: "Opensox",
    title: "Opensox | find the perfect open source project to contribute",
    description:
      "Discover curated open source projects in seconds, Filter by stack, personalized recommendations, and more.",
    images: [
      {
        url: "/images/opensox_og.webp",
        width: 1200,
        height: 630,
        alt: "Opensox product preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@opensox",
    title: "Opensox | find the perfect open source project to contribute",
    description:
      "Discover curated open source projects in seconds, Filter by stack, personalized recommendations, and more.",
    images: ["/images/opensox_og.webp"],
    creator: "@ajeetunc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authConfig);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${dmMono.variable} antialiased bg-background`}
      >
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SessionWrapper session={session}>
              <TRPCProvider>{children}</TRPCProvider>
            </SessionWrapper>
          </ThemeProvider>
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
