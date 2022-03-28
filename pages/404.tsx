import Head from 'next/head'
import Link from '../components/Link'

const Custom404 = () => {
    return (
        <>
            <Head>
                <title>404 Not Found</title>
                <meta
                    name='description'
                    content='Not the right place for you! Please navigate back to the homepage.'
                />
                <meta name='keywords' content='blog, nextjs, tailwindcss' />
                <meta
                    property='og:description'
                    content='Not the right place for you! Please navigate back to the homepage.'
                />
            </Head>
            <div className='flex flex-col items-start justify-start md:justify-center md:items-center md:flex-row md:space-x-6 md:mt-24'>
                <div className='pt-6 pb-8 space-x-2 md:space-y-5'>
                    <h1 className='text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:text-8xl md:leading-14 md:border-r-2 md:px-6'>
                        404
                    </h1>
                </div>
                <div className='max-w-md'>
                    <p className='mb-4 text-xl font-bold leading-normal md:text-2xl'>
                        Sorry, we couldn&apos;t find what you were looking for,
                        or the page no longer exists.
                    </p>
                    <p className='mb-8'>
                        No worries, you can return to our homepage by clicking
                        the button below.
                    </p>
                    <Link href='/'>
                        <button
                            className='inline px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg shadow focus:shadow-outline-blue hover:bg-blue-700 dark:hover:bg-blue-500'
                            aria-label='Back to homepage'
                        >
                            Back to homepage
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Custom404
