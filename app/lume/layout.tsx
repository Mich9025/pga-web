import "../globals.css";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Script from "next/script";

const font = FontSans({
  weight: ["200", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Unique Lume",
  description: "Descubre Unique Lume, un proyecto inmobiliario exclusivo que redefine el lujo y la elegancia en cada detalle.",
  keywords: "inmobiliario, lujo, exclusivo, apartamentos, Bogotá, Unique Lume",
  icons: {
    icon: [
      { url: "/final.svg" }
    ],
  },
  openGraph: {
    title: "Unique Lume",
    description: "Descubre Unique Lume, un proyecto inmobiliario exclusivo que redefine el lujo y la elegancia en cada detalle.",
    images: [{
      url: "https://api.pgaconstructores.co/wp-content/uploads/2025/07/Unique_Rosales-CDLP-Terraza-exteriorVF-I.A1.8-JPG-scaled.jpg",
      width: 1200,
      height: 630,
      alt: "Unique Lume"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unique Lume",
    description: "Descubre Unique Lume, un proyecto inmobiliario exclusivo que redefine el lujo y la elegancia en cada detalle.",
    images: ["https://api.pgaconstructores.co/wp-content/uploads/2025/07/Unique_Rosales-CDLP-Terraza-exteriorVF-I.A1.8-JPG-scaled.jpg"],
  },
};

export default function LumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
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
          {/* Sin NavigationMenu ni Footer para esta landing page exclusiva */}
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}