import { CredentialVersion } from '@/core/domain/entities/credential-version'
import type { CredentialVersionDto } from '@/core/domain/entities/dtos'

import type { CredentialVersionModel } from '../models'
import type { CredentialVersionSchema } from '../types'

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

    toDto(schema: CredentialVersionSchema): CredentialVersionDto {
      return {
        id: schema.id,
        title: schema.title,
        siteUrl: schema.site_url ?? undefined,
        credentialId: schema.credential_id,
        encryptedData: schema.encrypted_data,
        versionNumber: schema.version_number,
        isRestoration: schema.is_restoration,
        lastVersionId: null,
        createdAt: new Date(schema.created_at * 1000),
      }
    },
  }
}
