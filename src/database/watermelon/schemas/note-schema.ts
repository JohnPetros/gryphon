import { tableSchema } from '@nozbe/watermelondb'

export const noteSchema = tableSchema({
  name: 'notes',
  columns: [
    { name: 'vault_id', type: 'string', isIndexed: true },
    { name: 'title', type: 'string' },
    { name: 'encrypted_data', type: 'string' },
  ],
})
