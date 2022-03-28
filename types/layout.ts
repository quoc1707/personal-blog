import type {
    IAuthorDetails,
    IFrontMatterDetails,
    IPostDetails,
} from './detail'

export type IListLayout = IPostDetails & {
    title: string
}

export type IPostLayout = {
    next: any
    prev: any
    authorDetails: IAuthorDetails[]
    children: string | JSX.Element
    frontMatter: IFrontMatterDetails
}
