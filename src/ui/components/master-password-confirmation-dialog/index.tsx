import { type RefObject, useImperativeHandle } from 'react'

import type { MasterPasswordConfirmationDialogRef } from './types/master-password-confirmation-dialog-ref'
import { MasterPasswordConfirmationDialogView } from './master-password-confirmation-dialog-view'
import { useMasterPasswordConfirmationDialog } from './use-master-password-confirmation-dialog'

type Props = {
  ref?: RefObject<MasterPasswordConfirmationDialogRef | null>
  description: string
  onCorrectPasswordSubmit: () => void
}

export const MasterPasswordConfirmationDialog = ({
  ref,
  description,
  onCorrectPasswordSubmit,
}: Props) => {
  const { isOpen, open, close, handlePasswordChange, handlePasswordSubmit } =
    useMasterPasswordConfirmationDialog({ onCorrectPasswordSubmit })

  useImperativeHandle(ref, () => ({
    open,
    close,
  }))

  return (
    <MasterPasswordConfirmationDialogView
      isOpen={isOpen}
      description={description}
      onClose={close}
      onPasswordSubmit={handlePasswordSubmit}
      onPasswordChange={handlePasswordChange}
    />
  )
}
