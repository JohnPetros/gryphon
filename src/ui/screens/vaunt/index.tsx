import { Id } from '@/core/domain/structures'

import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useDatabase } from '@/ui/hooks/use-database'
import { usevaultScreen } from './use-vault-screen'
import { vaultScreenView } from './vault-screen-view'

export const vaultScreen = () => {
  const { vaultsRepository } = useDatabase()
  const { account } = useAuthContext()
  const { vault, handlevaultCreate, handlevaultUpdate } = usevaultScreen({
    vaultsRepository,
    accountId: account?.id ?? Id.create(),
  })

  return (
    <vaultScreenView
      vault={vault}
      onCreate={handlevaultCreate}
      onUpdate={handlevaultUpdate}
    />
  )
}
