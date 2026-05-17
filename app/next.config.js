const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: process.env.NEXT_OUTPUT_MODE,
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },
  async redirects() {
    return [
      // Chrome Web Store registers https://knowcap.ai/privacy as the
      // extension's privacy URL. The actual page lives at /policy
      // (created in commit 988833f). Without this redirect Google's
      // publish-time reachability check 404s and blocks publish.
      // Anyone googling "knowcap privacy policy" also lands here.
      { source: '/privacy', destination: '/policy', permanent: true },
      { source: '/privacy-policy', destination: '/policy', permanent: true },
    ];
  },
};

module.exports = nextConfig;