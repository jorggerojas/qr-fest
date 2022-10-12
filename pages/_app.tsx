import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { Layout } from '../components'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const firebaseConfig = {
    apiKey: 'AIzaSyBZcfImgy5Hw0_Dbc-EcN7MWnKrnwZ71JY',
    authDomain: 'jorggerojas-78d64.firebaseapp.com',
    databaseURL: 'https://jorggerojas-78d64-default-rtdb.firebaseio.com',
    projectId: 'jorggerojas-78d64',
    storageBucket: 'jorggerojas-78d64.appspot.com',
    messagingSenderId: '1025196765367',
    appId: '1:1025196765367:web:2d2074e620ec793562dd32',
    measurementId: 'G-C4ZW8KPBW3',
  }

  useEffect(() => {
    const firebase_app = import('firebase/app')
    const analytics = import('firebase/analytics')
    const performance = import('firebase/performance')
    Promise.all([firebase_app, analytics, performance]).then(
      ([firebase, info, performance_lib]) => {
        const app = firebase.initializeApp(firebaseConfig)
        info.getAnalytics(app)
        performance_lib.getPerformance(app)
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
