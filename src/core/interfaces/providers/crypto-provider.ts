export interface CryptoProvider {
  generateSalt: () => Promise<string>
  deriveKey: (masterPassword: string, salt: string) => Promise<string>
  encrypt: (data: unknown, encryptionKey: string) => Promise<string>
  decrypt: (ciphertext: string, encryptionKey: string) => string | null
}
