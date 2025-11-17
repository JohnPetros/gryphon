import { useDatabase } from '@/ui/hooks/use-database'
import { MinimumPasswordStrenghSelectView } from './minimum-password-strengh-select-view'
import { useMinimumPasswordStrenghSelect } from './use-minimum-password-strengh-select'
import { useAuthContext } from '@/ui/hooks/use-auth-context'

export const CredentialRotationSelect = () => {
  const { accountsRepository } = useDatabase()
  const { account, updateAccount } = useAuthContext()
  const { synchronizeDatabase } = useDatabase()
  const { value, handleChange } = useMinimumPasswordStrenghSelect({
    accountsRepository,
    account,
    updateAccount,
    onUpdateAccount: synchronizeDatabase,
  })

  return <MinimumPasswordStrenghSelectView value={value} onChange={handleChange} />
}
