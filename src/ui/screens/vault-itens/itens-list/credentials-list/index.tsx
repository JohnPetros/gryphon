import type { Id } from '@/core/domain/structures'
import { CredentialsListView } from './credentials-list-view'
import { useCredentialsList } from './use-credentials-list'
import { useDatabase } from '@/ui/hooks/use-database'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'

type Props = {
  vaultId: Id
  search: string
  onCredentialDelete: () => void
}

export const CredentialsList = ({ vaultId, search, onCredentialDelete }: Props) => {
  const { credentialsRepository } = useDatabase()
  const { encryptionKey } = useAuthContext()
  const cryptoProvider = useCryptoProvider()
  const { credentials, handleCredentialDelete } = useCredentialsList({
    vaultId,
    search,
    credentialsRepository,
    onCredentialDelete,
  })

  return (
    <CredentialsListView
      credentials={credentials}
      encryptionKey={encryptionKey}
      cryptoProvider={cryptoProvider}
      onCredentialDelete={handleCredentialDelete}
    />
  )
}
