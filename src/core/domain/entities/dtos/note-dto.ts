import type { VauntItemDto } from './vaunt-item-dto'

export type NoteDto = {
  title: string
  content: string
} & VauntItemDto
