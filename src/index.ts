import {formSchema} from './form-schema'
// import {formiumInput} from './formium'
import type {FormDataProps} from './form-schema/components/types'
import {hubSpotInput} from './hubspot'
import {hubSpotHandler} from './hubspot/create-handler'
import {fetchHubSpotData} from './hubspot/fetch-hubspot-data'
import {mailchimpInput} from './mailchimp'
import {fetchMailchimpData, mailchimpHandler} from './mailchimp/create-handler'
// import {FormRenderer} from './form-schema/claude/components/form-renderer'
// import {DefaultField} from './form-schema/claude/components/default-field'
export {
  fetchHubSpotData,
  fetchMailchimpData,
  type FormDataProps,
  formSchema,
  hubSpotHandler,
  hubSpotInput,
  mailchimpHandler,
  mailchimpInput,
}
