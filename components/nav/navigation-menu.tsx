"use client";

import Link from "next/link";
import * as React from "react";

import Logo from "@/public/logo-35.svg";
import Image from "next/image";

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
  {
    title: "Apartamentos",
    href: "/inmobiliaria-360&categoria=apartamentos",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Oficinas",
    href: "/inmobiliaria-360&categoria=oficinas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Locales Comerciales",
    href: "/inmobiliaria-360&categoria=locales-comerciales",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Bodegas",
    href: "/inmobiliaria-360&categoria=bodegas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export const NavigationMenu = ({ className, children, id }: NavProps) => {
  const { isTransparent } = React.useContext(NavContext);
  const bgClass = isTransparent ? "bg-transparent" : "bg-background/80";
  return (
    <nav
      className={cn(
        "fixed left-0 right-0 z-50 top-0 bg-background/80   ",
        bgClass,
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
          {isTransparent ? "transparent" : "background"}
        </Link>
        {children}
        <div className="flex items-end gap-2 ml-auto">
          <div className="mx-2 hidden md:flex">
            <NavigationMenuPrimitive>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Proyectos</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
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
                  <NavigationMenuTrigger>Inmo 360</NavigationMenuTrigger>
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
                  <Link href="/docs" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Servicios
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/docs" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Acerca
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/docs" legacyBehavior passHref>
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
