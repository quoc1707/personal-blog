import { MouseEventHandler } from 'react'

interface CustomLink {
    href: string | undefined
    ref?: any
    className?: string
    children?: string | JSX.Element
    'aria-label'?: string
    onMouseEnter?: MouseEventHandler | undefined
    onClick?: MouseEventHandler
}

interface Heading {
    depth: number
    value: string
    url?: string
}

interface TOCInline {
    toc: Heading[]
    indentDepth?: number
    fromHeading?: number
    toHeading?: number
    exclude?: string | string[]
}

export { CustomLink, TOCInline }
