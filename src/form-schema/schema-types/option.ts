import {defineField, defineType} from 'sanity'
export const optionType = defineType({
  name: 'option',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      description: 'The text that will show to users',
    }),
    defineField({
      name: 'value',
      type: 'string',
      description: 'The value that will be stored in the form, if none is provided "label" is used',
    }),
  ],
})
