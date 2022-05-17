import navigation from '../data/navigation'
import Link from './Link'
import Logo from './Logo'
import NavigationBar from './NavigationBar'
import SectionContainer from './SectionContainer'
import ThemeSwitch from './ThemeSwitch'

const LayoutWrapper = ({ children }: { children: string | JSX.Element }) => {
    return (
        <SectionContainer>
            <div className='flex flex-col justify-between h-screen'>
                <header className='flex items-center justify-between py-10'>
                    <div>
                        <Link href='/' aria-label="Quoc's Blog">
                            <div className='flex items-center justify-between'>
                                <div className='mr-3'>
                                    <Logo />
                                </div>
                                <div className='hidden h-6 text-2xl font-semibold sm:block'>
                                    Quoc&#39;s Blog
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='flex items-center text-base leading-5'>
                        <div className='hidden sm:block'>
                            {navigation.map((link) => {
                                return (
                                    <Link
                                        className='p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100'
                                        href={link.href}
                                        key={link.title}
                                    >
                                        {link.title}
                                    </Link>
                                )
                            })}
                        </div>
                        <ThemeSwitch />
                        <NavigationBar />
                    </div>
                </header>
                <main className='mb-auto'>{children}</main>
            </div>
        </SectionContainer>
    )
}

export default LayoutWrapper
