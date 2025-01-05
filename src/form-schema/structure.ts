import type {DefaultDocumentNodeResolver} from 'sanity/structure'

import {DocumentView} from './claude/components/document-view'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  console.log('schemaType', schemaType)
  // Conditionally return a different configuration based on the schema type
  if (schemaType === 'form') {
    return S.document().views([S.view.form(), S.view.component(DocumentView).title('Web')])
  }
  return S.document().views([S.view.form()])
}
