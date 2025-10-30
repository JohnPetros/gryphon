import { z } from 'zod'
import { idSchema } from './id-schema'

export const vaultItemSchema = z.object({
  id: idSchema.optional(),
  title: z.string(),
  encryptedData: z.string(),
  vaultId: idSchema,
  createdAt: z.coerce.date(),
})
