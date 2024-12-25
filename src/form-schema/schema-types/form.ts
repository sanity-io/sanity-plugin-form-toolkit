import {defineField, defineType} from 'sanity'

export const formType = defineType({
  name: 'form',
  type: 'object',
  fields: [
    defineField({
      name: 'fields',
      type: 'array',
      of: [{type: 'formField'}],
    }),
  ],
})
