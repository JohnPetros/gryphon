import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'

import type { CredentialsRepository } from '@/core/interfaces'
import type { Credential } from '@/core/domain/entities/credential'
import type { Id } from '@/core/domain/structures'

import type { CredentialModel, VauntModel } from '../models'
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
              vauntId: credential.vauntId.value,
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
          const vauntModel = await watermelon.collections
            .get<VauntModel>('vaunts')
            .find(credential.vauntId.value)

          model.title = credential.title
          model.siteUrl = credential.siteUrl
          model.encryptedData = credential.encrypted.value
          model.vaunt = vauntModel
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
