import type { CryptoProvider } from '@/core/interfaces'

export class Encrypted<Data> {
  private constructor(readonly value: string) {}

  static create<Data>(value: string) {
    return new Encrypted<Data>(value)
  }

  decrypt(encryptionKey: string, cryptoProvider: CryptoProvider): Data {
    const decryptedData = cryptoProvider.decrypt(this.value, encryptionKey)
    return JSON.parse(decryptedData) as Data
  }
}
