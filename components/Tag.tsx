import Link from 'next/link'

const Tag = ({ text }: { text: string }) => {
    return (
        <Link href={`/tag/${text}`}>
            <a className='mr-3 font-medium text-md text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
                #{text}
            </a>
        </Link>
    )
}

export default Tag
