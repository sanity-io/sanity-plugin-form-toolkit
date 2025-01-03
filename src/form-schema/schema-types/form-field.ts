import {
  CalendarIcon,
  ClockIcon,
  ColorWheelIcon,
  DocumentIcon,
  EarthGlobeIcon,
  EnvelopeIcon,
  HashIcon,
  NumberIcon,
  TextIcon,
} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const formFieldType = defineType({
  name: 'formField',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      group: 'info',
    }),
    defineField({
      name: 'name',
      type: 'slug',
      group: 'info',
      validation: (rule) => rule.required(),
      options: {
        source: 'label',
      },
    }),
    defineField({
      name: 'type',
      type: 'string',
      group: 'info',
      validation: (rule) => rule.required(),
      options: {
        list: [
          {value: 'color', title: 'Color'},
          {value: 'date', title: 'Date'},
          {value: 'datetime-local', title: 'Date-time'},
          'email',
          'file',
          {value: 'month', title: 'Month & year'},
          'number',
          {value: 'tel', title: 'Telephone'},
          'text',
          'time',
          'range',
          {value: 'url', title: 'URL'},
          'week',
        ],
      },
    }),
    defineField({
      group: 'validation',
      name: 'required',
      type: 'boolean',
      hidden: ({parent}) => {
        const unallowedTypes = ['hidden', 'range', 'color']

        return unallowedTypes.includes(parent.type)
      },
    }),
    defineField({
      group: 'validation',
      name: 'max',
      type: 'number',
      hidden: ({parent}) => {
        const allowedTypes = ['date', 'month', 'week', 'time', 'datetime-local', 'number', 'range']

        return !allowedTypes.includes(parent.type)
      },
    }),
    defineField({
      group: 'validation',
      name: 'min',
      type: 'number',
      hidden: ({parent}) => {
        const allowedTypes = ['date', 'month', 'week', 'time', 'datetime-local', 'number', 'range']

        return !allowedTypes.includes(parent.type)
      },
    }),
    defineField({
      group: 'validation',
      name: 'step',
      type: 'number',
      hidden: ({parent}) => {
        const allowedTypes = ['date', 'month', 'week', 'time', 'datetime-local', 'number', 'range']

        return !allowedTypes.includes(parent.type)
      },
    }),
    defineField({
      group: 'validation',
      name: 'maxlength',
      title: 'Max length',
      type: 'number',
      hidden: ({parent}) => {
        const allowedTypes = ['text', 'search', 'url', 'tel', 'email', 'password']

        return !allowedTypes.includes(parent.type)
      },
    }),
    defineField({
      group: 'validation',
      name: 'minlength',
      title: 'Min length',
      type: 'number',
      hidden: ({parent}) => {
        const allowedTypes = ['text', 'search', 'url', 'tel', 'email', 'password']

        return !allowedTypes.includes(parent.type)
      },
    }),
  ],
  groups: [{name: 'info'}, {name: 'validation'}],
  preview: {
    select: {
      title: 'label',
      subtitle: 'type',
    },
    prepare: ({title, subtitle}) => {
      const icon: Record<
        string,
        typeof TextIcon | typeof NumberIcon | typeof CalendarIcon | typeof ClockIcon
      > = {
        text: TextIcon,
        number: NumberIcon,
        date: CalendarIcon,
        'datetime-local': CalendarIcon,
        month: CalendarIcon,
        time: ClockIcon,
        color: ColorWheelIcon,
        email: EnvelopeIcon,
        url: EarthGlobeIcon,
        file: DocumentIcon,
        tel: HashIcon,
        week: CalendarIcon,
        range: NumberIcon,
      }
      return {title, subtitle, media: icon[subtitle]}
    },
  },
})
