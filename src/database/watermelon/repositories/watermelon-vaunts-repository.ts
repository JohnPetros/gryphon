import { Q } from '@nozbe/watermelondb'
import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'

import type { VauntsRepository } from '@/core/interfaces'
import type { Vaunt } from '@/core/domain/entities/vaunt'
import type { Id } from '@/core/domain/structures'

import type { VauntModel } from '../models'
import { WatermelonVauntMapper } from '../mappers'
import { watermelon } from '../client'

export const WatermelonVauntsRepository = (): VauntsRepository => {
  const mapper = WatermelonVauntMapper()

  return {
    async add(vaunt: Vaunt, accountId: Id): Promise<void> {
      await watermelon.write(async () => {
        const vauntsCollection = watermelon.collections.get<VauntModel>('vaunts')
        await vauntsCollection.create((model) => {
          model._raw = sanitizedRaw(
            {
              id: vaunt.id.value,
              title: vaunt.title,
              icon: vaunt.icon,
              accountId: accountId.value,
            },
            vauntsCollection.schema,
          )
        })
      })
    },

    async update(vaunt: Vaunt): Promise<void> {
      const model = await watermelon.collections
        .get<VauntModel>('vaunts')
        .find(vaunt.id.value)

      await watermelon.write(async () => {
        await model.update((model) => {
          model.title = vaunt.title
          model.icon = vaunt.icon
        })
      })
    },

    async findById(id: Id): Promise<Vaunt | null> {
      try {
        const model = await watermelon.collections
          .get<VauntModel>('vaunts')
          .find(id.value)

        return await mapper.toEntity(model)
      } catch {
        return null
      }
    },

    async findAllByAccount(accountId: Id): Promise<Vaunt[]> {
      try {
        const models = await watermelon.collections
          .get<VauntModel>('vaunts')
          .query(Q.where('account_id', accountId.value))
          .fetch()

        console.log({ models })

        return await Promise.all(models.map(mapper.toEntity))
      } catch (error) {
        console.error(error)
        return []
      }
    },
  }
}
