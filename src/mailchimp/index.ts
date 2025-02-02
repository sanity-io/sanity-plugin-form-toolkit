import {asyncList} from '@sanity/sanity-plugin-async-list'
import {definePlugin} from 'sanity'

import {Option} from './components/option'

interface MailchimpInputConfig {
  url: string | URL
}

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {formiumInput} from 'sanity-plugin-form-toolkit'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [formiumInput()],
 * })
 * ```
 */

export const mailchimpInput = definePlugin<MailchimpInputConfig>((options) => {
  return {
    name: 'sanity-plugin-form-toolkit_mailchimp-input',
    plugins: [
      asyncList({
        schemaType: 'mailchimpForm',
        loader: async () => {
          const data = await fetch(options.url)
          const body = await data.json()
          return body
        },
        autocompleteProps: {
          //@ts-expect-error incorrect typing on props?
          renderOption: (option) => Option(option),
        },
      }),
    ],
  }
})
