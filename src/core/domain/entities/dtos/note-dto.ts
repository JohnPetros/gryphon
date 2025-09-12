import type { vaultItemDto } from './vault-item-dto'

export type NoteDto = {
  title: string
  content: string
} & vaultItemDto
