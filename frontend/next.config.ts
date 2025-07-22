/** @type {import('next').NextConfig} */

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fabulous-memory-086b6eebd8.media.strapiapp.com',
                pathname: '/**',
            },

            // {
            //     protocol: 'http',
            //     hostname: 'localhost',
            //     port: '1340',
            //     pathname: '/**',
            // },
        ],
    },
};

