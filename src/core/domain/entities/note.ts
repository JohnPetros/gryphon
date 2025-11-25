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
        updatedAt: dto.createdAt,
      },
      dto.id,
    )
  }

  get dto(): NoteDto {
    return {
      id: this.id.value,
      title: this.props.title,
      encryptedData: this.props.encryptedData.value,
      vaultId: this.props.vaultId.value,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }
}
