import type { vaultItemDto } from './vault-item-dto'

export type CredentialDto = {
  lastVersionId?: string | null
  siteUrl?: string
} & vaultItemDto
