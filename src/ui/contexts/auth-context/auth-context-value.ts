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
  signInAccount: (email: string, password: string) => Promise<void>
  signOutAccount: () => Promise<void>
  setAccount: (account: Account) => void
}
