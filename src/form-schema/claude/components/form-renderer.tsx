import type {ComponentType, FC, ReactNode} from 'react'
import {useForm} from 'react-hook-form'

import {DefaultField} from './default-field'
import type {FieldComponentProps, FormData, FormField, FormSection} from './types'

interface FormRendererProps {
  formData: FormData
  onSubmit: (data: any) => void
  fieldComponents?: Record<string, ComponentType<FieldComponentProps>>
  className?: string
  children?: ReactNode
}

export const FormRenderer: FC<FormRendererProps> = ({
  formData,
  onSubmit = () => null,
  fieldComponents = {},
  className = '',
  children,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm()
  const watchedValues = watch()

  const renderField = (field: FormField) => {
    const CustomComponent = fieldComponents[field.name]
    if (CustomComponent) {
      return <CustomComponent field={field} register={register} errors={errors} />
    }

    return <DefaultField field={field} register={register} errors={errors} />
  }

  const shouldShowSection = (section: FormSection): boolean => {
    if (!section.conditional) return true

    const {field, condition, value} = section.conditional
    const fieldValue = watchedValues[field]

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
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
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
