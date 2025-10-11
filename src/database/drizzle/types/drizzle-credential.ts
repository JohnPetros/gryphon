import type { credentialSchema } from '../schemas/credential-schema'

export type DrizzleCredential = typeof credentialSchema.$inferSelect
