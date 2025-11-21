export type VaultItemDto = {
  id?: string
  title: string
  encryptedData: string
  vaultId: string
  createdAt: Date
  updatedAt: Date | null
}
