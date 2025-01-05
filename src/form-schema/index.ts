import {definePlugin} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schema} from './schema-types'
import {defaultDocumentNode} from './structure'
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
export const formSchema = definePlugin<FormSchemaConfig | void>((config = {}) => {
  return {
    name: 'sanity-plugin-form-toolkit_form-schema',
    schema,
    plugins: [structureTool({defaultDocumentNode})],
  }
})
