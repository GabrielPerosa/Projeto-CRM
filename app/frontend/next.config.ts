const nextConfig = {
  experimental: {
    appDir: true, // Apenas se usando versões anteriores à 13.4
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "/api/auth/:path*",
      },
    ];
  }
};

module.exports = nextConfig;