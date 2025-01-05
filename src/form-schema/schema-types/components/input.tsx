import {EditIcon, EyeClosedIcon, EyeOpenIcon} from '@sanity/icons'
import {Card, Tab, TabList, TabPanel} from '@sanity/ui'
import {type JSX, useState} from 'react'
import type {ObjectInputProps} from 'sanity'

import {Form} from '../../components/form'
import {FormInput, type FormInputField, type SelectField} from '../../components/form-input'

export const Input = (props: ObjectInputProps): JSX.Element => {
  // console.log('props', props)

  const [id, setId] = useState('content')
  return (
    <Card padding={4}>
      <TabList space={2}>
        <Tab
          aria-controls="content-panel"
          icon={EditIcon}
          id="content-tab"
          label="Edit"
          onClick={() => setId('content')}
          selected={id === 'content'}
        />
        <Tab
          aria-controls="preview-panel"
          icon={id === 'preview' ? EyeOpenIcon : EyeClosedIcon}
          id="preview-tab"
          label="Preview"
          onClick={() => setId('preview')}
          selected={id === 'preview'}
        />
      </TabList>

      <TabPanel aria-labelledby="content-tab" hidden={id !== 'content'} id="content-panel">
        <Card paddingTop={1}>{props.renderDefault(props)}</Card>
      </TabPanel>

      <TabPanel aria-labelledby="preview-tab" hidden={id !== 'preview'} id="preview-panel">
        <Card width={'100%'} paddingTop={2}>
          {props.value && (
            <Form
            // form={props.value}
            >
              {props.value.fields &&
                props.value.fields.map((field: FormInputField | SelectField) => (
                  <div key={field._key}>
                    <FormInput
                      field={field}
                      labelProps={{style: {display: 'block'}}}
                      inputProps={{style: {marginBottom: '1em'}}}
                    />
                  </div>
                ))}
            </Form>
          )}
        </Card>
      </TabPanel>
    </Card>
  )
}
