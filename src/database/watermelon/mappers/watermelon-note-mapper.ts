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
        createdAt: model.createdAt,
      })
    },

    toDto(schema: NoteSchema): NoteDto {
      return {
        id: schema.id,
        title: schema.title,
        encryptedData: schema.encrypted_data,
        vaultId: schema.vault_id,
        createdAt: new Date(schema.created_at * 1000),
      }
    },
  }
}
