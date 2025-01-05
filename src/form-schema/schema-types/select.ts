import {defineField, defineType} from 'sanity'
import {ListIcon} from '@sanity/icons'

export const selectType = defineType({
  name: 'select',
  icon: ListIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
    }),
    defineField({
      name: 'name',
      type: 'slug',
      // TODO: fix typeerror
      // options: {
      //   source: (doc, {parent}) => parent && parent.label,
      // },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'options',
      type: 'array',
      of: [{type: 'option'}, {type: 'optionGroup'}],
    }),
    defineField({
      name: 'required',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      title: 'label',
    },
    prepare({title}) {
      return {
        title,
        subtitle: 'select',
      }
    },
  },
})
