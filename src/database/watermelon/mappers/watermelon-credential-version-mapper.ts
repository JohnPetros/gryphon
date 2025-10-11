import { CredentialVersion } from '@/core/domain/entities/credential-version'

import type { CredentialVersionModel } from '../models'

export const WatermelonCredentialVersionMapper = () => {
  return {
    toEntity(model: CredentialVersionModel): CredentialVersion {
      return CredentialVersion.create({
        id: model.id,
        title: model.title,
        siteUrl: model.siteUrl ?? undefined,
        credentialId: model.credential.id,
        encryptedData: model.encryptedData,
        versionNumber: model.versionNumber,
        isRestoration: model.isRestoration,
        createdAt: new Date(model.createdAt * 1000),
      })
    },
  }
}
