module.exports = {
  loadLocaleFrom: (lang, ns) =>
  // You can use a dynamic import, fetch, whatever. You should
  // return a Promise with the JSON file.
  import(`./src/locales/${lang}/${ns}.json`).then((m) => m.default),
  locales: ['en', 'it', 'ar'],
  localesMap: {
      en: {
        countryCode: "US"
      },
      it: {
        countryCode: "it"
      },
      ar: {
        countryCode: "ar",
        isRTL: true
      },
  },

  defaultLocale: 'en',
  pages: {
    "*": ["common", "header", "footer", "contact-form"],
    "/": ["home"],
    "/services": ["services"],
    "/projects": ["projects"],
    "/products": ["products"],
    "/products/[slug]": ["products-single"],
    "/packages": ["packages"],
    "/affiliates": ["affiliates"],
    "/blog": ["blog"],
    "/blog/[slug]": ["single-blog-post"],
    "/contact": ["contact"],
    "/about": ["about"],
    "/privacy": ["privacy"],
    "/tos": ["tos"],
  }
}