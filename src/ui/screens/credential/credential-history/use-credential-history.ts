import { useEffect, useState } from 'react'

import type { CredentialVersion } from '@/core/domain/entities/credential-version'
import type { Id } from '@/core/domain/structures'
import type { CredentialVersionsRepository } from '@/core/interfaces'

type Params = {
  credentialId: Id
  credentialVersionsRepository: CredentialVersionsRepository
}

export function useCredentialHistory({
  credentialId,
  credentialVersionsRepository,
}: Params) {
  const [versions, setVersions] = useState<CredentialVersion[]>([])

  useEffect(() => {
    async function loadVersions() {
      const versions =
        await credentialVersionsRepository.findAllByCredential(credentialId)
      setVersions(versions)
    }
    loadVersions()
  }, [])

  return {
    versions,
  }
}
