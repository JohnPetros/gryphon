import { Model, type Query } from '@nozbe/watermelondb'
import { children, field, lazy, relation } from '@nozbe/watermelondb/decorators'

import type { CredentialModel } from './credential-model'
import type { NoteModel } from './note-model'
import type { AccountModel } from './account-model'

export class VauntModel extends Model {
  static table = 'vaunts'

  @relation('accounts', 'account_id')
  account!: AccountModel

  @children('vaunt_items')
  credentials!: Query<CredentialModel>

  @children('vaunt_items')
  notes!: Query<NoteModel>

  @field('title')
  title!: string

  @field('icon')
  icon!: string

  @lazy
  credentialCount = this.credentials.fetchCount()

  @lazy
  noteCount = this.credentials.fetchCount()

  async markAsDeleted() {
    await this.credentials.destroyAllPermanently()
    await super.markAsDeleted()
  }
}
