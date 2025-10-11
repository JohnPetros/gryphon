import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { accountSchema } from './account.schema'

export const vaultSchema = sqliteTable('vaults', {
  id: text('id').primaryKey(),
  title: text('name').notNull(),
  icon: text('icon').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
  accountId: text('account_id')
    .notNull()
    .references(() => accountSchema.id, { onDelete: 'cascade' }),
})
