import type { vaultItemDto } from './vault-item-dto'

export type CredentialDto = {
  lastVersionId?: string
  siteUrl?: string
} & vaultItemDto
