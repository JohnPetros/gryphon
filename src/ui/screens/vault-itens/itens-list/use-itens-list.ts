import { useCallback, useEffect, useState } from 'react'

import type { Id } from '@/core/domain/structures'
import type { CredentialsRepository } from '@/core/interfaces'

export function useItensList(vaultId: Id, credentialsRepository: CredentialsRepository) {
  const [credentialCount, setCredentialCount] = useState(0)
  const [noteCount, setNoteCount] = useState(0)
  const [selectedTab, setSelectedTab] = useState<'credential' | 'note'>('credential')

  const countCredentials = useCallback(async () => {
    const credentialCount = await credentialsRepository.countByVault(vaultId)
    setCredentialCount(credentialCount)
  }, [credentialsRepository, vaultId])

  function handleCredentialDelete() {
    countCredentials()
  }

  function handleTabPress(tab: 'credential' | 'note') {
    setSelectedTab(tab)
  }

  useEffect(() => {
    countCredentials()
    setNoteCount(0)
  }, [vaultId, credentialsRepository, countCredentials])

  return {
    selectedTab,
    credentialCount,
    noteCount,
    handleTabPress,
    handleCredentialDelete,
  }
}
