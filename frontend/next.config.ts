import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1340',
                pathname: '/**',
            },
        ],
    }
};

export default nextConfig;