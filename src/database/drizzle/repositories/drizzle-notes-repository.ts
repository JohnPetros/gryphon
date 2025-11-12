import { and, count, eq, inArray, like } from 'drizzle-orm'

import type { NotesRepository } from '@/core/interfaces'
import type { Id } from '@/core/domain/structures'
import type { Note } from '@/core/domain/entities/note'

import { drizzle } from '../drizzle'
import { DrizzleNoteMapper } from '../mappers'
import { noteSchema, vaultSchema } from '../schemas'

export const DrizzleNotesRepository = (): NotesRepository => {
  const mapper = DrizzleNoteMapper()

  return {
    async add(note: Note): Promise<void> {
      await drizzle.insert(noteSchema).values({
        id: note.id.value,
        title: note.title,
        encryptedData: note.encrypted.value,
        vaultId: note.vaultId.value,
        createdAt: note.createdAt,
      })
    },

    async addMany(notes: Note[]): Promise<void> {
      if (notes.length === 0) return

      await drizzle.insert(noteSchema).values(
        notes.map((note) => ({
          id: note.id.value,
          title: note.title,
          encryptedData: note.encrypted.value,
          vaultId: note.vaultId.value,
          createdAt: note.createdAt,
        })),
      )
    },

    async update(note: Note): Promise<void> {
      await drizzle
        .update(noteSchema)
        .set({
          title: note.title,
          encryptedData: note.encrypted.value,
          vaultId: note.vaultId.value,
        })
        .where(eq(noteSchema.id, note.id.value))
    },

    async updateMany(notes: Note[]): Promise<void> {
      if (notes.length === 0) return

      await Promise.all(
        notes.map((note) =>
          drizzle
            .update(noteSchema)
            .set({
              title: note.title,
              encryptedData: note.encrypted.value,
              vaultId: note.vaultId.value,
            })
            .where(eq(noteSchema.id, note.id.value)),
        ),
      )
    },

    async findAllByAccount(accountId: Id): Promise<Note[]> {
      const results = await drizzle
        .select()
        .from(noteSchema)
        .innerJoin(vaultSchema, eq(noteSchema.vaultId, vaultSchema.id))
        .where(eq(vaultSchema.accountId, accountId.value))

      return results.map(({ notes }) => mapper.toEntity(notes))
    },

    async findById(id: Id): Promise<Note | null> {
      const result = await drizzle
        .select()
        .from(noteSchema)
        .where(eq(noteSchema.id, id.value))
        .limit(1)

      if (result.length === 0) {
        return null
      }

      return mapper.toEntity(result[0])
    },

    async findAllByVaultAndTitle(vaultId: Id, title: string): Promise<Note[]> {
      const results = await drizzle
        .select()
        .from(noteSchema)
        .where(
          and(eq(noteSchema.vaultId, vaultId.value), like(noteSchema.title, `${title}%`)),
        )

      return results.map(mapper.toEntity)
    },

    async countByVault(vaultId: Id): Promise<number> {
      const result = await drizzle
        .select({ count: count() })
        .from(noteSchema)
        .where(eq(noteSchema.vaultId, vaultId.value))

      return result[0].count
    },

    async remove(noteId: Id): Promise<void> {
      await drizzle.delete(noteSchema).where(eq(noteSchema.id, noteId.value))
    },

    async removeMany(noteIds: Id[]): Promise<void> {
      if (noteIds.length === 0) return

      await drizzle.delete(noteSchema).where(
        inArray(
          noteSchema.id,
          noteIds.map((id) => id.value),
        ),
      )
    },

    async removeManyByAccount(accountId) {
      throw new Error('Method not implemented.')
    },
  }
}
