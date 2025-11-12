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

import type {
  DividerBlock,
  Media,
  MediaBlock as MediaBlockProps,
  TableBlock,
} from '@/payload-types'
import { GenericMedia } from '../Generic'
import { DividerBlockComponent } from '@/blocks/DividerBlock/Component'
import { TableBLockComponent } from '@/blocks/TableBlock/Component'

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
        <div className="pb-6 md:pb-10">
          <GenericMedia
            alt={(media as Media).alt as string}
            // id={(media as Media).id as string}
            id={(media as Media).id as number}
            updatedAt={(media as Media).createdAt as string}
            createdAt={''}
            {...(node?.fields?.media as object)}
            imageClassName="w-full h-full object-cover"
            style={{ transformOrigin: 'center center' }}
            wrapperClassName="m-auto content_wrapper_mobile-full md:min-h-[80svh] h-full w-full aspect-video relative"
            fill={true}
            focalX={(media as Media).focalX || 50}
            focalY={(media as Media).focalY || 50}
          />
        </div>
      )
    },
    dividerBlock: (props: { node: SerializedBlockNode<DividerBlock> }) => (
      <DividerBlockComponent {...props.node.fields} />
    ),
    tableBlock: (props: { node: SerializedBlockNode<TableBlock> }) => (
      <TableBLockComponent {...props.node.fields} />
    ),
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
