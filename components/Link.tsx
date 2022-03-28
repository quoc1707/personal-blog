import NextLink from 'next/link'
import type { ICustomLink } from '../types/customElement'

const Link = ({ href, ...rest }: ICustomLink) => {
    const isInternal = href && href.startsWith('/')
    const isAnchor = href && href.startsWith('#')

    if (isInternal)
        return (
            <NextLink href={href}>
                <a {...rest} />
            </NextLink>
        )

    if (isAnchor) return <a href={href} {...rest} />

    return <a target='_blank' rel='noopener noreferrer' href={href} {...rest} />
}

export default Link
