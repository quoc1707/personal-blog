const { writeFile } = require('fs/promises')
const globby = require('globby')
const { resolveConfig, format } = require('prettier')

const baseURL = 'https://quoc1707-blog.vercel.app'

const generateSitemap = async () => {
    const prettierConfig = await resolveConfig('./.prettierrc')
    const pages = await globby([
        'pages/*.tsx',
        'data/post/**/*.mdx',
        '!pages/_*.tsx',
    ])
    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        ${pages
            .map((page: string) => {
                if (page === `pages/404.tsx` || page === `pages/[...slug].js`)
                    return

                const path = page
                    .replace('data', '')
                    .replace('pages/', '/')
                    .replace('public/', '/')
                    .replace('/feed.xml', '')
                    .replace(/.(js|tsx|mdx)/gi, '')
                const route = path === '/index' ? '' : path
                return `
                <url>
                    <loc>${baseURL}${route}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <priority>${route.length ? '0.80' : '1.00'}</priority>
                </url>`
            })
            .join('')}
    </urlset>
    `

    const formattedSitemap = format(sitemap, {
        ...prettierConfig,
        parser: 'html',
    })

    writeFile('public/sitemap.xml', formattedSitemap)
}

generateSitemap()

export {}
