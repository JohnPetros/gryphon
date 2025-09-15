import { Model } from '@nozbe/watermelondb'
import { date, field } from '@nozbe/watermelondb/decorators'

// @ts-ignore
export class NoteModel extends Model {
  static table = 'notes'

  static associations = {
    vaults: { type: 'belongs_to', key: 'vault_id' },
  }

  @field('title')
  title!: string

  @field('encrypted_data')
  encryptedData!: string

  @date('created_at')
  createdAt!: Date
}
