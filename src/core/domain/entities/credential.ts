import { VaultItem } from '../abstracts'
import { Encrypted, Id } from '../structures'
import type { CredentialDto } from './dtos'

type CredentialProps = {
  siteUrl: string
  vaultId: Id
}

type CredentialEncryptedData = {
  login: string
  password: string
}

export class Credential extends VaultItem<CredentialProps, CredentialEncryptedData> {
  static create(dto: CredentialDto) {
    return new Credential(
      {
        encryptedData: Encrypted.create<CredentialEncryptedData>(dto.encryptedData),
        title: dto.title,
        siteUrl: dto.siteUrl,
        vaultId: Id.create(dto.vaultId),
      },
      dto.id,
    )
  }

  get siteUrl(): string {
    return this.props.siteUrl
  }

  get dto(): CredentialDto {
    return {
      id: this.id.value,
      title: this.title,
      siteUrl: this.siteUrl,
      vaultId: this.props.vaultId.value,
      encryptedData: this.encrypted.value,
    }
  }
}
