import { createContext, useState } from "react";

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
