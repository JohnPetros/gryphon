import type { Id } from '@/core/domain/structures'

import { useDatabase } from '@/ui/hooks/use-database'
import { ItensListView } from './itens-list-view'
import { useItensList } from './use-itens-list'

type Props = {
  vaultId: Id
  search: string
  defaultActiveTab: 'credential' | 'note'
}

export const ItensList = ({ vaultId, defaultActiveTab, search }: Props) => {
  const { credentialsRepository, notesRepository } = useDatabase()
  const {
    credentialCount,
    noteCount,
    selectedTab,
    handleTabPress,
    handleCredentialDelete,
    handleNoteDelete,
  } = useItensList({
    vaultId,
    credentialsRepository,
    notesRepository,
    defaultActiveTab,
  })

  return (
    <ItensListView
      vaultId={vaultId}
      search={search}
      credentialCount={credentialCount}
      noteCount={noteCount}
      selectedTab={selectedTab}
      onTabPress={handleTabPress}
      onCredentialDelete={handleCredentialDelete}
      onNoteDelete={handleNoteDelete}
    />
  )
}
