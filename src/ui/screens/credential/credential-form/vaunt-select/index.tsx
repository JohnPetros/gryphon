import { useDatabase } from '@/ui/hooks/use-database'
import { useVauntSelect } from './use-vaunt-select'
import { VauntSelectView } from './vaunt-select-view'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { Id } from '@/core/domain/structures'

export const VauntSelect = () => {
  const { vauntsRepository } = useDatabase()
  const { account } = useAuthContext()
  const { vaunts } = useVauntSelect(vauntsRepository, account?.id ?? Id.create())

  console.log({ vaunts })

  return <VauntSelectView vaunts={vaunts} />
}
