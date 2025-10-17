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
  const { credentialsRepository } = useDatabase()
  const { credential, handleCredentialCreate, handleCredentialUpdate } =
    useCredentialSettingsScreen(
      credentialsRepository,
      credentialId ? Id.create(credentialId) : undefined,
    )

  return (
    <CredentialSettingsScreenView
      credential={credential}
      onCreate={handleCredentialCreate}
      onUpdate={handleCredentialUpdate}
    />
  )
}
