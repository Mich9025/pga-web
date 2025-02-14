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

// TODO: Add more SEO config & metadata
export const siteConfig: SiteConfig = {
  name: "PGA",
  description:
    "Con nuestros proyectos y servicios, construimos país, garantizamos futuro.",
  domain: "https://pgaconstructores.co/",

  seo: {
    titleTemplate: "%s | PGA",
    defaultTitle: "PGA Constructores",
    defaultDescription:
      "Con nuestros proyectos y servicios, construimos país, garantizamos futuro.",
    defaultKeywords: [],
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
    email: "",
    phone: "",
    address: "",
    whatsapp: "",
  },

  social: {
    facebook: "https://facebook.com/pga",
    instagram: "https://instagram.com/pga",
    linkedin: "https://linkedin.com/company/pga",
    youtube: "https://youtube.com/@pga",
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
