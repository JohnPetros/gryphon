import { useCallback, useEffect, useState } from 'react'

import type { Credential } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { CredentialsRepository } from '@/core/interfaces'

type Params = {
  vaultId: Id
  credentialsRepository: CredentialsRepository
  onCredentialDelete: () => void
}

export function useCredentialsList({
  vaultId,
  credentialsRepository,
  onCredentialDelete,
}: Params) {
  const [credentials, setCredentials] = useState<Credential[]>([])

  const loadCredentials = useCallback(async () => {
    const credentials = await credentialsRepository.findAllByVault(vaultId)
    setCredentials(credentials)
  }, [credentialsRepository, vaultId])

  function handleCredentialDelete() {
    loadCredentials()
    onCredentialDelete()
  }

  useEffect(() => {
    loadCredentials()
  }, [vaultId, credentialsRepository, loadCredentials])

  return {
    credentials,
    handleCredentialDelete,
  }
}
