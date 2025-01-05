import {asyncList} from '@sanity/sanity-plugin-async-list'
import {definePlugin} from 'sanity'

import {Option} from './components/option'

interface HubSpotInputConfig {
  url: string | URL
}

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {hubSpotInput} from '@sanity/sanity-plugin-form-toolkit'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [
 *    hubSpotInput({
 *      url: 'http://localhost:3000/api/hubspot'
 *    })
 *   ],
 * })
 * ```
 */

export const hubSpotInput = definePlugin<HubSpotInputConfig>((options) => {
  return {
    name: 'sanity-plugin-form-toolkit_hubspot-input',
    plugins: [
      asyncList({
        schemaType: 'hubSpotForm',
        loader: async () => {
          const data = await fetch(options.url)
          const body = await data.json()
          return body
        },
        autocompleteProps: {
          // @ts-expect-error todo
          renderOption: (option) => Option(option),
          renderValue(value, option) {
            // @ts-expect-error todo
            return option?.name ?? value
          },
        },
      }),
    ],
  }
})
