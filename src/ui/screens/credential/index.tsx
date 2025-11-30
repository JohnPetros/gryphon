import { useLocalSearchParams } from 'expo-router'

import { Id } from '@/core/domain/structures'

import { useDatabase } from '@/ui/hooks/use-database'
import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useDatetime } from '@/ui/hooks/use-datetime'
import { CredentialView } from './credential-view'
import { useCredentialScreen } from './use-credential-screen'

type LocalSearchParams = {
  credentialId: string
}

export const CredentialScreen = () => {
  const { credentialId } = useLocalSearchParams<LocalSearchParams>()
  const { credentialsRepository, synchronizeDatabase } = useDatabase()
  const datetimeProvider = useDatetime()
  const cryptoProvider = useCryptoProvider()
  const { encryptionKey, account } = useAuthContext()
  const { credential, decryptedData, handleCredentialDelete, handleCredentialRestore } =
    useCredentialScreen({
      credentialId: Id.create(credentialId),
      credentialsRepository,
      cryptoProvider,
      encryptionKey,
      onRestore: synchronizeDatabase,
    })

  if (!credential || !decryptedData || !account) return null

  const isCredentialOutdated = credential.isOutdated(
    account.credentialRotation,
    datetimeProvider,
  )

  return (
    <CredentialView
      credential={credential}
      credentialLogin={decryptedData.login}
      credentialPassword={decryptedData.password}
      isCredentialOutdated={isCredentialOutdated}
      onCredentialDelete={handleCredentialDelete}
      onCredentialRestore={handleCredentialRestore}
    />
  )
}
