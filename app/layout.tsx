import "./globals.css";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { siteConfig } from "@/site.config";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";

// import { NavProvider } from "@/app/context/NavContext";
import { cn } from "@/lib/utils";

import { Footer } from "@/components/footer/Footer";

import { NavigationMenu } from "@/components/nav/nav";
import { NavProvider } from "./context/NavContext";
import Script from "next/script";

const font = FontSans({
  weight: ["200", "400", "500", "600", "700"],
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
  icons: {
    icon: [
      { url: "/final.svg" }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtag/js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','G-BNL8YKKDK4');
              
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BNL8YKKDK4');
            `,
          }}
        />
      </head>
      <body className={cn("min-h-screen font-sans antialiased", font.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NavProvider>
            <NavigationMenu />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </NavProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
