import type {SchemaTypeDefinition} from 'sanity'

import {formType} from './form'
import {formInputType} from './form-input'
import {optionType} from './option'
import {optionGroupType} from './option-group'
import {selectType} from './select'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [formInputType, formType, optionType, selectType, optionGroupType],
}
