import type {ComponentType, FC, FormEvent, ReactNode} from 'react'

import {DefaultField} from './default-field'
import type {FieldComponentProps, FieldState, FormDataProps, FormField, FormSection} from './types'

interface FormRendererProps {
  formData: FormDataProps
  onSubmit?: (e: FormEvent) => void
  // Function to get field state for a given field name
  getFieldState: (fieldName: string) => FieldState
  // Function to get field error for a given field name
  getFieldError?: (fieldName: string) => string | undefined
  // Function to get current value for any field (used for conditionals)
  getFieldValue: (fieldName: string) => any
  fieldComponents?: Record<string, ComponentType<FieldComponentProps>>
  className?: string
  children?: ReactNode
}

export const FormRenderer: FC<FormRendererProps> = ({
  formData,
  onSubmit = () => null,
  getFieldState,
  getFieldError,
  getFieldValue,
  fieldComponents = {},
  className = '',
  children,
}) => {
  const renderField = (field: FormField) => {
    const CustomComponent = fieldComponents[field.name]
    const fieldState = getFieldState(field.name)
    const error = getFieldError?.(field.name)

    if (CustomComponent) {
      return <CustomComponent field={field} fieldState={fieldState} error={error} />
    }

    return <DefaultField field={field} fieldState={fieldState} error={error} />
  }

  const shouldShowSection = (section: FormSection): boolean => {
    if (!section.conditional) return true

    const {field, condition, value} = section.conditional
    const fieldValue = getFieldValue(field)

    switch (condition) {
      case 'equals':
        return fieldValue === value
      case 'not_equals':
        return fieldValue !== value
      case 'contains':
        return typeof fieldValue === 'string' && fieldValue.includes(value)
      case 'not_contains':
        return typeof fieldValue === 'string' && !fieldValue.includes(value)
      default:
        return true
    }
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      {formData.sections?.map(
        (section, sectionIndex) =>
          shouldShowSection(section) && (
            <div key={sectionIndex} className="form-section">
              {section.title && <h3>{section.title}</h3>}
              {section.fields?.map((field, fieldIndex) => (
                <div key={fieldIndex} className="form-field">
                  {renderField(field)}
                </div>
              ))}
            </div>
          ),
      )}

      {children}

      <button type="submit" style={{textAlign: formData.submitButton?.position || 'center'}}>
        {formData.submitButton?.text || 'Submit'}
      </button>
    </form>
  )
}
