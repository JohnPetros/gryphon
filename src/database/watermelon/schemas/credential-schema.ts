import { tableSchema } from '@nozbe/watermelondb'

export const credentialSchema = tableSchema({
  name: 'credentials',
  columns: [
    {
      name: 'vaunt_id',
      type: 'string',
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
