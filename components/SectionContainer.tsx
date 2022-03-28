const SectionContainer = ({
    children,
}: {
    children: string | JSX.Element | JSX.Element[]
}) => {
    return (
        <div className='max-w-5xl px-4 mx-auto sm:px-6 lg:max-w-6xl xl:max-w-7xl'>
            {children}
        </div>
    )
}

export default SectionContainer
