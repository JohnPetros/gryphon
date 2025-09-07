import { useDatabase } from '@/ui/hooks/use-database'
import { CredentialScreenView } from './credential-screen-view'
import { useCredentialScreen } from './use-credential-screen'
import { useAuthContext } from '@/ui/hooks/use-auth-context'

export const CredentialScreen = () => {
  const { credentialsRepository } = useDatabase()
  const { encryptionKey } = useAuthContext()
  const { credential, handleCredentialCreate, handleCredentialUpdate } =
    useCredentialScreen(credentialsRepository)

  return (
    <CredentialScreenView
      credential={credential}
      encryptionKey={encryptionKey}
      onCreate={handleCredentialCreate}
      onUpdate={handleCredentialUpdate}
    />
  )
}
