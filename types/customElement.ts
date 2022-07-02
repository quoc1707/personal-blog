import { MouseEventHandler } from 'react'

type ICustomLink = {
    href: string | undefined
    ref?: any
    className?: string
    children?: string | JSX.Element
    'aria-label'?: string
    onMouseEnter?: MouseEventHandler | undefined
    onClick?: MouseEventHandler
}

type IHeading = {
    depth: number
    value: string
    url?: string
}

type ITOCInline = {
    toc: IHeading[]
    indentDepth?: number
    fromHeading?: number
    toHeading?: number
    exclude?: string | string[]
}

export { ICustomLink, ITOCInline, IHeading }
