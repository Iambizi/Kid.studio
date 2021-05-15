//Part of Sentry start
//Use the hidden-source-map option when you don’t want the source maps to be
// publicly available on the servers, only to the error reporting
// eslint-disable-next-line

// const {
//     NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
//     SENTRY_ORG,
//     SENTRY_PROJECT,
//     SENTRY_AUTH_TOKEN,
//     NODE_ENV,
//     VERCEL_GITHUB_COMMIT_SHA,
//     VERCEL_GITLAB_COMMIT_SHA,
//     VERCEL_BITBUCKET_COMMIT_SHA
// } = process.env;
// const COMMIT_SHA = VERCEL_GITHUB_COMMIT_SHA || VERCEL_GITLAB_COMMIT_SHA || VERCEL_BITBUCKET_COMMIT_SHA;
// process.env.SENTRY_DSN = SENTRY_DSN;
//Part of Sentry end
module.exports = {
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
                source: "/:project",
                destination: "/work/:project"
            }
        ];
        return rewrite_url;
    }
};