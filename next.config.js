module.exports = {
    // config for using fs and path in getStaticProps to read backend files
    // experimental: {
    //     optimizeCss: true,
    // },
    images: {
        domains: ['images.ctfassets.net'],
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
            },
            {
                source: '/content/:slug*',
                destination: 'https://kidstudio.co/:slug*',
            }
        ];
        return rewrite_url;
    },
    trailingSlash: false
};