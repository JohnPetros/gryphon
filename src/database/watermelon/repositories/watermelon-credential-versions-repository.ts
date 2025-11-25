import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'
import { Q } from '@nozbe/watermelondb'

import type { CredentialVersionsRepository } from '@/core/interfaces'
import type { CredentialVersion } from '@/core/domain/entities/credential-version'
import type { Id } from '@/core/domain/structures'

import type { CredentialVersionModel, VaultModel } from '../models'
import { WatermelonCredentialVersionMapper } from '../mappers'
import { watermelon } from '../watermelon'

export const WatermelonCredentialVersionsRepository = (
  isSynced: boolean,
): CredentialVersionsRepository => {
  const mapper = WatermelonCredentialVersionMapper()

  return {
    async add(credentialVersion: CredentialVersion): Promise<void> {
      await watermelon.write(async () => {
        const credentialVersionsCollection =
          watermelon.collections.get<CredentialVersionModel>('credential_versions')

        await credentialVersionsCollection.create((model) => {
          model._raw = sanitizedRaw(
            {
              id: credentialVersion.id.value,
              credential_id: credentialVersion.credentialId.value,
              encrypted_data: credentialVersion.encrypted.value,
              title: credentialVersion.title,
              site_url: credentialVersion.siteUrl,
              version_number: credentialVersion.versionNumber,
              is_restoration: credentialVersion.isRestoration,
              created_at: credentialVersion.createdAt.getTime() / 1000,
              _status: isSynced ? 'synced' : 'created',
            },
            credentialVersionsCollection.schema,
          )
        })
      })
    },

    async addMany(credentialVersions: CredentialVersion[]): Promise<void> {
      await watermelon.write(async () => {
        const credentialVersionsCollection =
          watermelon.collections.get<CredentialVersionModel>('credential_versions')

        const operations = credentialVersions.map((credentialVersion) => {
          return credentialVersionsCollection.prepareCreate((model) => {
            model._raw = sanitizedRaw(
              {
                id: credentialVersion.id.value,
                credential_id: credentialVersion.credentialId.value,
                encrypted_data: credentialVersion.encrypted.value,
                title: credentialVersion.title,
                site_url: credentialVersion.siteUrl,
                version_number: credentialVersion.versionNumber,
                is_restoration: credentialVersion.isRestoration,
                created_at: credentialVersion.createdAt.getTime() / 1000,
                _status: isSynced ? 'synced' : 'created',
              },
              credentialVersionsCollection.schema,
            )
          })
        })

        await watermelon.batch(...operations)
      })
    },

    async findAllByCredential(credentialId: Id): Promise<CredentialVersion[]> {
      const credentialVersionsCollection =
        watermelon.collections.get<CredentialVersionModel>('credential_versions')

      const credentialVersions = await credentialVersionsCollection
        .query(
          Q.where('credential_id', credentialId.value),
          Q.sortBy('created_at', Q.desc),
        )
        .fetch()

      return credentialVersions.map((credentialVersion) =>
        mapper.toEntity(credentialVersion),
      )
    },

    async findAllByAccount(accountId: Id): Promise<CredentialVersion[]> {
      const credentialVersionsCollection =
        watermelon.collections.get<CredentialVersionModel>('credential_versions')

      const credentialVersions = await credentialVersionsCollection
        .query(
          Q.on('credentials', Q.where('vault_id', accountId.value)),
          Q.sortBy('created_at', Q.desc),
        )
        .fetch()

      return credentialVersions.map((credentialVersion) =>
        mapper.toEntity(credentialVersion),
      )
    },

    async findLastByCredential(credentialId: Id): Promise<CredentialVersion | null> {
      const credentialVersionsCollection =
        watermelon.collections.get<CredentialVersionModel>('credential_versions')

      const credentialVersion = await credentialVersionsCollection
        .query(
          Q.where('credential_id', credentialId.value),
          Q.sortBy('created_at', Q.desc),
          Q.take(1),
        )
        .fetch()

      if (!credentialVersion.length) {
        return null
      }

      return mapper.toEntity(credentialVersion[0])
    },

    async update(credentialVersions: CredentialVersion): Promise<void> {
      throw new Error('Method not implemented.')
    },

    async updateMany(credentialVersions: CredentialVersion[]): Promise<void> {
      throw new Error('Method not implemented.')
    },

    async removeMany(credentialVersionIds: Id[]): Promise<void> {
      throw new Error('Method not implemented.')
    },

    async remove(credentialVersionId: Id): Promise<void> {
      throw new Error('Method not implemented.')
    },

    async removeManyByAccount(accountId: Id): Promise<void> {
      await watermelon.write(async () => {
        const vaultModels = await watermelon.collections
          .get<VaultModel>('vaults')
          .query(Q.where('account_id', accountId.value))

        await watermelon.collections
          .get<CredentialVersionModel>('credential_versions')
          .query(
            Q.experimentalJoinTables(['credentials']),
            Q.on(
              'credentials',
              Q.where('vault_id', Q.oneOf(vaultModels.map((vault) => vault.id))),
            ),
          )
          .destroyAllPermanently()
      })
    },
  }
}
