import type {ComponentPropsWithoutRef, FC, PropsWithChildren} from 'react'

interface FormProps {
  form?: {
    _type: 'form'
    fields: {_type: 'formInput' | 'select'; _key?: string; _id: string}[]
  }
}
export const Form: FC<ComponentPropsWithoutRef<'form'> & FormProps> = (props) => {
  const {children, form} = props
  return <form {...{...form, ...props}}>{children}</form>
}
