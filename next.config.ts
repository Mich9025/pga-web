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
        hostname: "pgaconstructores.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.pgaconstructores.co",
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
      {
        source: "/proyectos/unique-lume",
        destination: `/lume`,
        permanent: true,
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: "/wp-json/:path*",
        destination: `${process.env.WORDPRESS_URL}/wp-json/:path*`,
      },
    ];
  },
};

export default nextConfig;
