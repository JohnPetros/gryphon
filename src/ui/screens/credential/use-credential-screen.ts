import { useCallback, useEffect, useMemo, useState } from 'react'

import type { Id } from '@/core/domain/structures'
import type { CredentialsRepository, CryptoProvider } from '@/core/interfaces'
import type { Credential } from '@/core/domain/entities'

import { ROUTES } from '@/constants'
import { useNavigation } from '@/ui/hooks/use-navigation'

type Params = {
  credentialId: Id
  credentialsRepository: CredentialsRepository
  cryptoProvider: CryptoProvider
  encryptionKey: string
  onRestore: () => Promise<void>
}

export function useCredentialScreen({
  credentialId,
  credentialsRepository,
  cryptoProvider,
  encryptionKey,
  onRestore,
}: Params) {
  const [credential, setCredential] = useState<Credential | null>(null)
  const { navigate } = useNavigation()

  const loadCredential = useCallback(async () => {
    if (credentialId) {
      const credential = await credentialsRepository.findById(credentialId)
      setCredential(credential)
    }
  }, [credentialId, credentialsRepository])

  async function handleCredentialDelete() {
    setCredential(null)
    navigate(ROUTES.vaultItens, { vaultId: credential?.vaultId.value, activeTab: 'credential' })
  }

  async function handleCredentialRestore() {
    try {
      await onRestore()
    } catch {}
    await loadCredential()
  }

  useEffect(() => {
    loadCredential()
  }, [])

  const decryptedData = useMemo(() => {
    if (!credential) return

    const decryptedData = credential.encrypted.decrypt(encryptionKey, cryptoProvider)
    if (!decryptedData) return
    return decryptedData
  }, [credential, encryptionKey, cryptoProvider])

  return {
    credential,
    decryptedData,
    handleCredentialDelete,
    handleCredentialRestore,
  }
}
