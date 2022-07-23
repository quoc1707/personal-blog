import ListLayout from '../../layouts/ListLayout'
import { defaultPath } from '../../utils/variable'
import { getAllFilesFrontMatter } from '../../utils/mdx'
import getAllTags from '../../utils/tags'

const getStaticPaths = async () => {
    const tags = await getAllTags(defaultPath)
    return {
        paths: Object.keys(tags).map((tag) => ({
            params: {
                tag,
            },
        })),
        fallback: false,
    }
}

const getStaticProps = async ({ params }) => {
    const allPosts = await getAllFilesFrontMatter(defaultPath)
    const filteredPosts = allPosts.filter((post) =>
        post.tags.includes(params.tag)
    )

    return { props: { posts: filteredPosts, tag: params.tag } }
}

const Tag = ({ posts, tag }) => {
    return (
        <ListLayout posts={posts} title={`Tag: ${tag.split(' ').join('-')}`} />
    )
}

export { getStaticPaths, getStaticProps }
export default Tag
