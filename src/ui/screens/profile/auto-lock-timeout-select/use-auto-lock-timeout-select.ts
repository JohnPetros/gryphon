import { useState } from 'react'

import { Account } from '@/core/domain/entities/account'
import type { AccountsRepository } from '@/core/interfaces'

export const AUTO_LOCK_TIMEOUTS: Record<number, string> = {
  5: '5 segundos',
  60: '1 minuto',
  120: '2 minutos',
  300: '5 minutos',
  600: '10 minutos',
}

type Params = {
  accountsRepository: AccountsRepository
  account: Account | null
  updateAccount: (account: Account) => void
}

export function useAutoLockTimeoutSelect({
  accountsRepository,
  account,
  updateAccount,
}: Params) {
  const [autoLockTimeout, setAutoLockTimeout] = useState(account?.autoLockTimeout || 5)

  async function handleChange(timeoutIndex: number) {
    if (!account) return

    const autoLockTimeout = Object.keys(AUTO_LOCK_TIMEOUTS).map(Number)[timeoutIndex]
    setAutoLockTimeout(autoLockTimeout)
    await accountsRepository.updateAutoLockTimeout(autoLockTimeout, account.id)
    account.autoLockTimeout = autoLockTimeout
    updateAccount(Account.create(account.dto))
  }

  return {
    autoLockTimeout,
    handleChange,
  }
}
