/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MEXC_API_KEY: process.env.MEXC_API_KEY,
        MEXC_SECRET_KEY: process.env.MEXC_SECRET_KEY,
        MONGODB_URI: process.env.MONGODB_URI,
        ETHEREUM_NETWORK: process.env.ETHEREUM_NETWORK,
        INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID,
        PRIVATE_KEY: process.env.PRIVATE_KEY,
        MONGODB_URI: process.env.MONGODB_URI,
    },
  };
  
  export default nextConfig;