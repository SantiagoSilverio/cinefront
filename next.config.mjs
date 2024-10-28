/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'],
  },
  swcMinify: false, // Desactivar minificación para debug en producción
};

export default nextConfig;
