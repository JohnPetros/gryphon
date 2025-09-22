import { useDatabase } from '@/ui/hooks/use-database'
import { useAutoLockTimeoutSelect } from './use-auto-lock-timeout-select'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { AutoLockTimeoutView } from './auto-lock-timeout-select-view'

export const AutoLockTimeoutSelect = () => {
  const { accountsRepository } = useDatabase()
  const { account, setAccount } = useAuthContext()
  const { autoLockTimeout, handleChange } = useAutoLockTimeoutSelect({
    accountsRepository,
    account,
    setAccount,
  })

  return <AutoLockTimeoutView timeout={autoLockTimeout} onChange={handleChange} />
}
