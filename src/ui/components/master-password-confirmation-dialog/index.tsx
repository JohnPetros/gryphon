import { type RefObject, useImperativeHandle } from 'react'

import type { MasterPasswordConfirmationDialogRef } from './types/master-password-confirmation-dialog-ref'
import { MasterPasswordConfirmationDialogView } from './master-password-confirmation-dialog-view'
import { useMasterPasswordConfirmationDialog } from './use-master-password-confirmation-dialog'
import { useAuthContext } from '@/ui/hooks/use-auth-context'

type Props = {
  ref?: RefObject<MasterPasswordConfirmationDialogRef | null>
  description: string
  canClose: boolean
  onCorrectPasswordSubmit: () => void
}

export const MasterPasswordConfirmationDialog = ({
  ref,
  description,
  canClose,
  onCorrectPasswordSubmit,
}: Props) => {
  const { account } = useAuthContext()
  const { isOpen, open, close, handlePasswordChange, handlePasswordSubmit } =
    useMasterPasswordConfirmationDialog({ isMasterPasswordRequired: Boolean(account?.isMasterPasswordRequired), onCorrectPasswordSubmit })

  useImperativeHandle(ref, () => ({
    open,
    close,
  }), [open, close])

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
