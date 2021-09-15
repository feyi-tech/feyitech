import useTranslation from "next-translate/useTranslation"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"

import i18nConfig from '../../i18n'

const { localesMap } = i18nConfig

class Document extends NextDocument {
    
  static async getInitialProps(ctx) {
    return await NextDocument.getInitialProps(ctx)
  }
  render() {
    const { locale } = this.props.__NEXT_DATA__

    return (
      <Html dir={localesMap[locale].isRTL? "rtl" : "ltr"} lang={locale}>
        <Head>
          
        </Head>
        <body >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default Document