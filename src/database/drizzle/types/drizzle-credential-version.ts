import type { credentialVersionSchema } from '../schemas/credential-version-schema'

export type DrizzleCredentialVersion = typeof credentialVersionSchema.$inferSelect
