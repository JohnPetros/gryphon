import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'
import { Q } from '@nozbe/watermelondb'

import type { CredentialsRepository } from '@/core/interfaces'
import type { Credential } from '@/core/domain/entities/credential'
import type { Id } from '@/core/domain/structures'

import type { CredentialModel, CredentialVersionModel, VaultModel } from '../models'
import { WatermelonCredentialMapper } from '../mappers'
import { watermelon } from '../watermelon'

export const WatermelonCredentialsRepository = (
  isSynced: boolean,
): CredentialsRepository => {
  const mapper = WatermelonCredentialMapper()

  return {
    async add(credential: Credential): Promise<void> {
      await watermelon.write(async () => {
        const credentialsCollection =
          watermelon.collections.get<CredentialModel>('credentials')

        await credentialsCollection.create((model) => {
          model._raw = sanitizedRaw(
            {
              id: credential.id.value,
              title: credential.title,
              encrypted_data: credential.encrypted.value,
              vault_id: credential.vaultId.value,
              last_version_id: credential.lastVersionId?.value ?? null,
              site_url: credential.siteUrl,
              created_at: credential.createdAt.getTime() / 1000,
              _status: isSynced ? 'synced' : 'created',
            },
            credentialsCollection.schema,
          )
        })
      })
    },

    async addMany(credentials: Credential[]): Promise<void> {
      await watermelon.write(async () => {
        const credentialsCollection =
          watermelon.collections.get<CredentialModel>('credentials')

        const operations = credentials.map((credential) => {
          return credentialsCollection.prepareCreate((model) => {
            model._raw = sanitizedRaw(
              {
                id: credential.id.value,
                title: credential.title,
                encrypted_data: credential.encrypted.value,
                vault_id: credential.vaultId.value,
                last_version_id: credential.lastVersionId?.value ?? null,
                site_url: credential.siteUrl,
                created_at: credential.createdAt.getTime() / 1000,
                _status: isSynced ? 'synced' : 'created',
              },
              credentialsCollection.schema,
            )
          })
        })

        await watermelon.batch(...operations)
      })
    },

    async update(credential: Credential): Promise<void> {
      await watermelon.write(async () => {
        const credentialModel = await watermelon.collections
          .get<CredentialModel>('credentials')
          .find(credential.id.value)

        const vaultModel = await watermelon.collections
          .get<VaultModel>('vaults')
          .find(credential.vaultId.value)

        let lastVersionModel: CredentialVersionModel | null = null

        if (credential.lastVersionId) {
          lastVersionModel = await watermelon.collections
            .get<CredentialVersionModel>('credential_versions')
            .find(credential.lastVersionId?.value)
        }

        await credentialModel.update((model) => {
          model.title = credential.title
          model.siteUrl = credential.siteUrl ?? ''
          model.encryptedData = credential.encrypted.value
          if (lastVersionModel)
            // @ts-ignore
            model.lastVersion.set(lastVersionModel)

          // @ts-ignore
          model.vault.set(vaultModel)
        })
      })
    },

    async updateMany(credentials: Credential[]): Promise<void> {},

    async findAllByAccount(accountId: Id): Promise<Credential[]> {
      const credentialModels = await watermelon.collections
        .get<CredentialModel>('credentials')
        .query(Q.on('vaults', Q.where('account_id', accountId.value)))
        .fetch()

      return credentialModels.map(mapper.toEntity)
    },

    async findById(id: Id): Promise<Credential | null> {
      try {
        const credentialModel = await watermelon.collections
          .get<CredentialModel>('credentials')
          .find(id.value)

        return mapper.toEntity(credentialModel)
      } catch {
        return null
      }
    },

    async findAllByVaultAndTitle(vaultId: Id, title: string): Promise<Credential[]> {
      const credentialModels = await watermelon.collections
        .get<CredentialModel>('credentials')
        .query(
          Q.and(
            Q.where('vault_id', vaultId.value),
            Q.where('title', Q.like(`${title}%`)),
          ),
        )
        .fetch()

      return credentialModels.map(mapper.toEntity)
    },

    async countByVault(vaultId: Id): Promise<number> {
      return await watermelon.collections
        .get<CredentialModel>('credentials')
        .query(Q.where('vault_id', vaultId.value)).count
    },

    async remove(vaultId: Id): Promise<void> {
      await watermelon.write(async () => {
        const model = await watermelon.collections
          .get<CredentialModel>('credentials')
          .find(vaultId.value)

        await model.markAsDeleted()
      })
    },

    async removeMany(credentialIds: Id[]): Promise<void> {},

    async removeManyByAccount(accountId: Id): Promise<void> {
      await watermelon.write(async () => {
        const credentialModels = await watermelon.collections
          .get<CredentialModel>('credentials')
          .query(
            Q.experimentalJoinTables(['vaults']),
            Q.on('vaults', Q.where('account_id', accountId.value)),
          )
          .fetch()

        for (const credentialModel of credentialModels) {
          await credentialModel.markAsDeleted()
        }
      })
    },
  }
}
