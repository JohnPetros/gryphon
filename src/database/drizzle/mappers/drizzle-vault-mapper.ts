import { Vault } from '@/core/domain/entities/vault'
import type { VaultIcon } from '@/core/domain/types'

import type { DrizzleVault } from '../types/drizzle-vault'

export const DrizzleVaultMapper = () => {
  return {
    toEntity(drizzleVault: DrizzleVault): Vault {
      return Vault.create({
        id: drizzleVault.id,
        title: drizzleVault.title,
        icon: drizzleVault.icon as VaultIcon,
        accountId: drizzleVault.accountId,
      })
    },
  }
}
