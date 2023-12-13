import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import {store} from '../store/store'
import { Provider } from 'react-redux'
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function MyApp({ Component, pageProps, }: AppProps) {
  const router = useRouter()
  // if (router.locale) {
  //   i18n.changeLanguage(router.locale)
  // }
  
  return(
    // <GoogleReCaptchaProvider
    //   reCaptchaKey={process.env.NEXT_PUBLIC_ENV_RECAPTCHA_SITE_KEY}
    //   scriptProps={{
    //     async: false,
    //     defer: false,
    //     appendTo: "head",
    //     nonce: undefined,
    //   }}
    // >
        <Provider store={store}>
          <Layout><Component {...pageProps} /> </Layout>
        </Provider>
  
    // </GoogleReCaptchaProvider>

  )
}

export default appWithTranslation(MyApp) ;

