import { useState } from 'react'

import type { Account } from '@/core/domain/entities'
import type { AccountsRepository } from '@/core/interfaces'

type Params = {
  defaultChecked: boolean
  accountsRepository: AccountsRepository
  account: Account | null
  setAccount: (account: Account) => void
}

export const useMasterPasswordRequirementSwitch = ({
  defaultChecked,
  accountsRepository,
  account,
  setAccount,
}: Params) => {
  const [isChecked, setIsChecked] = useState(defaultChecked)

  async function handleChange(isChecked: boolean) {
    if (!account) return

    const previousChecked = !isChecked
    setIsChecked(isChecked)

    try {
      await accountsRepository.updateIsMasterPasswordRequired(isChecked, account.id)
      account.isMasterPasswordRequired = isChecked
      setAccount(account)
    } catch {
      setIsChecked(previousChecked)
    }
  }

  return {
    isChecked,
    handleChange,
  }
}
