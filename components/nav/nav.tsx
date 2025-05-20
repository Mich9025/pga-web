"use client";

import Link from "next/link";

import Logo from "@/public/images/logo/Logo_horizontal.svg";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { Container } from "@/components/craft";

import { NavContext } from "@/app/context/NavContext";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu as NavigationMenuPrimitive,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useContext,
  useEffect,
} from "react";

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Apartamentos",
//     href: "/inmuebles?types=apartamentos",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
//   {
//     title: "Oficinas",
//     href: "/inmuebles?types=oficinas",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
//   {
//     title: "Locales Comerciales",
//     href: "/inmuebles?types=locales-comerciales",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
//   {
//     title: "Bodegas",
//     href: "/inmuebles?types=bodegas",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
//   {
//     title: "Depósitos",
//     href: "/inmuebles?types=deposito",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
//   // {
//   //   title: "Servicios",
//   //   href: "/inmobiliaria-360",
//   //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   // },
//   // {
//   //   title: "Encuentra el espacio ideal",
//   //   href: "/inmuebles",
//   //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   // },
// ];

const navItems = [
  {
    title: "Proyectos",
    href: "/proyectos",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  // {
  //   title: "Servicios",
  //   href: "/servicios",
  //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  // },
  {
    title: "Nosotros",
    href: "/nosotros",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Contacto",
    href: "/contacto",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export const NavigationMenu = ({ className, children, id }: NavProps) => {
  // check if home page
  const pathname = usePathname();
  // const isHome = pathname === "/";
  const { isTransparent, setIsTransparent } = useContext(NavContext);

  useEffect(() => {
    // Reset transparency state on page change
    setIsTransparent(true);

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
  }, [setIsTransparent, pathname]);

  return (
    <nav
      className={cn(
        "left-0 right-0 z-50 top-0 transition-all duration-150  border-b fixed",
        isTransparent
          ? "bg-transparent border-transparent"
          : "bg-background/90 border-foreground/10",
        className
      )}
      id={id}
    >
      <Container
        id="nav-container"
        className={cn(
          "flex justify-between items-center transition-transform duration-150",
          isTransparent ? " text-white !py-12" : " !py-6"
        )}
      >
        <Link
          className="hover:opacity-90 transition-all flex gap-4 items-center"
          href="/"
        >
          <Image
            src={Logo}
            alt="PGA"
            loading="eager"
            className={cn(
              "max-h-20",
              isTransparent ? "text-white invert" : "text-black"
            )}
            width={140 * 1.2}
            height={44 * 1.2}
          ></Image>
        </Link>
        {children}
        <div className="flex items-end gap-2 ml-auto">
          <div className="mx-2 hidden md:flex">
            <NavigationMenuPrimitive>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={`nav-item-${item.title}`}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenuPrimitive>
          </div>
        </div>
      </Container>
    </nav>
  );
};

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, href, ...props }, ref) => {
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
  }
);
ListItem.displayName = "ListItem";
