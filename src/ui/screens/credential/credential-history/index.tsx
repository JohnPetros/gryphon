import type { Credential } from '@/core/domain/entities'

import { useDatabase } from '@/ui/hooks/use-database'
import { CredentialHistoryView } from './credential-history-view'
import { useCredentialHistory } from './use-credential-history'

type Params = {
  credential: Credential
  onRestore: () => void
}

export const CredentialHistory = ({ credential, onRestore }: Params) => {
  const { credentialVersionsRepository } = useDatabase()
  const { versions, handleRestore } = useCredentialHistory({
    credentialId: credential.id,
    credentialVersionsRepository,
    onRestore
  })

  return (
    <CredentialHistoryView
      credential={credential}
      versions={versions}
      onRestore={handleRestore}
    />
  )
}
