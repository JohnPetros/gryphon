import { useCallback, useEffect, useState } from 'react'

import type { CredentialVersion } from '@/core/domain/entities/credential-version'
import type { Id } from '@/core/domain/structures'
import type { CredentialVersionsRepository } from '@/core/interfaces'

type Params = {
  credentialId: Id
  credentialVersionsRepository: CredentialVersionsRepository
  onRestore: () => void
}

export function useCredentialHistory({
  credentialId,
  credentialVersionsRepository,
  onRestore
}: Params) {
  const [versions, setVersions] = useState<CredentialVersion[]>([])

  const loadVersions = useCallback(async () => {
    const versions =
      await credentialVersionsRepository.findAllByCredential(credentialId)
    setVersions(versions)
  }, [])

  async function handleRestore() {
    await loadVersions()
    onRestore()
  }

  useEffect(() => {
    loadVersions()
  }, [loadVersions])

  return {
    versions,
    handleRestore,
  }
}
