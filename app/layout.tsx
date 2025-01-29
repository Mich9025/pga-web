import "./globals.css";

import { Container, Section } from "@/components/craft";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { blogMenu, mainMenu, menuSocials } from "@/menu.config";
import { siteConfig } from "@/site.config";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Montserrat as FontSans } from "next/font/google";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

import LogoFooter from "@/public/images/logo_negativo/logo_negativo_vertical.png";
import Logo from "@/public/logo-35.svg";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { NavigationMenu } from "@/components/nav/navigation-menu";
import { cn } from "@/lib/utils";

const font = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "WordPress & Next.js Starter by 9d8",
  description:
    "A starter template for Next.js with WordPress as a headless CMS.",
  metadataBase: new URL(siteConfig.site_domain),
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
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

const Nav = ({ className, children, id }: NavProps) => {
  return (
    <nav
      className={cn(
        "fixed left-0 right-0 z-50 top-0 bg-background/80   ",
        className
      )}
      id={id}
    >
      <Container
        id="nav-container"
        className="py-4 lg:px-0 flex justify-between items-center"
      >
        <Link
          className="hover:opacity-75 transition-all flex gap-4 items-center"
          href="/"
        >
          <Image
            src={Logo}
            alt="Logo"
            loading="eager"
            className="max-h-20"
            width={140 * 1.2}
            height={44 * 1.2}
          ></Image>
        </Link>
        {children}
        <div className="flex items-end gap-2 ml-auto">
          <div className="mx-2 hidden md:flex">
            <NavigationMenu />
          </div>
        </div>
      </Container>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-4 md:py-8 lg:py-12">
      <Section>
        <Container className="grid md:grid-cols-[2.2fr_1fr_1fr_1fr] gap-12">
          <div className="flex flex-col gap-6 not-prose">
            <div className="text-center max-w-80 flex flex-col gap-6">
              <Link href="/">
                <h3 className="sr-only">{siteConfig.site_name}</h3>
                <Image
                  src={LogoFooter}
                  alt="Logo"
                  loading="eager"
                  className="max-w-56 mx-auto"
                  width={249 * 1}
                  height={257 * 1}
                ></Image>
              </Link>
              <p>
                <Balancer>{siteConfig.site_description}</Balancer>
              </p>
              <p className="text-center">
                <a
                  className="hover:underline md:text-lg"
                  href="https://www.instagram.com/isarco.oficial/"
                >
                  @isarco.oficial
                </a>
              </p>
              <div className="flex gap-3 max-w-80 items-center justify-center">
                {Object.entries(menuSocials).map(([key, href]) => {
                  const iconMap: { [key: string]: any } = {
                    YouTube: FaYoutube,
                    LinkedIn: FaLinkedin,
                    Instagram: FaInstagram,
                    Facebook: FaFacebook,
                  };

                  const Icon = iconMap[key];

                  return (
                    <a
                      className="aspect-square p-1.5 flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-primary"
                      href={href}
                      key={href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="sr-only">
                        {key}: {href}
                      </span>
                      {Icon && <Icon className="size-5" />}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm md:text-base">
            <h5 className="font-medium text-base md:text-2xl mb-2">
              Mapa del sitio
            </h5>
            {Object.entries(mainMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4 text-primary-foreground/80 hover:text-primary-foreground"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm md:text-base">
            <h5 className="font-medium text-base md:text-2xl mb-2">Blog</h5>
            {Object.entries(blogMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4 mb-4 text-primary-foreground/80 hover:text-primary-foreground"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm md:text-base">
            <h5 className="font-medium text-base md:text-2xl mb-2">Contacto</h5>
            <address
              className="not-prose not-italic flex flex-col gap-2"
              aria-label="Contact Information"
            >
              <div className="location" aria-label="Physical Address">
                <p>Calle 103 #19-60 Piso 4</p>
                <p>Bogotá, D.C. Colombia</p>
              </div>
              <div className="contact" aria-label="Contact Details">
                <p>
                  <a href="tel:+57182222222" aria-label="Phone Number">
                    <span className="sr-only">Teléfono: </span>+57 1 822 222 22
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:contacto@isarco.com.co"
                    aria-label="Email Address"
                  >
                    <span className="sr-only">Email: </span>
                    contacto@isarco.com.co
                  </a>
                </p>
              </div>
            </address>
            <h5 className="font-medium text-base md:text-2xl mt-4 mb-2">
              PQRS
            </h5>
            <small>
              Para radicar una PQRS escaneé el código QR o haga clic aquí:
            </small>
            <div className="aspect-square p-2 mt-4 rounded-sm bg-white">
              <Image
                src={
                  "https://isarco.com.co/wp-content/uploads/Codigo-QR-para-PQRS-q1mmsl745h1ba527tjeae7lr7dzieqqj8fb0yigc7g.png"
                }
                alt="Codigo QR para PQRS"
                width={200}
                height={200}
              />
            </div>
          </div>
        </Container>
        <Container className="border-t border-muted-foreground not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          {/* <ThemeToggle /> */}
          <p className="text-primary-foreground/70">
            &copy; {new Date().getFullYear()}{" "}
            <a className="hover:underline" href="https://isarco.com.co">
              Isarco
            </a>
            . Todos los derechos reservados.
          </p>
          <p className="text-primary-foreground/70">
            <a
              className="hover:underline"
              href="http://isarco.com.co/politicas-de-datos/"
            >
              Políticas de tratamiento de datos personales
            </a>
          </p>
        </Container>
      </Section>
    </footer>
  );
};
