import { useRef, useState } from 'react'

import Head from 'next/head'
import type { IFrontMatterDetails } from '../types/detail'
import type { IListLayout } from '../types/layout'
import KeyboardShortcut from '../components/KeyboardShortcut'
import Link from '../components/Link'
import Pagination from '../components/Pagination'
import Tag from '../components/Tag'
import formatTime from '../utils/time'

const ListLayout = ({
    initialDisplayPosts = [],
    pagination,
    posts,
    title,
}: IListLayout) => {
    const searchInput = useRef(null)
    const [searchValue, setSearchValue] = useState('')

    const filteredBlogPosts = posts.filter(
        (frontMatter: IFrontMatterDetails) => {
            let searchPrefix = searchValue[0]
            let searchContent
            switch (searchPrefix) {
                case 'a':
                    searchContent = frontMatter.authors.join(' ')
                    break
                case 'd':
                    searchContent = frontMatter.description
                    break
                case 'h':
                    searchContent = frontMatter.tags.join(' ')
                    break
                default:
                    searchContent = frontMatter.title
                    break
            }

            return searchContent
                .toLowerCase()
                .includes(searchValue.toLowerCase().slice(2).trim())
        }
    )

    const displayPosts =
        initialDisplayPosts.length && !searchValue
            ? initialDisplayPosts
            : filteredBlogPosts

    return (
        <>
            <KeyboardShortcut
                elementToFocus={searchInput}
                action='focusElement'
            />
            <>
                <Head>
                    <title>{title}</title>
                </Head>
                <div className='divide-y'>
                    <div className='pt-6 pb-8 space-y-2 md:space-y-5'>
                        <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14'>
                            {title}
                        </h1>
                        <div className='relative max-w-lg'>
                            <input
                                className='block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-gray-100'
                                type='text'
                                placeholder='Type some keywords to filter posts'
                                ref={searchInput}
                                onChange={(event) =>
                                    setSearchValue(event.target.value)
                                }
                            />
                            <svg
                                className='absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                />
                            </svg>
                        </div>
                    </div>
                    <ul>
                        {!filteredBlogPosts.length && (
                            <div className='py-4'>No posts found.</div>
                        )}
                        {displayPosts.map(
                            (frontMatter: IFrontMatterDetails) => {
                                return (
                                    <li key={frontMatter.slug} className='py-4'>
                                        <article className='space-y-2 md:grid md:grid-cols-4 md:space-y-0 md:items-baseline'>
                                            <dl>
                                                <dt className='sr-only'>
                                                    Published on
                                                </dt>
                                                <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                                                    <time
                                                        dateTime={
                                                            frontMatter.date
                                                        }
                                                    >
                                                        {formatTime(
                                                            frontMatter.date
                                                        )}
                                                    </time>
                                                </dd>
                                            </dl>
                                            <div className='space-y-3 md:col-span-3'>
                                                <div>
                                                    <h3 className='text-2xl font-bold leading-8 tracking-tight'>
                                                        <Link
                                                            className='text-gray-900 dark:text-gray-100'
                                                            href={`/post/${frontMatter.slug}`}
                                                        >
                                                            {frontMatter.title}
                                                        </Link>
                                                    </h3>
                                                    <div className='flex flex-wrap'>
                                                        {frontMatter.tags.map(
                                                            (tag) => {
                                                                return (
                                                                    <Tag
                                                                        text={
                                                                            tag
                                                                        }
                                                                        key={
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
                                        </article>
                                    </li>
                                )
                            }
                        )}
                    </ul>
                </div>
                {pagination && pagination.totalPages > 1 && !searchValue && (
                    <Pagination
                        title={`You're staying on page ${pagination.currentPage} of ${pagination.totalPages}`}
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                    />
                )}
            </>
        </>
    )
}

export default ListLayout
