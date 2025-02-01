import {definePlugin} from 'sanity'
// import {structureTool} from 'sanity/structure'

import {FormRenderer} from './components/form-renderer'
import {schema} from './schema-types'
// import {defaultDocumentNode} from './structure'

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {formSchema} from '@sanity/form-toolkit'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [formSchema()],
 * })
 * ```
 */
export {FormRenderer}
export const formSchema = definePlugin(() => {
  return {
    name: 'form-toolkit_form-schema',
    schema,
    // plugins: [structureTool({defaultDocumentNode})],
  }
})
