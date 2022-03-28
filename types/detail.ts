import type { IPagination } from './pagination'

export type IAuthorDetails = {
    name: string
    nickname: string
    contact: string
    occupation: string
}

export type IFrontMatterDetails = {
    description: string
    date: string
    filename: string
    image: string
    slug: string
    title: string
    authors: string[]
    tags: string[]
}

export type IPostDetails = {
    initialDisplayPosts: Object[]
    pagination: IPagination
    posts: any[]
}
