import {definePlugin} from 'sanity'

import {schema} from './schema-types'
interface FormSchemaConfig {
  /* nothing here yet */
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
// Is Formium dead? All attempts to use the API come back with an expired cert https://github.com/formium/formium/issues/77
export const formSchema = definePlugin<FormSchemaConfig | void>(() => {
  return {
    name: 'sanity-plugin-form-toolkit_form-schema',
    schema,
  }
})
