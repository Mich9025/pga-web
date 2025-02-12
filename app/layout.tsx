import "./globals.css";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { siteConfig } from "@/site.config";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Montserrat as FontSans } from "next/font/google";

// import { NavProvider } from "@/app/context/NavContext";
import { cn } from "@/lib/utils";

import { Footer } from "@/components/footer/Footer";

import { NavigationMenu } from "@/components/nav/nav";
import { NavProvider } from "./context/NavContext";

const font = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  metadataBase: new URL(siteConfig.domain),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen font-sans antialiased", font.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NavProvider>
            <NavigationMenu />
            {children}
            <Footer />
          </NavProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
