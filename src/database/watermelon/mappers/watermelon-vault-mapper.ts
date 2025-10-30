import type { VaultIcon } from '@/core/domain/types'
import { Vault } from '@/core/domain/entities'
import type { VaultDto } from '@/core/domain/entities/dtos'

import type { VaultModel } from '../models'
import type { VaultSchema } from '../types'

export const WatermelonVaultMapper = () => {
  return {
    async toEntity(model: VaultModel): Promise<Vault> {
      return Vault.create({
        id: model.id,
        title: model.title,
        icon: model.icon as VaultIcon,
        itemCount: (await model.noteCount) + (await model.credentialCount),
        accountId: model.account.id,
      })
    },

    toDto(schema: VaultSchema): VaultDto {
      return {
        id: schema.id,
        title: schema.title,
        icon: schema.icon as VaultIcon,
        accountId: schema.account_id,
      }
    },
  }
}
