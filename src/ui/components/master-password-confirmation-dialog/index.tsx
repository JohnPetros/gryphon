import { type RefObject, useImperativeHandle } from 'react'

import type { MasterPasswordConfirmationDialogRef } from './types/master-password-confirmation-dialog-ref'
import { MasterPasswordConfirmationDialogView } from './master-password-confirmation-dialog-view'
import { useMasterPasswordConfirmationDialog } from './use-master-password-confirmation-dialog'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useSecureStorage } from '@/ui/hooks/use-secure-storage'
import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'

type Props = {
  ref?: RefObject<MasterPasswordConfirmationDialogRef | null>
  description: string
  canClose: boolean
  shouldSuppressMasterPasswordRequirement?: boolean
  kcv?: string
  onCorrectPasswordSubmit: (masterPassword: string) => void
}

export const MasterPasswordConfirmationDialog = ({
  ref,
  description,
  canClose,
  kcv,
  shouldSuppressMasterPasswordRequirement,
  onCorrectPasswordSubmit,
}: Props) => {
  const { account } = useAuthContext()
  const storageProvider = useSecureStorage()
  const cryptoProvider = useCryptoProvider()
  const isMasterPasswordRequired = shouldSuppressMasterPasswordRequirement
    ? true
    : Boolean(account?.isMasterPasswordRequired ?? true)
  const { isOpen, open, close, handlePasswordChange, handlePasswordSubmit } =
    useMasterPasswordConfirmationDialog({
      isMasterPasswordRequired,
      kcv,
      storageProvider,
      cryptoProvider,
      encryptionSalt: account?.encryptionSalt ?? '',
      onCorrectPasswordSubmit,
    })

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  )

  return (
    <MasterPasswordConfirmationDialogView
      isOpen={isOpen}
      description={description}
      canClose={canClose}
      onClose={close}
      onPasswordSubmit={handlePasswordSubmit}
      onPasswordChange={handlePasswordChange}
    />
  )
}
