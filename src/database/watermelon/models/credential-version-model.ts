import { Model } from '@nozbe/watermelondb'
import { date, field, relation } from '@nozbe/watermelondb/decorators'
import type { CredentialModel } from './credential-model'

// @ts-ignore
export class CredentialVersionModel extends Model {
  static table = 'credential_versions'

  static associations = {
    credentials: { type: 'belongs_to', key: 'credential_id' },
    credential_versions: { type: 'belongs_to', key: 'last_version_id' },
  }

  @relation('credentials', 'credential_id')
  credential!: CredentialModel

  @relation('credential_versions', 'last_version_id')
  lastVersionId!: string | null

  @field('version_number')
  versionNumber!: number

  @field('is_restoration')
  isRestoration!: boolean

  @field('title')
  title!: string

  @field('encrypted_data')
  encryptedData!: string

  @field('site_url')
  siteUrl!: string | null

  @field('created_at')
  createdAt!: number
}
