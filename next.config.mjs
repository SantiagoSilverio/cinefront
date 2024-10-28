/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'],
  },
  webpack(config, { dev }) {
    if (!dev) {
      config.mode = 'development'; // Fuerza modo desarrollo en producción
    }
    return config;
  },
};

export default nextConfig;
