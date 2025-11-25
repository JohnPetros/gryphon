import { Note } from '@/core/domain/entities/note'

import type { DrizzleNote } from '../types/drizzle-note'

export const DrizzleNoteMapper = () => {
  return {
    toEntity(drizzleNote: DrizzleNote): Note {
      return Note.create({
        id: drizzleNote.id,
        title: drizzleNote.title,
        encryptedData: drizzleNote.encryptedData,
        vaultId: drizzleNote.vaultId,
        createdAt: drizzleNote.createdAt,
        updatedAt: drizzleNote.updatedAt,
      })
    },
  }
}
