import type { VaultIcon } from '@/core/domain/types'

export function useVaultIconSelect(onSelect: (icon: VaultIcon) => void) {
  function handleSelect(icon: VaultIcon) {
    onSelect(icon)
  }

  return {
    handleSelect,
  }
}
