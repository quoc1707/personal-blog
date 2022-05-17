const { writeFile, readdirSync } = require('fs')
const { join, parse } = require('path')
const dedent = require('dedent')
const inquirer = require('inquirer')

const root = process.cwd()

type IAnswer = {
    title: string
    tags: string
    description: string
    authors: string[]
}

const getAuthors = (): string[] => {
    const authorPath = join(root, 'data', 'author')
    const authorList = readdirSync(authorPath).map(
        (filename: string) => parse(filename).name
    )
    return authorList
}

const genFrontMatter = (answer: IAnswer): string => {
    let d = new Date()
    const date = [
        d.getFullYear(),
        ('0' + (d.getMonth() + 1)).slice(-2),
        ('0' + d.getDate()).slice(-2),
    ].join('-')
    const tagArray = answer.tags.split(',')

    tagArray.forEach(
        (tag: string, index: number) => (tagArray[index] = tag.trim())
    )

    const tags = `'${tagArray.join("','")}'`
    const authorArray = answer.authors.length
        ? `'${answer.authors.join("','")}'`
        : ''
    let frontMatter = dedent`---
    title: ${answer.title ? answer.title : 'Untitled'}
    date: '${date}'
    tags: [${answer.tags ? tags : `'miscellaneous'`}]
    description: ${
        answer.description ? answer.description : 'No description provided.'
    }
    authors: [${answer.authors.length ? authorArray : `'default'`}]
    ---`

    return frontMatter
}

inquirer
    .prompt([
        {
            name: 'title',
            message: 'Enter title:',
            type: 'input',
        },
        {
            name: 'tags',
            message:
                'Any hashtags? Separate them with , or leave empty if no tags.',
            type: 'input',
        },
        {
            name: 'description',
            message: 'Enter description:',
            type: 'input',
        },
        {
            name: 'authors',
            message: 'Choose authors:',
            type: 'checkbox',
            choices: getAuthors,
        },
    ])
    .then((answer: IAnswer) => {
        const fileName = answer.title.toLowerCase().replace(/\s/g, '_')
        const frontMatter = genFrontMatter(answer)
        const filePath = `data/post/${fileName ? fileName : 'untitled'}.mdx`

        writeFile(filePath, frontMatter, (error: Error) => {
            error
                ? console.error(`${error.message}\nSomething went wrong.`)
                : console.log(`File created at: ${filePath}`)
        })
    })

export {}
