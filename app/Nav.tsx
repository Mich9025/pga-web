"use client";

import { NavigationMenu } from "@/components/nav/navigation-menu";
import { NavProvider } from "./context/NavContext";

export const Nav = () => {
  return (
    <NavProvider>
      <NavigationMenu />
    </NavProvider>
  );
};
