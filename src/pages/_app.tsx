import '../styles/globals.css'
import Head from "next/head";
import type { AppProps } from 'next/app'
import '../icons/fontAwesome';

function MyApp({ Component, pageProps }: AppProps) {
  <Head>
    <meta name="msapplication-TileColor" content="#4b0202" />
    <meta name="theme-color" content="#4b0202" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta httpEquiv="Content-Language" content="en" />
    <meta name="description" content="Phishing & Scam Detection & Prevention System For Discord Servers." />
    <meta name="og:description" content="Phishing & Scam Detection & Prevention System For Discord Servers." />
    <meta name="og:title" content="Protect Bot" />
    <meta name="og:image" content="/ProtectBot.jpg" />
    <meta name="apple-mobile-web-app-title" content="Protect Bot" />
    <link rel="apple-touch-icon" sizes="180x180" href="/ProtectBot.jpg" />
    <link rel="icon" type="image/png" sizes="192x192" href="/ProtectBot.jpg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/ProtectBot.jpg" />
    <link rel="icon" type="image/png" sizes="96x96" href="/ProtectBot.jpg" />
    <link rel="icon" type="image/png" sizes="16x16" href="/ProtectBot.jpg" />
    <meta name="msapplication-TileImage" content="/ProtectBot.jpg" />
  </Head>
  return <Component {...pageProps} />
}

export default MyApp
