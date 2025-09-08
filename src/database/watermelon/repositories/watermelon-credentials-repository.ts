import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'

import type { CredentialsRepository } from '@/core/interfaces'
import type { Credential } from '@/core/domain/entities/credential'
import type { Id } from '@/core/domain/structures'

import type { CredentialModel, vaultModel } from '../models'
import { WatermelonCredentialMapper } from '../mappers'
import { watermelon } from '../client'

export const WatermelonCredentialsRepository = (): CredentialsRepository => {
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
              encryptedData: credential.encrypted.value,
              vaultId: credential.vaultId.value,
            },
            credentialsCollection.schema,
          )
        })
      })
    },

    async update(credential: Credential): Promise<void> {
      const credentialModel = await watermelon.collections
        .get<CredentialModel>('credentials')
        .find(credential.id.value)

      await watermelon.write(async () => {
        await credentialModel.update(async (model) => {
          const vaultModel = await watermelon.collections
            .get<vaultModel>('vaults')
            .find(credential.vaultId.value)

          model.title = credential.title
          model.siteUrl = credential.siteUrl
          model.encryptedData = credential.encrypted.value
          model.vault = vaultModel
        })
      })
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
  }
}
