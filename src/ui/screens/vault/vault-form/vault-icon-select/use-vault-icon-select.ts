import type { RefObject } from 'react'
import type { VaultIcon } from '@/core/domain/types'
import type { BottomSheetRef } from '@/ui/components/bottom-sheet/types'

export function useVaultIconSelect(
  bottomSheetRef: RefObject<BottomSheetRef | null>,
  onChange: (icon: string) => void,
) {
  function handleChange(icon: VaultIcon) {
    onChange(icon)
    bottomSheetRef.current?.close()
  }

  return {
    handleChange,
  }
}
