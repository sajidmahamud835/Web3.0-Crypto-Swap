/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ZeroX_API_KEY: process.env.ZeroX_API_KEY,
        INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID,
        PRIVATE_KEY: process.env.PRIVATE_KEY,
        SOPHILA_TESTNET_URL: process.env.SOPHILA_TESTNET_URL,
        
      },
};

export default nextConfig;
