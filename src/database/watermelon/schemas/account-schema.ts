import { tableSchema } from '@nozbe/watermelondb'

export const accountSchema = tableSchema({
  name: 'accounts',
  columns: [
    { name: 'email', type: 'string', isIndexed: true },
    { name: 'encryption_salt', type: 'string' },
    { name: 'is_biometry_activated', type: 'boolean' },
    { name: 'minimum_password_strength', type: 'number' },
    { name: 'minimum_app_lock_time_in_seconds', type: 'number' },
    { name: 'is_master_password_required', type: 'boolean' },
  ],
})
