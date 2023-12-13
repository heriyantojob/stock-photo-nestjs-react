module.exports = {
  i18n: {
    debug: process.env.NODE_ENV === 'development',
    defaultLocale: 'en',
    locales: ['en', 'id'],
  },
  // localePath:
  // typeof window === 'undefined'
  //   ? require('path').resolve('./public/locales')
  //   : '/locales',
}