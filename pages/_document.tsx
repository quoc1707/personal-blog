import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <link
                        rel='apple-touch-icon'
                        sizes='76x76'
                        href='https://raw.githubusercontent.com/quoc1707/static-files/main/personal-blog/icons/apple-touch-icon.png'
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        sizes='32x32'
                        href='https://raw.githubusercontent.com/quoc1707/static-files/main/personal-blog/icons/favicon-32x32.png'
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        sizes='16x16'
                        href='https://raw.githubusercontent.com/quoc1707/static-files/main/personal-blog/icons/favicon-16x16.png'
                    />
                    <link
                        rel='mask-icon'
                        href='https://raw.githubusercontent.com/quoc1707/static-files/main/personal-blog/icons/safari-pinned-tab.svg'
                        color='#5bbad5'
                    />
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
