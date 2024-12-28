# sanity-plugin-form-toolkit

Plugin for integrating 3rd party form services or building your own forms with Sanity.

> This is a **Sanity Studio v3** plugin.

## Installation

```sh
npm install @sanity/sanity-plugin-form-toolkit
```

## Mailchimp

### Usage

This plugin requires you to set up your own API route to fetch against Mailchimp's API. You'll need to pass an API key and server prefix to the underlying Mailchimp marketing client. Learn how to get a Mailchimp API key [here](https://mailchimp.com/help/about-api-keys/).

There's an "out of the box" handler for Next.js API routes:

```ts
// pages/api/mailchimp.ts
import {mailchimpHandler} from '@sanity/sanity-plugin-form-toolkit'

const handler = mailchimpHandler({
  key: process.env.MAILCHIMP_KEY ?? '',
  server: process.env.MAILCHIMP_SERVER_PREFIX ?? '',
})

export default handler
```

Or add `fetchMailchimpData` to an API route in your non-Next framework

```ts
// my-nuxt-app/server/api/mailchimp.ts
import {fetchMailchimpData} from '@sanity/sanity-plugin-form-toolkit'

export default defineEventHandler(async (event) => {
  const req = event.node.req
  const res = event.node.res
  const data = await fetchMailchimpData({
    key: process.env.MAILCHIMP_KEY ?? '',
    server: process.env.MAILCHIMP_SERVER_PREFIX ?? '',
  })
  res.writeHead(200, {'Content-Type': 'application/json'})
  res.end(JSON.stringify(data))
})
```

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {mailchimpInput} from '@sanity/sanity-plugin-form-toolkit'

export default defineConfig({
  //...
  plugins: [
    mailchimpInput({
      url: 'your-api-endpoint',
    }),
  ],
})
```

Finally, add the field type to the schema you'd like to use it in

```ts
// schemaTypes/post.ts
export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    //...rest of schma
    defineField({
      name: 'mailchimp',
      type: 'mailchimpForm',
    }),
  ],
})
```

## License

[MIT](LICENSE) © Chris LaRocque

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
