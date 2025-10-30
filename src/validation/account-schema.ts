import { z } from 'zod'
import { idSchema } from './id-schema'

export const accountSchema = z.object({
  id: idSchema.optional(),
  email: z.email(),
  encryptionSalt: z.string(),
  isBiometryActivated: z.boolean(),
  minimumPasswordStrength: z.number(),
  autoLockTimeout: z.number(),
  isMasterPasswordRequired: z.boolean(),
})
