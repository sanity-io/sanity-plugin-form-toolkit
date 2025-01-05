import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
} from 'react'

interface BaseField {
  _key: string
  label?: string
  name?: {
    current: string
  }
}
export interface FormInputField extends BaseField {
  _type: 'formInput'
  type?: string
  placeholder?: string
}
export interface SelectField extends BaseField {
  _type: 'select'
  options: {value: string; label: string; _key: string}[]
}
interface FormInputProps {
  field: FormInputField | SelectField
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  selectProps?: SelectHTMLAttributes<HTMLSelectElement>
  optionProps?: OptionHTMLAttributes<HTMLOptionElement>
}
export const FormInput = ({
  field,
  labelProps,
  inputProps,
  selectProps,
  optionProps,
}: FormInputProps) => {
  if (!field.name) return null
  if (field._type == 'formInput') {
    return (
      <>
        {field.label && (
          <label htmlFor={field.name.current} {...labelProps}>
            {field.label}
          </label>
        )}
        <input {...field} {...inputProps} name={field.name.current} id={field.name.current} />
      </>
    )
  }
  if (field._type == 'select') {
    return (
      <>
        {field.label && (
          <label htmlFor={field.name.current} {...labelProps}>
            {field.label}
          </label>
        )}
        <select {...field} {...selectProps} name={field.name.current} id={field.name.current}>
          {field.options &&
            field.options.map((option) => (
              <option
                {...option}
                {...optionProps}
                key={option._key}
                value={option.value ?? option.label}
              >
                {option.label}
              </option>
            ))}
        </select>
      </>
    )
  }
}
