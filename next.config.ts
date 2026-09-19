import type { NextConfig } from "next";

// Type-safe environment variable validation
const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: getRequiredEnv('NEXT_PUBLIC_PROTOCOL') as 'http' | 'https',
        hostname: getRequiredEnv('NEXT_PUBLIC_HOSTNAME'),
        ...(process.env.NEXT_PUBLIC_PORT ? { 
          port: process.env.NEXT_PUBLIC_PORT 
        } : {}),
        pathname: '/uploads/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;