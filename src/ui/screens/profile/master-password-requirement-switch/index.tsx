import { useDatabase } from '@/ui/hooks/use-database'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { Switch } from '@/ui/components/switch'
import { useMasterPasswordRequirementSwitch } from './use-master-password-requirement-switch'

export const MasterPasswordRequirementSwitch = () => {
  const { accountsRepository } = useDatabase()
  const { account, setAccount } = useAuthContext()
  const { isChecked, handleChange } = useMasterPasswordRequirementSwitch({
    defaultChecked: Boolean(account?.isMasterPasswordRequired),
    accountsRepository,
    account,
    setAccount,
  })

  return (
    <Switch
      label='Exigência de senha mestra'
      isChecked={isChecked}
      onChange={handleChange}
    />
  )
}
