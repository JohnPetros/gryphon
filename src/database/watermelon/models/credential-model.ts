import { Model } from '@nozbe/watermelondb'
import { date, field, relation } from '@nozbe/watermelondb/decorators'
import type { VauntModel } from './vaunt-model'

export class CredentialModel extends Model {
  static table = 'credentials'

  @relation('vaunts', 'vaunt_id')
  vaunt!: VauntModel

  @field('title')
  title!: string

  @field('encrypted_data')
  encryptedData!: string

  @field('site_url')
  siteUrl!: string

  @date('created_at')
  createdAt!: Date
}
