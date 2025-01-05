import {defineField, defineType} from 'sanity'
interface ValidationContextDocument {
  sections?: Array<{
    fields?: Array<{
      name: string
      type?: string
    }>
  }>
}
// Validation options by field type
const validationTypesByFieldType = {
  text: ['minLength', 'maxLength', 'pattern', 'custom'],
  email: ['pattern', 'custom'],
  password: ['minLength', 'pattern', 'custom'],
  tel: ['pattern', 'custom'],
  url: ['pattern', 'custom'],
  number: ['min', 'max', 'custom'],
  textarea: ['minLength', 'maxLength', 'custom'],
  select: ['custom'],
  radio: ['custom'],
  checkbox: ['minSelectedCount', 'maxSelectedCount', 'custom'],
  file: ['maxSize', 'fileType', 'custom'],
  date: ['minDate', 'maxDate', 'custom'],
  time: ['custom'],
  'datetime-local': ['minDate', 'maxDate', 'custom'],
  color: ['custom'],
  range: ['min', 'max', 'step', 'custom'],
  hidden: ['custom'],
}
export const formFieldType = defineType({
  name: 'formField',
  title: 'Form Field',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Field Type',
      type: 'string',
      options: {
        list: Object.keys(validationTypesByFieldType),
      },
    }),
    defineField({
      name: 'label',
      title: 'Field Label',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Field Name',
      type: 'string',
      description:
        'Must start with a letter and contain only letters, numbers, underscores, or hyphens. Must be unique within the form.',
      validation: (Rule) =>
        Rule.required().custom((name, context) => {
          if (!name) {
            return 'Required'
          }
          // Check format (HTML ID/name rules)
          if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(name)) {
            return 'Field name must start with a letter and contain only letters, numbers, underscores, or hyphens'
          }

          // Check uniqueness across all sections
          const doc = context.document as ValidationContextDocument
          const allFieldNames =
            doc?.sections?.flatMap((section) => section.fields?.map((field) => field.name) || []) ||
            []

          // Count occurrences of this name
          const nameCount = allFieldNames.filter((n) => n === name).length

          // If we find more than one occurrence (including current field), it's not unique
          if (nameCount > 1) {
            return 'Field name must be unique across all form sections'
          }

          // Check for reserved HTML form attributes
          const reservedNames = [
            'action',
            'method',
            'target',
            'enctype',
            'accept-charset',
            'autocomplete',
            'novalidate',
            'rel',
            'submit',
            'reset',
          ]
          if (reservedNames.includes(name.toLowerCase())) {
            return 'This name is reserved for HTML form attributes. Please choose a different name.'
          }

          return true
        }),
    }),
    defineField({
      name: 'required',
      title: 'Required',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'validation',
      title: 'Validation Rules',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Validation Type',
              type: 'string',

              hidden: ({parent}) => !parent?.type,
              options: {
                // TODO: I think this needs to be a custom input component?
                // list: ({parent}) => (parent?.type ? validationTypesByFieldType[parent.type] : []),
                list: [],
              },
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
            }),
            defineField({
              name: 'message',
              title: 'Error Message',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'choices',
      title: 'Choices',
      type: 'array',
      hidden: ({parent}) => {
        return !['select', 'radio', 'checkbox'].includes(parent?.type)
      },
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'options',
      title: 'Field Options',
      type: 'object',
      fields: [
        defineField({
          name: 'placeholder',
          title: 'Placeholder',
          type: 'string',
        }),
        defineField({
          name: 'defaultValue',
          title: 'Default Value',
          type: 'string',
        }),
      ],
    }),
  ],
})
