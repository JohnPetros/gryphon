import { PasswordInputView } from './password-input-view'
import { usePasswordInput } from './use-password-input'

type Props = {
  label: string
  hasStrength?: boolean
  defaultValue?: string
  isRequired?: boolean
  onChange: (value: string) => void
}

export const PasswordInput = ({
  label,
  hasStrength = false,
  defaultValue = '',
  isRequired = false,
  onChange,
}: Props) => {
  const {
    password,
    isPasswordVisible,
    handlePasswordVisibilityButtonPress,
    handleChange,
  } = usePasswordInput(onChange, defaultValue)

  return (
    <PasswordInputView
      label={label}
      password={password}
      hasStrength={hasStrength}
      isRequired={isRequired}
      onChange={handleChange}
      isPasswordVisible={isPasswordVisible}
      onPasswordVisibilityButtonPress={handlePasswordVisibilityButtonPress}
    />
  )
}
