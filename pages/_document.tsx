import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <link
                        rel='apple-touch-icon'
                        sizes='76x76'
                        href='/icons/apple-touch-icon.png'
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        sizes='32x32'
                        href='/icons/favicon-32x32.png'
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        sizes='16x16'
                        href='/icons/favicon-16x16.png'
                    />
                    <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' />
                    <link rel='manifest' href='/manifest.json' />
                </Head>
                <body
                    className='antialiased text-black bg-white dark:bg-gray-900 dark:text-white'
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
