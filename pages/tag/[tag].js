import ListLayout from '../../layouts/ListLayout'
import { getAllFilesFrontMatter } from '../../utils/mdx'
import getAllTags from '../../utils/tags'

const getStaticPaths = async () => {
    const tags = await getAllTags('post')
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
    const allPosts = await getAllFilesFrontMatter('post')
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
