import type { RefObject } from 'react'

import { Box } from '@/ui/gluestack/box'
import { Pressable } from '@/ui/gluestack/pressable'
import { BottomSheet } from '../../bottom-sheet'
import type { BottomSheetRef } from '../../bottom-sheet/types'
import { Icon } from '../../icon'
import { MasterPasswordConfirmationDialog } from '../../master-password-confirmation-dialog'
import type { MasterPasswordConfirmationDialogRef } from '../../master-password-confirmation-dialog/types'

type Props = {
  bottomSheetRef: RefObject<BottomSheetRef | null>
  masterPasswordConfirmationDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  close: () => void
  children: (close: () => void) => React.ReactNode
  onTriggerPress: () => void
  onCorrectMasterPasswordConfirmationDialogSubmit: () => void
}

export const AppItemMenuView = ({
  bottomSheetRef,
  masterPasswordConfirmationDialogRef,
  children,
  close,
  onTriggerPress,
  onCorrectMasterPasswordConfirmationDialogSubmit,
}: Props) => {
  return (
    <>
      <BottomSheet ref={bottomSheetRef} trigger={null}>
        <Box className='px-6'>{children(close)}</Box>
      </BottomSheet>

      <MasterPasswordConfirmationDialog
        ref={masterPasswordConfirmationDialogRef}
        description='Insira a senha mestra para poder abrir o menu.'
        canClose
        onCorrectPasswordSubmit={onCorrectMasterPasswordConfirmationDialogSubmit}
      />

      <Pressable onPress={onTriggerPress}>
        <Icon name='menu' />
      </Pressable>
    </>
  )
}
