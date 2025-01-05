import type {SchemaTypeDefinition} from 'sanity'

import {formType} from './form'
import {formFieldType} from './form-field'
import {formSectionType} from './form-section'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [formType, formSectionType, formFieldType],
}
