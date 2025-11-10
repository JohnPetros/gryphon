import { ScrollView } from 'react-native'

import type { Id } from '@/core/domain/structures'

import { Box } from '@/ui/gluestack/box'
import { AppItem } from '@/ui/components/app-item'
import { ItensListTab } from './itens-list-tab'
import { CredentialsList } from './credentials-list'
import { NotesList } from './notes-list'

type Props = {
  vaultId: Id
  selectedTab: 'credential' | 'note'
  search: string
  credentialCount: number
  noteCount: number
  onTabPress: (tab: 'credential' | 'note') => void
  onCredentialDelete: () => void
  onNoteDelete: () => void
}

export const ItensListView = ({
  vaultId,
  search,
  credentialCount,
  noteCount,
  selectedTab,
  onTabPress,
  onCredentialDelete,
  onNoteDelete,
}: Props) => {
  return (
    <Box>
      <ScrollView horizontal contentContainerStyle={{ gap: 12 }}>
        <ItensListTab
          itenCount={credentialCount}
          onPress={() => onTabPress('credential')}
        >
          <AppItem.Icon
            name='login'
            size={16}
            backgroundColor='primaryBackground'
            foregroundColor='primary'
            className='w-10 h-10'
          />
        </ItensListTab>
        <ItensListTab itenCount={noteCount} onPress={() => onTabPress('note')}>
          <AppItem.Icon
            name='note'
            size={16}
            backgroundColor='warningBackground'
            foregroundColor='warning'
            className='w-10 h-10'
          />
        </ItensListTab>
      </ScrollView>

      <Box className='mt-6'>
        {selectedTab === 'credential' && (
          <CredentialsList
            vaultId={vaultId}
            search={search}
            onCredentialDelete={onCredentialDelete}
          />
        )}
        {selectedTab === 'note' && (
          <NotesList vaultId={vaultId} search={search} onNoteDelete={onNoteDelete} />
        )}
      </Box>
    </Box>
  )
}
