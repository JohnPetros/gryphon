import type { Credential } from '@/core/domain/entities'
import type { CredentialVersion } from '@/core/domain/entities/credential-version'
import type {
  CredentialsRepository,
  CredentialVersionsRepository,
  CryptoProvider,
} from '@/core/interfaces'

import { useClipboard } from '@/ui/hooks/use-clipbaord'

type Params = {
  credential: Credential
  credentialVersion: CredentialVersion
  encryptionKey: string
  cryptoProvider: CryptoProvider
  credentialsRepository: CredentialsRepository
  credentialVersionsRepository: CredentialVersionsRepository
  onRestore: () => void
}

export function useCredentialHistoryPoint({
  credential,
  credentialVersion,
  encryptionKey,
  cryptoProvider,
  credentialsRepository,
  credentialVersionsRepository,
  onRestore,
}: Params) {
  const { copy } = useClipboard()
  const decrypted = credentialVersion?.encrypted.decrypt(encryptionKey, cryptoProvider)
  const login = decrypted?.login
  const password = decrypted?.password

  async function handleRestore() {
    const nextCredentialVersion = credential.restore(credentialVersion)

    await Promise.all([
      credentialsRepository.update(credential),
      credentialVersionsRepository.add(nextCredentialVersion),
    ])
    onRestore()
  }

  async function handleCopyLogin() {
    if (!login) return
    await copy(login)
  }

  async function handleCopyPassword() {
    if (!password) return
    await copy(password)
  }

  return {
    login: login ?? '',
    password: password ?? '',
    handleCopyLogin,
    handleCopyPassword,
    handleRestore,
  }
}
