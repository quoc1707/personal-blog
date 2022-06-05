import { getFiles } from './mdx'
import { join } from 'path'
import matter from 'gray-matter'
import { readFileSync } from 'fs'

const root = process.cwd()

const getAllTags = async (type) => {
    const files = await getFiles(type)
    let tagCount = {}

    files.forEach((file) => {
        const source = readFileSync(join(root, 'data', type, file), 'utf8')
        const { data } = matter(source)

        if (data.tags) {
            data.tags.forEach((tag) => {
                if (tag in tagCount) tagCount[tag] += 1
                else tagCount[tag] = 1
            })
        }
    })

    return tagCount
}

export default getAllTags
