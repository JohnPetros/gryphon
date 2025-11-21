import { desc, eq, inArray } from 'drizzle-orm'

import type { CredentialVersionsRepository } from '@/core/interfaces'
import type { Id } from '@/core/domain/structures'
import type { CredentialVersion } from '@/core/domain/entities/credential-version'

import { drizzle } from '../drizzle'
import { credentialVersionSchema } from '../schemas/credential-version-schema'
import { DrizzleCredentialVersionMapper } from '../mappers/drizzle-credential-version-mapper'
import { credentialSchema, vaultSchema } from '../schemas'

export const DrizzleCredentialVersionsRepository = (): CredentialVersionsRepository => {
  const mapper = DrizzleCredentialVersionMapper()

  return {
    async add(credentialVersion: CredentialVersion): Promise<void> {
      await drizzle.insert(credentialVersionSchema).values({
        id: credentialVersion.id.value,
        title: credentialVersion.title,
        credentialId: credentialVersion.credentialId.value,
        isRestoration: credentialVersion.isRestoration ? 1 : 0,
        versionNumber: credentialVersion.versionNumber,
        encryptedData: credentialVersion.encrypted.value,
      })
    },

    async addMany(credentialVersions: CredentialVersion[]): Promise<void> {
      if (credentialVersions.length === 0) return

      await drizzle.insert(credentialVersionSchema).values(
        credentialVersions.map((credentialVersion) => ({
          id: credentialVersion.id.value,
          title: credentialVersion.title,
          credentialId: credentialVersion.credentialId.value,
          isRestoration: credentialVersion.isRestoration ? 1 : 0,
          versionNumber: credentialVersion.versionNumber,
          encryptedData: credentialVersion.encrypted.value,
        })),
      )
    },

    async update(credentialVersion: CredentialVersion): Promise<void> {
      await drizzle
        .update(credentialVersionSchema)
        .set({
          title: credentialVersion.title,
          credentialId: credentialVersion.credentialId.value,
          isRestoration: credentialVersion.isRestoration ? 1 : 0,
          versionNumber: credentialVersion.versionNumber,
          encryptedData: credentialVersion.encrypted.value,
        })
        .where(eq(credentialVersionSchema.id, credentialVersion.id.value))
    },

    async updateMany(credentialVersions: CredentialVersion[]): Promise<void> {
      if (credentialVersions.length === 0) return

      await Promise.all(
        credentialVersions.map((credentialVersion) =>
          drizzle
            .update(credentialVersionSchema)
            .set({
              title: credentialVersion.title,
              credentialId: credentialVersion.credentialId.value,
              isRestoration: credentialVersion.isRestoration ? 1 : 0,
              versionNumber: credentialVersion.versionNumber,
              encryptedData: credentialVersion.encrypted.value,
            })
            .where(eq(credentialVersionSchema.id, credentialVersion.id.value)),
        ),
      )
    },

    async findAllByAccount(accountId: Id): Promise<CredentialVersion[]> {
      const results = await drizzle
        .select()
        .from(credentialVersionSchema)
        .innerJoin(
          credentialSchema,
          eq(credentialVersionSchema.credentialId, credentialSchema.id),
        )
        .innerJoin(vaultSchema, eq(credentialSchema.vaultId, vaultSchema.id))
        .where(eq(vaultSchema.accountId, accountId.value))

      return results.map(({ credential_versions }) =>
        mapper.toEntity(credential_versions),
      )
    },

    async findLastByCredential(credentialId: Id): Promise<CredentialVersion | null> {
      const result = await drizzle
        .select()
        .from(credentialVersionSchema)
        .where(eq(credentialVersionSchema.credentialId, credentialId.value))
        .orderBy(desc(credentialVersionSchema.versionNumber))
        .limit(1)

      if (result.length === 0) {
        return null
      }

      return mapper.toEntity(result[0])
    },

    async findAllByCredential(credentialId: Id): Promise<CredentialVersion[]> {
      const results = await drizzle
        .select()
        .from(credentialVersionSchema)
        .where(eq(credentialVersionSchema.credentialId, credentialId.value))
        .orderBy(desc(credentialVersionSchema.versionNumber))

      return results.map(mapper.toEntity)
    },

    async remove(credentialVersionId: Id): Promise<void> {
      await drizzle
        .delete(credentialVersionSchema)
        .where(eq(credentialVersionSchema.id, credentialVersionId.value))
    },

    async removeMany(credentialVersionIds: Id[]): Promise<void> {
      if (credentialVersionIds.length === 0) return

      await drizzle.delete(credentialVersionSchema).where(
        inArray(
          credentialVersionSchema.id,
          credentialVersionIds.map((id) => id.value),
        ),
      )
    },

    async removeManyByAccount(accountId: Id): Promise<void> {
      throw new Error('Method not implemented.')
    },
  }
}
