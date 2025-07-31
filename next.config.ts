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
      {
        protocol: "https",
        hostname: "slategray-mosquito-366047.hostingersite.com",
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
