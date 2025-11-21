import { useCallback, useEffect, useState } from 'react'

import type { Credential } from '@/core/domain/entities'
import type { CredentialRotation, Id } from '@/core/domain/structures'
import type { CredentialsRepository } from '@/core/interfaces'
import type { DateTimeProvider } from '@/core/interfaces/providers/datetime-provider'

type Params = {
  vaultId: Id
  search: string
  credentialsRepository: CredentialsRepository
  credentialRotation?: CredentialRotation
  datetimeProvider: DateTimeProvider
  isDefaultCredentialsFilterChecked: boolean
  onCredentialDelete: () => void
}

export function useCredentialsList({
  vaultId,
  search,
  isDefaultCredentialsFilterChecked,
  credentialsRepository,
  credentialRotation,
  datetimeProvider,
  onCredentialDelete,
}: Params) {
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [isOutdatedCredentialsFilterChecked, setIsOutdatedCredentialsFilterChecked] =
    useState<boolean | null>(isDefaultCredentialsFilterChecked)

  const loadCredentials = useCallback(
    async (isOutdated: boolean | null) => {
      if (!credentialRotation) return
      let expirationDate: Date | undefined

      if (isOutdated) {
        expirationDate = credentialRotation.getExpirationDate(datetimeProvider)
      }

      const credentials =
        await credentialsRepository.findAllByVaultAndTitleAndLessThanUpdatingDate(
          vaultId,
          search,
          expirationDate,
        )
      setCredentials(credentials)
    },
    [credentialsRepository, vaultId, search],
  )

  async function handleCredentialDelete() {
    await loadCredentials(isOutdatedCredentialsFilterChecked)
    onCredentialDelete()
  }

  function handleOutdatedCredentialsFilterChange(isChecked: boolean) {
    setIsOutdatedCredentialsFilterChecked(isChecked)
  }

  useEffect(() => {
    loadCredentials(isOutdatedCredentialsFilterChecked)
  }, [
    vaultId,
    search,
    credentialsRepository,
    isDefaultCredentialsFilterChecked,
    isOutdatedCredentialsFilterChecked,
    loadCredentials,
  ])

  return {
    credentials,
    isOutdatedCredentialsFilterChecked: Boolean(isOutdatedCredentialsFilterChecked),
    handleCredentialDelete,
    handleOutdatedCredentialsFilterChange,
  }
}
