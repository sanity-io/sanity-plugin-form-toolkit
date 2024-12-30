// import {definePlugin} from 'sanity'

// interface MyPluginConfig {
//   /* nothing here yet */
// }

// /**
//  * Usage in `sanity.config.ts` (or .js)
//  *
//  * ```ts
//  * import {defineConfig} from 'sanity'
//  * import {myPlugin} from 'sanity-plugin-form-toolkit'
//  *
//  * export default defineConfig({
//  *   // ...
//  *   plugins: [myPlugin()],
//  * })
//  * ```
//  */
// export const myPlugin = definePlugin<MyPluginConfig | void>((config = {}) => {
//   // eslint-disable-next-line no-console
//   console.log('hello from sanity-plugin-form-toolkit')
//   return {
//     name: 'sanity-plugin-form-toolkit',
//   }
// })
// import {formSchema} from './form-schema'
// import {formiumInput} from './formium'
import {hubSpotInput} from './hubspot'
import {hubspotHandler} from './hubspot/create-handler'
import {mailchimpInput} from './mailchimp'
import {fetchMailchimpData, mailchimpHandler} from './mailchimp/create-handler'

export {fetchMailchimpData, hubspotHandler, hubSpotInput, mailchimpHandler, mailchimpInput}
