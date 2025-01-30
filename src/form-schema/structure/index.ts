import type {DefaultDocumentNodeResolver} from 'sanity/structure'

import {DocumentView} from './document-view'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  // Conditionally return a different configuration based on the schema type
  if (schemaType === 'form') {
    return S.document().views([S.view.form(), S.view.component(DocumentView).title('Web')])
  }
  return S.document().views([S.view.form()])
}
