import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Layout } from '../components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>QR Fest</title>
        <meta name="description" content="QR Fest app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
