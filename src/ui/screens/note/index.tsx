import { useLocalSearchParams } from 'expo-router'

import { Id } from '@/core/domain/structures'

import { useDatabase } from '@/ui/hooks/use-database'
import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useNoteScreen } from './use-note-screen'
import { NoteView } from './note-view'

type LocalSearchParams = {
  noteId: string
}

export const NoteScreen = () => {
  const { noteId } = useLocalSearchParams<LocalSearchParams>()
  const { notesRepository } = useDatabase()
  const cryptoProvider = useCryptoProvider()
  const { encryptionKey } = useAuthContext()
  const { note, decryptedData, handleNoteDelete } = useNoteScreen({
    noteId: Id.create(noteId),
    notesRepository,
    cryptoProvider,
    encryptionKey,
  })

  if (!note || !decryptedData) return null

  return (
    <NoteView
      note={note}
      noteContent={decryptedData.content}
      onNoteDelete={handleNoteDelete}
    />
  )
}
