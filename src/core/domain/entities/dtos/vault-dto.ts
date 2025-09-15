import type { VaultIcon } from '../../types'

export type VaultDto = {
  id?: string
  title: string
  icon: VaultIcon
  itemCount?: number
}
