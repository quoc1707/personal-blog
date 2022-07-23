import Head from 'next/head'
import Image from 'next/image'
import KeyboardShortcut from '../components/KeyboardShortcut'
import Link from '../components/Link'
import PageTitle from '../components/PageTitle'
import Scroller from '../components/Scroller'
import Tag from '../components/Tag'
import { PostLayout } from '../types/layout'
import generatePath from '../utils/path'
import formatTime from '../utils/time'

const PostLayout = ({
    authorDetails,
    children,
    frontMatter,
    next,
    prev,
}: PostLayout) => {
    const { date, description, title, tags } = frontMatter
    return (
        <>
            <KeyboardShortcut
                prev={prev}
                next={next}
                action='navigateBetweenPosts'
            />
            <Scroller top={0} minYOffset={50} />
            <>
                <Head>
                    <title>{title}</title>
                    <meta name='description' content={description} />
                    <meta name='keywords' content={tags.join(', ')} />
                    <meta property='og:description' content={description} />
                    <meta
                        property='og:image'
                        content={`/images/${generatePath(title)}.webp`}
                    />
                </Head>
                <div className='md:divide-y md:divide-gray-200 md:dark:divide-gray-700'>
                    <header className='pt-6 md:pb-6'>
                        <div className='space-y-1 text-center'>
                            <dl className='space-y-10'>
                                <div>
                                    <dt className='sr-only'>Published on</dt>
                                    <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                                        <time dateTime={date}>
                                            {formatTime(date)}
                                        </time>
                                    </dd>
                                </div>
                            </dl>
                            <div>
                                <PageTitle>{title}</PageTitle>
                            </div>
                        </div>
                    </header>
                    <div
                        className='pb-8 divide-y divide-gray-200 md:divide-y-0 dark:divide-gray-700 md:grid md:grid-cols-4 md:gap-x-6'
                        style={{ gridTemplateRows: 'auto 1fr' }}
                    >
                        <dl className='pt-6 pb-10 md:pt-11 md:border-b md:border-gray-200 md:dark:border-gray-700'>
                            <dt className='sr-only'>Authors</dt>
                            <dd>
                                <ul className='flex justify-center space-x-8 md:block sm:space-x-12 md:space-x-0 md:space-y-8'>
                                    {authorDetails.map((author) => {
                                        return (
                                            <li
                                                className='flex items-center space-x-2'
                                                key={author.name}
                                            >
                                                <Image
                                                    className='w-10 h-10 rounded-full'
                                                    width={38}
                                                    height={38}
                                                    src={`/images/${author.nickname}.webp`}
                                                    alt='avatar'
                                                />
                                                <dl className='text-sm font-medium leading-5 whitespace-nowrap'>
                                                    <dt className='sr-only'>
                                                        Name
                                                    </dt>
                                                    <dd className='text-gray-900 dark:text-gray-100'>
                                                        {author.name}
                                                    </dd>
                                                    <dt className='sr-only'>
                                                        Facebook
                                                    </dt>
                                                    <dd>
                                                        <Link
                                                            className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                                                            href={
                                                                author.contact
                                                            }
                                                        >
                                                            {author.nickname}
                                                        </Link>
                                                    </dd>
                                                </dl>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </dd>
                        </dl>
                        <div className='divide-y divide-gray-200 dark:divide-gray-700 md:pb-0 md:col-span-3 md:row-span-2'>
                            <div className='pt-10 pb-8 prose dark:prose-dark max-w-none'>
                                {children}
                            </div>
                        </div>
                        <footer>
                            <div className='text-sm font-medium leading-5 divide-gray-200 md:divide-y dark:divide-gray-700 md:col-start-1 md:row-start-2'>
                                <div className='py-4 md:py-8'>
                                    <h2 className='text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400'>
                                        Tags
                                    </h2>
                                    <div className='flex flex-wrap'>
                                        {tags.map((tag: string) => {
                                            return <Tag text={tag} key={tag} />
                                        })}
                                    </div>
                                </div>
                                {(next || prev) && (
                                    <div className='flex flex-col justify-between py-4 md:flex-row md:block md:space-y-8 md:py-8'>
                                        {prev && (
                                            <div>
                                                <h2 className='text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400'>
                                                    &larr; Previous Article
                                                </h2>
                                                <div className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
                                                    <Link
                                                        href={`/post/${prev.slug}`}
                                                    >
                                                        {prev.title}
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                        {next && (
                                            <div className='pt-4 md:pt-0'>
                                                <h2 className='text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400'>
                                                    Next Article &rarr;
                                                </h2>
                                                <div className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
                                                    <Link
                                                        href={`/post/${next.slug}`}
                                                    >
                                                        {next.title}
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className='pt-4 md:pt-8'>
                                <Link
                                    className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                                    href='/'
                                >
                                    &larr; Back to the blog
                                </Link>
                            </div>
                        </footer>
                    </div>
                </div>
            </>
        </>
    )
}

export default PostLayout
