import { MutableRefObject } from 'react'

export interface KeyboardShortcut {
    prev?: {
        slug: string
    }
    next?: {
        slug: string
    }
    prevPage?: boolean
    nextPage?: boolean
    currentPage?: number
    elementToFocus?: MutableRefObject<any>
    action:
        | 'navigateBetweenPosts'
        | 'navigateBetweenSearch'
        | 'focusElement'
        | 'toggleTheme'
}
