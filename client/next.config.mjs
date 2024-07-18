/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ZeroX_API_KEY: process.env.ZeroX_API_KEY,
        MONGODB_URI: process.env.MONGODB_URI
      },
      webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        return config;
      },

};

export default nextConfig;
