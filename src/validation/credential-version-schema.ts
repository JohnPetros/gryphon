import { z } from 'zod'
import { idSchema } from './id-schema'
import { credentialSchema } from './credential-schema'

export const credentialVersionSchema = credentialSchema
  .omit({ vaultId: true, updatedAt: true })
  .extend({
    versionNumber: z.number(),
    isRestoration: z.boolean(),
    credentialId: idSchema,
    createdAt: z.coerce.date(),
  })
