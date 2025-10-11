import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const accountSchema = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  email: text('email'),
  encryptionSalt: text('encryption_salt'),
  autoLockTimeout: integer('auto_lock_timeout'),
  isBiometryActivated: integer('is_biometry_activated').default(0),
  minimumPasswordStrength: integer('minimum_password_strength').default(3),
  isMasterPasswordRequired: integer('is_master_password_required').default(1),
})
