import { VauntItem } from '../abstracts'
import { Encrypted, Id } from '../structures'
import type { NoteDto } from './dtos'

type NoteEncryptedData = {
  content: string
}

export class Note extends VauntItem<unknown, NoteEncryptedData> {
  static create(dto: NoteDto) {
    return new Note(
      {
        encryptedData: Encrypted.create<NoteEncryptedData>(dto.encryptedData),
        title: dto.title,
        vauntId: Id.create(dto.vauntId),
      },
      dto.id,
    )
  }
}
