module.exports = {
    // config for using fs and path in getStaticProps to read backend files
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.node = {
            fs: 'empty', // This is required
        }
        return config
    },
    images: {
        domains: ['https://kidstudio.co']
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
                source: '/',
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