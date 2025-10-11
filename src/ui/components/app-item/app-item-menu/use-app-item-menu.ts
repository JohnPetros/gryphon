import type { RefObject } from 'react'
import type { BottomSheetRef } from '../../bottom-sheet/types'
import type { MasterPasswordConfirmationDialogRef } from '../../master-password-confirmation-dialog/types'

type Params = {
  bottomSheetRef: RefObject<BottomSheetRef | null>
  masterPasswordConfirmationDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  isMasterPasswordRequired: boolean
}

export function useAppItemMenu({
  bottomSheetRef,
  masterPasswordConfirmationDialogRef,
  isMasterPasswordRequired,
}: Params) {
  function handleTriggerPress() {
    if (isMasterPasswordRequired) {
      masterPasswordConfirmationDialogRef.current?.open()
      return
    }
    bottomSheetRef.current?.open()
  }

  function handleCorrectMasterPasswordConfirmationDialogSubmit() {
    bottomSheetRef.current?.open()
    masterPasswordConfirmationDialogRef.current?.close()
  }

  return {
    handleTriggerPress,
    handleCorrectMasterPasswordConfirmationDialogSubmit,
  }
}
