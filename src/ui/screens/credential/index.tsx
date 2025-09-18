import { useLocalSearchParams } from 'expo-router'

import { useDatabase } from '@/ui/hooks/use-database'
import { CredentialScreenView } from './credential-screen-view'
import { useCredentialScreen } from './use-credential-screen'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { Id } from '@/core/domain/structures'

type SearchParams = {
  credentialId: string
}

export const CredentialScreen = () => {
  const { credentialId } = useLocalSearchParams<SearchParams>()
  const { credentialsRepository } = useDatabase()
  const { encryptionKey } = useAuthContext()
  const { credential, handleCredentialCreate, handleCredentialUpdate } =
    useCredentialScreen(
      credentialsRepository,
      credentialId ? Id.create(credentialId) : undefined,
    )

  return (
    <CredentialScreenView
      credential={credential}
      encryptionKey={encryptionKey}
      onCreate={handleCredentialCreate}
      onUpdate={handleCredentialUpdate}
    />
  )
}
