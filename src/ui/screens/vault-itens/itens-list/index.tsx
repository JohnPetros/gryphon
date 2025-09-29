import type { Id } from '@/core/domain/structures'

import { useDatabase } from '@/ui/hooks/use-database'
import { ItensListView } from './itens-list-view'
import { useItensList } from './use-itens-list'

type Props = {
  vaultId: Id
  search: string
}

export const ItensList = ({ vaultId, search }: Props) => {
  const { credentialsRepository } = useDatabase()
  const {
    credentialCount,
    noteCount,
    selectedTab,
    handleTabPress,
    handleCredentialDelete,
  } = useItensList(vaultId, credentialsRepository)

  return (
    <ItensListView
      vaultId={vaultId}
      search={search}
      credentialCount={credentialCount}
      noteCount={noteCount}
      selectedTab={selectedTab}
      onTabPress={handleTabPress}
      onCredentialDelete={handleCredentialDelete}
    />
  )
}
