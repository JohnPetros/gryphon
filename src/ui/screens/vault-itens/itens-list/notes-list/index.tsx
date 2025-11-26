import type { Id } from '@/core/domain/structures'
import { NotesListView } from './notes-list-view'
import { useNotesList } from './use-notes-list'
import { useDatabase } from '@/ui/hooks/use-database'

type Props = {
  vaultId: Id
  search: string
  onNoteDelete: () => void
}

export const NotesList = ({ vaultId, search, onNoteDelete }: Props) => {
  const { notesRepository } = useDatabase()
  const { notes, isLoading, handleNoteDelete } = useNotesList({
    vaultId,
    search,
    notesRepository,
    onNoteDelete,
  })

  return (
    <NotesListView notes={notes} isLoading={isLoading} onNoteDelete={handleNoteDelete} />
  )
}
