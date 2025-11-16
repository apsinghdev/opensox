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

const dmReg = localFont({
  src: "./fonts/DMMono-Regular.ttf",
  variable: "--font-dm-mono-req",
});

const dmMed = localFont({
  src: "./fonts/DMMono-Medium.ttf",
  variable: "--font-dm-mono-med",
});

export const metadata: Metadata = {
  title: "Opensox",
  description: "Find the perfect open source project to contribute",
  icons: {
    icon: "/images/os-image.ico",
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
        className={`${GeistSans.className} ${dmMed.variable} ${dmReg.variable} antialiased bg-background`}
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
