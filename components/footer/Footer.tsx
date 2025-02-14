import { Container, Section } from "@/components/craft";
import { getAllFromCustomPostType } from "@/lib/wordpress";
import { SocialProfile } from "@/lib/wordpress.d";
import { blogMenu, mainMenu } from "@/menu.config";
import LogoFooter from "@/public/images/logo_negativo/logo_negativo_vertical.png";
import { siteConfig } from "@/site.config";
import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSpotify,
  FaTelegram,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

import Balancer from "react-wrap-balancer";
export const Footer = async () => {
  const socials = await getAllFromCustomPostType<SocialProfile>(
    "social-profiles"
  );

  return (
    <footer className="bg-black text-primary-foreground py-4 md:py-8 lg:py-12">
      <Section className="">
        <Container className="gridX md:grid-cols-[2.2fr_1fr_1fr_1fr] gap-12 hidden">
          <div className="flex flex-col gap-6 not-prose">
            <div className="text-center max-w-80 flex flex-col gap-6">
              <Link href="/">
                <h3 className="sr-only">{siteConfig.name}</h3>
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
                <Balancer>{siteConfig.description}</Balancer>
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
                {socials.map((social) => {
                  const title = social.title.rendered;
                  const iconMap: { [key: string]: any } = {
                    YouTube: FaYoutube,
                    LinkedIn: FaLinkedin,
                    Instagram: FaInstagram,
                    Facebook: FaFacebook,
                    Twitter: FaTwitter,
                    WhatsApp: FaWhatsapp,
                    Telegram: FaTelegram,
                    Email: FaEnvelope,
                    Spotify: FaSpotify,
                    TikTok: FaTiktok,
                  };

                  const Icon = iconMap[title];

                  return (
                    <Link
                      key={`social-profile-${social.id}`}
                      className="aspect-square p-1.5 flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-primary"
                      href={social.profile_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="sr-only">
                        {title}: {social.handler}
                      </span>
                      {Icon && <Icon className="size-5" />}
                    </Link>
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
                    href="mailto:contacto@pgaconstructores.co"
                    aria-label="Email Address"
                  >
                    <span className="sr-only">Email: </span>
                    contacto@pgaconstructores.co
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
            <div className="aspect-square p-2 mt-4 rounded-sm bg-white max-w-[200px]">
              <Image
                src={
                  "https://pgaconstructores.co/wp-content/uploads/Codigo-QR-para-PQRS-q1mmsl745h1ba527tjeae7lr7dzieqqj8fb0yigc7g.png"
                }
                alt="Codigo QR para PQRS"
                className="w-full h-full"
                width={400}
                height={400}
              />
            </div>
          </div>
        </Container>
        <Container className="border-t border-muted-foreground not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          {/* <ThemeToggle /> */}
          <p className="text-primary-foreground/70">
            &copy; {new Date().getFullYear()}{" "}
            <a className="hover:underline" href="https://pgaconstructores.co">
              Isarco
            </a>
            . Todos los derechos reservados.
          </p>
          <p className="text-primary-foreground/70">
            <a
              className="hover:underline"
              href="http://pgaconstructores.co/politicas-de-datos/"
            >
              Políticas de tratamiento de datos personales
            </a>
          </p>
        </Container>
      </Section>
    </footer>
  );
};
