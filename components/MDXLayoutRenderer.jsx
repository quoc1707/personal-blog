import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import Image from './Image'
import Link from './Link'
import Pre from './Pre'
import TOCInline from './TOCInline'

const MDXComponents = {
    TOCInline,
    img: Image,
    a: Link,
    pre: Pre,
    wrapper: ({ components, layout, ...rest }) => {
        const Layout = require(`../layouts/${layout}`).default
        return <Layout {...rest} />
    },
}

const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
    const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])
    return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}

export default MDXLayoutRenderer
