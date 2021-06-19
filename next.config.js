module.exports = {
    // config for using fs and path in getStaticProps to read backend files
    webpack: (config) => {
        config.node = {
            fs: 'empty', // This is required
        }
        return config
    },
    images: {
        domains: ['https://kidstudio.co'],
        deviceSizes: [ 320, 375, 425, 768, 1024, 1200, 1400, 1600 ]
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "cache-control",
                        value: "public, max-age=86400, stale-while-rev"
                    }
                ]
            }
        ];
    },
    async rewrites() {
        let rewrite_url = [
            {
                source: '/index',
                destination: '/'
            },
            {
                source: "/:project",
                destination: "/work/:project"
            }
        ];
        return rewrite_url;
    },
    trailingSlash: false
};