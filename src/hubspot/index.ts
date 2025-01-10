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
type ExtendedOption = {value: string; name: string}

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
          renderOption: (option) => Option(option as ExtendedOption),
          renderValue(value, option) {
            // @ts-expect-error can't extend default type?
            return option?.name ?? value
          },
        },
      }),
    ],
  }
})
