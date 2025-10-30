import type { RefObject } from 'react'
import type { MasterPasswordConfirmationDialogRef } from '../master-password-confirmation-dialog/types'

import type { Id } from '@/core/domain/structures'

import { AppItem } from '../app-item'
import { Alert } from 'react-native'
import { MasterPasswordConfirmationDialog } from '../master-password-confirmation-dialog'

type Props = {
  credentialId: Id
  credentialTitle: string
  masterPasswordConfirmationForPasswordCopyDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  masterPasswordConfirmationForCredentialEditionDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  onCopyEmail: () => void
  onCopyPassword: () => void
  onEdit: () => void
  onDelete: (credentialId: Id) => void
  onCorrectMasterPasswordConfirmationForPasswordCopyDialogSubmit: () => void
  onCorrectMasterPasswordConfirmationForCredentialEditionDialogSubmit: () => void
}

export const CredentialMenuView = ({
  credentialId,
  credentialTitle,
  masterPasswordConfirmationForPasswordCopyDialogRef,
  masterPasswordConfirmationForCredentialEditionDialogRef,
  onEdit,
  onDelete,
  onCopyEmail,
  onCopyPassword,
  onCorrectMasterPasswordConfirmationForPasswordCopyDialogSubmit,
  onCorrectMasterPasswordConfirmationForCredentialEditionDialogSubmit,
}: Props) => {
  return (
    <>
      <MasterPasswordConfirmationDialog
        ref={masterPasswordConfirmationForPasswordCopyDialogRef}
        description='Insira a senha mestra para poder copiar a senha.'
        canClose
        onCorrectPasswordSubmit={
          onCorrectMasterPasswordConfirmationForPasswordCopyDialogSubmit
        }
      />
      <MasterPasswordConfirmationDialog
        ref={masterPasswordConfirmationForCredentialEditionDialogRef}
        description='Insira a senha mestra para poder editar a credencial.'
        canClose
        onCorrectPasswordSubmit={
          onCorrectMasterPasswordConfirmationForCredentialEditionDialogSubmit
        }
      />
      <AppItem.Menu>
        {(close) => (
          <>
            <AppItem.MenuOption color='accent' icon='login'>
              {credentialTitle}
            </AppItem.MenuOption>
            <AppItem.MenuOption
              color='neutral'
              icon='copy'
              onPress={() => {
                onCopyEmail()
                close()
              }}
            >
              Copiar login
            </AppItem.MenuOption>
            <AppItem.MenuOption
              color='neutral'
              icon='copy'
              onPress={() => {
                onCopyPassword()
                close()
              }}
            >
              Copiar senha
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
                  'Excluir Credencial?',
                  'Tem certeza que deseja excluir esta credencial? Nunca será possível recuperá-la.',
                  [
                    {
                      text: 'Cancelar',
                      style: 'cancel',
                    },
                    {
                      text: 'Excluir',
                      onPress: () => {
                        onDelete(credentialId)
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
