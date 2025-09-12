import { Vault } from '@/core/domain/entities'
import type { VaultModel } from '../models'

export const WatermelonVaultMapper = () => {
  return {
    async toEntity(model: VaultModel): Promise<Vault> {
      return Vault.create({
        id: model.id,
        title: model.title,
        icon: model.icon,
        itemCount: (await model.noteCount) + (await model.credentialCount),
      })
    },
  }
}
