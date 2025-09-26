import { useCallback, useEffect, useState } from 'react'

import type { Credential } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { CredentialsRepository } from '@/core/interfaces'

type Params = {
  vaultId: Id
  search: string
  credentialsRepository: CredentialsRepository
  onCredentialDelete: () => void
}

export function useCredentialsList({
  vaultId,
  search,
  credentialsRepository,
  onCredentialDelete,
}: Params) {
  const [credentials, setCredentials] = useState<Credential[]>([])

  const loadCredentials = useCallback(async () => {
    const credentials = await credentialsRepository.findAllByVaultAndTitle(
      vaultId,
      search,
    )
    setCredentials(credentials)
  }, [credentialsRepository, vaultId, search])

  function handleCredentialDelete() {
    loadCredentials()
    onCredentialDelete()
  }

  useEffect(() => {
    loadCredentials()
  }, [vaultId, search, credentialsRepository, loadCredentials])

  return {
    credentials,
    handleCredentialDelete,
  }
}
