type SocialConfig = {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
};

type ContactConfig = {
  email: string;
  phone: string;
  address: string;
  whatsapp?: string;
};

type SeoConfig = {
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  defaultImage?: string;
  locale: string;
  type: "website" | "article";
  themeColor?: string;
  twitterHandle?: string;
  siteLanguage: string;
  locationSchema: {
    city: string;
    country: string;
    countryCode: string;
  };
};

type NavigationItem = {
  title: string;
  href: string;
  items?: NavigationItem[];
};

export type SiteConfig = {
  name: string;
  domain: string;
  description: string;
  seo: SeoConfig;
  contact: ContactConfig;
  social: SocialConfig;
  navigation: {
    main: NavigationItem[];
    footer: NavigationItem[];
  };
  features: {
    enableSearch?: boolean;
    enableDarkMode?: boolean;
    enableLanguageSelector?: boolean;
  };
};

export const siteConfig: SiteConfig = {
  name: "Isarco",
  description:
    "Con nuestros proyectos y servicios, construimos país, garantizamos futuro.",
  domain: "https://isarco.com.co/",

  seo: {
    titleTemplate: "%s | Isarco",
    defaultTitle: "Isarco - Inmobiliaria y Construcción",
    defaultDescription:
      "Con nuestros proyectos y servicios, construimos país, garantizamos futuro.",
    defaultKeywords: [
      "inmobiliaria",
      "construcción",
      "propiedades",
      "bogotá",
      "colombia",
      "bienes raíces",
      "proyectos inmobiliarios",
    ],
    defaultImage: "/images/og-image.jpg",
    locale: "es_CO",
    type: "website",
    themeColor: "#ffffff",
    siteLanguage: "es",
    locationSchema: {
      city: "Bogotá",
      country: "Colombia",
      countryCode: "CO",
    },
  },

  contact: {
    email: "info@isarco.com.co",
    phone: "+57 (601) 555-0123",
    address: "Carrera 7 # 71-21, Torre B, Piso 13, Bogotá",
    whatsapp: "+57 300 555-0123",
  },

  social: {
    facebook: "https://facebook.com/isarco",
    instagram: "https://instagram.com/isarco",
    linkedin: "https://linkedin.com/company/isarco",
    youtube: "https://youtube.com/@isarco",
  },

  navigation: {
    main: [
      {
        title: "Inicio",
        href: "/",
      },
      {
        title: "Inmobiliaria 360",
        href: "/inmobiliaria-360",
      },
      {
        title: "Servicios",
        href: "/servicios",
        items: [
          {
            title: "Construcción",
            href: "/servicios/construccion",
          },
          {
            title: "Administración",
            href: "/servicios/administracion",
          },
        ],
      },
      {
        title: "Nosotros",
        href: "/nosotros",
      },
      {
        title: "Contacto",
        href: "/contacto",
      },
    ],
    footer: [
      // Similar structure to main navigation
      // but possibly with different grouping/hierarchy
    ],
  },

  features: {
    enableSearch: true,
    enableDarkMode: false,
    enableLanguageSelector: false,
  },
};
