import { useDatabase } from '@/ui/hooks/use-database'
import { MinimumPasswordStrenghSelectView } from './minimum-password-strengh-select-view'
import { useMinimumPasswordStrenghSelect } from './use-minimum-password-strengh-select'
import { useAuthContext } from '@/ui/hooks/use-auth-context'

export const MinimumPasswordStrenghSelect = () => {
  const { accountsRepository } = useDatabase()
  const { account, updateAccount } = useAuthContext()
  const { value, handleChange } = useMinimumPasswordStrenghSelect({
    accountsRepository,
    account,
    updateAccount,
  })

  return <MinimumPasswordStrenghSelectView value={value} onChange={handleChange} />
}
