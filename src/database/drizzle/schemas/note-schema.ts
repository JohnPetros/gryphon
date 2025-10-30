import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { vaultSchema } from './vault-schema'

export const noteSchema = sqliteTable('notes', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  vaultId: text('vault_id')
    .notNull()
    .references(() => vaultSchema.id, { onDelete: 'cascade' }),
  encryptedData: text('encrypted_data').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
})
