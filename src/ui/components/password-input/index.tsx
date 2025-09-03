import { PasswordInputView } from './password-input-view'
import { usePasswordInput } from './use-password-input'

type Props = {
  label: string
  onChange: (value: string) => void
}

export const PasswordInput = ({ label, onChange }: Props) => {
  const {
    password,
    isPasswordVisible,
    handlePasswordVisibilityButtonPress,
    handleChange,
  } = usePasswordInput(onChange)

  return (
    <PasswordInputView
      label={label}
      password={password}
      onChange={handleChange}
      isPasswordVisible={isPasswordVisible}
      onPasswordVisibilityButtonPress={handlePasswordVisibilityButtonPress}
    />
  )
}
