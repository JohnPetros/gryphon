import { useCallback, useEffect, useState } from 'react'

import type { Id } from '@/core/domain/structures'
import type { CredentialsRepository, NotesRepository } from '@/core/interfaces'

type Params = {
  vaultId: Id
  credentialsRepository: CredentialsRepository
  notesRepository: NotesRepository
  defaultActiveTab: 'credential' | 'note'
}

type Params = {
  vaultId: Id
  credentialsRepository: CredentialsRepository
  onDatabaseChange: () => Promise<void>
}

export function useItensList({
  vaultId,
  credentialsRepository,
  onDatabaseChange,
}: Params) {
  const [credentialCount, setCredentialCount] = useState(0)
  const [noteCount, setNoteCount] = useState(0)
  const [selectedTab, setSelectedTab] = useState<'credential' | 'note'>(
    defaultActiveTab ?? 'note',
  )

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
