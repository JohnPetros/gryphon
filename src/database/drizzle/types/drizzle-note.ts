import type { noteSchema } from '../schemas/note-schema'

export type DrizzleNote = typeof noteSchema.$inferSelect
