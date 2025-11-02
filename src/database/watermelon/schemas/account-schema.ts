import { tableSchema } from '@nozbe/watermelondb'

export const accountSchema = tableSchema({
  name: 'accounts',
  columns: [
    { name: 'email', type: 'string', isIndexed: true },
    { name: 'encryption_salt', type: 'string' },
    { name: 'kcv', type: 'string' },
    { name: 'is_biometry_activated', type: 'boolean' },
    { name: 'minimum_password_strength', type: 'number' },
    { name: 'auto_lock_timeout', type: 'number' },
    { name: 'is_master_password_required', type: 'boolean' },
  ],
})
