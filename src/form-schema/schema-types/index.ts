import type {SchemaTypeDefinition} from 'sanity'

import {formType} from './form'
import {formFieldType} from './form-field'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [formType, formFieldType],
}
