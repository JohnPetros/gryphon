import { z } from 'zod'
import { idSchema } from './id-schema'

export const accountSchema = z.object({
  id: idSchema.optional(),
  email: z.email().min(1),
  encryptionSalt: z.string().min(1),
  kcv: z.string().min(1),
  isBiometryActivated: z.boolean(),
  minimumPasswordStrength: z.number(),
  autoLockTimeout: z.number(),
  isMasterPasswordRequired: z.boolean(),
})
