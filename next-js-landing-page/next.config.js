// @ts-check

/** @type {import('next').NextConfig} */
// const { i18n } = require('./next-i18next.config')
// const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    // debug: process.env.NODE_ENV === 'development',
    defaultLocale: 'en',
    locales: ['en', 'id'],
  },
  images: {
    domains: ["localhost",'placeimg.com',"cdnjs.cloudflare.com","picsum.photos","192.168.100.3"],
  },

}

module.exports = nextConfig
