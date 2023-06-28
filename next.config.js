/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          fallback: {
            fs: false
          }
        }
      }
    }
    return config
  },
}
