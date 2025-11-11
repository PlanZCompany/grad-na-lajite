'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import React, { useState, useTransition } from 'react'

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { RichText } from '@/components/Custom'
import GenericButton from '@/components/Generic/GenericButton'
import { getClientSideURL } from '@/utils/getURL'
import { useAppDispatch } from '@/hooks/redux-hooks'
import { setIsLoading } from '@/store/features/root'
import { GenericHeading, TextArea, TextInput } from '@/components/Generic'

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
}

export const ContactForm: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const dispatch = useAppDispatch()
  const [isPending, startTransition] = useTransition()

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
    termsAccepted: false,
    publishAccepted: false,
  })

  const [errors, setErrors] = useState({})

  const {
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, submitButtonLabel } = {},
  } = props

  const [publishAccepted, setPublishAccepted] = useState(true)

  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()

  const onSubmit = () => {
    const haveNameError = !formValues.name
    const haveMessageError = !formValues.message
    const haveEmailError =
      !formValues.email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)

    if (haveNameError || haveMessageError || haveEmailError) {
      setErrors({
        name: haveNameError ? "Полето 'Име' е задължително" : '',
        message: haveMessageError ? "Полето 'Съобщение' е задължително" : '',
        email: haveEmailError ? 'Въведете валиден имейл' : '',
      })
      return
    }

    const nameToSend = {
      field: 'name',
      value: formValues.name,
    }

    const emailToSend = {
      field: 'email',
      value: formValues.email,
    }

    const messageToSend = {
      field: 'message',
      value: formValues.message,
    }

    const dataToSend: { field: string; value: string }[] = []
    if (!!formValues.name) dataToSend.push(nameToSend)
    if (!!formValues.email) dataToSend.push(emailToSend)
    if (!!formValues.message) dataToSend.push(messageToSend)

    const submitForm = async () => {
      setError(undefined)

      try {
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          body: JSON.stringify({
            form: formID,
            submissionData: dataToSend,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        const res = await req.json()

        if (req.status >= 400) {
          dispatch(setIsLoading(false))

          setError({
            message: 'Възникна грешка. Моля опитайте по-късно.',
            status: res.status,
          })

          return
        }

        dispatch(setIsLoading(false))
        setHasSubmitted(true)
      } catch (err) {
        console.warn(err)
        setIsLoading(false)
        setError({
          message: 'Нещо се обърка. Моля опитайте по-късно.',
        })
      }
    }

    startTransition(async () => {
      submitForm()
    })
  }

  const nameField = formFromProps.fields?.[0]
  const emailField = formFromProps.fields?.[1]
  const messageField = formFromProps.fields?.[2]

  //TODO test button indicator

  return (
    <div className={`content_wrapper w-full flex flex-col py-10 md:py-[120px]`}>
      <div className={`w-full`}>
        <div className="w-fit mx-auto flex justify-center items-center mb-12 md:mb-[unset]">
          <GenericHeading
            textShadow={true}
            headingType="h2"
            extraClass={`border-b-[1px] border-primaryYellow pb-3 w-full`}
          >
            Контакт с нас
          </GenericHeading>
        </div>
        {hasSubmitted && confirmationType === 'message' && (
          <div className="w-full h-full  flex flex-col mt-10">
            <div className="flex flex-col justify-center items-center m-auto gap-m">
              <RichText
                data={confirmationMessage}
                className="text-white text-[18px] font-georgia text-center leading-[120%]"
              />
            </div>
          </div>
        )}
        {!hasSubmitted && (
          <section className={`w-full relative flex bg-[#200226]`}>
            <div className="m-auto w-fit md:py-16 relative z-[1] rounded-[24px] flex flex-col-reverse md:flex-row auth_forms">
              <div className="shape1"></div>
              <div className="shape2"></div>
              <div className="pt-6 pb-10 px-6 md:px-20 flex justify-center items-center form_container bg-purpleDark/50">
                <form id={formID}>
                  <div className="flex flex-col gap-4">
                    <TextInput
                      name="name"
                      label="Име"
                      formValues={formValues}
                      setFormValues={setFormValues}
                      extraClass="w-full"
                      placeholder={
                        !!nameField && 'defaultValue' in nameField
                          ? ((nameField?.defaultValue as string) ?? 'Иван Иванов..')
                          : 'Иван Иванов..'
                      }
                      required={true}
                      error={('name' in errors && (errors.name as string)) || ''}
                      autoFocus={false}
                    />

                    <TextInput
                      name="email"
                      label="Емейл"
                      formValues={formValues}
                      setFormValues={setFormValues}
                      extraClass="w-full"
                      placeholder={
                        !!emailField && 'defaultValue' in emailField
                          ? ((emailField?.defaultValue as string) ?? 'ivan@gmail.com..')
                          : 'ivan@gmail.com..'
                      }
                      required={true}
                      error={('email' in errors && (errors.email as string)) || ''}
                      autoFocus={false}
                    />

                    <TextArea
                      name="message"
                      label="Съобщение"
                      formValues={formValues}
                      setFormValues={setFormValues}
                      extraClass="w-full"
                      placeholder={
                        !!messageField && 'defaultValue' in messageField
                          ? ((messageField?.defaultValue as string) ?? 'Вашето съобщение...')
                          : 'Вашето съобщение...'
                      }
                      required={true}
                      error={('message' in errors && (errors.message as string)) || ''}
                      autoFocus={false}
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <button
                      type="button"
                      className={`w-[20px] min-w-[20px] aspect-square border-[1px] border-primaryWhite rounded-[6px] flex justify-center items-center  
            bg-transparent`}
                      onClick={() => {
                        setPublishAccepted((prev) => !prev)
                      }}
                    >
                      {publishAccepted && (
                        <svg
                          width="14"
                          height="10"
                          viewBox="0 0 14 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.9336 1.01416C13.1797 1.2876 13.1797 1.69775 12.9336 1.94385L5.71484 9.1626C5.44141 9.43604 5.03125 9.43604 4.78516 9.1626L1.06641 5.44385C0.792969 5.19775 0.792969 4.7876 1.06641 4.5415C1.3125 4.26807 1.72266 4.26807 1.96875 4.5415L5.22266 7.79541L12.0039 1.01416C12.25 0.768066 12.6602 0.768066 12.9062 1.01416H12.9336Z"
                            fill="white"
                          />
                        </svg>
                      )}
                    </button>

                    <p className="text-[10px] md:text-[14px] font-georgia text-white">
                      <span className="text-[10px] md:text-[14px] font-georgia text-white">
                        Съгласен/на съм мнението ми да бъде публикувано в секция „Мнения на
                        потребители“.
                      </span>
                    </p>
                  </div>

                  <GenericButton
                    form={formID}
                    type="button"
                    click={onSubmit}
                    variant="primary"
                    styleClass="mt-8 w-full landscape:w-fit"
                    disabled={isPending}
                  >
                    {isPending ? 'Изпращане...' : submitButtonLabel}
                  </GenericButton>

                  {error && <p className="text-red-600 font-georgia mt-4">{error.message}</p>}
                </form>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
