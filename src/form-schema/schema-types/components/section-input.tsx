import {useEffect, useMemo, useState} from 'react'
import {type ObjectInputProps, useDocumentStore, useFormValue} from 'sanity'

export const SectionInput = (props: ObjectInputProps) => {
  const id = useFormValue(['_id'])
  const documentStore = useDocumentStore()
  const [fields, setFields] = useState([])

  useEffect(() => {
    if (!id || !documentStore) return

    const subscription = documentStore
      .listenQuery(`*[_type == 'form' && _id == $id][0]`, {id}, {})
      .subscribe({
        next: (results) => {
          const newFields = []

          if (results?.sections) {
            results.sections.forEach((section) => {
              if (section.fields) {
                section.fields.forEach((field) => {
                  if (field.name) {
                    newFields.push({
                      value: field.name,
                      title: field.label || field.name,
                    })
                  }
                })
              }
            })
          }

          console.log('Extracted fields:', newFields)
          setFields(newFields)
        },
        error: (err) => console.error('Query error:', err),
      })

    return () => subscription.unsubscribe()
  }, [id, documentStore])

  const newProps = useMemo(() => {
    const modifiedFields = props.schemaType.fields.map((field) => {
      if (field.name !== 'conditional') return field

      // Ensure we have the type property
      if (!field.type) return field

      // For the conditional object field
      const typeFields = field.type.fields.map((subfield) => {
        if (subfield.name !== 'field') return subfield

        // For the field selection input
        return {
          ...subfield,
          type: {
            ...subfield.type,
            options: {
              ...subfield.type.options,
              list: fields,
            },
          },
        }
      })

      return {
        ...field,
        type: {
          ...field.type,
          fields: typeFields,
        },
      }
    })

    return {
      ...props,
      schemaType: {
        ...props.schemaType,
        fields: modifiedFields,
      },
    }
  }, [props, fields])

  // Debug logging
  const conditionalField = newProps.schemaType.fields.find((f) => f.name === 'conditional')
  console.log('Conditional field type:', conditionalField?.type)
  console.log('Available fields:', fields)

  return props.renderDefault(newProps)
}
