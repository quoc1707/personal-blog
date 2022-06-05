import Head from 'next/head'
import Link from '../components/Link'
import Tag from '../components/Tag'
import formatTime from '../utils/time'
import { getAllFilesFrontMatter } from '../utils/mdx'

const MAX_DISPLAY = 5

export const getStaticProps = async () => {
    const posts = await getAllFilesFrontMatter('post')
    return { props: { posts } }
}

const Home = ({ posts }: { posts: any[] }) => {
    return (
        <>
            <Head>
                <title>Quoc&#39;s Blog</title>
                <meta
                    name='description'
                    content='Welcome to my blog! I hope you will like it.'
                />
                <meta name='keywords' content='blog, nextjs, tailwindcss' />
                <meta
                    property='og:description'
                    content='Welcome to my blog! I hope you will like it.'
                />
            </Head>
            <div className='divide-y divide-gray-200 dark:divide-gray-700'>
                <div className='pt-6 pb-8 space-y-2 md:space-y-5'>
                    <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
                        Just a minimal blog
                    </h1>
                    <p className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
                        This is the place where I jot down my thoughts and many
                        other things. Mostly write about technology and social
                        evils. I hope you enjoy it.
                    </p>
                </div>
                <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
                    {!posts.length && (
                        <div className='py-4'>No posts found.</div>
                    )}
                    {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
                        return (
                            <li className='py-12' key={frontMatter.slug}>
                                <article>
                                    <div className='space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline'>
                                        <dl>
                                            <dt className='sr-only'>
                                                Published on
                                            </dt>
                                            <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                                                <time
                                                    dateTime={frontMatter.date}
                                                >
                                                    {formatTime(
                                                        frontMatter.date
                                                    )}
                                                </time>
                                            </dd>
                                        </dl>
                                        <div className='space-y-5 xl:col-span-3'>
                                            <div className='space-y-6'>
                                                <div>
                                                    <h2 className='text-2xl font-bold leading-8 tracking-tight'>
                                                        <Link
                                                            className='text-gray-900 dark:text-gray-100'
                                                            href={`/post/${frontMatter.slug}`}
                                                        >
                                                            {frontMatter.title}
                                                        </Link>
                                                    </h2>
                                                    <div className='flex flex-wrap'>
                                                        {frontMatter.tags.map(
                                                            (tag: string) => {
                                                                return (
                                                                    <Tag
                                                                        key={
                                                                            tag
                                                                        }
                                                                        text={
                                                                            tag
                                                                        }
                                                                    />
                                                                )
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='prose text-gray-500 max-w-none dark:text-gray-400'>
                                                    {frontMatter.description}
                                                </div>
                                            </div>
                                            <div className='text-base font-medium leading-6'>
                                                <Link
                                                    className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                                                    href={`/post/${frontMatter.slug}`}
                                                    aria-label={`Read "${frontMatter.title}"`}
                                                >
                                                    Read more &rarr;
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        )
                    })}
                </ul>
            </div>
            {posts.length > MAX_DISPLAY && (
                <div className='flex justify-end pb-8 text-base font-medium leading-6'>
                    <Link
                        className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                        href='/post'
                        aria-label='Search'
                    >
                        More posts &rarr;
                    </Link>
                </div>
            )}
        </>
    )
}

export default Home
