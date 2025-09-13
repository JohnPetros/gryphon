import { useEffect, useState, type RefObject } from 'react'

import type { VaultIcon } from '@/core/domain/types'

import type { BottomSheetRef } from '@/ui/components/bottom-sheet/types'

type Params = {
  value: VaultIcon
  bottomSheetRef: RefObject<BottomSheetRef | null>
  onChange: (icon: string) => void
}

export function useVaultIconSelect({ value, bottomSheetRef, onChange }: Params) {
  const [selectedValue, setSelectedValue] = useState(value)

  function handleChange(icon: VaultIcon) {
    onChange(icon)
    setSelectedValue(icon)
    bottomSheetRef.current?.close()
  }

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  return {
    selectedValue,
    handleChange,
  }
}
