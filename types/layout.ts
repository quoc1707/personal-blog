import { AuthorDetails, FrontMatterDetails, PostDetails } from './detail'

interface ListLayout extends PostDetails {
    title: string
}

interface PostLayout {
    next: any
    prev: any
    authorDetails: AuthorDetails[]
    children: string | JSX.Element
    frontMatter: FrontMatterDetails
}

export { ListLayout, PostLayout }
