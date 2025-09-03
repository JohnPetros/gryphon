import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { MasterPasswordFormView } from './master-password-form-view'
import { useMasterPasswordForm } from './use-master-password-form'

type Props = {
  onCreate: (password: string) => void
}

export const MasterPasswordForm = ({ onCreate }: Props) => {
  const { isLoading } = useAuthContext()
  const { isPasswordValid, handlePasswordChange, handleSubmit } =
    useMasterPasswordForm(onCreate)

  return (
    <MasterPasswordFormView
      isPasswordValid={isPasswordValid}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      handlePasswordChange={handlePasswordChange}
    />
  )
}
