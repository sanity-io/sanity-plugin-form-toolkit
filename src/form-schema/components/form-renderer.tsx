import type {ComponentType, FC, FormEvent, HTMLProps} from 'react'

import {DefaultField} from './default-field'
import type {FieldComponentProps, FieldState, FormDataProps, FormField} from './types'

interface FormRendererProps extends HTMLProps<HTMLFormElement> {
  formData: FormDataProps
  onSubmit?: (e: FormEvent) => void
  // Function to get field state for a given field name
  getFieldState: (fieldName: string) => FieldState
  // Function to get field error for a given field name
  getFieldError?: (fieldName: string) => string | undefined
  // Function to get current value for any field (used for conditionals)
  // getFieldValue: (fieldName: string) => any
  fieldComponents?: Record<string, ComponentType<FieldComponentProps>>
}

export const FormRenderer: FC<FormRendererProps> = (props) => {
  const {
    formData,
    onSubmit = () => null,
    getFieldState,
    getFieldError,
    // getFieldValue,
    fieldComponents = {},
    className = '',
    children,
  } = props
  const renderField = (field: FormField) => {
    const CustomComponent = fieldComponents[field.name]
    const fieldState = getFieldState(field.name)
    const error = getFieldError?.(field.name)

    if (CustomComponent) {
      return <CustomComponent field={field} fieldState={fieldState} error={error} />
    }

    return <DefaultField field={field} fieldState={fieldState} error={error} />
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      {formData.fields?.map((field) => (
        <div key={field._key} className="form-field">
          {renderField(field)}
        </div>
      ))}

      {children}

      <button type="submit">{formData.submitButton?.text || 'Submit'}</button>
    </form>
  )
}
