import type { CryptoProvider } from '@/core/interfaces'
import type { Encrypted, Id } from '../structures'
import { Entity } from './entity'

export type VaultItemProps<EncryptedData> = {
  title: string
  vaultId: Id
  encryptedData: Encrypted<EncryptedData>
  createdAt: Date
  updatedAt: Date | null
}

export abstract class VaultItem<Props, EncryptedData> extends Entity<
  Props & VaultItemProps<EncryptedData>
> {
  protected encryptionKey?: string
  protected cryptoProvider?: CryptoProvider

  protected constructor(props: Props & VaultItemProps<EncryptedData>, id?: string) {
    super(props, id)
  }

  setEncryptionKey(encryptionKey: string) {
    this.encryptionKey = encryptionKey
  }

  setCryptoProvider(cryptoProvider: CryptoProvider) {
    this.cryptoProvider = cryptoProvider
  }

  get vaultId(): Id {
    return this.props.vaultId
  }

  get title(): string {
    return this.props.title
  }

  get encrypted(): Encrypted<EncryptedData> {
    return this.props.encryptedData
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt
  }
}
