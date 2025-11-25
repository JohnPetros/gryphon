import { useRef } from 'react'

import type { VaultIcon } from '@/core/domain/types'

import type { BottomSheetRef } from '@/ui/components/bottom-sheet/types'
import { useVaultIconSelect } from './use-vault-icon-select'
import { IconSelectView } from './vault-icon-select-view'
import { useThemeContext } from '@/ui/hooks/use-theme-context'

type Props = {
  value: string
  onChange: (icon: string) => void
}

export const IconSelect = ({ value, onChange }: Props) => {
  const bottomSheetRef = useRef<BottomSheetRef | null>(null)
  const { theme } = useThemeContext()
  const { handleChange } = useVaultIconSelect({
    bottomSheetRef,
    onChange,
  })

  return (
    <IconSelectView
      value={value as VaultIcon}
      theme={theme}
      bottomSheetRef={bottomSheetRef}
      onChange={handleChange}
    />
  )
}
