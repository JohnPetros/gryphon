import type { Account } from '@/core/domain/entities/account'

export type AuthContextValue = {
  isLoading: boolean
  encryptionKey: string
  account: Account | null
  createAccount: (
    accountId: string,
    email: string,
    masterPassword: string,
  ) => Promise<void>
  createEncryptionKey: (masterPassword: string, encryptionSalt: string) => Promise<string>
  loadAccount: () => Promise<void>
  signInAccount: (email: string, password: string) => Promise<void>
  signOutAccount: () => Promise<void>
  updateAccount: (account: Account) => void
}
