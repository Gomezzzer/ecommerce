/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = require('./csp');
const redirects = require('./redirects');

// Custom Webpack Plugin to ignore specific errors
const IgnoreErrorsPlugin = function() {
  this.apply = function(compiler) {
    compiler.hooks.done.tap('IgnoreErrorsPlugin', stats => {
      stats.compilation.errors = stats.compilation.errors.filter(
        error => !/specific error message/.test(error.message)
      );
    });
  };
};

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', process.env.NEXT_PUBLIC_SERVER_URL]
      .filter(Boolean)
      .map(url => url.replace(/https?:\/\//, '')),
  },
  redirects,
  async headers() {
    const headers = [];

    // Prevent search engines from indexing the site if it is not live
    if (!process.env.NEXT_PUBLIC_IS_LIVE) {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      });
    }

    // Set the `Content-Security-Policy` header
    headers.push({
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: ContentSecurityPolicy,
        },
      ],
    });

    return headers;
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }

    // Apply the custom IgnoreErrorsPlugin
    config.plugins.push(new IgnoreErrorsPlugin());

    return config;
  },
};

module.exports = nextConfig;
