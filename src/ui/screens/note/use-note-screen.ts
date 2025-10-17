import { useEffect, useMemo, useState } from 'react'

import type { Id } from '@/core/domain/structures'
import type { NotesRepository, CryptoProvider } from '@/core/interfaces'
import type { Note } from '@/core/domain/entities'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { ROUTES } from '@/constants'

type Params = {
  noteId: Id
  notesRepository: NotesRepository
  cryptoProvider: CryptoProvider
  encryptionKey: string
}

export function useNoteScreen({
  noteId,
  notesRepository,
  cryptoProvider,
  encryptionKey,
}: Params) {
  const [note, setNote] = useState<Note | null>(null)
  const { navigate } = useNavigation()

  function handleNoteDelete() {
    setNote(null)
    navigate(ROUTES.vaultItens)
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

  const decryptedData = useMemo(() => {
    if (!note) return

    const decryptedData = note.encrypted.decrypt(encryptionKey, cryptoProvider)
    if (!decryptedData) return
    return decryptedData
  }, [note, encryptionKey, cryptoProvider])

  return {
    note,
    decryptedData,
    handleNoteDelete,
  }
}
