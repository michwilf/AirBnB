/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com"],
  },
  env: {
    mapbox_key:
      "pk.eyJ1IjoibXdpbGZlcnQiLCJhIjoiY2xlOHQxZzJyMDF2YjQwbnhua2pqdDE1aiJ9.UIdFf8r9fb45u77_amscrA",
  },
};

module.exports = nextConfig;
