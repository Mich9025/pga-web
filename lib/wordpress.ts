// Description: WordPress API functions
// Used to fetch data from a WordPress site using the WordPress REST API
// Types are imported from `wp.d.ts`

import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import querystring from "query-string";

import {
  Author,
  Category,
  ClassInfoResponse,
  FeaturedMedia,
  Page,
  Post,
  PropertyResponse,
  Tag,
  Term,
} from "./wordpress.d";

// WordPress Config
const baseUrl = process.env.WORDPRESS_URL;

if (!baseUrl) {
  throw new Error("WORDPRESS_URL environment variable is not defined");
}

// Utility type for fetch options
interface FetchOptions {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  headers?: HeadersInit;
}

function getUrl(path: string, query?: Record<string, any>) {
  const params = query ? querystring.stringify(query) : null;
  return `${baseUrl}${path}${params ? `?${params}` : ""}`;
}

// Default fetch options for WordPress API calls
const defaultFetchOptions: FetchOptions = {
  next: {
    tags: ["wordpress"],
    revalidate: 3600, // Revalidate every hour by default
  },
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

// Error handling utility
class WordPressAPIError extends Error {
  constructor(message: string, public status: number, public endpoint: string) {
    super(message);
    this.name = "WordPressAPIError";
  }
}

// Utility function for making WordPress API requests
async function wordpressFetch<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "Next.js WordPress Client";

  // Check if it's a WooCommerce endpoint
  const isWooCommerce = url.includes("/wp-json/wc/");

  let finalUrl = url;
  if (isWooCommerce) {
    // Add authentication parameters to URL
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
      throw new Error("WooCommerce API keys not configured");
    }

    finalUrl = getUrl(url, {
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
    });
  }

  const response = await fetch(finalUrl, {
    ...defaultFetchOptions,
    ...options,
    headers: {
      ...defaultFetchOptions.headers,
      "User-Agent": userAgent,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new WordPressAPIError(
      `WordPress API request failed: ${response.statusText}`,
      response.status,
      url
    );
  }

  return response.json();
}
// WordPress Functions

export async function getAllPosts(filterParams?: {
  author?: string;
  tag?: string;
  category?: string;
  search?: string;
}): Promise<Post[]> {
  const query: Record<string, any> = {
    _embed: true,
    per_page: 100,
  };

  if (filterParams?.search) {
    // Search in post content and title
    query.search = filterParams.search;

    // If we have additional filters with search, use them
    if (filterParams?.author) {
      query.author = filterParams.author;
    }
    if (filterParams?.tag) {
      query.tags = filterParams.tag;
    }
    if (filterParams?.category) {
      query.categories = filterParams.category;
    }
  } else {
    // If no search term, just apply filters
    if (filterParams?.author) {
      query.author = filterParams.author;
    }
    if (filterParams?.tag) {
      query.tags = filterParams.tag;
    }
    if (filterParams?.category) {
      query.categories = filterParams.category;
    }
  }

  const url = getUrl("/wp-json/wp/v2/posts", query);
  return wordpressFetch<Post[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", "posts"],
    },
  });
}

export async function getPostById(id: number): Promise<Post> {
  const url = getUrl(`/wp-json/wp/v2/posts/${id}`);
  const response = await wordpressFetch<Post>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `post-${id}`],
    },
  });

  return response;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const url = getUrl("/wp-json/wp/v2/posts", { slug });
  const response = await wordpressFetch<Post[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `post-${slug}`],
    },
  });

  return response[0];
}

export async function getAllCategories(): Promise<Category[]> {
  const url = getUrl("/wp-json/wp/v2/categories");
  const response = await wordpressFetch<Category[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", "categories"],
    },
  });

  return response;
}

export async function getCategoryById(id: number): Promise<Category> {
  const url = getUrl(`/wp-json/wp/v2/categories/${id}`);
  const response = await wordpressFetch<Category>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `category-${id}`],
    },
  });

  return response;
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  const url = getUrl("/wp-json/wp/v2/categories", { slug });
  const response = await wordpressFetch<Category[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `category-${slug}`],
    },
  });

  return response[0];
}

export async function getPostsByCategory(categoryId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { categories: categoryId });
  const response = await wordpressFetch<Post[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `category-${categoryId}`],
    },
  });

  return response;
}

export async function getPostsByTag(tagId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { tags: tagId });
  const response = await wordpressFetch<Post[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `tag-${tagId}`],
    },
  });

  return response;
}

export async function getTagsByPost(postId: number): Promise<Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags", { post: postId });
  const response = await wordpressFetch<Tag[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `post-${postId}`],
    },
  });

  return response;
}

export async function getAllTags(): Promise<Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags");
  const response = await wordpressFetch<Tag[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", "tags"],
    },
  });

  return response;
}

export async function getTagById(id: number): Promise<Tag> {
  const url = getUrl(`/wp-json/wp/v2/tags/${id}`);
  const response = await wordpressFetch<Tag>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `tag-${id}`],
    },
  });

  return response;
}

export async function getTagBySlug(slug: string): Promise<Tag> {
  const url = getUrl("/wp-json/wp/v2/tags", { slug });
  const response = await wordpressFetch<Tag[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `tag-${slug}`],
    },
  });

  return response[0];
}

export async function getAllPages(): Promise<Page[]> {
  const url = getUrl("/wp-json/wp/v2/pages");
  const response = await wordpressFetch<Page[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", "pages"],
    },
  });

  return response;
}

export async function getPageById(id: number): Promise<Page> {
  const url = getUrl(`/wp-json/wp/v2/pages/${id}`);
  const response = await wordpressFetch<Page>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `page-${id}`],
    },
  });

  return response;
}

export async function getPageBySlug(slug: string): Promise<Page> {
  const url = getUrl("/wp-json/wp/v2/pages", { slug });
  const response = await wordpressFetch<Page[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `page-${slug}`],
    },
  });

  return response[0];
}

export async function getAllAuthors(): Promise<Author[]> {
  const url = getUrl("/wp-json/wp/v2/users");
  const response = await wordpressFetch<Author[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", "authors"],
    },
  });

  return response;
}

export async function getAuthorById(id: number): Promise<Author> {
  const url = getUrl(`/wp-json/wp/v2/users/${id}`);
  const response = await wordpressFetch<Author>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `author-${id}`],
    },
  });

  return response;
}

export async function getAuthorBySlug(slug: string): Promise<Author> {
  const url = getUrl("/wp-json/wp/v2/users", { slug });
  const response = await wordpressFetch<Author[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `author-${slug}`],
    },
  });

  return response[0];
}

export async function getPostsByAuthor(authorId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { author: authorId });
  const response = await wordpressFetch<Post[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `author-${authorId}`],
    },
  });

  return response;
}

export async function getPostsByAuthorSlug(
  authorSlug: string
): Promise<Post[]> {
  const author = await getAuthorBySlug(authorSlug);
  const url = getUrl("/wp-json/wp/v2/posts", { author: author.id });
  const response = await wordpressFetch<Post[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `author-${authorSlug}`],
    },
  });

  return response;
}

export async function getPostsByCategorySlug(
  categorySlug: string
): Promise<Post[]> {
  const category = await getCategoryBySlug(categorySlug);
  const url = getUrl("/wp-json/wp/v2/posts", { categories: category.id });
  const response = await wordpressFetch<Post[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `category-${categorySlug}`],
    },
  });

  return response;
}

export async function getPostsByTagSlug(tagSlug: string): Promise<Post[]> {
  const tag = await getTagBySlug(tagSlug);
  const url = getUrl("/wp-json/wp/v2/posts", { tags: tag.id });
  const response = await wordpressFetch<Post[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `tag-${tagSlug}`],
    },
  });

  return response;
}

export async function getFeaturedMediaById(id: number): Promise<FeaturedMedia> {
  const url = getUrl(`/wp-json/wp/v2/media/${id}`);
  const response = await wordpressFetch<FeaturedMedia>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `media-${id}`],
    },
  });

  return response;
}

// Helper function to search across categories
export async function searchCategories(query: string): Promise<Category[]> {
  const url = getUrl("/wp-json/wp/v2/categories", {
    search: query,
    per_page: 100,
  });
  return wordpressFetch<Category[]>(url);
}

// Helper function to search across tags
export async function searchTags(query: string): Promise<Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags", {
    search: query,
    per_page: 100,
  });
  return wordpressFetch<Tag[]>(url);
}

// Helper function to search across authors
export async function searchAuthors(query: string): Promise<Author[]> {
  const url = getUrl("/wp-json/wp/v2/users", {
    search: query,
    per_page: 100,
  });
  return wordpressFetch<Author[]>(url);
}

// Helper function to revalidate WordPress data
export async function revalidateWordPressData(tags: string[] = ["wordpress"]) {
  try {
    tags.forEach((tag) => {
      revalidateTag(tag);
    });
  } catch (error) {
    console.error("Failed to revalidate WordPress data:", error);
    throw new Error("Failed to revalidate WordPress data");
  }
}

// Export error class for error handling
export { WordPressAPIError };

export interface PropertyFilters {
  search?: string;
  locations?: string[];
  types?: string[];
  modes?: string[];
  area_min?: number;
  area_max?: number;
  price_min?: number;
  price_max?: number;
}
// function cleanPriceValue(price: string): number {
//   return parseInt(price.replace(/[^0-9]/g, ""));
// }

export async function getAllProperties(
  filters?: PropertyFilters
): Promise<PropertyResponse[]> {
  // Build query parameters
  const queryParams = new URLSearchParams();

  // Convert slugs to IDs
  if (filters?.locations?.length) {
    const locationIds = await Promise.all(
      filters.locations.map((slug) => getTermIdFromSlug("location", slug))
    );
    const validIds = locationIds.filter((id): id is number => id !== null);
    if (validIds.length) {
      queryParams.append("location", validIds.join(","));
    }
  }

  // Same for other taxonomies
  if (filters?.types?.length) {
    const typeIds = await Promise.all(
      filters.types.map((slug) => getTermIdFromSlug("state_types", slug))
    );
    const validIds = typeIds.filter((id): id is number => id !== null);
    if (validIds.length) {
      queryParams.append("state_types", validIds.join(","));
    }
  }

  if (filters?.modes?.length) {
    const modeIds = await Promise.all(
      filters.modes.map((slug) => getTermIdFromSlug("mode", slug))
    );
    const validIds = modeIds.filter((id): id is number => id !== null);
    if (validIds.length) {
      queryParams.append("mode", validIds.join(","));
    }
  }

  // Rest of your function remains the same
  if (filters?.search) {
    queryParams.append("search", filters.search);
  }

  // Price filter
  if (filters?.price_min || filters?.price_max) {
    // First convert price to number
    queryParams.append("meta_query[0][key]", "precio_lista");
    queryParams.append("meta_query[0][type]", "NUMERIC");
    queryParams.append("meta_query[0][value]", "0"); // Dummy value required by WP
    // Use REGEXP to clean the string before comparison
    queryParams.append("meta_query[0][compare]", "REGEXP");
    // Remove everything except numbers for comparison
    queryParams.append("meta_query[0][value_regex]", "[^0-9]");
  }

  // Area filter
  if (filters?.area_min || filters?.area_max) {
    queryParams.append("meta_query[1][key]", "area_cons");
    queryParams.append("meta_query[1][type]", "NUMERIC");

    if (filters.area_min) {
      queryParams.append("meta_query[1][value]", filters.area_min.toString());
      queryParams.append("meta_query[1][compare]", ">=");
    }
    if (filters.area_max) {
      queryParams.append("meta_query[2][key]", "area_cons");
      queryParams.append("meta_query[2][type]", "NUMERIC");
      queryParams.append("meta_query[2][value]", filters.area_max.toString());
      queryParams.append("meta_query[2][compare]", "<=");
    }
  }

  queryParams.append("per_page", "100");

  const baseUrl = process.env.WORDPRESS_URL;
  const url = `${baseUrl}/wp-json/wp/v2/states?${queryParams.toString()}`;

  console.log("Fetching URL:", url); // For debugging

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Properties API failed: ${response.statusText}`);
    }

    const propertiesRaw = await response.json();
    let properties = await Promise.all(
      propertiesRaw.map((p: PropertyResponse) => extendPropertyResponse(p))
    );
    // Filter by price after fetching
    if (filters?.price_min || filters?.price_max) {
      properties = properties.filter((p) => {
        const price = parseInt(p.precio_lista.replace(/[^0-9]/g, ""));
        return (
          (!filters.price_min || price >= filters.price_min) &&
          (!filters.price_max || price <= filters.price_max)
        );
      });
    }

    // Filter by area after fetching
    if (filters?.area_min || filters?.area_max) {
      properties = properties.filter((p) => {
        const area = parseInt(p.area_cons);
        return (
          (!filters.area_min || area >= filters.area_min) &&
          (!filters.area_max || area <= filters.area_max)
        );
      });
    }

    return properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
}

export async function getPropertyBySlug(
  slug: string
): Promise<PropertyResponse> {
  const baseUrl = process.env.WORDPRESS_URL;
  const url = `${baseUrl}/wp-json/wp/v2/states?slug=${slug}`;
  console.log("Fetching URL:", url); // For debugging

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`WooCommerce API failed: ${response.statusText}`);
    }

    const propertiesRaw = await response.json();
    const properties = await Promise.all(
      propertiesRaw.map((p: PropertyResponse) => extendPropertyResponse(p))
    );
    return properties[0]; // WooCommerce returns an array, we want the first item
  } catch (error) {
    console.error("Error fetching property:", error);
    throw error;
  }
}

export async function extractClassInfo(
  classList: string[]
): Promise<ClassInfoResponse> {
  const extractValue = (prefix: string) => {
    const item = classList.find((cls) => cls.startsWith(`${prefix}-`));
    return item ? item.replace(`${prefix}-`, "") : null;
  };

  async function getTermDetails(
    taxonomy: string,
    slug: string | null
  ): Promise<Term | undefined> {
    if (!slug) return undefined;

    const baseUrl = process.env.WORDPRESS_URL;
    const url = `${baseUrl}/wp-json/wp/v2/${taxonomy}?slug=${slug}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 },
      });

      if (!response.ok) return undefined;

      const [term] = await response.json();
      if (!term) return undefined;

      return {
        id: term.id,
        name: term.name,
        slug: term.slug,
      };
    } catch (error) {
      console.error(`Error fetching ${taxonomy} term:`, error);
      return undefined;
    }
  }

  const [stateType, mode, location, project] = await Promise.all([
    getTermDetails("state_types", extractValue("state_types")),
    getTermDetails("mode", extractValue("mode")),
    getTermDetails("location", extractValue("location")),
    getTermDetails("projects", extractValue("projects")),
  ]);

  return {
    stateType,
    mode,
    location,
    project,
  };
}

export async function extendPropertyResponse(
  property: PropertyResponse
): Promise<PropertyResponse> {
  const address = property.direccion;

  const coordinates = {
    lat: property.coordinates_lat || 4.711,
    lon: property.coordinates_long || 74.0721,
  };

  // if (address) {
  //   try {
  //     const searchAddress = `${address}, Bogotá, Colombia`;
  //     const encodedAddress = encodeURIComponent(searchAddress);

  //     const response = await fetch(
  //       `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`
  //     );

  //     const data = await response.json();

  //     if (data && data[0]) {
  //       coordinates = {
  //         lat: parseFloat(data[0].lat),
  //         lon: parseFloat(data[0].lon),
  //       };
  //     }
  //   } catch (error) {
  //     console.error("Error getting coordinates:", error);
  //   }
  // }

  const classInfo = await extractClassInfo(property.class_list);

  const title = classInfo.project?.name
    ? `${classInfo.project.name} - ${property.title.rendered}`
    : property.title.rendered;

  const keywords = [
    classInfo.stateType?.name,
    classInfo.mode?.name,
    classInfo.location?.name,
    classInfo.project?.name,
    property.title.rendered,
  ].filter(Boolean) as string[];

  const path = `/inmuebles/${classInfo.stateType?.slug || "sin-tipo"}/${
    classInfo.project?.slug || "sin-proyecto"
  }/${property.slug}`;

  const frontend = {
    title,
    path,
    description: property.excerpt.rendered?.replace(/<[^>]*>/g, "") || "",
    image:
      (property.featured_image_url as string) ||
      (property.gallery_images[0]?.url as string) ||
      "",
    price: property.precio_lista as string,
    address,
    keywords,
    propertyType: classInfo.stateType?.name,
    propertyMode: classInfo.mode?.name,
    propertyLocation: classInfo.location?.name,
    propertyProject: classInfo.project?.name,
    terms: {
      stateType: classInfo.stateType,
      mode: classInfo.mode,
      location: classInfo.location,
      project: classInfo.project,
    },
  };

  return {
    ...property,
    coordinates,
    frontend,
  };
}

export async function getAllFromCustomPostType<T>(
  type: string,
  per_page: number = 100
): Promise<T[]> {
  const baseUrl = process.env.WORDPRESS_URL;
  const url = `${baseUrl}/wp-json/wp/v2/${type}?per_page=${per_page}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Properties API failed: ${response.statusText}`);
    }

    const items = await response.json();
    return items;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
}

export async function getTaxonomies() {
  const baseUrl = process.env.WORDPRESS_URL;
  const url = `${baseUrl}/wp-json/wp/v2/taxonomies`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Properties API failed: ${response.statusText}`);
    }

    const items = await response.json();
    return items;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
}

export async function getTaxonomy(slug: string) {
  const baseUrl = process.env.WORDPRESS_URL;
  const url = `${baseUrl}/wp-json/wp/v2/taxonomies/${slug}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Properties API failed: ${response.statusText}`);
    }

    const items = await response.json();
    return items;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
}

export async function getTaxonomyTerms(taxonomy: string) {
  const baseUrl = process.env.WORDPRESS_URL;
  const url = `${baseUrl}/wp-json/wp/v2/${taxonomy}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error("Error fetching taxonomy url:", url);
      console.error("Error fetching taxonomy terms:", response);
      throw new Error(`Taxonomy API failed: ${response.statusText}`);
    }

    const items = await response.json();
    return items;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
}

async function getTermIdFromSlug(
  taxonomy: string,
  slug: string
): Promise<number | null> {
  const baseUrl = process.env.WORDPRESS_URL;
  const url = `${baseUrl}/wp-json/wp/v2/${taxonomy}?slug=${slug}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const terms = await response.json();
    return terms[0]?.id || null;
  } catch (error) {
    console.error(`Error fetching ${taxonomy} term:`, error);
    return null;
  }
}
