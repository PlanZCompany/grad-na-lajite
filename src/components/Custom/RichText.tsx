import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

// import type { Category, Media, MediaBlock as MediaBlockProps, SubCategory } from '@/payload-types'
import type { Category, Media, MediaBlock as MediaBlockProps } from '@/payload-types'
import { GenericMedia } from '../Generic'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<MediaBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug

  if (!!relationTo) {
    if (relationTo === 'pages') {
      return `/${slug}`
    } else if (relationTo === 'sub-category') {
      // const currentValue = value as unknown as SubCategory
      const currentValue = value as unknown as any
      return `/category/${(currentValue.parentCategory as Category).slug}/${slug}`
    }
    return `/${relationTo}/${slug}`
  }

  return `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    mediaBlock: ({ node }) => {
      const { media } = node.fields
      return (
        <div className="py-10 xl:py-[80px]">
          <GenericMedia
            alt={(media as Media).alt as string}
            // id={(media as Media).id as string}
            id={(media as Media).id as number}
            updatedAt={(media as Media).createdAt as string}
            createdAt={''}
            {...(node?.fields?.media as object)}
            backgroundOverlay={false}
            imageClassName="w-full h-full object-cover"
            priority={true}
            style={{ transformOrigin: 'center center' }}
            wrapperClassName="m-auto content_wrapper_mobile-full min-h-[80svh] h-full w-full relative bg-red-500"
            fill={true}
            focalX={(media as Media).focalX || 50}
            focalY={(media as Media).focalY || 50}
            mobileImage={true}
          />
        </div>
      )
    },
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, ...rest } = props
  return <ConvertRichText converters={jsxConverters} className={className as string} {...rest} />
}
