import { ROUTES } from '@/constants'
import type { NavigationProvider, ToastProvider } from '@/core/interfaces/providers'

type Params = {
  toastProvider: ToastProvider
  navigationProvider: NavigationProvider
}

export function useResetPasswordScreen({ toastProvider, navigationProvider }: Params) {
  function handleSendPasswordResetEmail() {
    toastProvider.show('E-mail enviado com sucessso', 'success')
  }

  function handleResetPassword() {
    toastProvider.show('Senha redefinida com sucesso', 'success')
    navigationProvider.navigate(ROUTES.auth.signIn)
  }

  return {
    handleSendPasswordResetEmail,
    handleResetPassword,
  }
}
