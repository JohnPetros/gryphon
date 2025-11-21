import { Note } from '@/core/domain/entities'

import type { NoteModel } from '../models'
import type { NoteDto } from '@/core/domain/entities/dtos'
import type { NoteSchema } from '../types'

export const WatermelonNoteMapper = () => {
  return {
    toEntity(model: NoteModel): Note {
      return Note.create({
        id: model.id,
        title: model.title,
        encryptedData: model.encryptedData,
        vaultId: model.vault.id,
        createdAt: new Date(model.createdAt),
        updatedAt:
          model.updatedAt !== null && model.updatedAt !== 0
            ? new Date(model.updatedAt)
            : null,
      })
    },

    toDto(schema: NoteSchema): NoteDto {
      return {
        id: schema.id,
        title: schema.title,
        encryptedData: schema.encrypted_data,
        vaultId: schema.vault_id,
        createdAt: new Date(schema.created_at * 1000),
        updatedAt:
          schema.updated_at !== null && schema.updated_at !== 0
            ? new Date(schema.updated_at)
            : null,
      }
    },
  }
}
