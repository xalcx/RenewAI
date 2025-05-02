/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com', 'v0.blob.com', "intelliarts-wind-turbine-anomaly-detection.hf.space", "placehold.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  // Configuración explícita para usar SWC
  experimental: {
    forceSwcTransforms: true,
  },
}

export default nextConfig
