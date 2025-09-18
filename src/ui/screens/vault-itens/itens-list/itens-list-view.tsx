import { ScrollView } from 'react-native'

import type { Id } from '@/core/domain/structures'

import { Box } from '@/ui/gluestack/box'
import { ItensListTab } from './itens-list-tab'
import { AppItem } from '@/ui/components/app-item'
import { CredentialsList } from './credentials-list'

type Props = {
  vaultId: Id
  selectedTab: 'credential' | 'note'
  credentialCount: number
  noteCount: number
  onTabPress: (tab: 'credential' | 'note') => void
}

export const ItensListView = ({
  vaultId,
  credentialCount,
  noteCount,
  selectedTab,
  onTabPress,
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
        {selectedTab === 'credential' && <CredentialsList vaultId={vaultId} />}
      </Box>
    </Box>
  )
}
