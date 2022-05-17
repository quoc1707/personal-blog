import { MouseEventHandler } from 'react'

export type ICustomLink = {
    href: string | undefined
    ref?: any
    className?: string
    children?: string | JSX.Element
    'aria-label'?: string
    onMouseEnter?: MouseEventHandler | undefined
    onClick?: MouseEventHandler
}

export type Heading = {
    depth: number
    value: string
    url?: string
}

export type TOCInline = {
    toc: Heading[]
    indentDepth?: number
    fromHeading?: number
    toHeading?: number
    exclude?: string | string[]
}
