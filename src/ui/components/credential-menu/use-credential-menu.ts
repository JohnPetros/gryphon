import type { RefObject } from 'react'

import type { CredentialsRepository, CryptoProvider } from '@/core/interfaces'
import type { Id } from '@/core/domain/structures'
import type { Credential } from '@/core/domain/entities'
import { useClipboard } from '@/ui/hooks/use-clipbaord'
import type { MasterPasswordConfirmationDialogRef } from '../master-password-confirmation-dialog/types'
import { NavigationProvider } from '@/core/interfaces/providers/navigation-provider'
import { ROUTES } from '@/constants'

type Params = {
  masterPasswordConfirmationForPasswordCopyDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  masterPasswordConfirmationForCredentialEditionDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  credential: Credential
  encryptionKey: string
  cryptoProvider: CryptoProvider
  repository: CredentialsRepository
  navigation: NavigationProvider
  onDelete?: () => void
}

export function useCredentialMenu({
  encryptionKey,
  masterPasswordConfirmationForPasswordCopyDialogRef,
  masterPasswordConfirmationForCredentialEditionDialogRef,
  cryptoProvider,
  repository,
  credential,
  navigation,
  onDelete,
}: Params) {
  const { copy } = useClipboard()

  async function handleDelete(credentialId: Id) {
    try {
      await repository.remove(credentialId)
      onDelete?.()
    } catch (error) {
      console.error(error)
    }
  }

  function handleEdit() {
    // navigation.navigate(ROUTES.credentialSettings(credential.id.value))
    masterPasswordConfirmationForCredentialEditionDialogRef?.current?.open()
  }

  async function handleCopyEmail() {
    const decryptedData = credential.encrypted.decrypt(encryptionKey, cryptoProvider)
    if (!decryptedData) return
    await copy(decryptedData.login)
  }

  async function handleCopyPassword() {
    masterPasswordConfirmationForPasswordCopyDialogRef?.current?.open()
  }

  async function handleCorrectMasterPasswordConfirmationForPasswordCopyDialogSubmit() {
    const decryptedData = credential.encrypted.decrypt(encryptionKey, cryptoProvider)
    if (!decryptedData) return
    await copy(decryptedData.password)
    masterPasswordConfirmationForPasswordCopyDialogRef?.current?.close()
  }

  async function handleCorrectMasterPasswordConfirmationForCredentialEditionDialogSubmit() {
    navigation.navigate(ROUTES.credentialSettings(credential.id.value))
    masterPasswordConfirmationForCredentialEditionDialogRef?.current?.close()
  }

  return {
    handleCopyEmail,
    handleCopyPassword,
    handleEdit,
    handleDelete,
    handleCorrectMasterPasswordConfirmationForPasswordCopyDialogSubmit,
    handleCorrectMasterPasswordConfirmationForCredentialEditionDialogSubmit,
  }
}
