import NextImage, { ImageProps } from 'next/image'

const Image = ({ ...rest }: ImageProps) => (
    <NextImage className='object-cover' width={762} height={508} {...rest} />
)

export default Image
