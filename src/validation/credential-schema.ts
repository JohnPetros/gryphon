import { z } from 'zod'
import { idSchema } from './id-schema'
import { vaultItemSchema } from './vault-item-schema'

export const credentialSchema = vaultItemSchema.extend({
  lastVersionId: idSchema.optional().nullable(),
  siteUrl: z.string().optional(),
})
