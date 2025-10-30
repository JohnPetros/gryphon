import type { vaultSchema } from '../schemas/vault-schema'

export type DrizzleVault = typeof vaultSchema.$inferSelect
