import { useRef } from 'react'

import { PasswordInputView } from './password-input-view'
import { usePasswordInput } from './use-password-input'
import type { BottomSheetRef } from '../bottom-sheet/types'
import type { MasterPasswordConfirmationDialogRef } from '../master-password-confirmation-dialog/types'
import { useAuthContext } from '@/ui/hooks/use-auth-context'

type Props = {
  label: string
  hasStrength?: boolean
  defaultValue?: string
  isRequired?: boolean
  isReadOnly?: boolean
  isProtected?: boolean
  onChange: (value: string) => void
}

export const PasswordInput = ({
  label,
  hasStrength = false,
  defaultValue = '',
  isRequired = false,
  isReadOnly = false,
  isProtected = false,
  onChange,
}: Props) => {
  const passwordGeneratorRef = useRef<BottomSheetRef | null>(null)
  const masterPasswordConfirmationDialogRef =
    useRef<MasterPasswordConfirmationDialogRef | null>(null)
  const { account } = useAuthContext()
  const {
    password,
    isPasswordVisible,
    isPasswordGeneratorVisible,
    handlePasswordVisibilityButtonPress,
    handleChange,
    handleFocus,
    handleBlur,
    handlePasswordGeneratorConfirm,
    handlePasswordGeneratorButtonPress,
    handleCorrectMasterPasswordConfirmationDialogSubmit,
  } = usePasswordInput({
    passwordGeneratorRef,
    masterPasswordConfirmationDialogRef,
    defaultValue,
    isProtected,
    isMasterPasswordRequired: Boolean(account?.isMasterPasswordRequired),
    onChange,
  })

  return (
    <PasswordInputView
      label={label}
      hasStrength={hasStrength}
      isRequired={isRequired}
      isReadOnly={isReadOnly}
      password={password}
      isPasswordVisible={isPasswordVisible}
      isPasswordGeneratorVisible={isPasswordGeneratorVisible}
      passwordGeneratorRef={passwordGeneratorRef}
      masterPasswordConfirmationDialogRef={masterPasswordConfirmationDialogRef}
      onCorrectMasterPasswordConfirmationDialogSubmit={
        handleCorrectMasterPasswordConfirmationDialogSubmit
      }
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      onPasswordVisibilityButtonPress={handlePasswordVisibilityButtonPress}
      onPasswordGeneratorConfirm={handlePasswordGeneratorConfirm}
      onPasswordGeneratorButtonPress={handlePasswordGeneratorButtonPress}
    />
  )
}
