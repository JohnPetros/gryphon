import z from 'zod'

export const noteSchema = z.object({
  id: z.string(),
  title: z.string(),
  encryptedData: z.string(),
  vaultId: z.string(),
  createdAt: z.coerce.date(),
})
