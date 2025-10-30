import { type RefObject, useState } from 'react'
import type { MasterPasswordConfirmationDialogRef } from '../master-password-confirmation-dialog/types'

type Params = {
  isDefaultBlocked: boolean
  masterPasswordConfirmationDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
}

export function useTextarea({
  isDefaultBlocked,
  masterPasswordConfirmationDialogRef,
}: Params) {
  const [isBlocked, setIsBlocked] = useState(isDefaultBlocked)

  function handleBlockPress() {
    masterPasswordConfirmationDialogRef?.current?.open()
  }

  function handleUnblockPress() {
    setIsBlocked(true)
  }

  function handleCorrectMasterPasswordConfirmationDialogSubmit() {
    setIsBlocked(false)
    masterPasswordConfirmationDialogRef?.current?.close()
  }

  return {
    isBlocked,
    handleBlockPress,
    handleUnblockPress,
    handleCorrectMasterPasswordConfirmationDialogSubmit,
  }
}
