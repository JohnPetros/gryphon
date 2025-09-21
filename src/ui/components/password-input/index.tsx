import { useRef } from 'react'
import { PasswordInputView } from './password-input-view'
import { usePasswordInput } from './use-password-input'
import { BottomSheetRef } from '../bottom-sheet/types'

type Props = {
  label: string
  hasStrength?: boolean
  defaultValue?: string
  isRequired?: boolean
  isReadOnly?: boolean
  onChange: (value: string) => void
}

export const PasswordInput = ({
  label,
  hasStrength = false,
  defaultValue = '',
  isRequired = false,
  isReadOnly = false,
  onChange,
}: Props) => {
  const passwordGeneratorRef = useRef<BottomSheetRef | null>(null)
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
  } = usePasswordInput({ passwordGeneratorRef, defaultValue, onChange })

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
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      onPasswordVisibilityButtonPress={handlePasswordVisibilityButtonPress}
      onPasswordGeneratorConfirm={handlePasswordGeneratorConfirm}
      onPasswordGeneratorButtonPress={handlePasswordGeneratorButtonPress}
    />
  )
}
