# Brief de Arquitectura: Portal Inmobiliario

## Resumen Ejecutivo

Portal web inmobiliario enfocado en propiedades premium y proyectos de construcción en Colombia, con énfasis en experiencia de usuario y conversión de leads.

## Objetivos Principales

- Maximizar conversión de leads
- Destacar proyectos nuevos
- Facilitar búsqueda de propiedades
- Posicionar servicios inmobiliarios

## Arquitectura Técnica

- Frontend: Next.js 14 (App Router)
- Backend: WordPress (Headless CMS)
- Base de datos: MySQL (WordPress)
- Hosting:
  - Frontend: Vercel
  - CMS: WordPress hosting
- CDN: Vercel Edge

### Headless

```mermaid
graph TD
    subgraph Traditional[Traditional WordPress]
        WPdb[(MySQL Database)]
        WPback[WordPress Backend - WP-Admin]
        WPfront[WordPress Frontend]
        WPtheme[Theme PHP/HTML, Plugins, etc]
        WPchannel[Single Channel - Website Pages]

        WPdb --> WPback
        WPback --> WPfront
        WPfront --> WPtheme
        WPtheme --> WPchannel
    end

    subgraph Headless[Headless Architecture]
        subgraph WPBackend[WordPress Backend]
            Hdb[(MySQL Database)]
            Hback[WordPress Backend]
            HAPI[REST API / GraphQL]

            Hdb --> Hback
            Hback --> HAPI
        end

        subgraph NextFrontend[NextJS Frontend]
            Next1[NextJS Frontend]
            Channel1[Web]

            Next1 --> Channel1
        end

        HAPI --> Next1
    end

    style Traditional fill:#7494C6,stroke:#333,stroke-width:2px
    style Headless fill:#E991B1,stroke:#333,stroke-width:2px
    style WPBackend fill:#D4729B,stroke:#333,stroke-width:1px
    style NextFrontend fill:#FF9DC4,stroke:#333,stroke-width:1px
```

### WordPress (Backend)

Funciona como un CMS headless
Gestiona todo el contenido a través del panel admin
Expone los datos via REST API o GraphQL (con plugin)
Almacena medios, posts, pages y custom post types

### NextJS (Frontend)

Consume datos de WordPress en build time
Genera páginas estáticas con ISR (Incremental Static Regeneration)
Maneja toda la UI y experiencia de usuario
Se conecta al API de WordPress para datos dinámicos

### Vercel (Deployment & CDN)

Maneja el deployment del frontend
Distribuye el contenido via Edge Network
Gestiona revalidaciones y regeneración de páginas

```mermaid
flowchart TD
    subgraph WP[WordPress Backend]
        direction TB
        CMS[CMS Admin Panel]
        API[WP REST API]
        DB[(MySQL)]
        CMS --> DB
        DB --> API
    end

    subgraph NJ[NextJS Frontend]
        direction TB
        PAGES[Pages & Components]
        BUILD[Build Time]
        CACHE[Incremental Static Regeneration]
        BUILD --> PAGES
        CACHE --> PAGES
    end

    subgraph CD[Content Delivery]
        direction TB
        VERCEL[Vercel Edge Network]
        USER[Usuario Final]
        VERCEL --> USER
    end

    API -->|REST API / GraphQL| BUILD
    API -->|Revalidación| CACHE
    PAGES -->|Deploy| VERCEL

    style WP fill:#f5f5f5,stroke:#333,stroke-width:2px
    style NJ fill:#f5f5f5,stroke:#333,stroke-width:2px
    style CD fill:#f5f5f5,stroke:#333,stroke-width:2px
```

## Diagrama de Sitio

```mermaid
graph LR
    A[Landing] --> B[Proyectos]
    X --> C[Inmuebles + Categories]
    A --> X[Inmo-360]
    X --> D[Servicios]
    A --> E[Acerca]
    A --> F[Blog]
    A --> G[Contacto]
    A --> H[PQRS]

    B --> B1[Proyecto Show]
    C --> C1[Encuentra]
    C1 --> CC1[Inmueble Show]
    C --> C2[Consigna]
    C --> C3[Requerimientos]
    D --> D4[Modal - Construcción]
    D --> D5[Modal - Administración PH]
    D --> D6[Modal - Arriendos]

    E --> E1[Nosotros]
    E --> E2[Responsabilidad Social]
    E --> E3[Historia]

    F --> F1[Artículo]
    F --> F2[Podcast]
```

## Componentes Principales

### Landing

- Hero slider con proyectos destacados
- Buscador avanzado de propiedades
- Sección de proyectos nuevos
- Testimonios
- Calculadora hipotecaria

### Proyectos

- Filtros por ubicación/precio/etapa
- Galería de imágenes 360°
- Planos interactivos
- Formulario de contacto integrado

### Inmuebles

- Búsqueda por mapa
- Filtros avanzados
- Comparador de propiedades
- Tours virtuales

### Servicios

- Servicios de valoración
- Asesoría legal
- Gestión de arrendamientos
- Inversión inmobiliaria

## Aspectos Técnicos

### SEO

- URLs amigables
- Meta tags dinámicos
- Sitemap XML
- Schema.org markup

### Seguridad

- SSL/TLS
- Autenticación JWT
- Rate limiting
- Validación de formularios

### Rendimiento

- Lazy loading
- Optimización de imágenes
- Caché de servidor
- Minificación de assets

## Integraciones

- CRM inmobiliario
- Pasarela de pagos
- Google Maps
- WhatsApp Business API
- Google Analytics 4

## KPIs

- Tasa de conversión por tipo de propiedad
- Tiempo promedio en página
- Leads generados por fuente
- NPS de usuarios
