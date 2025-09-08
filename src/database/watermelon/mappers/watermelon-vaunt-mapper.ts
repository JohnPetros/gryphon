import { vault } from '@/core/domain/entities'
import type { vaultModel } from '../models'

export const WatermelonvaultMapper = () => {
  return {
    async toEntity(model: vaultModel): Promise<vault> {
      return vault.create({
        id: model.id,
        title: model.title,
        icon: model.icon,
        itemCount: (await model.noteCount) + (await model.credentialCount),
      })
    },
  }
}
