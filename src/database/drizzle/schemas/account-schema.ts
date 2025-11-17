import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const accountSchema = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  encryptionSalt: text('encryption_salt').notNull(),
  kcv: text('kcv').notNull(),
  autoLockTimeout: integer('auto_lock_timeout'),
  isBiometryActivated: integer('is_biometry_activated').notNull().default(0),
  minimumPasswordStrength: integer('minimum_password_strength').notNull().default(3),
  isMasterPasswordRequired: integer('is_master_password_required').notNull().default(1),
  notificationToken: text('notification_token'),
  credentialRotationUnit: text('credential_rotation_unit').notNull(),
  credentialRotationInterval: integer('credential_rotation_interval').notNull(),
})
