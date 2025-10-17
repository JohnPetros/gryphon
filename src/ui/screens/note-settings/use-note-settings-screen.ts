import { useEffect, useState } from 'react'

import type { NotesRepository } from '@/core/interfaces'
import type { Note } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'

import { ROUTES } from '@/constants'
import { useNavigation } from '@/ui/hooks/use-navigation'

type Params = {
  notesRepository: NotesRepository
  noteId?: Id
}

export function useNoteSettingsScreen({ notesRepository, noteId }: Params) {
  const [note, setNote] = useState<Note | null>(null)
  const { navigate } = useNavigation()

  async function handleNoteCreate(note: Note) {
    try {
      await notesRepository.add(note)
      navigate(ROUTES.vaultItens, { vaultId: note.vaultId.value })
    } catch (error) {
      console.error(error)
    }
  }

  async function handleNoteUpdate(note: Note) {
    try {
      await notesRepository.update(note)
      navigate(ROUTES.vaultItens, { vaultId: note.vaultId.value })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    async function loadNote() {
      if (noteId) {
        const note = await notesRepository.findById(noteId)
        setNote(note)
      }
    }
    loadNote()
  }, [])

  return {
    note,
    handleNoteCreate,
    handleNoteUpdate,
  }
}
