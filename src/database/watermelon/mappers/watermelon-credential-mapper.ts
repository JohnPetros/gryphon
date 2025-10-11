import { Credential } from '@/core/domain/entities'

import type { CredentialModel } from '../models'
import type { CredentialSchema } from '../types'
import type { CredentialDto } from '@/core/domain/entities/dtos'

export const WatermelonCredentialMapper = () => {
  return {
    toEntity(model: CredentialModel): Credential {
      return Credential.create({
        id: model.id,
        title: model.title,
        siteUrl: model.siteUrl ?? undefined,
        vaultId: model.vault.id,
        encryptedData: model.encryptedData,
        lastVersionId: model.lastVersion?.id ?? null,
        createdAt: new Date(model.createdAt * 1000),
      })
    },

    toDto(schema: CredentialSchema): CredentialDto {
      return {
        id: schema.id,
        title: schema.title,
        siteUrl: schema.site_url ?? undefined,
        vaultId: schema.vault_id,
        encryptedData: schema.encrypted_data,
        lastVersionId: schema.last_version_id ?? null,
        createdAt: new Date(schema.created_at * 1000),
      }
    },
  }
}
