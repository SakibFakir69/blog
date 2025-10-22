/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "example.com", // ✅ add every external image host you use
      "img.icons8.com",
      "thewire.signingdaysports.com","images.unsplash.com",

    "via.placeholder.com"
    ],
    // remotePatterns can be used for advanced matching, optional
  },
};

export default nextConfig;
