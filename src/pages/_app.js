import '../styles/styles.scss'
import '../styles/swal.css'

import { ChakraProvider } from "@chakra-ui/react"
import NProgress from 'nprogress'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import theme from '../../theme'

import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary, getNetworkLibrary } from '../web3/connectors'
import dynamic from 'next/dynamic'

const $ = require("jquery");

const Web3ReactProviderReadOnly = dynamic(
  () => import('../components/wallet/Web3ReactProviderReadOnly'),
  { ssr: false }
)

if(process.env.NODE_ENV === 'production') {
  console.log = () => {}
}

import en from 'javascript-time-ago/locale/en'
import it from 'javascript-time-ago/locale/it'
import ru from 'javascript-time-ago/locale/ru'
import ar from 'javascript-time-ago/locale/ar'

import TimeAgo from 'javascript-time-ago'
import tawkTo from "tawkto-react";

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(it)
TimeAgo.addLocale(ru)
TimeAgo.addLocale(ar)

function App({ Component, pageProps }) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1

  const router = useRouter()
  //scroll page to top onLoad
  const { asPath } = router

  //console.log("ENV:", process.env)

  //console.log(`AsPath: ${asPath}`, router, "process.env.TAWK_T0_PROPERTY_ID", process.env.NEXT_PUBLIC_TAWK_T0_PROPERTY_ID, "process.env.TAWK_TO_KEY", process.env.NEXT_PUBLIC_TAWK_TO_KEY)

  
  useEffect(() => {
      tawkTo(process.env.NEXT_PUBLIC_TAWK_T0_PROPERTY_ID, process.env.NEXT_PUBLIC_TAWK_TO_KEY)
  }, [])

  useEffect(() => {
      $('html, body').scrollTop(0)
  }, [asPath])

  const handleRouteChangeStart = (url) => {
    console.log("NPG:change", url)
    NProgress.start()
  }
  
  const handleRouteDone = () => {
    console.log("NPG:done")
    NProgress.done()
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteDone)
    router.events.on('routeChangeError', handleRouteDone)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteDone)
      router.events.off('routeChangeError', handleRouteDone)
    }

  }, [])

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactProviderReadOnly getLibrary={getNetworkLibrary}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Web3ReactProviderReadOnly>
    </Web3ReactProvider>
  )
 
  
}

export default App