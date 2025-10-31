import type { VaultItemDto } from './vault-item-dto'

export type CredentialDto = {
  lastVersionId?: string | null
  siteUrl?: string
} & VaultItemDto
