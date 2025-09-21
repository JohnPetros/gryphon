import type { CredentialsRepository, CryptoProvider } from '@/core/interfaces'
import type { Id } from '@/core/domain/structures'
import type { Credential } from '@/core/domain/entities'
import { useClipboard } from '@/ui/hooks/use-clipbaord'
import { useRouter } from 'expo-router'
import { ROUTES } from '@/constants'

type Params = {
  credential: Credential
  encryptionKey: string
  cryptoProvider: CryptoProvider
  repository: CredentialsRepository
  onDelete?: () => void
}

export function useCredentialMenu({
  encryptionKey,
  cryptoProvider,
  repository,
  credential,
  onDelete,
}: Params) {
  const { copy } = useClipboard()

  async function handleDelete(credentialId: Id) {
    try {
      await repository.remove(credentialId)
      onDelete?.()
    } catch (error) {
      console.error(error)
    }
  }

  async function handleCopyEmail() {
    const decryptedData = credential.encrypted.decrypt(encryptionKey, cryptoProvider)
    if (!decryptedData) return
    await copy(decryptedData.login)
  }

  async function handleCopyPassword() {
    const decryptedData = credential.encrypted.decrypt(encryptionKey, cryptoProvider)
    if (!decryptedData) return
    await copy(decryptedData.password)
  }

  return {
    handleCopyEmail,
    handleCopyPassword,
    handleDelete,
  }
}
