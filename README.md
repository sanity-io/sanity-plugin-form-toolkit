## Usage

# @sanity/form-toolkit

Plugin for integrating 3rd party form services or building your own forms with Sanity.

> This is a **Sanity Studio v3** plugin.

## Installation

```sh
npm install @sanity/form-toolkit
```

## HubSpot

The HubSpot integration fetches all forms in a HubSpot project and adds them as options in a selectable list.

### Usage

This plugin requires you to set up your own API route to fetch against HubSpot's API. You'll need to also create a Private App in HubSpot to create and pass a Private App access token to the provided fetch function. Learn how to create a Private App and get an access token [here](https://developers.hubspot.com/docs/guides/apps/private-apps/overview).

There's an "out of the box" handler for Next.js API routes:

```ts
// pages/api/hubspot.ts
import {hubSpotHandler} from '@sanity/form-toolkit'

const handler = hubSpotHandler({
  token: process.env.HUBSPOT_TOKEN ?? '',
})

export default handler
```

Or add `fetchHubSpotData` to an API route in your non-Next framework

```ts
// my-nuxt-app/server/api/hubspot.ts
import {fetchHubSpotData} from '@sanity/form-toolkit'

export default defineEventHandler(async (event) => {
  const req = event.node.req
  const res = event.node.res
  const data = await fetchHubSpotData({
    token: process.env.HUBSPOT_TOKEN ?? '',
  })
  res.writeHead(200, {'Content-Type': 'application/json'})
  res.end(JSON.stringify(data))
})
```

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {hubSpotInput} from '@sanity/form-toolkit'

export default defineConfig({
  //...
  plugins: [
    hubSpotInput({
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
      name: 'hubSpot',
      type: 'hubSpotForm',
    }),
  ],
})
```

## Mailchimp

The Mailchimp integration fetches all signup forms across all lists in your Mailchimp account and syncs the URL for the selected form.

### Usage

This plugin requires you to set up your own API route to fetch against Mailchimp's API. You'll need to pass an API key and server prefix to the underlying Mailchimp marketing client. Learn how to get a Mailchimp API key [here](https://mailchimp.com/help/about-api-keys/).

There's an "out of the box" handler for Next.js API routes:

```ts
// pages/api/mailchimp.ts
import {mailchimpHandler} from '@sanity/form-toolkit'

const handler = mailchimpHandler({
  key: process.env.MAILCHIMP_KEY ?? '',
  server: process.env.MAILCHIMP_SERVER_PREFIX ?? '',
})

export default handler
```

Or add `fetchMailchimpData` to an API route in your non-Next framework

```ts
// my-nuxt-app/server/api/mailchimp.ts
import {fetchMailchimpData} from '@sanity/form-toolkit'

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
import {mailchimpInput} from '@sanity/form-toolkit'

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


### Release new version

Run ["CI & Release" workflow](https://github.com/sanity-io/form-toolkit/actions/workflows/main.yml).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.
