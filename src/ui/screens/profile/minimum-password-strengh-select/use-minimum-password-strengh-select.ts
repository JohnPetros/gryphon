import { useState } from 'react'

import type { AccountsRepository } from '@/core/interfaces'
import type { Account } from '@/core/domain/entities/account'

type Params = {
  accountsRepository: AccountsRepository
  account: Account | null
  setAccount: (account: Account) => void
}

export function useMinimumPasswordStrenghSelect({
  accountsRepository,
  account,
  setAccount,
}: Params) {
  const [value, setValue] = useState(account?.minimumPasswordStrength || 1)

  async function handleChange(value: number) {
    if (!account) return

    setValue(value)
    await accountsRepository.updateMinimumPasswordStrength(value, account.id)
    account.minimumPasswordStrength = value
    setAccount(account)
  }

  return { value, handleChange }
}
