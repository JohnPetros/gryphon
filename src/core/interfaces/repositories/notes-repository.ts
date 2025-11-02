import type { Id } from '@/core/domain/structures'
import type { Note } from '@/core/domain/entities/note'

export interface NotesRepository {
  add(note: Note): Promise<void>
  addMany(notes: Note[]): Promise<void>
  update(note: Note): Promise<void>
  updateMany(notes: Note[]): Promise<void>
  findAllByAccount(accountId: Id): Promise<Note[]>
  findById(id: Id): Promise<Note | null>
  findAllByVaultAndTitle(vaultId: Id, title: string): Promise<Note[]>
  countByVault(vaultId: Id): Promise<number>
  remove(noteId: Id): Promise<void>
  removeMany(noteIds: Id[]): Promise<void>
  removeManyByAccount(accountId: Id): Promise<void>
}
