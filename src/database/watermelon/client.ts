import { Database } from '@nozbe/watermelondb'
import SqliteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import { schemas } from './schemas'
import { AccountModel, CredentialModel } from './models'
import { NoteModel } from './models'
import { VauntModel } from './models'

const adapter = new SqliteAdapter({
  dbName: 'gryphon',
  schema: schemas,
})

export const watermelon = new Database({
  adapter,
  modelClasses: [AccountModel, CredentialModel, NoteModel, VauntModel],
})
