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
}

export function useCredentialScreen({
  credentialId,
  credentialsRepository,
  cryptoProvider,
  encryptionKey,
}: Params) {
  const [credential, setCredential] = useState<Credential | null>(null)
  const { navigate } = useNavigation()

  const loadCredential = useCallback(async () => {
    if (credentialId) {
      const credential = await credentialsRepository.findById(credentialId)
      setCredential(credential)
    }
  }, [credentialId, credentialsRepository])

  function handleCredentialDelete() {
    setCredential(null)
    navigate(ROUTES.vaultItens)
  }

  function handleCredentialRestore() {
    loadCredential()
  }

  useEffect(() => {
    loadCredential()
  }, [loadCredential])

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
