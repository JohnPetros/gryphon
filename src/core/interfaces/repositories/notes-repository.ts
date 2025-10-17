import type { Id } from '@/core/domain/structures'
import type { Note } from '@/core/domain/entities/note'

export interface NotesRepository {
  add(note: Note): Promise<void>
  update(note: Note): Promise<void>
  findById(id: Id): Promise<Note | null>
  findAllByVaultAndTitle(vaultId: Id, title: string): Promise<Note[]>
  countByVault(vaultId: Id): Promise<number>
  remove(noteId: Id): Promise<void>
}
