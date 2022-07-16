import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import '../styles/global.scss'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

//'client-id': 'ARX2nEHhakMNMtBBWaKJuBf5ttRYS0oqVfj6o365EzGf4Fuqpup9ShM9UTqUOwF2lqxU2eVdYzaiS59F'


const initialOptions = {
  'client-id': 'AYu3m0-w83UwGEsMjMv6Ly8zxU0xjbzjNYAHXISDcTCXuXfpeTFo2DuHqlOYW9PGsduHr1TKeZnRwazv',
  currency: 'BRL',
  intent: 'capture',
}

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PayPalScriptProvider options={initialOptions}>
        <Header/>
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </NextAuthProvider>
  )
}

export default MyApp
