// types.ts
export type ValidationRule = {
  type: string
  value: string
  message: string
}

export type FieldChoice = {
  label: string
  value: string
}

export type FieldOptions = {
  placeholder?: string
  defaultValue?: string
}

export type FormField = {
  type: string
  label?: string
  name: string
  required: boolean
  validation?: ValidationRule[]
  options?: FieldOptions
  choices?: FieldChoice[]
}

export type FormSection = {
  title?: string
  fields?: FormField[]
  conditional?: {
    field: string
    condition: 'equals' | 'not_equals' | 'contains' | 'not_contains'
    value: string
  }
}

export type FormDataProps = {
  title: string
  id: {
    current: string
  }
  sections?: FormSection[]
  submitButton?: {
    text: string
    position: 'left' | 'center' | 'right'
  }
}

// New type for field state management
export interface FieldState {
  value: any
  onChange: (value: any) => void
  onBlur?: () => void
  ref?: React.Ref<any>
}

export interface FieldComponentProps {
  field: FormField
  fieldState: FieldState
  error?: string
}
