import { Model } from '@nozbe/watermelondb'
import { date, field, relation } from '@nozbe/watermelondb/decorators'
import type { VaultModel } from './vault-model'
import type { CredentialVersionModel } from './credential-version-model'

// @ts-ignore
export class CredentialModel extends Model {
  static table = 'credentials'

  static associations = {
    vaults: { type: 'belongs_to', key: 'vault_id' },
    credential_versions: { type: 'belongs_to', key: 'last_version_id' },
  }

  @relation('vaults', 'vault_id')
  vault!: VaultModel

  @relation('credential_versions', 'last_version_id')
  lastVersion!: CredentialVersionModel

  @field('title')
  title!: string

  @field('encrypted_data')
  encryptedData!: string

  @field('site_url')
  siteUrl!: string | null

  @date('created_at')
  createdAt!: number
}
