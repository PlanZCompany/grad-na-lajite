import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

export const getTextFromRichText = (data: SerializedEditorState) => {
  const converted = convertLexicalToPlaintext({ data })

  const splitHeading = converted.split('\n')

  return splitHeading
}
