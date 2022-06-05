import Head from 'next/head'
import type { IPostDetails } from '../types/detail'
import ListLayout from '../layouts/ListLayout'
import { getAllFilesFrontMatter } from '../utils/mdx'

const POSTS_PER_PAGE = 5

export const getStaticProps = async () => {
    const posts = await getAllFilesFrontMatter('post')
    const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
    const pagination = {
        currentPage: 1,
        totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    }

    return { props: { initialDisplayPosts, pagination, posts } }
}

const Posts = ({ initialDisplayPosts, pagination, posts }: IPostDetails) => {
    return (
        <>
            <Head>
                <title>Search</title>
                <meta
                    name='description'
                    content='Quickly search for the right posts by title, author or date.'
                />
                <meta name='keywords' content='blog, nextjs, tailwindcss' />
                <meta
                    property='og:description'
                    content='Quickly search for the right posts by title, author or date.'
                />
            </Head>
            <ListLayout
                posts={posts}
                initialDisplayPosts={initialDisplayPosts}
                pagination={pagination}
                title='Search'
            />
        </>
    )
}

export default Posts
