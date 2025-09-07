import { tableSchema } from '@nozbe/watermelondb'

export const vauntSchema = tableSchema({
  name: 'vaunts',
  columns: [
    { name: 'account_id', type: 'string', isIndexed: true },
    { name: 'title', type: 'string' },
    { name: 'icon', type: 'string' },
  ],
})
