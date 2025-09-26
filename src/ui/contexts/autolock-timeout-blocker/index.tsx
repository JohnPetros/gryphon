import { useRef, type PropsWithChildren } from 'react'

import type { MasterPasswordConfirmationDialogRef } from '@/ui/components/master-password-confirmation-dialog/types'
import { MasterPasswordConfirmationDialog } from '@/ui/components/master-password-confirmation-dialog'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useAutoLockTimeoutBlocker } from './use-autolock-timeout-blocker'
import { View } from 'react-native'

export const AutoLockTimeoutBlockerView = ({ children }: PropsWithChildren) => {
  const masterPasswordConfirmationDialogRef =
    useRef<MasterPasswordConfirmationDialogRef | null>(null)
  const { account } = useAuthContext()
  const { panResponder, handleCorrectMasterPasswordConfirmationDialogSubmit } =
    useAutoLockTimeoutBlocker({
      account,
      masterPasswordConfirmationDialogRef,
    })

  return (
    <>
      <MasterPasswordConfirmationDialog
        ref={masterPasswordConfirmationDialogRef}
        canClose={false}
        description='Insira a senha mestra para continuar usando o aplicativo.'
        shouldSuppressMasterPasswordRequirement
        onCorrectPasswordSubmit={handleCorrectMasterPasswordConfirmationDialogSubmit}
      />
      <View style={{ flex: 1 }} {...panResponder.panHandlers}>
        {children}
      </View>
    </>
  )
}
