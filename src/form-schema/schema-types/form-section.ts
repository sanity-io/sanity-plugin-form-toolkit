import {defineField, defineType} from 'sanity'
export const formSectionType = defineType({
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
