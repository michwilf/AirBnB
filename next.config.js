/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com"],
  }
  // env: {
  //   mapbox_key:
  //     "pk.eyJ1IjoibXdpbGZlcnQiLCJhIjoiY2xpeDZ0dTZlMDViNTNjbzkybzk2ZmpoYyJ9.xSQ2imutMQeAxj7g9cNBzQ",
  // },
};

module.exports = nextConfig;
