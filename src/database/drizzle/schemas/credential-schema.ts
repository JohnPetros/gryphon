import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { vaultSchema } from './vault-schema'

export const credentialSchema = sqliteTable('credentials', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  encryptedData: text('encrypted_data').notNull(),
  siteUrl: text('site_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
  vaultId: text('vault_id')
    .notNull()
    .references(() => vaultSchema.id, { onDelete: 'cascade' }),
  lastVersionId: text('last_version_id'),
})
