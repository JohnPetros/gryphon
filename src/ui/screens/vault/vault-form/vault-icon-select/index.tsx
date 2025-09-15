<<<<<<< HEAD
import type { VaultIcon } from '@/core/domain/types'

import { VaultIconSelectView } from './vault-icon-select-view'
import { useVaultIconSelect } from './use-vault-icon-select'

type Props = {
  value: VaultIcon
  onSelect: (icon: VaultIcon) => void
}

export const VaultIconSelect = ({ value, onSelect }: Props) => {
  const { handleSelect } = useVaultIconSelect(onSelect)

  return <VaultIconSelectView value={value} onSelect={handleSelect} />
=======
import { useRef } from 'react'

import type { VaultIcon } from '@/core/domain/types'

import type { BottomSheetRef } from '@/ui/components/bottom-sheet/types'
import { useVaultIconSelect } from './use-vault-icon-select'
import { IconSelectView } from './vault-icon-select-view'

type Props = {
  value: string
  onChange: (icon: string) => void
}

export const IconSelect = ({ value, onChange }: Props) => {
  const bottomSheetRef = useRef<BottomSheetRef | null>(null)
  const { handleChange } = useVaultIconSelect({
    bottomSheetRef,
    onChange,
  })

  return (
    <IconSelectView
      value={value as VaultIcon}
      bottomSheetRef={bottomSheetRef}
      onChange={handleChange}
    />
  )
>>>>>>> vault-screen
}
