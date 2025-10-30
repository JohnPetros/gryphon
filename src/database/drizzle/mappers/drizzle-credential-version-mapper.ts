import { CredentialVersion } from '@/core/domain/entities/credential-version'

import type { DrizzleCredentialVersion } from '../types/drizzle-credential-version'

export const DrizzleCredentialVersionMapper = () => {
  return {
    toEntity(drizzleCredentialVersion: DrizzleCredentialVersion): CredentialVersion {
      return CredentialVersion.create({
        id: drizzleCredentialVersion.id,
        title: drizzleCredentialVersion.title,
        versionNumber: drizzleCredentialVersion.versionNumber,
        isRestoration: drizzleCredentialVersion.isRestoration === 1,
        encryptedData: drizzleCredentialVersion.encryptedData,
        credentialId: drizzleCredentialVersion.credentialId,
        createdAt: new Date(),
      })
    },
  }
}
