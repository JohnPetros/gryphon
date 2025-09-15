<<<<<<< HEAD
import type { VaultIcon } from '@/core/domain/types'

export function useVaultIconSelect(onSelect: (icon: VaultIcon) => void) {
  function handleSelect(icon: VaultIcon) {
    onSelect(icon)
  }

  return {
    handleSelect,
=======
import type { RefObject } from 'react'

import type { VaultIcon } from '@/core/domain/types'

import type { BottomSheetRef } from '@/ui/components/bottom-sheet/types'

type Params = {
  bottomSheetRef: RefObject<BottomSheetRef | null>
  onChange: (icon: string) => void
}

export function useVaultIconSelect({ bottomSheetRef, onChange }: Params) {
  function handleChange(icon: VaultIcon) {
    onChange(icon)
    bottomSheetRef.current?.close()
  }

  return {
    handleChange,
>>>>>>> vault-screen
  }
}
