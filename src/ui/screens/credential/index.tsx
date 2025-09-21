import { useLocalSearchParams } from 'expo-router'

import { Id } from '@/core/domain/structures'

import { useDatabase } from '@/ui/hooks/use-database'
import { CredentialView } from './credential-view'
import { useCredentialScreen } from './use-credential-screen'
import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'
import { useAuthContext } from '@/ui/hooks/use-auth-context'

type LocalSearchParams = {
  credentialId: string
}

export const CredentialScreen = () => {
  const { credentialId } = useLocalSearchParams<LocalSearchParams>()
  const { credentialsRepository } = useDatabase()
  const cryptoProvider = useCryptoProvider()
  const { encryptionKey } = useAuthContext()
  const { credential, decryptedData, handleCredentialDelete } = useCredentialScreen({
    credentialId: Id.create(credentialId),
    credentialsRepository,
    cryptoProvider,
    encryptionKey,
  })

  if (!credential || !decryptedData) return null
  return (
    <CredentialView
      credential={credential}
      credentialLogin={decryptedData.login}
      credentialPassword={decryptedData.password}
      onCredentialDelete={handleCredentialDelete}
    />
  )
}
