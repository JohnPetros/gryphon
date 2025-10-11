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
  const login = credentialVersion?.encrypted.decrypt(encryptionKey, cryptoProvider)?.login
  const password = credentialVersion?.encrypted.decrypt(
    encryptionKey,
    cryptoProvider,
  )?.password

  async function handleRestore() {
    const nextCredentialVersion = credential.restore(credentialVersion)

    console.log('handleRestore', credentialVersion.id.value)
    console.log('credential.lastVersionId?.value', credential.lastVersionId?.value)

    await Promise.all([
      credentialsRepository.update(credential),
      credentialVersionsRepository.add(nextCredentialVersion),
    ])
    onRestore()
  }

  console.log('credential.lastVersionId?.value', credential.lastVersionId?.value)

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
