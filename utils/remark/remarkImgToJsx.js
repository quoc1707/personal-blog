import { access } from 'fs/promises'
import sizeOf from 'image-size'
import { visit } from 'unist-util-visit'

const root = process.cwd()

export const remarkImgToJsx = () => {
    return (tree) => {
        visit(
            tree,
            (node) =>
                node.type === 'paragraph' &&
                node.children.some((n) => n.type === 'image'),
            (node) => {
                const imageNode = node.children.find((n) => n.type === 'image')

                if (access(`${root}/public${imageNode.url}`)) {
                    const dimensions = sizeOf(`${root}/public${imageNode.url}`)

                    ;(imageNode.type = 'mdxJsxFlowElement'),
                        (imageNode.name = 'Image'),
                        (imageNode.attributes = [
                            {
                                type: 'mdxJsxAttribute',
                                name: 'alt',
                                value: imageNode.alt,
                            },
                            {
                                type: 'mdxJsxAttribute',
                                name: 'src',
                                value: imageNode.url,
                            },
                            {
                                type: 'mdxJsxAttribute',
                                name: 'width',
                                value: dimensions.width,
                            },
                            {
                                type: 'mdxJsxAttribute',
                                name: 'height',
                                value: dimensions.height,
                            },
                        ])

                    node.type = 'div'
                    node.children = [imageNode]
                }
            }
        )
    }
}
