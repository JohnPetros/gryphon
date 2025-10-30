import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { credentialSchema } from './credential-schema'

export const credentialVersionSchema = sqliteTable('credential_versions', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  credentialId: text('credential_id')
    .notNull()
    .references(() => credentialSchema.id, { onDelete: 'cascade' }),
  isRestoration: integer('is_restoration').notNull(),
  versionNumber: integer('version_number').notNull(),
  encryptedData: text('encrypted_data').notNull(),
})
