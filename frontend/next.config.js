const envFile = require("dotenv").config({ path: "./.env.local" });
module.exports = {
  env: {
    ...envFile.parsed,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/cw/:path*",
        destination: "https://api.cryptowat.ch/:path*", // Proxy to Backend
      },
    ];
  },
};
