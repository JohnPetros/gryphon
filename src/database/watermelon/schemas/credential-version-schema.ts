import { tableSchema } from '@nozbe/watermelondb'

export const credentialVersionSchema = tableSchema({
  name: 'credential_versions',
  columns: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'credential_id',
      type: 'string',
      isIndexed: true,
    },
    {
      name: 'is_restoration',
      type: 'boolean',
    },
    {
      name: 'version_number',
      type: 'number',
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
