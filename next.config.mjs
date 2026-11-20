/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://networx-backend-yb8t.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
