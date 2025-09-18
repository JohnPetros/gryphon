import { Model, type Query } from '@nozbe/watermelondb'
import { children, field, lazy } from '@nozbe/watermelondb/decorators'

import type { CredentialModel } from './credential-model'
import type { NoteModel } from './note-model'

// @ts-ignore
export class VaultModel extends Model {
  static table = 'vaults'

  static associations = {
    credentials: { type: 'has_many', foreignKey: 'vault_id' },
    notes: { type: 'has_many', foreignKey: 'vault_id' },
    accounts: { type: 'belongs_to', key: 'account_id' },
  }

  @children('credentials')
  credentials!: Query<CredentialModel>

  @children('notes')
  notes!: Query<NoteModel>

  @field('title')
  title!: string

  @field('icon')
  icon!: string

  @lazy
  credentialCount = this.credentials.fetchCount()

  @lazy
  noteCount = this.notes.fetchCount()

  async markAsDeleted() {
    await this.credentials.destroyAllPermanently()
    await super.markAsDeleted()
  }
}
