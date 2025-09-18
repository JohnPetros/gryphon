import { tableSchema } from '@nozbe/watermelondb'

export const noteSchema = tableSchema({
  name: 'notes',
  columns: [
    { name: 'title', type: 'string' },
    { name: 'vault_id', type: 'string', isIndexed: true },
    { name: 'encrypted_data', type: 'string' },
  ],
})
