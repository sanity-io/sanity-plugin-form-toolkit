import type {FC} from 'react'

import type {FieldComponentProps} from './types'

export const DefaultField: FC<FieldComponentProps> = ({field, register, errors}) => {
  const {type, label, name, required, validation = [], options = {}, choices = []} = field
  if (!type || !name) return null
  const registerOptions = {
    required: required ? 'This field is required' : false,
    ...validation.reduce<Record<string, any>>((acc, rule) => {
      switch (rule.type) {
        case 'min':
          acc.min = {value: Number(rule.value), message: rule.message}
          break
        case 'max':
          acc.max = {value: Number(rule.value), message: rule.message}
          break
        case 'minLength':
          acc.minLength = {value: Number(rule.value), message: rule.message}
          break
        case 'maxLength':
          acc.maxLength = {value: Number(rule.value), message: rule.message}
          break
        case 'pattern':
          acc.pattern = {value: new RegExp(rule.value), message: rule.message}
          break
        // Additional validation types can be added here
      }
      return acc
    }, {}),
  }

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            {...register(name, registerOptions)}
            placeholder={options.placeholder}
            defaultValue={options.defaultValue}
          />
        )

      case 'select':
        return (
          <select {...register(name, registerOptions)}>
            {choices?.map((choice, i) => (
              <option key={i} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
        )

      case 'radio':
        return choices?.map((choice, i) => (
          <label key={i}>
            <input type="radio" {...register(name, registerOptions)} value={choice.value} />
            {choice.label}
          </label>
        ))

      case 'checkbox':
        return choices?.map((choice, i) => (
          <label key={i}>
            <input type="checkbox" {...register(name, registerOptions)} value={choice.value} />
            {choice.label}
          </label>
        ))

      default:
        return (
          <input
            type={type}
            {...register(name, registerOptions)}
            placeholder={options.placeholder}
            defaultValue={options.defaultValue}
          />
        )
    }
  }

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      {renderInput()}
      {errors[name] && <span className="error">{errors[name].message}</span>}
    </div>
  )
}
