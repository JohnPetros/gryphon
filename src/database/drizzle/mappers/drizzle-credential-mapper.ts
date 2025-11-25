import { Credential } from '@/core/domain/entities/credential'

import type { DrizzleCredential } from '../types/drizzle-credential'

export const DrizzleCredentialMapper = () => {
  return {
    toEntity(drizzleCredential: DrizzleCredential): Credential {
      return Credential.create({
        id: drizzleCredential.id,
        title: drizzleCredential.title,
        encryptedData: drizzleCredential.encryptedData,
        siteUrl: drizzleCredential.siteUrl ?? undefined,
        vaultId: drizzleCredential.vaultId,
        lastVersionId: drizzleCredential.lastVersionId ?? undefined,
        createdAt: drizzleCredential.createdAt,
        updatedAt: drizzleCredential.updatedAt,
      })
    },
  }
}
