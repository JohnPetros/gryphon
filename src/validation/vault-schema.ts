import { z } from 'zod'
import { idSchema } from './id-schema'

export const vaultIconSchema = z.enum([
  'entertainment',
  'shop',
  'bank',
  'food',
  'health',
  'education',
  'travel',
  'service',
  'social-media',
  'streaming',
])

export const vaultSchema = z.object({
  id: idSchema.optional(),
  title: z.string(),
  icon: vaultIconSchema,
  accountId: idSchema,
  itemCount: z.number().optional(),
})
