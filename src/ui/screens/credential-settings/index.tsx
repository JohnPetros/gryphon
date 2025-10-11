import { useLocalSearchParams } from 'expo-router'

import { Id } from '@/core/domain/structures'

import { useDatabase } from '@/ui/hooks/use-database'
import { CredentialSettingsScreenView } from './credential-settings-screen-view'
import { useCredentialSettingsScreen } from './use-credential-settings-screen'
import { useAuthContext } from '@/ui/hooks/use-auth-context'

type LocalSearchParams = {
  credentialId: string
}

export const CredentialSettingsScreen = () => {
  const { credentialId } = useLocalSearchParams<LocalSearchParams>()
  const { credentialsRepository, credentialVersionsRepository, synchronizeDatabase } =
    useDatabase()
  const { encryptionKey } = useAuthContext()
  const { credential, handleCredentialCreate, handleCredentialUpdate } =
    useCredentialSettingsScreen({
      credentialsRepository,
      credentialVersionsRepository,
      credentialId: credentialId ? Id.create(credentialId) : undefined,
      onChangeDatabase: synchronizeDatabase,
    })

  return (
    <CredentialSettingsScreenView
      credential={credential}
      encryptionKey={encryptionKey}
      onCreate={handleCredentialCreate}
      onUpdate={handleCredentialUpdate}
    />
  )
}
