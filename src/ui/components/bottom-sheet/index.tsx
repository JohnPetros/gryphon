import { type PropsWithChildren, useImperativeHandle, useRef } from 'react'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import type { BottomSheetRef } from './types/bottom-sheet-ref'
import { BottomSheetView } from './bottom-sheet'

type Props = {
  ref?: React.RefObject<BottomSheetRef | null>
  trigger: React.ReactNode
  snapPoints?: string[]
  onChange?: (index: number) => void
}

export const BottomSheet = ({
  ref,
  children,
  trigger,
  snapPoints,
  onChange,
}: PropsWithChildren<Props>) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

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
      onChange={onChange}
      trigger={trigger}
    >
      {children}
    </BottomSheetView>
  )
}
