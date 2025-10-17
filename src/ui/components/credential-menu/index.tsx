import { useRef } from 'react'

import type { Credential } from '@/core/domain/entities'

import { useDatabase } from '@/ui/hooks/use-database'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'
import { CredentialMenuView } from './credential-menu-view'
import { useCredentialMenu } from './use-credential-menu'
import type { MasterPasswordConfirmationDialogRef } from '../master-password-confirmation-dialog/types'

type Props = {
  credential: Credential
  onDelete?: () => void
}

export const CredentialMenu = ({ credential, onDelete }: Props) => {
  const { encryptionKey } = useAuthContext()
  const cryptoProvider = useCryptoProvider()
  const masterPasswordConfirmationForPasswordCopyDialogRef =
    useRef<MasterPasswordConfirmationDialogRef | null>(null)
  const masterPasswordConfirmationForCredentialEditionDialogRef =
    useRef<MasterPasswordConfirmationDialogRef | null>(null)
  const { credentialsRepository } = useDatabase()
  const navigation = useNavigation()
  const {
    handleEdit,
    handleDelete,
    handleCopyEmail,
    handleCopyPassword,
    handleCorrectMasterPasswordConfirmationForPasswordCopyDialogSubmit,
    handleCorrectMasterPasswordConfirmationForCredentialEditionDialogSubmit,
  } = useCredentialMenu({
    masterPasswordConfirmationForPasswordCopyDialogRef,
    masterPasswordConfirmationForCredentialEditionDialogRef,
    repository: credentialsRepository,
    credential,
    encryptionKey,
    cryptoProvider,
    navigation,
    onDelete,
  })

  return (
    <CredentialMenuView
      masterPasswordConfirmationForPasswordCopyDialogRef={
        masterPasswordConfirmationForPasswordCopyDialogRef
      }
      masterPasswordConfirmationForCredentialEditionDialogRef={
        masterPasswordConfirmationForCredentialEditionDialogRef
      }
      credentialId={credential.id}
      credentialTitle={credential.title}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCopyEmail={handleCopyEmail}
      onCopyPassword={handleCopyPassword}
      onCorrectMasterPasswordConfirmationForPasswordCopyDialogSubmit={
        handleCorrectMasterPasswordConfirmationForPasswordCopyDialogSubmit
      }
      onCorrectMasterPasswordConfirmationForCredentialEditionDialogSubmit={
        handleCorrectMasterPasswordConfirmationForCredentialEditionDialogSubmit
      }
    />
  )
}
