import type { VaultIcon } from '../../types'

export type VaultDto = {
  id?: string
  title: string
  icon: VaultIcon
  accountId: string
  itemCount?: number
}
