import type { CryptoProvider } from '@/core/interfaces'
import type { Encrypted, Id } from '../structures'
import { Entity } from './entity'

export type VauntItemProps<EncryptedData> = {
  title: string
  vauntId: Id
  encryptedData: Encrypted<EncryptedData>
}

export abstract class VauntItem<Props, EncryptedData> extends Entity<
  Props & VauntItemProps<EncryptedData>
> {
  protected encryptionKey?: string
  protected cryptoProvider?: CryptoProvider

  protected constructor(props: Props & VauntItemProps<EncryptedData>, id?: string) {
    super(props, id)
  }

  setEncryptionKey(encryptionKey: string) {
    this.encryptionKey = encryptionKey
  }

  setCryptoProvider(cryptoProvider: CryptoProvider) {
    this.cryptoProvider = cryptoProvider
  }

  get vauntId(): Id {
    return this.props.vauntId
  }

  get title(): string {
    return this.props.title
  }

  get encrypted(): Encrypted<EncryptedData> {
    return this.props.encryptedData
  }
}
