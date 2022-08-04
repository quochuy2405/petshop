/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/
        // for webpack 5 use
        // { and: [/\.(js|ts)x?$/] }
      },

      use: ['@svgr/webpack']
    })

    return config
  }
}
module.exports = {
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'vi'
  },
  nextConfig,
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'graph.facebook.com']
  }
}
