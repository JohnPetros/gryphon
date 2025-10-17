import type { RefObject } from 'react'
import type { MasterPasswordConfirmationDialogRef } from '../master-password-confirmation-dialog/types'

import type { Id } from '@/core/domain/structures'

import { AppItem } from '../app-item'
import { Alert } from 'react-native'
import { MasterPasswordConfirmationDialog } from '../master-password-confirmation-dialog'

type Props = {
  noteId: Id
  noteTitle: string
  masterPasswordConfirmationForContentCopyDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  masterPasswordConfirmationForNoteEditionDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  onCopyContent: () => void
  onEdit: () => void
  onDelete: (noteId: Id) => void
  onCorrectMasterPasswordConfirmationForContentCopyDialogSubmit: () => void
  onCorrectMasterPasswordConfirmationForNoteEditionDialogSubmit: () => void
}

export const NoteMenuView = ({
  noteId,
  noteTitle,
  masterPasswordConfirmationForContentCopyDialogRef,
  masterPasswordConfirmationForNoteEditionDialogRef,
  onEdit,
  onDelete,
  onCopyContent,
  onCorrectMasterPasswordConfirmationForContentCopyDialogSubmit,
  onCorrectMasterPasswordConfirmationForNoteEditionDialogSubmit,
}: Props) => {
  return (
    <>
      <MasterPasswordConfirmationDialog
        ref={masterPasswordConfirmationForContentCopyDialogRef}
        description='Insira a senha mestra para poder copiar o conteúdo.'
        canClose
        onCorrectPasswordSubmit={
          onCorrectMasterPasswordConfirmationForContentCopyDialogSubmit
        }
      />
      <MasterPasswordConfirmationDialog
        ref={masterPasswordConfirmationForNoteEditionDialogRef}
        description='Insira a senha mestra para poder editar a nota.'
        canClose
        onCorrectPasswordSubmit={
          onCorrectMasterPasswordConfirmationForNoteEditionDialogSubmit
        }
      />
      <AppItem.Menu>
        {(close) => (
          <>
            <AppItem.MenuOption color='accent' icon='login'>
              {noteTitle}
            </AppItem.MenuOption>
            <AppItem.MenuOption
              color='neutral'
              icon='copy'
              onPress={() => {
                onCopyContent()
                close()
              }}
            >
              Copiar conteúdo
            </AppItem.MenuOption>
            <AppItem.MenuOption
              color='neutral'
              icon='edit'
              onPress={() => {
                onEdit()
                close()
              }}
            >
              Editar
            </AppItem.MenuOption>
            <AppItem.MenuOption
              color='danger'
              icon='trash'
              onPress={() => {
                Alert.alert(
                  'Excluir Nota?',
                  'Tem certeza que deseja excluir esta nota? Nunca será possível recuperá-la.',
                  [
                    {
                      text: 'Cancelar',
                      style: 'cancel',
                    },
                    {
                      text: 'Excluir',
                      onPress: () => {
                        onDelete(noteId)
                        close()
                      },
                    },
                  ],
                )
              }}
            >
              Excluir
            </AppItem.MenuOption>
          </>
        )}
      </AppItem.Menu>
    </>
  )
}
