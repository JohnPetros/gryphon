import type { Id } from '@/core/domain/structures'
import { CredentialsListView } from './credentials-list-view'
import { useCredentialsList } from './use-credentials-list'
import { useDatabase } from '@/ui/hooks/use-database'

type Props = {
  vaultId: Id
}

export const CredentialsList = ({ vaultId }: Props) => {
  const { credentialsRepository } = useDatabase()
  const { credentials } = useCredentialsList(vaultId, credentialsRepository)

  return <CredentialsListView credentials={credentials} />
}
