'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import React from 'react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { ContactForm } from './ContactForm'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
  wrapperClassName?: string
  inputWrapperClassName?: string
  buttonClassName?: string
  includeAnchor?: boolean
  typeOfForm?: 'contactForm' | 'commentForm'
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const { typeOfForm } = props

  const forms = {
    contactForm: ContactForm,
  }

  const FormToRender = forms[typeOfForm as keyof typeof forms] || forms.contactForm

  if (!FormToRender) return null

  return <FormToRender {...props} />
}
