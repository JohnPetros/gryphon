import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'
import type { VaultModel } from './vault-model'

// @ts-ignore
export class NoteModel extends Model {
  static table = 'notes'

  static associations = {
    vaults: { type: 'belongs_to', key: 'vault_id' },
  }

  @relation('vaults', 'vault_id')
  vault!: VaultModel

  @field('title')
  title!: string

  @field('encrypted_data')
  encryptedData!: string

  @field('created_at')
  createdAt!: number

  @field('updated_at')
  updatedAt!: number | null
}
