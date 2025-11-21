import { useRef } from 'react'

import type { Id } from '@/core/domain/structures'

import type { BottomSheetRef } from '@/ui/components/bottom-sheet/types'
import { useDatabase } from '@/ui/hooks/use-database'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'
import { CredentialsListView } from './credentials-list-view'
import { useCredentialsList } from './use-credentials-list'
import { useDatetime } from '@/ui/hooks/use-datetime'
import { useLocalSearchParams } from 'expo-router'

type SearchParams = {
  outdated?: string
}

type Props = {
  vaultId: Id
  search: string
  onCredentialDelete: () => void
}

export const CredentialsList = ({ vaultId, search, onCredentialDelete }: Props) => {
  const { outdated } = useLocalSearchParams<SearchParams>()
  const bottomSheetRef = useRef<BottomSheetRef | null>(null)
  const { credentialsRepository } = useDatabase()
  const { account, encryptionKey } = useAuthContext()
  const datetimeProvider = useDatetime()
  const cryptoProvider = useCryptoProvider()
  const {
    credentials,
    isOutdatedCredentialsFilterChecked,
    handleCredentialDelete,
    handleOutdatedCredentialsFilterChange,
  } = useCredentialsList({
    vaultId,
    search,
    credentialsRepository,
    credentialRotation: account?.credentialRotation,
    datetimeProvider,
    isDefaultCredentialsFilterChecked: Boolean(outdated),
    onCredentialDelete,
  })

  if (account)
    return (
      <CredentialsListView
        bottomSheetRef={bottomSheetRef}
        credentials={credentials}
        encryptionKey={encryptionKey}
        cryptoProvider={cryptoProvider}
        isOutdatedCredentialsFilterChecked={isOutdatedCredentialsFilterChecked}
        onCredentialDelete={handleCredentialDelete}
        onOutdatedCredentialsFilterChange={handleOutdatedCredentialsFilterChange}
      />
    )
}
