// Common types that are reused across multiple entities
interface WPEntity {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: "publish" | "future" | "draft" | "pending" | "private";
  link: string;
  guid: {
    rendered: string;
  };
}

interface RenderedContent {
  rendered: string;
  protected: boolean;
}

interface RenderedTitle {
  rendered: string;
}

// Media types
interface MediaSize {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

interface MediaDetails {
  width: number;
  height: number;
  file: string;
  sizes: Record<string, MediaSize>;
}

export interface FeaturedMedia extends WPEntity {
  title: RenderedTitle;
  author: number;
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: MediaDetails;
  source_url: string;
}

// Content types
export interface Post extends WPEntity {
  title: RenderedTitle;
  content: RenderedContent;
  excerpt: RenderedContent;
  author: number;
  featured_media: number;
  comment_status: "open" | "closed";
  ping_status: "open" | "closed";
  sticky: boolean;
  template: string;
  format:
    | "standard"
    | "aside"
    | "chat"
    | "gallery"
    | "link"
    | "image"
    | "quote"
    | "status"
    | "video"
    | "audio";
  categories: number[];
  tags: number[];
  meta: Record<string, unknown>;
}

export interface Page extends WPEntity {
  title: RenderedTitle;
  content: RenderedContent;
  excerpt: RenderedContent;
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: "open" | "closed";
  ping_status: "open" | "closed";
  template: string;
  meta: Record<string, unknown>;
}

// Taxonomy types
interface Taxonomy {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  meta: Record<string, unknown>;
}

export interface Category extends Taxonomy {
  taxonomy: "category";
  parent: number;
}

export interface Tag extends Taxonomy {
  taxonomy: "post_tag";
}

export interface Author {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: Record<string, string>;
  meta: Record<string, unknown>;
}

// Block types
interface BlockSupports {
  align?: boolean | string[];
  anchor?: boolean;
  className?: boolean;
  color?: {
    background?: boolean;
    gradients?: boolean;
    text?: boolean;
  };
  spacing?: {
    margin?: boolean;
    padding?: boolean;
  };
  typography?: {
    fontSize?: boolean;
    lineHeight?: boolean;
  };
  [key: string]: unknown;
}

interface BlockStyle {
  name: string;
  label: string;
  isDefault: boolean;
}

export interface BlockType {
  api_version: number;
  title: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  keywords: string[];
  parent: string[];
  supports: BlockSupports;
  styles: BlockStyle[];
  textdomain: string;
  example: Record<string, unknown>;
  attributes: Record<string, unknown>;
  provides_context: Record<string, string>;
  uses_context: string[];
  editor_script: string;
  script: string;
  editor_style: string;
  style: string;
}

export interface EditorBlock {
  id: string;
  name: string;
  attributes: Record<string, unknown>;
  innerBlocks: EditorBlock[];
  innerHTML: string;
  innerContent: string[];
}

export interface TemplatePart {
  id: string;
  slug: string;
  theme: string;
  type: string;
  source: string;
  origin: string;
  content: string | EditorBlock[];
  title: {
    raw: string;
    rendered: string;
  };
  description: string;
  status: "publish" | "future" | "draft" | "pending" | "private";
  wp_id: number;
  has_theme_file: boolean;
  author: number;
  area: string;
}

export interface SearchResult {
  id: number;
  title: string;
  url: string;
  type: string;
  subtype: string;
  _links: {
    self: Array<{
      embeddable: boolean;
      href: string;
    }>;
    about: Array<{
      href: string;
    }>;
  };
}

// Component Props Types
export interface FilterBarProps {
  authors: Author[];
  tags: Tag[];
  categories: Category[];
  selectedAuthor?: Author["id"];
  selectedTag?: Tag["id"];
  selectedCategory?: Category["id"];
  onAuthorChange?: (authorId: Author["id"] | undefined) => void;
  onTagChange?: (tagId: Tag["id"] | undefined) => void;
  onCategoryChange?: (categoryId: Category["id"] | undefined) => void;
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  description: string;
  short_description: string;
  images: {
    id: number;
    src: string;
    name: string;
    alt: string;
  }[];
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
  meta_data: {
    id: number;
    key: string;
    value: string | { [key: string]: any };
  }[];
  status: string;
  price: string;
  price_html: string;
  related_ids: number[];
  stock_status: string;
  // WooCommerce required fields even if not used
  type: string;
  featured: boolean;
  catalog_visibility: string;
  regular_price: string;
  sale_price: string;
  virtual: boolean;
  purchasable: boolean;
  tax_status: string;
  tax_class: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  date_on_sale_from: string;
  date_on_sale_to: string;
  on_sale: boolean;
  total_sales: number;
  total_sales_count: number;
  backorders: string;
  backorders_allowed: boolean;
  sold_individually: boolean;
  weight: string;
  length: string;
  width: string;
  height: string;
  condition: string;
  categories: {
    id: number;
    name: string;
    slug: string;
    parent: number;
    description: string;
    display: string;
    image: string;
  }[];
  gallery_images: {
    id: number;
    date_created: string;
    date_created_gmt: string;
    slug: string;
    type: string;
    link: string;
    title: RenderedTitle;
    author: number;
    alt_text: string;
    media_type: string;
    mime_type: string;
    media_details: MediaDetails;
    source_url: string;
    description: string;
    caption: string;
    parent: number;
    order: number;
    menu_order: number;
    featured_media: number;
    comment_status: "open" | "closed";
    ping_status: "open" | "closed";
    template: string;
    meta: Record<string, unknown>;
  }[];
  images: {
    id: number;
    date_created: string;
    date_created_gmt: string;
    slug: string;
    type: string;
    link: string;
    title: RenderedTitle;
    author: number;
    alt_text: string;
    media_type: string;
    mime_type: string;
    media_details: MediaDetails;
    source_url: string;
    description: string;
    caption: string;
    parent: number;
    order: number;
    menu_order: number;
    featured_media: number;
    comment_status: "open" | "closed";
    ping_status: "open" | "closed";
    template: string;
    meta: Record<string, unknown>;
  }[];
}

export interface PropertyResponse {
  coordinates?: { lat: number; lon: number }; // Cached coordinates
  frontend?: {
    title: string;
    path: string;
    description: string;
    propertyType: string;
    propertyCategory: string;
    propertyLocation: string;
    image: string;
    price?: string;
    address: string;
    keywords: string[];
    stateType?: string;
    mode?: string;
    location?: string;
  };
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  habitaciones: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  gallery_images: [
    {
      id: number;
      url: string;
      width: number;
      height: number;
    }
  ];
  template: string;
  projects: number[];
  state_types: number[];
  mode: number[];
  location: number[];
  class_list: string[];
  featured_image_url: string | null;
  direccion: string;
  area_cons: string;
  area_priv: string;
  precio_lista: string;
  preciom2: string;
  admon: string;
  state_status: string;
  altur: string;
  cocineta: string;
  banos: string;
  parqueaderos: string;
  estrato: string;
  red_electrica: string;
  red_hidraulica: string;
  red_voz_datos: string;
  cuarto_tecnico: string;
  depositos: string;
  punto_extraccion: string;
  red_gas: string;
  antiguedad_edificio: string;
  url_front: string;
  _links: {
    self: Link[];
    collection: Link[];
    about: Link[];
    "version-history": VersionHistory[];
    "predecessor-version": PredecessorVersion[];
    "wp:attachment": Link[];
    "wp:term": WpTerm[];
    curies: Curie[];
  };
}

interface Link {
  href: string;
  targetHints?: {
    allow: string[];
  };
}

interface VersionHistory {
  count: number;
  href: string;
}

interface PredecessorVersion {
  id: number;
  href: string;
}

interface WpTerm {
  taxonomy: string;
  embeddable: boolean;
  href: string;
}

interface Curie {
  name: string;
  href: string;
  templated: boolean;
}

// Type for array of properties
type PropertyList = PropertyResponse[];

// History
interface History extends WPEntity {
  type: "history";
  title: RenderedTitle;
  content: RenderedContent;
  featured_media: number;
  template: string;
  featured_image_url: string;
  year: number;
  _links: {
    self: Link[];
    collection: Link[];
    about: Link[];
    "wp:featuredmedia": WpTerm[];
    "wp:attachment": Link[];
    curies: Curie[];
  };
}

// Social Profile
interface SocialProfile extends WPEntity {
  type: "social_profile";
  title: RenderedTitle;
  template: string;
  profile_url: string;
  handler: string;
  _links: {
    self: Link[];
    collection: Link[];
    about: Link[];
    "wp:attachment": Link[];
    curies: Curie[];
  };
}

// Inmo360
interface Inmo360 extends WPEntity {
  type: "inmo360";
  title: RenderedTitle;
  content: RenderedContent;
  featured_media: number;
  template: string;
  featured_image_url: string;
  icon: string;
  _links: {
    self: Link[];
    collection: Link[];
    about: Link[];
    "wp:featuredmedia": WpTerm[];
    "wp:attachment": Link[];
    curies: Curie[];
  };
}

// Client
interface Client extends WPEntity {
  type: "clients";
  title: RenderedTitle;
  featured_media: number;
  template: string;
  featured_image_url: string;
  _links: {
    self: Link[];
    collection: Link[];
    about: Link[];
    "wp:featuredmedia": WpTerm[];
    "wp:attachment": Link[];
    curies: Curie[];
  };
}

// Podcast
interface Podcast extends WPEntity {
  type: "clients";
  title: RenderedTitle;
  featured_media: number;
  template: string;
  featured_image_url: string;
  youtube_url: string;
  spotify_url: string;
  _links: {
    self: Link[];
    collection: Link[];
    about: Link[];
    "wp:featuredmedia": WpTerm[];
    "wp:attachment": Link[];
    curies: Curie[];
  };
}
