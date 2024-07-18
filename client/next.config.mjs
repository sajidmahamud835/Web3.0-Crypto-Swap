/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
      ZeroX_API_KEY: process.env.ZeroX_API_KEY,
      MONGODB_URI: process.env.MONGODB_URI
    },
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader',
      });
      config.resolve.fallback = { fs: false, net: false, tls: false };
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          child_process: false,
          dns: false,
          'timers/promises': false,
        };
      }
      return config;
    },
};

export default nextConfig;
