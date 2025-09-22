import type { VaultIcon } from '@/core/domain/types'
import type { VaultModel } from '../models'
import { Vault } from '@/core/domain/entities'

export const WatermelonVaultMapper = () => {
  return {
    async toEntity(model: VaultModel): Promise<Vault> {
      return Vault.create({
        id: model.id,
        title: model.title,
        icon: model.icon as VaultIcon,
        itemCount: (await model.noteCount) + (await model.credentialCount),
      })
    },
  }
}
