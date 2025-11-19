import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { CredentialRotationSelectView } from './credential-rotation-select-view'
import { useCredentialRotationSelect } from './use-credential-rotation-select'

export const CredentialRotationSelect = () => {
  const { account, updateAccount } = useAuthContext()
  const { selectedOption, options, handleChange } = useCredentialRotationSelect({
    account,
    onUpdateAccount: updateAccount,
  })

  if (selectedOption)
    return (
      <CredentialRotationSelectView
        value={selectedOption}
        options={options}
        onChange={handleChange}
      />
    )
}
