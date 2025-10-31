import { useCallback, useEffect, useState } from 'react'

import type { Id } from '@/core/domain/structures'
import type { CredentialsRepository, NotesRepository } from '@/core/interfaces'

type Tab = 'credential' | 'note'

type Params = {
  vaultId: Id
  credentialsRepository: CredentialsRepository
  notesRepository: NotesRepository
  defaultActiveTab: Tab
  onDatabaseChange: () => Promise<void>
}

export function useItensList({
  vaultId,
  credentialsRepository,
  notesRepository,
  defaultActiveTab,
  onDatabaseChange,
}: Params) {
  const [credentialCount, setCredentialCount] = useState(0)
  const [noteCount, setNoteCount] = useState(0)
  const [selectedTab, setSelectedTab] = useState<Tab>(defaultActiveTab ?? 'credential')

  const countCredentials = useCallback(async () => {
    const credentialCount = await credentialsRepository.countByVault(vaultId)
    setCredentialCount(credentialCount)
  }, [credentialsRepository, vaultId])

  const countNotes = useCallback(async () => {
    const noteCount = await notesRepository.countByVault(vaultId)
    setNoteCount(noteCount)
  }, [notesRepository, vaultId])

  async function handleCredentialDelete() {
    await countCredentials()
    await onDatabaseChange()
  }

  function handleTabPress(tab: 'credential' | 'note') {
    setSelectedTab(tab)
  }

  function handleNoteDelete() {
    countCredentials()
    countNotes()
  }

  useEffect(() => {
    countCredentials()
    countNotes()
  }, [vaultId, credentialsRepository, notesRepository, countCredentials, countNotes])

  return {
    selectedTab,
    credentialCount,
    noteCount,
    handleTabPress,
    handleCredentialDelete,
    handleNoteDelete,
  }
}
