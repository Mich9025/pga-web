import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.WORDPRESS_HOSTNAME}`,
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "isarco.com.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.isarco.com.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "clon.codecolombia.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: `${process.env.WORDPRESS_URL}/wp-admin`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
