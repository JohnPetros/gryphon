import type { Account } from '@/core/domain/entities/account'

export type AuthContextValue = {
  isLoading: boolean
  encryptionKey: string
  account: Account | null
  createAccount: (id: string, email: string, masterPassword: string) => Promise<void>
}
