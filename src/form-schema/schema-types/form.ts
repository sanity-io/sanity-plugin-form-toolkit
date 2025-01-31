import {defineField, defineType} from 'sanity'
import {MdDynamicForm} from 'react-icons/md'

export const formType = defineType({
  name: 'form',
  title: 'Form',
  type: 'document',
  icon: MdDynamicForm,
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
    // defineField({
    //   name: 'sections',
    //   title: 'Form Sections',
    //   type: 'array',
    //   of: [{type: 'formSection'}],
    // }),
    defineField({
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [{type: 'formField'}],
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
        // defineField({
        //   name: 'position',
        //   title: 'Button Position',
        //   type: 'string',
        //   options: {
        //     list: ['left', 'center', 'right'],
        //   },
        //   initialValue: 'center',
        // }),
      ],
    }),
  ],
})
