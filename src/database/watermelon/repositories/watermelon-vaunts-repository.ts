import { Q } from '@nozbe/watermelondb'
import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'

import type { vaultsRepository } from '@/core/interfaces'
import type { vault } from '@/core/domain/entities/vault'
import type { Id } from '@/core/domain/structures'

import type { vaultModel } from '../models'
import { WatermelonvaultMapper } from '../mappers'
import { watermelon } from '../client'

export const WatermelonvaultsRepository = (): vaultsRepository => {
  const mapper = WatermelonvaultMapper()

  return {
    async add(vault: vault, accountId: Id): Promise<void> {
      await watermelon.write(async () => {
        const vaultsCollection = watermelon.collections.get<vaultModel>('vaults')
        await vaultsCollection.create((model) => {
          model._raw = sanitizedRaw(
            {
              id: vault.id.value,
              title: vault.title,
              icon: vault.icon,
              accountId: accountId.value,
            },
            vaultsCollection.schema,
          )
        })
      })
    },

    async update(vault: vault): Promise<void> {
      const model = await watermelon.collections
        .get<vaultModel>('vaults')
        .find(vault.id.value)

      await watermelon.write(async () => {
        await model.update((model) => {
          model.title = vault.title
          model.icon = vault.icon
        })
      })
    },

    async findById(id: Id): Promise<vault | null> {
      try {
        const model = await watermelon.collections
          .get<vaultModel>('vaults')
          .find(id.value)

        return await mapper.toEntity(model)
      } catch {
        return null
      }
    },

    async findAllByAccount(accountId: Id): Promise<vault[]> {
      try {
        const models = await watermelon.collections
          .get<vaultModel>('vaults')
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
