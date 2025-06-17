import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'en',
        localeDetection: false,
    },

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