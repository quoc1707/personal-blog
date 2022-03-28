import { existsSync, readFileSync } from 'fs'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import { join, extname } from 'path'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkFootnotes from 'remark-footnotes'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import getAllFilesRecursively from './files'
import { remarkCodeTitles, remarkImgToJsx, remarkTocHeadings } from './remark'

const root = process.cwd()

const getFiles = (type) => {
    const prefixPaths = join(root, 'data', type)
    const files = getAllFilesRecursively(prefixPaths)

    return files.map((file) =>
        file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    )
}

const formatSlug = (slug) => {
    return slug.replace(/\.mdx/, '')
}

const dateSortDesc = (a, b) => {
    if (a > b) return -1
    if (a < b) return 1
    return 0
}

const getFileBySlug = async (type, slug) => {
    const mdxPath = join(root, 'data', type, `${slug}.mdx`)
    const mdPath = join(root, 'data', type, `${slug}.md`)
    const source = existsSync(mdxPath)
        ? readFileSync(mdxPath, 'utf8')
        : readFileSync(mdPath, 'utf8')

    if (process.platform === 'win32')
        process.env.ESBUILD_BINARY_PATH = join(
            root,
            'node_modules',
            'esbuild',
            'esbuild.exe'
        )
    else
        process.env.ESBUILD_BINARY_PATH = join(
            root,
            'node_modules',
            'esbuild',
            'bin',
            'esbuild'
        )

    let toc = []
    const { data: frontmatter } = matter(source)

    const { code } = await bundleMDX({
        source,
        cwd: join(root, 'components'),
        xdmOptions(options) {
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                [remarkTocHeadings, { exportRef: toc }],
                remarkGfm,
                remarkCodeTitles,
                [remarkFootnotes, { inlineNotes: true }],
                remarkMath,
                remarkImgToJsx,
            ]
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                rehypeSlug,
                rehypeAutolinkHeadings,
                rehypeCitation,
                [rehypePrismPlus, { ignoreMissing: true }],
            ]
            return options
        },
        esbuildOptions: (options) => {
            options.loader = {
                ...options.loader,
                '.js': 'jsx',
            }
            return options
        },
    })

    return {
        mdxSource: code,
        toc,
        frontMatter: {
            ...frontmatter,
            fileName: `${slug}.mdx`,
            slug: slug || null,
        },
    }
}

const getAllFilesFrontMatter = async (folder) => {
    const prefixPaths = join(root, 'data', folder)
    const files = getAllFilesRecursively(prefixPaths)
    const allFrontMatter = []

    files.forEach((file) => {
        const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')

        if (extname(fileName) !== '.mdx') return

        const source = readFileSync(file, 'utf8')
        const { data: frontmatter } = matter(source)

        allFrontMatter.push({
            ...frontmatter,
            slug: formatSlug(fileName),
        })
    })

    return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}

export {
    getFiles,
    formatSlug,
    dateSortDesc,
    getFileBySlug,
    getAllFilesFrontMatter,
}
