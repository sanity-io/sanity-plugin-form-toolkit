import mailchimp from '@mailchimp/mailchimp_marketing'
import createHandler from '../shared/create-handler'

// Fetch from Mailchimp's API
async function fetchMailchimpData({key, server}: {key: string; server: string}): Promise<unknown> {
  mailchimp.setConfig({
    apiKey: key,
    server: server,
  })

  const response = await mailchimp.ping.get()
  return response
}

// Create the Mailchimp handler for a specific key and server
const mailchimpHandler = (keys: {key: string; server: string}) => {
  console.log('keys', keys)
  // Pass a function reference to `createHandler`
  return createHandler(() => fetchMailchimpData(keys))
}

export {mailchimpHandler}
