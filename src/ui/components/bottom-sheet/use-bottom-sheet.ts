import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import type { RefObject } from 'react'

export function useBottomSheet(bottomSheetRef: RefObject<BottomSheetModal | null>) {
  function handleTriggerPress() {
    bottomSheetRef.current?.present()
  }

  return {
    handleTriggerPress,
  }
}
