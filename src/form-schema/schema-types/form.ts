import {defineField, defineType} from 'sanity'

import {Input} from './components/input'
function getDuplicateIndices(arr: string[]) {
  const seen = new Map() // Tracks indices of each value
  const duplicates: number[][] = [] // Stores indices of duplicates

  arr.forEach((value: string, index: number) => {
    if (seen.has(value)) {
      // If the value is a duplicate, add both the first and subsequent occurrences
      if (!duplicates.some((indices) => indices.includes(seen.get(value)))) {
        duplicates.push([seen.get(value)])
      }
      // @ts-expect-error idk bro
      duplicates.find((indices) => indices.includes(seen.get(value))).push(index)
    } else {
      seen.set(value, index) // Store the index of the value
    }
  })
  return duplicates
}

export const formType = defineType({
  name: 'form',
  type: 'object',
  fields: [
    defineField({
      name: 'fields',
      type: 'array',
      // TODO: radio
      // TODO: checkboxes
      of: [{type: 'formInput'}, {type: 'select'}],
      validation: (Rule) =>
        Rule.custom((content?: {_key: string; name: {current: string}}[]) => {
          if (!content) return true
          const slugs = content?.map((item) => item.name.current)
          const duplicates: [{_key: string}, 'name'][] = []
          getDuplicateIndices(slugs).forEach((iArr) => {
            iArr.forEach((i: number) => {
              return duplicates.push([{_key: content[i]._key}, 'name'])
            })
          })

          return duplicates && duplicates.length
            ? {message: 'Name has to be unique', paths: duplicates}
            : true
        }),
    }),
  ],
  components: {
    input: Input,
  },
})
