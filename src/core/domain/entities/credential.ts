import { VauntItem } from '../abstracts'
import { Encrypted, Id } from '../structures'
import type { CredentialDto } from './dtos'

type CredentialProps = {
  siteUrl: string
  vauntId: Id
}

type CredentialEncryptedData = {
  login: string
  password: string
}

export class Credential extends VauntItem<CredentialProps, CredentialEncryptedData> {
  static create(dto: CredentialDto) {
    return new Credential(
      {
        encryptedData: Encrypted.create<CredentialEncryptedData>(dto.encryptedData),
        title: dto.title,
        siteUrl: dto.siteUrl,
        vauntId: Id.create(dto.vauntId),
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
      vauntId: this.props.vauntId.value,
      encryptedData: this.encrypted.value,
    }
  }
}
