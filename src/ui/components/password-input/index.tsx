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
  hasPasswordGenerator?: boolean
  hasPasswordStrengthCaption?: boolean
  minimumPasswordStrength?: number
  onChange: (value: string) => void
}

export const PasswordInput = ({
  label,
  hasStrength = false,
  defaultValue = '',
  isRequired = false,
  isReadOnly = false,
  isProtected = false,
  hasPasswordGenerator = false,
  hasPasswordStrengthCaption = false,
  minimumPasswordStrength = 3,
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
    hasPasswordGenerator,
    isMasterPasswordRequired: Boolean(account?.isMasterPasswordRequired),
    onChange,
  })

  return (
    <PasswordInputView
      label={label}
      hasStrength={hasStrength}
      isRequired={isRequired}
      isReadOnly={isReadOnly}
      hasPasswordGenerator={hasPasswordGenerator}
      password={password}
      isPasswordVisible={isPasswordVisible}
      isPasswordGeneratorVisible={isPasswordGeneratorVisible}
      passwordGeneratorRef={passwordGeneratorRef}
      masterPasswordConfirmationDialogRef={masterPasswordConfirmationDialogRef}
      minimumPasswordStrength={minimumPasswordStrength}
      hasPasswordStrengthCaption={hasPasswordStrengthCaption}
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
