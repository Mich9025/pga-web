"use client";

import { createContext, useEffect, useState } from "react";

export const NavContext = createContext({
  isSticky: false,
  setIsSticky: (value: boolean) => {},
  variant: "default",
  setVariant: (value: string) => {},
  isTransparent: true,
  setIsTransparent: (value: boolean) => {},
});

export const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [variant, setVariant] = useState("default");
  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    const heroSection = document.getElementById("hero-section");
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTransparent(entry.isIntersecting);
      },
      {
        root: null, // Observe relative to viewport
        threshold: 0.1, // When 10% of the hero is visible
        rootMargin: "-400px 0px 0px 0px", // Offset (triggers 100px earlier)
      }
    );

    observer.observe(heroSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <NavContext.Provider
      value={{
        isSticky,
        setIsSticky,
        variant,
        setVariant,
        isTransparent,
        setIsTransparent,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
