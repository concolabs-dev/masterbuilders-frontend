/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['buildmarketlk.com', 'www.buildmarketlk.com'],
    unoptimized: false,
  },
  // Ensure static files are copied
  trailingSlash: false,
  // Add headers for static assets
  async headers() {
    return [
      {
        source: '/frames/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
export default nextConfig
