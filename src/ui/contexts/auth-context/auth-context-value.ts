import type { Account } from '@/core/domain/entities/account'
import { Id } from '@/core/domain/structures'

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
  loadAccount: (accountId?: Id) => Promise<void>
  signInAccount: (email: string, password: string) => Promise<void>
  signOutAccount: () => Promise<void>
  updateAccount: (account: Account) => Promise<void>
}
