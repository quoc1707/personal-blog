import { useState } from 'react'
import navigation from '../data/navigation'
import Link from './Link'

const NavigationBar = () => {
    const [displayed, setDisplayed] = useState(false)

    const toggleNavigationBar = () => {
        displayed
            ? (document.body.style.overflow = 'auto')
            : (document.body.style.overflow = 'hidden')
        setDisplayed(!displayed)
    }

    return (
        <div className='sm:hidden'>
            <button
                className='w-8 h-8 ml-1 mr-1 rounded'
                aria-label='Toggle menu'
                onClick={toggleNavigationBar}
            >
                <svg
                    className='text-gray-900 dark:text-gray-100'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                >
                    {displayed ? (
                        <path
                            fillRule='evenodd'
                            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                            clipRule='evenodd'
                        />
                    ) : (
                        <path
                            fillRule='evenodd'
                            d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                            clipRule='evenodd'
                        />
                    )}
                </svg>
            </button>
            <div
                className={`fixed w-full h-full top-24 right-0 bg-gray-200 dark:bg-gray-800 opacity-95 z-10 transform ease-in-out duration-300 ${
                    displayed ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <button
                    className='fixed w-full h-full cursor-auto'
                    aria-label='Toggle modal'
                    onClick={toggleNavigationBar}
                ></button>
                <nav className='fixed h-full mt-8'>
                    {navigation.map((link) => {
                        return (
                            <div className='px-12 py-4' key={link.title}>
                                <Link
                                    className='text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100'
                                    href={link.href}
                                    onClick={toggleNavigationBar}
                                >
                                    {link.title}
                                </Link>
                            </div>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}

export default NavigationBar
