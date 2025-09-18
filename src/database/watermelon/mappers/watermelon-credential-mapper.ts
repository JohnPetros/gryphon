import { Credential } from '@/core/domain/entities'

import type { CredentialModel } from '../models'

export const WatermelonCredentialMapper = () => {
  return {
    toEntity(model: CredentialModel): Credential {
      return Credential.create({
        id: model.id,
        title: model.title,
        siteUrl: model.siteUrl ?? undefined,
        vaultId: model.vault.id,
        encryptedData: model.encryptedData,
      })
    },
  }
}
