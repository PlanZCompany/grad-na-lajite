import React from 'react'

//NEED STYLING
type FormErrors = {
  [key: string]: string | null
}

const ErrorMessageBox = ({ errors }: { errors: FormErrors }) => {
  const errorsContent = Object.entries(errors).map(([_, rules], index) => {
    if (_ === 'password') console.log('here')
    return (
      <div key={`error-${index}`} className="w-full text-base text-red-600">
        <p className="text-left font-clash-regular">{rules as unknown as string}</p>
      </div>
    )
  })

  return (
    <div className="error_ref flex w-full scroll-mt-[60px] flex-col gap-2">{errorsContent}</div>
  )
}

export default ErrorMessageBox
