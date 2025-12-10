type LexicalNode = {
  type: string
  text?: string
  children?: LexicalNode[]
}

function extractTextFromNode(node: LexicalNode): string {
  if (!node) return ''

  if (node.type === 'text' && typeof node.text === 'string') {
    return node.text
  }

  if (Array.isArray(node.children)) {
    return node.children.map(extractTextFromNode).join(' ')
  }

  return ''
}

export function extractTextFromRichText(layout: any[]): string {
  return layout
    .map((block) => {
      const root = block?.content?.root
      if (!root) return ''
      return extractTextFromNode(root)
    })
    .join(' ')
}
