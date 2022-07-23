import ListLayout from '../../../layouts/ListLayout'
import { defaultPath } from '../../../utils/variable'
import { getAllFilesFrontMatter } from '../../../utils/mdx'

const POSTS_PER_PAGE = 5

const getStaticPaths = async () => {
    const totalPosts = await getAllFilesFrontMatter(defaultPath)
    const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
    const paths = Array.from({ length: totalPages }, (_, i) => ({
        params: { page: (i + 1).toString() },
    }))

    return {
        paths,
        fallback: false,
    }
}

const getStaticProps = async (context) => {
    const {
        params: { page },
    } = context
    const posts = await getAllFilesFrontMatter(defaultPath)
    const pageNumber = parseInt(page)
    const initialDisplayPosts = posts.slice(
        POSTS_PER_PAGE * (pageNumber - 1),
        POSTS_PER_PAGE * pageNumber
    )
    const pagination = {
        currentPage: pageNumber,
        totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    }

    return {
        props: {
            posts,
            initialDisplayPosts,
            pagination,
        },
    }
}

const PostPage = ({ posts, initialDisplayPosts, pagination }) => {
    return (
        <ListLayout
            posts={posts}
            initialDisplayPosts={initialDisplayPosts}
            pagination={pagination}
            title='Search'
        />
    )
}

export { getStaticPaths, getStaticProps }
export default PostPage
