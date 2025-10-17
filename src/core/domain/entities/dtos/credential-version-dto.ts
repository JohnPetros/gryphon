import type { CredentialDto } from './credential-dto'

export type CredentialVersionDto = {
  versionNumber: number
  isRestoration: boolean
  credentialId: string
  createdAt: Date
} & Omit<CredentialDto, 'vaultId'>
