import { appSchema } from '@nozbe/watermelondb'

import { credentialSchema } from './credential-schema'
import { noteSchema } from './note-schema'
import { vaultSchema } from './vault-schema'
import { accountSchema } from './account-schema'
import { credentialVersionSchema } from './credential-version-schema'

export const schemas = appSchema({
  version: 56,
  tables: [
    accountSchema,
    vaultSchema,
    noteSchema,
    credentialSchema,
    credentialVersionSchema,
  ],
})
