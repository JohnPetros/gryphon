import { Model } from '@nozbe/watermelondb'
import { date, field, relation } from '@nozbe/watermelondb/decorators'
import type { VaultModel } from './vault-model'

// @ts-ignore
export class CredentialModel extends Model {
  static table = 'credentials'

  static associations = {
    vaults: { type: 'belongs_to', key: 'vault_id' },
  }

  @relation('vaults', 'vault_id')
  vault!: VaultModel

  @field('title')
  title!: string

  @field('encrypted_data')
  encryptedData!: string

  @field('site_url')
  siteUrl!: string

  @date('created_at')
  createdAt!: Date
}
