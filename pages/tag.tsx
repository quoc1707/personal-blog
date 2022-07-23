import Head from 'next/head'
import Link from '../components/Link'
import Tag from '../components/Tag'
import { defaultPath } from '../utils/variable'
import getAllTags from '../utils/tags'

export const getStaticProps = async () => {
    const tags = await getAllTags(defaultPath)
    return { props: { tags } }
}

const Tags = ({ tags }: any) => {
    const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
    return (
        <>
            <Head>
                <title>List of tags</title>
                <meta
                    name='description'
                    content='List of tags that have been used in this blog.'
                />
                <meta name='keywords' content='blog, nextjs, tailwindcss' />
                <meta
                    property='og:description'
                    content='List of tags that have been used in this blog.'
                />
            </Head>
            <div className='flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:flex-row md:space-x-6 md:mt-24'>
                <div className='pt-6 pb-8 space-x-2 md:space-y-5'>
                    <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 md:border-r-2 md:px-6'>
                        Tags
                    </h1>
                </div>
                <div className='flex flex-wrap max-w-lg'>
                    {!Object.keys(tags).length && (
                        <div className='py-4'>No posts found.</div>
                    )}
                    {sortedTags.map((tag) => {
                        return (
                            <div className='mt-2 mb-2 mr-5' key={tag}>
                                <Tag text={tag} />
                                <Link
                                    className='-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300'
                                    href={`/tag/${tag}`}
                                >
                                    {` (${tags[tag]})`}
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Tags
