import { Database } from '@nozbe/watermelondb'

import { schemas } from './schemas'
import { AccountModel, CredentialModel, CredentialVersionModel } from './models'
import { NoteModel } from './models'
import { VaultModel } from './models'
import { createAdapter } from './sqlite-adapter'

const adapter = createAdapter({
  dbName: 'gryphon',
  schema: schemas,
})

export const watermelon = new Database({
  adapter,
  modelClasses: [
    AccountModel,
    VaultModel,
    NoteModel,
    CredentialModel,
    CredentialVersionModel,
  ],
})
