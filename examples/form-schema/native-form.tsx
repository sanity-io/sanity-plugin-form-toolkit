import React, {type FC, type FormEvent} from 'react'
import {FormRenderer, type FormDataProps} from '@sanity/form-toolkit'

interface NativeFormExampleProps {
  formData: FormDataProps
  action?: string
  method?: 'get' | 'post'
}

export const NativeFormExample: FC<NativeFormExampleProps> = ({
  formData,
  action = '/api/submit',
  method = 'post',
}) => {
  // Use native form values to handle conditional rendering
  const getFieldValue = (name: string) => {
    if (typeof window === 'undefined') return ''
    const form = document.querySelector('form')
    if (!form) return ''
    return new FormData(form).get(name)?.toString() ?? ''
  }

  return (
    <form
      action={action}
      method={method}
      encType="multipart/form-data"
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        // Optional client-side validation
        const form = e.currentTarget
        if (!form.checkValidity()) {
          e.preventDefault()
          form.reportValidity()
        }
      }}
    >
      <FormRenderer
        formData={formData}
        getFieldValue={getFieldValue}
        // Provide minimal field state for uncontrolled inputs
        getFieldState={(name) => ({
          value: undefined,
          onChange: () => {},
          name, // Pass name to field for native form handling
        })}
      />
    </form>
  )
}
