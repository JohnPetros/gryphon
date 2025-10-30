import { useRef } from 'react'

import type { Note } from '@/core/domain/entities'

import { useDatabase } from '@/ui/hooks/use-database'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'
import { useNoteMenu } from './use-note-menu'
import type { MasterPasswordConfirmationDialogRef } from '../master-password-confirmation-dialog/types'
import { NoteMenuView } from './note-menu-view'

type Props = {
  note: Note
  onDelete?: () => void
}

export const NoteMenu = ({ note, onDelete }: Props) => {
  const { encryptionKey } = useAuthContext()
  const cryptoProvider = useCryptoProvider()
  const masterPasswordConfirmationForContentCopyDialogRef =
    useRef<MasterPasswordConfirmationDialogRef | null>(null)
  const masterPasswordConfirmationForNoteEditionDialogRef =
    useRef<MasterPasswordConfirmationDialogRef | null>(null)
  const { notesRepository, synchronizeDatabase } = useDatabase()
  const navigation = useNavigation()
  const {
    handleEdit,
    handleDelete,
    handleCopyContent,
    handleCorrectMasterPasswordConfirmationForContentCopyDialogSubmit,
    handleCorrectMasterPasswordConfirmationForNoteEditionDialogSubmit,
  } = useNoteMenu({
    masterPasswordConfirmationForContentCopyDialogRef,
    masterPasswordConfirmationForNoteEditionDialogRef,
    repository: notesRepository,
    note,
    encryptionKey,
    cryptoProvider,
    navigation,
    onDelete,
    onDatabaseChange: synchronizeDatabase,
  })

  return (
    <NoteMenuView
      masterPasswordConfirmationForContentCopyDialogRef={
        masterPasswordConfirmationForContentCopyDialogRef
      }
      masterPasswordConfirmationForNoteEditionDialogRef={
        masterPasswordConfirmationForNoteEditionDialogRef
      }
      noteId={note.id}
      noteTitle={note.title}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCopyContent={handleCopyContent}
      onCorrectMasterPasswordConfirmationForContentCopyDialogSubmit={
        handleCorrectMasterPasswordConfirmationForContentCopyDialogSubmit
      }
      onCorrectMasterPasswordConfirmationForNoteEditionDialogSubmit={
        handleCorrectMasterPasswordConfirmationForNoteEditionDialogSubmit
      }
    />
  )
}
