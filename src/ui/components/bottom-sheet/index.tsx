import { type ReactNode, useImperativeHandle, useRef } from 'react'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import type { COLORS } from '@/constants'
import type { BottomSheetRef } from './types/bottom-sheet-ref'
import { BottomSheetView } from './bottom-sheet'
import { useBottomSheet } from './use-bottom-sheet'
import { useThemeContext } from '@/ui/hooks/use-theme-context'

type Props = {
  ref?: React.RefObject<BottomSheetRef | null>
  children: ReactNode | ((close: () => void) => ReactNode)
  trigger: React.ReactNode
  snapPoints?: string[]
  backgroundColor?: keyof typeof COLORS.dark
  onOpen?: () => void
}

export const BottomSheet = ({
  ref,
  children,
  trigger,
  snapPoints,
  backgroundColor,
  onOpen,
}: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { theme } = useThemeContext()
  const { handleTriggerPress, handleChange } = useBottomSheet({
    bottomSheetRef: bottomSheetModalRef,
    onOpen,
  })

  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetModalRef.current?.present()
    },
    close: () => {
      bottomSheetModalRef.current?.dismiss()
    },
  }))

  return (
    <BottomSheetView
      bottomSheetModalRef={bottomSheetModalRef}
      snapPoints={snapPoints}
      trigger={trigger}
      theme={theme}
      onTriggerPress={handleTriggerPress}
      backgroundColor={backgroundColor}
      onChange={handleChange}
    >
      {children}
    </BottomSheetView>
  )
}
