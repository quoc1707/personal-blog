import type { TOCInline } from '../types/customElement'

const TOCInline = ({
    toc,
    indentDepth = 3,
    fromHeading = 1,
    toHeading = 3,
    exclude = '',
}: TOCInline) => {
    const re = Array.isArray(exclude)
        ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
        : new RegExp('^(' + exclude + ')$', 'i')

    const filteredToc = toc.filter(
        (heading) =>
            heading.depth >= fromHeading &&
            heading.depth <= toHeading &&
            !re.test(heading.value)
    )

    const tocList = (
        <ul>
            {filteredToc.map((heading) => {
                return (
                    <li
                        className={`${heading.depth >= indentDepth && 'ml-6'}`}
                        key={heading.value}
                    >
                        <a href={heading.url}>{heading.value}</a>
                    </li>
                )
            })}
        </ul>
    )

    return (
        <details>
            <summary className='pt-2 pb-2 ml-6 text-xl font-bold'>
                Table of Contents
            </summary>
            <div className='ml-6'>{tocList}</div>
        </details>
    )
}

export default TOCInline
