import type { accountSchema } from '../schemas/account-schema'

export type DrizzleAccount = typeof accountSchema.$inferSelect
