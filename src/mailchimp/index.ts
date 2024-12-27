import {asyncList} from '@sanity/sanity-plugin-async-list'
import {definePlugin} from 'sanity'

import {Option} from './components/option'

interface MailchimpInputConfig {
  apiKey: string
  server: string
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
        // secrets: {
        //   keys: [
        //     {key: 'apiKey', title: 'API Key'},
        //     {key: 'server', title: 'Server prefix'},
        //   ],
        // },
        loader: async ({secrets}) => {
          console.log('secrets', secrets)
          const data = await fetch(options.url)
          const body = await data.json()
          return body

          // if (!secrets || !secrets.apiKey || !secrets.server)
          //   throw new Error('Missing keys for Mailchimp input')
          // const {apiKey, server} = secrets
          // mailchimp.setConfig({
          //   apiKey,
          //   server,
          // })
          // const response = await mailchimp.ping.get()
          // console.log(response)
        },
        autocompleteProps: {
          renderOption: (option) => Option(option),
        },
      }),
    ],
  }
})
