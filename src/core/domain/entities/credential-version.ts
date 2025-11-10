import { Entity } from '../abstracts'
import { Encrypted, Id } from '../structures'
import type { CredentialVersionDto } from './dtos'

type CredentialProps = {
  versionNumber: number
  isRestoration: boolean
  encryptedData: Encrypted<CredentialEncryptedData>
  title: string
  siteUrl: string | null
  credentialId: Id
  createdAt: Date
}

type CredentialEncryptedData = {
  login: string
  password: string
}

export class CredentialVersion extends Entity<CredentialProps> {
  static create(dto: CredentialVersionDto) {
    return new CredentialVersion(
      {
        versionNumber: dto.versionNumber,
        isRestoration: dto.isRestoration,
        encryptedData: Encrypted.create<CredentialEncryptedData>(dto.encryptedData),
        title: dto.title,
        siteUrl: dto.siteUrl ?? null,
        credentialId: Id.create(dto.credentialId),
        createdAt: dto.createdAt,
      },
      dto.id,
    )
  }

  get isOutdated(): boolean {
    return this.props.versionNumber > 1
  }

  get isFirstVersion(): boolean {
    return this.props.versionNumber === 1
  }

  get versionNumber(): number {
    return this.props.versionNumber
  }

  get isRestoration(): boolean {
    return this.props.isRestoration
  }

  get credentialId(): Id {
    return this.props.credentialId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get title(): string {
    return this.props.title
  }

  get encrypted(): Encrypted<CredentialEncryptedData> {
    return this.props.encryptedData
  }

  get siteUrl(): string | null {
    return this.props.siteUrl
  }

  get dto(): CredentialVersionDto {
    return {
      id: this.id.value,
      title: this.title,
      versionNumber: this.props.versionNumber,
      isRestoration: this.props.isRestoration,
      siteUrl: this.siteUrl ?? undefined,
      credentialId: this.props.credentialId.value,
      encryptedData: this.encrypted.value,
      createdAt: this.createdAt,
    }
  }
}
