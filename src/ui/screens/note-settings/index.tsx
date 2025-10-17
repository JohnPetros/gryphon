import { useLocalSearchParams } from 'expo-router'

import { Id } from '@/core/domain/structures'
import { NoteSettingsScreenView } from './note-settings-screen.view'
import { useDatabase } from '@/ui/hooks/use-database'
import { useNoteSettingsScreen } from './use-note-settings-screen'

type LocalSearchParams = {
  noteId: string
}

export const NoteSettingsScreen = () => {
  const { noteId } = useLocalSearchParams<LocalSearchParams>()
  const { notesRepository } = useDatabase()
  const { note, handleNoteCreate, handleNoteUpdate } = useNoteSettingsScreen({
    notesRepository,
    noteId: noteId ? Id.create(noteId) : undefined,
  })
  return (
    <NoteSettingsScreenView
      note={note}
      onCreate={handleNoteCreate}
      onUpdate={handleNoteUpdate}
    />
  )
}
