import { useAuth } from '@/ui/hooks/use-auth'
import { EmailFormView } from './email-form-view'

type Props = {
  onSendPasswordResetEmail: () => void
}

export const EmailForm = ({ onSendPasswordResetEmail }: Props) => {
  const { sendAccountPasswordResetEmail } = useAuth()

  return (
    <EmailFormView
      sendPasswordResetEmail={sendAccountPasswordResetEmail}
      onSendPasswordResetEmail={onSendPasswordResetEmail}
    />
  )
}
