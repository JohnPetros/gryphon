import type { Credential } from '@/core/domain/entities'

import { useDatabase } from '@/ui/hooks/use-database'
import { CredentialMenuView } from './credential-menu-view'
import { useCredentialMenu } from './use-credential-menu'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'

type Props = {
  credential: Credential
  onDelete?: () => void
}

export const CredentialMenu = ({ credential, onDelete }: Props) => {
  const { encryptionKey } = useAuthContext()
  const cryptoProvider = useCryptoProvider()
  const { credentialsRepository } = useDatabase()
  const { handleDelete, handleCopyEmail, handleCopyPassword } = useCredentialMenu({
    repository: credentialsRepository,
    credential,
    encryptionKey,
    cryptoProvider,
    onDelete,
  })

  return (
    <CredentialMenuView
      credentialId={credential.id}
      credentialTitle={credential.title}
      onDelete={handleDelete}
      onCopyEmail={handleCopyEmail}
      onCopyPassword={handleCopyPassword}
    />
  )
}
