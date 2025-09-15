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
}
