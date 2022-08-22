/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
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
  },
}
