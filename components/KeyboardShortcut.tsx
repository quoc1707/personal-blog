import type { IKeyboardShortcut } from '../types/handler'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'

const KeyboardShortcut = ({
    prev,
    next,
    prevPage,
    nextPage,
    currentPage,
    elementToFocus,
    action,
}: IKeyboardShortcut): any => {
    const router = useRouter()
    const { theme, setTheme } = useTheme()

    const handleKeyDown = (event: KeyboardEvent) => {
        if (action === 'navigateBetweenPosts') {
            if (event.key === 'ArrowLeft' && prev)
                router.push(`/post/${prev.slug}`)
            if (event.key === 'ArrowRight' && next)
                router.push(`/post/${next.slug}`)
        }
        if (action === 'navigateBetweenSearch') {
            if (event.key === 'ArrowLeft' && prevPage)
                router.push(
                    currentPage - 1 === 1
                        ? `/post`
                        : `/post/page/${currentPage - 1}`
                )
            if (event.key === 'ArrowRight' && nextPage)
                router.push(`/post/page/${currentPage + 1}`)
        }
        if (action === 'focusElement') {
            if (event.ctrlKey && event.key === 'k' && elementToFocus.current) {
                event.preventDefault()
                elementToFocus.current.focus()
            }
        }
        if (action === 'toggleTheme') {
            if (event.ctrlKey && event.key === 'q') {
                event.preventDefault()
                setTheme(theme === 'dark' ? 'light' : 'dark')
            }
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    })

    return null
}

export default KeyboardShortcut
