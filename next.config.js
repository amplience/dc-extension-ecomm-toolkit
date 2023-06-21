/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  env: {
    INTEGRATION_MIDDLEWARE_SERVER: process.env.INTEGRATION_MIDDLEWARE_SERVER
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
