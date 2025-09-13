import { Q } from '@nozbe/watermelondb'
import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'

import type { VaultsRepository } from '@/core/interfaces'
import type { Vault } from '@/core/domain/entities/vault'
import type { Id } from '@/core/domain/structures'

import type { VaultModel } from '../models'
import { WatermelonVaultMapper } from '../mappers'
import { watermelon } from '../client'

export const WatermelonVaultsRepository = (): VaultsRepository => {
  const mapper = WatermelonVaultMapper()

  return {
    async add(vault: Vault, accountId: Id): Promise<void> {
      try {
        await watermelon.write(async () => {
          const vaultsCollection = watermelon.collections.get<VaultModel>('vaults')
          console.log('vaultsCollection', { vaultsCollection })
          const createdVault = await vaultsCollection.create((model) => {
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
          console.log('createdVault', createdVault)
        })
      } catch (error) {
        console.error('Error adding vault', error)
      }
    },

    async update(vault: Vault): Promise<void> {
      const model = await watermelon.collections
        .get<VaultModel>('vaults')
        .find(vault.id.value)

      await watermelon.write(async () => {
        await model.update((model) => {
          model.title = vault.title
          model.icon = vault.icon
        })
      })
    },

    async findById(id: Id): Promise<Vault | null> {
      try {
        const model = await watermelon.collections
          .get<VaultModel>('vaults')
          .find(id.value)

        return await mapper.toEntity(model)
      } catch {
        return null
      }
    },

    async findAllByAccount(accountId: Id): Promise<Vault[]> {
      try {
        const models = await watermelon.collections
          .get<VaultModel>('vaults')
          .query()
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
