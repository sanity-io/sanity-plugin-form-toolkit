import {FormRenderer} from './form-renderer'

export const DocumentView = (props) => {
  console.log('props', props)
  return <FormRenderer formData={props.document.displayed} />
}
