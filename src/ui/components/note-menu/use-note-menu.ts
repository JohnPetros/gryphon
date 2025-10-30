import type { RefObject } from 'react'

import type { CryptoProvider, NotesRepository } from '@/core/interfaces'
import type { Id } from '@/core/domain/structures'
import type { Note } from '@/core/domain/entities'
import { useClipboard } from '@/ui/hooks/use-clipbaord'
import type { MasterPasswordConfirmationDialogRef } from '../master-password-confirmation-dialog/types'

import type { NavigationProvider } from '@/core/interfaces/providers/navigation-provider'
import { ROUTES } from '@/constants'

type Params = {
  masterPasswordConfirmationForContentCopyDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  masterPasswordConfirmationForNoteEditionDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  note: Note
  encryptionKey: string
  cryptoProvider: CryptoProvider
  repository: NotesRepository
  navigation: NavigationProvider
  onDelete?: () => void
  onDatabaseChange: () => Promise<void>
}

export function useNoteMenu({
  masterPasswordConfirmationForContentCopyDialogRef,
  masterPasswordConfirmationForNoteEditionDialogRef,
  encryptionKey,
  cryptoProvider,
  repository,
  note,
  navigation,
  onDelete,
  onDatabaseChange,
}: Params) {
  const { copy } = useClipboard()

  async function handleDelete(noteId: Id) {
    try {
      await repository.remove(noteId)
      try {
        await onDatabaseChange()
      } catch {}
      onDelete?.()
    } catch (error) {
      console.error(error)
    }
  }

  function handleEdit() {
    masterPasswordConfirmationForNoteEditionDialogRef?.current?.open()
  }

  async function handleCopyContent() {
    masterPasswordConfirmationForContentCopyDialogRef?.current?.open()
  }

  async function handleCorrectMasterPasswordConfirmationForContentCopyDialogSubmit() {
    const decryptedData = note.encrypted.decrypt(encryptionKey, cryptoProvider)
    if (!decryptedData) return
    await copy(decryptedData.content)
    masterPasswordConfirmationForContentCopyDialogRef?.current?.close()
  }

  async function handleCorrectMasterPasswordConfirmationForNoteEditionDialogSubmit() {
    navigation.navigate(ROUTES.noteSettings(note.id.value))
    masterPasswordConfirmationForNoteEditionDialogRef?.current?.close()
  }

  return {
    handleCopyContent,
    handleEdit,
    handleDelete,
    handleCorrectMasterPasswordConfirmationForContentCopyDialogSubmit,
    handleCorrectMasterPasswordConfirmationForNoteEditionDialogSubmit,
  }
}
