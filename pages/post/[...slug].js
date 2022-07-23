import {
    formatSlug,
    getAllFilesFrontMatter,
    getFileBySlug,
    getFiles,
} from '../../utils/mdx'

import MDXLayoutRenderer from '../../components/MDXLayoutRenderer'
import { defaultPath } from '../../utils/variable'

const getStaticPaths = async () => {
    const posts = getFiles(defaultPath)
    return {
        paths: posts.map((p) => ({
            params: {
                slug: formatSlug(p).split('/'),
            },
        })),
        fallback: false,
    }
}

const getStaticProps = async ({ params }) => {
    const allPosts = await getAllFilesFrontMatter(defaultPath)
    const postIndex = allPosts.findIndex(
        (post) => formatSlug(post.slug) === params.slug.join('/')
    )
    const prev = allPosts[postIndex + 1] || null
    const next = allPosts[postIndex - 1] || null
    const post = await getFileBySlug(defaultPath, params.slug.join('/'))
    const authorList = post.frontMatter.authors || ['default']
    const authorPromise = authorList.map(async (author) => {
        const authorResults = await getFileBySlug('data/authors', [author])
        return authorResults.frontMatter
    })
    const authorDetails = await Promise.all(authorPromise)

    return { props: { authorDetails, next, post, prev } }
}

const Post = ({ authorDetails, next, post, prev }) => {
    return (
        <MDXLayoutRenderer
            layout='PostLayout'
            toc={post.toc}
            mdxSource={post.mdxSource}
            frontMatter={post.frontMatter}
            authorDetails={authorDetails}
            prev={prev}
            next={next}
        />
    )
}

export { getStaticPaths, getStaticProps }
export default Post
