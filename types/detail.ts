import { Pagination } from './pagination'

interface AuthorDetails {
    name: string
    nickname: string
    contact: string
    occupation: string
}

interface FrontMatterDetails {
    description: string
    date: string
    filename: string
    image: string
    slug: string
    title: string
    authors: string[]
    tags: string[]
}

interface PostDetails {
    initialDisplayPosts: Object[]
    pagination: Pagination
    posts: any[]
}

export { AuthorDetails, FrontMatterDetails, PostDetails }
