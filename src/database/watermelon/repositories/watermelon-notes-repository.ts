import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'
import { Q } from '@nozbe/watermelondb'

import type { NotesRepository } from '@/core/interfaces'
import type { Note } from '@/core/domain/entities/note'
import type { Id } from '@/core/domain/structures'

import type { NoteModel, VaultModel } from '../models'
import { WatermelonNoteMapper } from '../mappers'
import { watermelon } from '../client'

export const WatermelonNotesRepository = (): NotesRepository => {
  const mapper = WatermelonNoteMapper()

  return {
    async add(note: Note): Promise<void> {
      await watermelon.write(async () => {
        const notesCollection = watermelon.collections.get<NoteModel>('notes')

        await notesCollection.create((model) => {
          model._raw = sanitizedRaw(
            {
              id: note.id.value,
              title: note.title,
              encrypted_data: note.encrypted.value,
              vault_id: note.vaultId.value,
            },
            notesCollection.schema,
          )
        })
      })
    },

    async update(note: Note): Promise<void> {
      await watermelon.write(async () => {
        const noteModel = await watermelon.collections
          .get<NoteModel>('notes')
          .find(note.id.value)

        const vaultModel = await watermelon.collections
          .get<VaultModel>('vaults')
          .find(note.vaultId.value)

        await noteModel.update((model) => {
          model.title = note.title
          model.encryptedData = note.encrypted.value
          // @ts-ignore
          model.vault.set(vaultModel)
        })
      })
    },

    async findById(id: Id): Promise<Note | null> {
      try {
        const noteModel = await watermelon.collections
          .get<NoteModel>('notes')
          .find(id.value)

        return mapper.toEntity(noteModel)
      } catch {
        return null
      }
    },

    async findAllByVaultAndTitle(vaultId: Id, title: string): Promise<Note[]> {
      const noteModels = await watermelon.collections
        .get<NoteModel>('notes')
        .query(
          Q.and(
            Q.where('vault_id', vaultId.value),
            Q.where('title', Q.like(`${title}%`)),
          ),
        )
        .fetch()

      return noteModels.map(mapper.toEntity)
    },

    async countByVault(vaultId: Id): Promise<number> {
      return await watermelon.collections
        .get<NoteModel>('notes')
        .query(Q.where('vault_id', vaultId.value)).count
    },

    async remove(vaultId: Id): Promise<void> {
      await watermelon.write(async () => {
        const model = await watermelon.collections
          .get<NoteModel>('notes')
          .find(vaultId.value)

        await model.markAsDeleted()
      })
    },
  }
}
