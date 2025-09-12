import { tableSchema } from '@nozbe/watermelondb'

export const vaultSchema = tableSchema({
  name: 'vaults',
  columns: [
    { name: 'account_id', type: 'string', isIndexed: true },
    { name: 'title', type: 'string' },
    { name: 'icon', type: 'string' },
  ],
})
