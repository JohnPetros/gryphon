import { useCallback, useEffect, useState } from 'react'

import type { Note } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { NotesRepository } from '@/core/interfaces'

type Params = {
  vaultId: Id
  search: string
  notesRepository: NotesRepository
  onNoteDelete: () => void
}

export function useNotesList({ vaultId, search, notesRepository, onNoteDelete }: Params) {
  const [notes, setNotes] = useState<Note[]>([])

  const loadNotes = useCallback(async () => {
    const notes = await notesRepository.findAllByVaultAndTitle(vaultId, search)
    setNotes(notes)
  }, [notesRepository, vaultId, search])

  function handleNoteDelete() {
    loadNotes()
    onNoteDelete()
  }

  console.log(notes)

  useEffect(() => {
    loadNotes()
  }, [vaultId, search, notesRepository, loadNotes])

  return {
    notes,
    handleNoteDelete,
  }
}
