import { useState } from 'react'

import type { Account } from '@/core/domain/entities'
import type { AccountsRepository } from '@/core/interfaces'

type Params = {
  defaultChecked: boolean
  accountsRepository: AccountsRepository
  account: Account | null
  updateAccount: (account: Account) => void
}

export const useMasterPasswordRequirementSwitch = ({
  defaultChecked,
  accountsRepository,
  account,
  updateAccount,
}: Params) => {
  const [isChecked, setIsChecked] = useState(defaultChecked)

  async function handleChange(isChecked: boolean) {
    if (!account) return

    const previousChecked = !isChecked
    setIsChecked(isChecked)

    try {
      await accountsRepository.updateIsMasterPasswordRequired(isChecked, account.id)
      account.isMasterPasswordRequired = isChecked
      updateAccount(account)
    } catch {
      setIsChecked(previousChecked)
    }
  }

  return {
    isChecked,
    handleChange,
  }
}
