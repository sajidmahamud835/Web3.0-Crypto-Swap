/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ZeroX_API_KEY: process.env.ZeroX_API_KEY,
        MONGODB_URI: process.env.MONGODB_URI
      },
      webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve.fallback = {
            ...config.resolve.fallback,
            child_process: false,
            dns: false,
            fs: false,
            net: false,
            tls: false,
            'timers/promises': false,
          };
        }
        return config;
      },
};

export default nextConfig;
