import { appSchema } from '@nozbe/watermelondb'

import { credentialSchema } from './credential-schema'
import { noteSchema } from './note-schema'
import { vaultSchema } from './vault-schema'
import { accountSchema } from './account-schema'

export const schemas = appSchema({
  version: 6,
  tables: [accountSchema, credentialSchema, noteSchema, vaultSchema],
})
