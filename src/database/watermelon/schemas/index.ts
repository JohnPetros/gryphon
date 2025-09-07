import { appSchema } from '@nozbe/watermelondb'

import { credentialSchema } from './credential-schema'
import { noteSchema } from './note-schema'
import { vauntSchema } from './vaunt-schema'
import { accountSchema } from './account-schema'

export const schemas = appSchema({
  version: 3,
  tables: [accountSchema, credentialSchema, noteSchema, vauntSchema],
})
