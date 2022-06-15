import type { IPagination } from './pagination'

type IAuthorDetails = {
    name: string
    nickname: string
    contact: string
    occupation: string
}

type IFrontMatterDetails = {
    description: string
    date: string
    filename: string
    image: string
    slug: string
    title: string
    authors: string[]
    tags: string[]
}

type IPostDetails = {
    initialDisplayPosts: Object[]
    pagination: IPagination
    posts: any[]
}

export { IAuthorDetails, IFrontMatterDetails, IPostDetails }
