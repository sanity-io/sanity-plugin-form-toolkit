import {useMemo} from 'react'
import {useObservable} from 'react-rx'
import {type ObjectInputProps, useDocumentStore, useFormValue} from 'sanity'

export const SectionInput = (props: ObjectInputProps) => {
  const id = useFormValue(['_id'])
  const documentStore = useDocumentStore()
  const observable = useMemo(() => {
    // @ts-expect-error idk
    return documentStore.listenQuery(`*[_type == 'form' && _id == $id][0]`, {id}, {})
  }, [documentStore, id])
  const results = useObservable(observable, [])

  // console.log('props', props)
  // console.log('results', results)
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
            fields: field.type.fields.map((field) => {
              if (field.name !== 'field') return field
              return {
                ...field,
                type: {
                  ...field.type,
                  options: {
                    ...field.type.options,
                    list: results,
                  },
                },
              }
            }),
          },
        }
      }),
    },
  }
  return newProps.renderDefault(newProps)
}
