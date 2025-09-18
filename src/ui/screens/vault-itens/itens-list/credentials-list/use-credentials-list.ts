import { useEffect, useState } from 'react'

import type { Credential } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { CredentialsRepository } from '@/core/interfaces'

export function useCredentialsList(
  vaultId: Id,
  credentialsRepository: CredentialsRepository,
) {
  const [credentials, setCredentials] = useState<Credential[]>([])

  useEffect(() => {
    async function loadCredentials() {
      const credentials = await credentialsRepository.findAllByVault(vaultId)
      console.log('credentials', credentials)
      setCredentials(credentials)
    }
    loadCredentials()
  }, [vaultId, credentialsRepository])

  return {
    credentials,
  }
}
