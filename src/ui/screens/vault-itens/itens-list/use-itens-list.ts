import { useEffect, useState } from 'react'

import type { Id } from '@/core/domain/structures'
import type { CredentialsRepository } from '@/core/interfaces'

export function useItensList(vaultId: Id, credentialsRepository: CredentialsRepository) {
  const [credentialCount, setCredentialCount] = useState(0)
  const [noteCount, setNoteCount] = useState(0)
  const [selectedTab, setSelectedTab] = useState<'credential' | 'note'>('credential')

  function handleTabPress(tab: 'credential' | 'note') {
    setSelectedTab(tab)
  }

  useEffect(() => {
    async function countItens() {
      if (!vaultId) return
      const allVaults = await credentialsRepository.countByVault(vaultId)
      setCredentialCount(allVaults)
      setNoteCount(allVaults)
    }
    countItens()
  }, [vaultId, credentialsRepository])

  return {
    selectedTab,
    credentialCount,
    noteCount,
    handleTabPress,
  }
}
