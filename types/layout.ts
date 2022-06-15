import type {
    IAuthorDetails,
    IFrontMatterDetails,
    IPostDetails,
} from './detail'

type IListLayout = IPostDetails & {
    title: string
}

type IPostLayout = {
    next: any
    prev: any
    authorDetails: IAuthorDetails[]
    children: string | JSX.Element
    frontMatter: IFrontMatterDetails
}

export { IListLayout, IPostLayout }
