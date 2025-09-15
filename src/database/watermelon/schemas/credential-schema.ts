import { tableSchema } from '@nozbe/watermelondb'

export const credentialSchema = tableSchema({
  name: 'credentials',
  columns: [
    {
      name: 'vault_id',
      type: 'string',
      isIndexed: true,
    },
    {
      name: 'encrypted_data',
      type: 'string',
    },
    {
      name: 'created_at',
      type: 'number',
    },
    {
      name: 'updated_at',
      type: 'number',
    },
  ],
})
