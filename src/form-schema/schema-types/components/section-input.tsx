import {useMemo} from 'react'
import {useObservable} from 'react-rx'
import {type ObjectInputProps, useDocumentStore, useFormValue} from 'sanity'

export const SectionInput = (props: ObjectInputProps) => {
  console.log('props', props)
  const id = useFormValue(['_id'])
  const documentStore = useDocumentStore()
  const observable = useMemo(() => {
    // @ts-expect-error idk
    return documentStore.listenQuery(`*[_type == 'form' && _id == $id][0]`, {id}, {})
  }, [documentStore, id])
  const results = useObservable(observable, {})
  const list = () => {
    // console.log('list called')
    // console.log('results', results)
    const fields = []
    if (results && results.sections) {
      for (const section of results.sections) {
        if (section.fields) {
          for (const field of section.fields) {
            if (field.name) {
              fields.push({value: field.name, title: field.label ?? field.name})
            }
          }
        }
      }
    }
    console.log('fields', fields)
    return fields
  }

  const newProps = {
    ...props,
    schemaType: {
      ...props.schemaType,
      fields: props.schemaType.fields.map((field) => {
        if (field.name !== 'conditional') return field
        return {
          ...field,
          type: {
            ...field.type,
            //@ts-expect-error todo
            fields: field.type.fields.map((field) => {
              if (field.name !== 'field') return field
              console.log('field.name is field', field)
              return {
                ...field,
                type: {
                  ...field.type,
                  options: {
                    ...field.type.options,
                    list: list(),
                  },
                },
              }
            }),
          },
        }
      }),
    },
  }
  console.log('newprops', newProps)
  return newProps.renderDefault(newProps)
}
