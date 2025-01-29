import {defineField, defineType} from 'sanity'

// import {SectionInput} from './components/section-input'

export const formSectionType = defineType({
  name: 'formSection',
  title: 'Form Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional',
    }),
    defineField({
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [{type: 'formField'}],
    }),
    // defineField({
    //   name: 'conditional',
    //   title: 'Conditional Display',
    //   type: 'object',
    //   options: {
    //     collapsed: true,
    //   },
    //   fields: [
    //     defineField({
    //       name: 'field',
    //       title: 'Based on Field',
    //       // TODO: popuplate list
    //       type: 'string',
    //       options: {
    //         list: [],
    //       },
    //     }),
    //     defineField({
    //       name: 'condition',
    //       title: 'Condition',
    //       type: 'string',
    //       options: {
    //         list: ['equals', 'not_equals', 'contains', 'not_contains'],
    //       },
    //     }),
    //     defineField({
    //       name: 'value',
    //       title: 'Value',
    //       type: 'string',
    //     }),
    //   ],
    // }),
  ],
  // components: {
  //   input: SectionInput,
  // },
})
