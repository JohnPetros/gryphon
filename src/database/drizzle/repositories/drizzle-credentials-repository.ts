import { and, count, eq, inArray, like } from 'drizzle-orm'

import type { CredentialsRepository } from '@/core/interfaces'
import type { Id } from '@/core/domain/structures'
import type { Credential } from '@/core/domain/entities/credential'

import { drizzle } from '../drizzle'
import { credentialSchema } from '../schemas/credential-schema'
import { DrizzleCredentialMapper } from '../mappers'
import { vaultSchema } from '../schemas'

export const DrizzleCredentialsRepository = (): CredentialsRepository => {
  const mapper = DrizzleCredentialMapper()

  return {
    async add(credential: Credential): Promise<void> {
      await drizzle.insert(credentialSchema).values({
        id: credential.id.value,
        title: credential.title,
        encryptedData: credential.encrypted.value,
        siteUrl: credential.siteUrl,
        vaultId: credential.vaultId.value,
        lastVersionId: null,
        createdAt: credential.createdAt,
      })
    },

    async addMany(credentials: Credential[]): Promise<void> {
      if (credentials.length === 0) return

      await drizzle.insert(credentialSchema).values(
        credentials.map((credential) => ({
          id: credential.id.value,
          title: credential.title,
          encryptedData: credential.encrypted.value,
          siteUrl: credential.siteUrl,
          vaultId: credential.vaultId.value,
          lastVersionId: null,
          createdAt: credential.createdAt,
        })),
      )
    },

    async findAllByAccount(accountId: Id): Promise<Credential[]> {
      const results = await drizzle
        .select()
        .from(credentialSchema)
        .innerJoin(vaultSchema, eq(credentialSchema.vaultId, vaultSchema.id))
        .where(eq(vaultSchema.accountId, accountId.value))

      return results.map(({ credentials }) => mapper.toEntity(credentials))
    },

    async update(credential: Credential): Promise<void> {
      await drizzle
        .update(credentialSchema)
        .set({
          title: credential.title,
          encryptedData: credential.encrypted.value,
          siteUrl: credential.siteUrl,
          vaultId: credential.vaultId.value,
          lastVersionId: credential.lastVersionId?.value ?? null,
        })
        .where(eq(credentialSchema.id, credential.id.value))
    },

    async updateMany(credentials: Credential[]): Promise<void> {
      if (credentials.length === 0) return

      await Promise.all(
        credentials.map((credential) =>
          drizzle
            .update(credentialSchema)
            .set({
              title: credential.title,
              encryptedData: credential.encrypted.value,
              siteUrl: credential.siteUrl,
              vaultId: credential.vaultId.value,
              lastVersionId: credential.lastVersionId?.value ?? null,
            })
            .where(eq(credentialSchema.id, credential.id.value)),
        ),
      )
    },

    async findById(id: Id): Promise<Credential | null> {
      const result = await drizzle
        .select()
        .from(credentialSchema)
        .where(eq(credentialSchema.id, id.value))
        .limit(1)

      if (result.length === 0) {
        return null
      }

      return mapper.toEntity(result[0])
    },

    async findAllByVaultAndTitle(vaultId: Id, title: string): Promise<Credential[]> {
      const results = await drizzle
        .select()
        .from(credentialSchema)
        .where(
          and(
            eq(credentialSchema.vaultId, vaultId.value),
            like(credentialSchema.title, `${title}%`),
          ),
        )

      return results.map(mapper.toEntity)
    },

    async countByVault(vaultId: Id): Promise<number> {
      const result = await drizzle
        .select({ count: count() })
        .from(credentialSchema)
        .where(eq(credentialSchema.vaultId, vaultId.value))

      return result[0].count
    },

    async remove(credentialId: Id): Promise<void> {
      await drizzle
        .delete(credentialSchema)
        .where(eq(credentialSchema.id, credentialId.value))
    },

    async removeMany(credentialIds: Id[]): Promise<void> {
      if (credentialIds.length === 0) return

      await drizzle.delete(credentialSchema).where(
        inArray(
          credentialSchema.id,
          credentialIds.map((id) => id.value),
        ),
      )
    },

    async removeManyByAccount(accountId: Id): Promise<void> {
      throw new Error('Method not implemented.')
    },
  }
}
