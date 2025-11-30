import { useState } from 'react'

import type { Account } from '@/core/domain/entities'
import type { AccountsRepository } from '@/core/interfaces'

type Params = {
  defaultChecked: boolean
  accountsRepository: AccountsRepository
  account: Account | null
  onUpdateAccount: (account: Account) => Promise<void>
}

export const useMasterPasswordRequirementSwitch = ({
  defaultChecked,
  accountsRepository,
  account,
  onUpdateAccount,
}: Params) => {
  const [isChecked, setIsChecked] = useState(defaultChecked)

  async function handleChange(isChecked: boolean) {
    if (!account) return

    const previousChecked = !isChecked
    setIsChecked(isChecked)

    try {
      await accountsRepository.updateIsMasterPasswordRequired(isChecked, account.id)
      account.isMasterPasswordRequired = isChecked
      await onUpdateAccount(account)
    } catch (error) {
      console.log('error', error)
      setIsChecked(previousChecked)
    }
  }

  return {
    isChecked,
    handleChange,
  }
}
