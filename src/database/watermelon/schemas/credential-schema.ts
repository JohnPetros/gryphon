import { tableSchema } from '@nozbe/watermelondb'

export const credentialSchema = tableSchema({
  name: 'credentials',
  columns: [
    {
      name: 'title',
      type: 'string',
    },
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
      name: 'site_url',
      type: 'string',
      isOptional: true,
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
