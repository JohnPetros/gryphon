import { useDatabase } from '@/ui/hooks/use-database'
import { useAutoLockTimeoutSelect } from './use-auto-lock-timeout-select'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { AutoLockTimeoutView } from './auto-lock-timeout-select-view'

export const AutoLockTimeoutSelect = () => {
  const { accountsRepository } = useDatabase()
  const { account, updateAccount } = useAuthContext()
  const { synchronizeDatabase } = useDatabase()
  const { autoLockTimeout, handleChange } = useAutoLockTimeoutSelect({
    accountsRepository,
    account,
    updateAccount,
    onUpdateAccount: synchronizeDatabase,
  })

  return <AutoLockTimeoutView timeout={autoLockTimeout} onChange={handleChange} />
}
