import { VaultItem } from '../abstracts'
import { Encrypted, Id } from '../structures'
import type { NoteDto } from './dtos'

type NoteEncryptedData = {
  content: string
}

export class Note extends VaultItem<unknown, NoteEncryptedData> {
  static create(dto: NoteDto) {
    return new Note(
      {
        encryptedData: Encrypted.create<NoteEncryptedData>(dto.encryptedData),
        title: dto.title,
        vaultId: Id.create(dto.vaultId),
        createdAt: dto.createdAt,
      },
      dto.id,
    )
  }
}
