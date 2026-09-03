/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  async redirects() {
    return [
      { source: "/edible-seeds", destination: "/products/seeds", permanent: true },
      { source: "/cold-pressed-oils", destination: "/products/cold-press-oils", permanent: true },
      { source: "/private-labelling", destination: "/products", permanent: true },
      { source: "/categories", destination: "/products", permanent: true },
    ];
  },
};

module.exports = nextConfig;
