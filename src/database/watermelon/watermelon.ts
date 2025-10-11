import { Database } from '@nozbe/watermelondb'
import SqliteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import { schemas } from './schemas'
import { AccountModel, CredentialModel, CredentialVersionModel } from './models'
import { NoteModel } from './models'
import { VaultModel } from './models'

const adapter = new SqliteAdapter({
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
