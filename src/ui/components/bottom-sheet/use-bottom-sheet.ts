import type { RefObject } from 'react'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'

type Params = {
  bottomSheetRef: RefObject<BottomSheetModal | null>
  onOpen?: () => void
}

export function useBottomSheet({ bottomSheetRef, onOpen }: Params) {
  function handleTriggerPress() {
    bottomSheetRef.current?.present()
  }

  function handleChange(index: number) {
    if (index >= 1) {
      onOpen?.()
    }
  }

  return {
    handleChange,
    handleTriggerPress,
  }
}
