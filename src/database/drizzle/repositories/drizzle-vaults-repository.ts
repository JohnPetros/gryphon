import { eq, inArray } from 'drizzle-orm'

import type { VaultsRepository } from '@/core/interfaces'
import type { Id } from '@/core/domain/structures'
import type { Vault } from '@/core/domain/entities/vault'

import { drizzle } from '../drizzle'
import { vaultSchema } from '../schemas/vault-schema'
import { DrizzleVaultMapper } from '../mappers/drizzle-vault-mapper'

export const DrizzleVaultsRepository = (): VaultsRepository => {
  const mapper = DrizzleVaultMapper()

  return {
    async add(vault: Vault): Promise<void> {
      await drizzle.insert(vaultSchema).values({
        id: vault.id.value,
        title: vault.title,
        icon: vault.icon,
        accountId: vault.accountId.value,
        createdAt: new Date(),
      })
    },

    async addMany(vaults: Vault[]): Promise<void> {
      if (vaults.length === 0) return

      await drizzle.insert(vaultSchema).values(
        vaults.map((vault) => ({
          id: vault.id.value,
          title: vault.title,
          icon: vault.icon,
          accountId: vault.accountId.value,
          createdAt: new Date(),
        })),
      )
    },

    async update(vault: Vault): Promise<void> {
      await drizzle
        .update(vaultSchema)
        .set({
          title: vault.title,
          icon: vault.icon,
        })
        .where(eq(vaultSchema.id, vault.id.value))
    },

    async updateMany(vaults: Vault[]): Promise<void> {
      if (vaults.length === 0) return

      await Promise.all(
        vaults.map((vault) =>
          drizzle
            .update(vaultSchema)
            .set({
              title: vault.title,
              icon: vault.icon,
            })
            .where(eq(vaultSchema.id, vault.id.value)),
        ),
      )
    },

    async findById(vaultId: Id): Promise<Vault | null> {
      const result = await drizzle
        .select()
        .from(vaultSchema)
        .where(eq(vaultSchema.id, vaultId.value))
        .limit(1)

      if (result.length === 0) {
        return null
      }

      return mapper.toEntity(result[0])
    },

    async findAllByAccount(accountId: Id): Promise<Vault[]> {
      const results = await drizzle
        .select()
        .from(vaultSchema)
        .where(eq(vaultSchema.accountId, accountId.value))

      return results.map(mapper.toEntity)
    },

    async remove(vaultId: Id): Promise<void> {
      await drizzle.delete(vaultSchema).where(eq(vaultSchema.id, vaultId.value))
    },

    async removeMany(vaultIds: Id[]): Promise<void> {
      if (vaultIds.length === 0) return

      await drizzle.delete(vaultSchema).where(
        inArray(
          vaultSchema.id,
          vaultIds.map((id) => id.value),
        ),
      )
    },

    async removeManyByAccount(accountId) {
      throw new Error('Method not implemented.')
    },
  }
}
