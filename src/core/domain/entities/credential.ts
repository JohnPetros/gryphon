import { VaultItem } from '../abstracts'
import { Encrypted, Id } from '../structures'
import { CredentialVersion } from './credential-version'
import type { CredentialDto } from './dtos'

type CredentialProps = {
  siteUrl: string | null
  lastVersionId: Id | null
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
        siteUrl: dto.siteUrl ?? null,
        vaultId: Id.create(dto.vaultId),
        lastVersionId: dto.lastVersionId ? Id.create(dto.lastVersionId) : null,
        createdAt: dto.createdAt,
      },
      dto.id,
    )
  }

  restore(credentialVersion: CredentialVersion): CredentialVersion {
    this.props.encryptedData = credentialVersion.encrypted
    this.props.title = credentialVersion.title
    this.props.siteUrl = credentialVersion.siteUrl
    this.props.lastVersionId = credentialVersion.id
    return CredentialVersion.create({
      versionNumber: credentialVersion.versionNumber,
      title: this.props.title,
      siteUrl: this.props.siteUrl ?? undefined,
      encryptedData: this.props.encryptedData.value,
      credentialId: this.id.value,
      isRestoration: true,
      createdAt: new Date(),
    })
  }

  createVersion(currentVersionNumber?: number): CredentialVersion {
    return CredentialVersion.create({
      versionNumber: currentVersionNumber ? currentVersionNumber + 1 : 1,
      title: this.props.title,
      siteUrl: this.props.siteUrl ?? undefined,
      encryptedData: this.props.encryptedData.value,
      credentialId: this.id.value,
      isRestoration: false,
      createdAt: new Date(),
    })
  }

  get versionZero(): CredentialVersion {
    return CredentialVersion.create({
      versionNumber: 0,
      title: this.props.title,
      siteUrl: this.props.siteUrl ?? undefined,
      encryptedData: this.props.encryptedData.value,
      credentialId: this.id.value,
      isRestoration: false,
      createdAt: this.createdAt,
    })
  }

  get lastVersionId(): Id | null {
    return this.props.lastVersionId
  }

  get siteUrl(): string | null {
    return this.props.siteUrl
  }

  get dto(): CredentialDto {
    return {
      id: this.id.value,
      title: this.title,
      siteUrl: this.siteUrl ?? undefined,
      vaultId: this.props.vaultId.value,
      lastVersionId: this.lastVersionId?.value ?? undefined,
      encryptedData: this.encrypted.value,
      createdAt: this.props.createdAt,
    }
  }
}
