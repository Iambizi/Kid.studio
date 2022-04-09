module.exports = {
  images: {
    domains: ['images.ctfassets.net'],
    deviceSizes: [320, 375, 425, 768, 1024, 1200, 1400, 1600],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'cache-control',
            // value: 'public, max-age=86400, stale-while-rev',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async rewrites() {
    let rewrite_url = [
      {
        source: '/index',
        destination: '/',
      }
    ];
    return rewrite_url;
  },
  trailingSlash: false,
};
