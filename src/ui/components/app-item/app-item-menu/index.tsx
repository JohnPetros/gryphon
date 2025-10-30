import { useRef } from 'react'
import type { BottomSheetRef } from '../../bottom-sheet/types'

import { AppItemMenuView } from './app-item-menu-view'
import { useAppItemMenu } from './use-app-item-menu'
import type { MasterPasswordConfirmationDialogRef } from '../../master-password-confirmation-dialog/types'

type Props = {
  children: (close: () => void) => React.ReactNode
  isMasterPasswordRequired?: boolean
}

export const AppItemMenu = ({ children, isMasterPasswordRequired = false }: Props) => {
  const bottomSheetRef = useRef<BottomSheetRef | null>(null)
  const masterPasswordConfirmationDialogRef =
    useRef<MasterPasswordConfirmationDialogRef | null>(null)
  const { handleTriggerPress, handleCorrectMasterPasswordConfirmationDialogSubmit } =
    useAppItemMenu({
      bottomSheetRef,
      masterPasswordConfirmationDialogRef,
      isMasterPasswordRequired,
    })

  return (
    <AppItemMenuView
      bottomSheetRef={bottomSheetRef}
      masterPasswordConfirmationDialogRef={masterPasswordConfirmationDialogRef}
      close={() => bottomSheetRef.current?.close()}
      onTriggerPress={handleTriggerPress}
      onCorrectMasterPasswordConfirmationDialogSubmit={
        handleCorrectMasterPasswordConfirmationDialogSubmit
      }
    >
      {children}
    </AppItemMenuView>
  )
}
