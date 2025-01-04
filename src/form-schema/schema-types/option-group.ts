import {defineField, defineType} from 'sanity'

export const optionGroupType = defineType({
  name: 'optionGroup',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
    }),
    defineField({
      name: 'options',
      type: 'array',
      of: [{type: 'option'}],
    }),
  ],
})
