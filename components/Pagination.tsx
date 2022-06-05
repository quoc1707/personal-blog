import Head from 'next/head'
import type { IPagination } from '../types/pagination'
import KeyboardShortcut from './KeyboardShortcut'
import Link from './Link'

const Pagination = ({ title, currentPage, totalPages }: IPagination) => {
    const prevPage = currentPage - 1 > 0
    const nextPage = currentPage + 1 <= totalPages

    return (
        <>
            <KeyboardShortcut
                prevPage={prevPage}
                nextPage={nextPage}
                currentPage={currentPage}
                action='navigateBetweenSearch'
            />
            <>
                <Head>
                    <title>{title}</title>
                </Head>
                <div className='pt-6 pb-8 space-y-2 leading-6 md:space-y-5'>
                    <nav className='flex justify-between'>
                        {!prevPage && (
                            <button
                                className='cursor-auto disabled:opacity-50'
                                aria-label='Previous page'
                                disabled={!prevPage}
                            >
                                &larr; Previous
                            </button>
                        )}
                        {prevPage && (
                            <Link
                                href={
                                    currentPage - 1 === 1
                                        ? `/post`
                                        : `/post/page/${currentPage - 1}`
                                }
                            >
                                <button aria-label='Previous page'>
                                    &larr; Previous
                                </button>
                            </Link>
                        )}
                        <span>
                            {currentPage}/{totalPages}
                        </span>
                        {!nextPage && (
                            <button
                                className='cursor-auto disabled:opacity-50'
                                aria-label='Next page'
                                disabled={!nextPage}
                            >
                                Next &rarr;
                            </button>
                        )}
                        {nextPage && (
                            <Link href={`/post/page/${currentPage + 1}`}>
                                <button aria-label='Next page'>
                                    Next &rarr;
                                </button>
                            </Link>
                        )}
                    </nav>
                </div>
            </>
        </>
    )
}

export default Pagination
