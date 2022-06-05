import '../styles/index.css'
import '../styles/prism.css'

import type { AppProps } from 'next/app'
import ClientReload from '../components/ClientReload'
import Head from 'next/head'
import LayoutWrapper from '../components/LayoutWrapper'
import { ThemeProvider } from 'next-themes'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider attribute='class'>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
            </Head>
            {isDevelopment && isSocket && <ClientReload />}
            <LayoutWrapper>
                <Component {...pageProps} />
            </LayoutWrapper>
        </ThemeProvider>
    )
}

export default App
