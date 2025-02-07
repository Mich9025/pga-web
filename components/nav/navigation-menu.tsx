"use client";

import Link from "next/link";
import * as React from "react";

import LogoColor from "@/public/images/logo/logo_horizontal.png";
import Logo from "@/public/logo-35.svg";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { Container } from "@/components/craft";

import { NavContext } from "@/app/context/NavContext";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu as NavigationMenuPrimitive,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const components: { title: string; href: string; description: string }[] = [
  //   {
  //     title: "Apartamentos",
  //     href: "/inmobiliaria-360&categoria=apartamentos",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   },
  //   {
  //     title: "Oficinas",
  //     href: "/inmobiliaria-360&categoria=oficinas",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   },
  //   {
  //     title: "Locales Comerciales",
  //     href: "/inmobiliaria-360&categoria=locales-comerciales",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   },
  //   {
  //     title: "Bodegas",
  //     href: "/inmobiliaria-360&categoria=bodegas",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   },
  {
    title: "Servicios",
    href: "/inmobiliaria-360",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Encuentra el espacio ideal",
    href: "/inmuebles",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export const NavigationMenu = ({ className, children, id }: NavProps) => {
  // check if home page
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { isTransparent, setIsTransparent } = React.useContext(NavContext);

  React.useEffect(() => {
    const hero = document.getElementById("hero-section");

    if (!hero) {
      setIsTransparent(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTransparent(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, [setIsTransparent]);

  return (
    <nav
      className={cn(
        "left-0 right-0 z-50 top-0 transition-all duration-150",
        isHome ? "fixed" : "fixed",
        isTransparent ? "bg-transparent" : "bg-white shadow-md",
        className
      )}
      id={id}
    >
      <Container
        id="nav-container"
        className={cn(
          "lg:px-0 flex justify-between items-center transition-transform duration-150",
          isTransparent ? "h-28 text-white" : "h-12"
        )}
      >
        <Link
          className="hover:opacity-75 transition-all flex gap-4 items-center"
          href="/"
        >
          {isTransparent ? (
            <Image
              src={Logo}
              alt="Isarco"
              loading="eager"
              className="max-h-20"
              width={140 * 1.2}
              height={44 * 1.2}
            ></Image>
          ) : (
            <Image
              src={LogoColor}
              alt="Isarco"
              loading="eager"
              className="max-h-20"
              width={140 * 1.2}
              height={44 * 1.2}
            ></Image>
          )}
        </Link>
        {children}
        <div className="flex items-end gap-2 ml-auto">
          <div className="mx-2 hidden md:flex">
            <NavigationMenuPrimitive>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Proyectos</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] items-center">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              heading
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Sed eget lacus in libero egestas mollis. Sed
                              ut semper est. Nullam euismod, nisi eu mollis
                              mollis, semper libero.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/docs" title="Tinguazul">
                        Tinguazul es un proyecto residencial en Bogotá que
                        combina naturaleza, comodidad y ubicación estratégica.
                      </ListItem>
                      <ListItem href="/docs/installation" title="Proyecto 2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed eget lacus in libero egestas mollis. Sed ut semper
                        est. Nullam
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    Inmobiliaria 360
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-x-3 p-2 md:w-[500px] md:grid-cols-2 lg:w-[700px]">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/acerca" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Acerca
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contacto" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Contacto
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenuPrimitive>
          </div>
        </div>
      </Container>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href ?? "#"}
          className={cn(
            "block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-base font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
