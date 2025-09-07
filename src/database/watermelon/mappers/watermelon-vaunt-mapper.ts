import { Vaunt } from '@/core/domain/entities'
import type { VauntModel } from '../models'

export const WatermelonVauntMapper = () => {
  return {
    async toEntity(model: VauntModel): Promise<Vaunt> {
      return Vaunt.create({
        id: model.id,
        title: model.title,
        icon: model.icon,
        itemCount: (await model.noteCount) + (await model.credentialCount),
      })
    },
  }
}
