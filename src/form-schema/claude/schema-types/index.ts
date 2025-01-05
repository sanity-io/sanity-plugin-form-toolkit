import {defineField, defineType} from 'sanity'

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
interface ValidationContextDocument {
  sections?: Array<{
    fields?: Array<{
      name: string
      type?: string
    }>
  }>
}
export const form = defineType({
  name: 'form',
  title: 'Form',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Form Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'id',
      title: 'Form ID',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Form Sections',
      type: 'array',
      of: [{type: 'formSection'}],
    }),
    defineField({
      name: 'submitButton',
      title: 'Submit Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Submit',
        }),
        defineField({
          name: 'position',
          title: 'Button Position',
          type: 'string',
          options: {
            list: ['left', 'center', 'right'],
          },
          initialValue: 'center',
        }),
      ],
    }),
  ],
})

export const formSection = defineType({
  name: 'formSection',
  title: 'Form Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [{type: 'formField'}],
      // TODO: fix
      // validation: (Rule) => Rule.unique('name'),
    }),
    defineField({
      name: 'conditional',
      title: 'Conditional Display',
      type: 'object',
      fields: [
        defineField({
          name: 'field',
          title: 'Based on Field',
          // todo: popuplate list
          type: 'string',
          options: {
            list: [],
          },
        }),
        defineField({
          name: 'condition',
          title: 'Condition',
          type: 'string',
          options: {
            list: ['equals', 'not_equals', 'contains', 'not_contains'],
          },
        }),
        defineField({
          name: 'value',
          title: 'Value',
          type: 'string',
        }),
      ],
    }),
  ],
})

export const formField = defineType({
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
