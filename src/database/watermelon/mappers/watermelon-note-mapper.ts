import { Note } from '@/core/domain/entities'

import type { NoteModel } from '../models'

export const WatermelonNoteMapper = () => {
  return {
    toEntity(model: NoteModel): Note {
      return Note.create({
        id: model.id,
        title: model.title,
        encryptedData: model.encryptedData,
        vaultId: model.vault.id,
      })
    },
  }
}
