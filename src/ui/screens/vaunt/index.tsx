import { Id } from '@/core/domain/structures'

import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useDatabase } from '@/ui/hooks/use-database'
import { useVauntScreen } from './use-vaunt-screen'
import { VauntScreenView } from './vaunt-screen-view'

export const VauntScreen = () => {
  const { vauntsRepository } = useDatabase()
  const { account } = useAuthContext()
  const { vaunt, handleVauntCreate, handleVauntUpdate } = useVauntScreen({
    vauntsRepository,
    accountId: account?.id ?? Id.create(),
  })

  return (
    <VauntScreenView
      vaunt={vaunt}
      onCreate={handleVauntCreate}
      onUpdate={handleVauntUpdate}
    />
  )
}
