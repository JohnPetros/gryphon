import { PasswordInputView } from './password-input-view'
import { usePasswordInput } from './use-password-input'

type Props = {
  label: string
  onChange: (value: string) => void
}

export function PasswordInput({ label, onChange }: Props) {
  const { isPasswordVisible, handlePasswordVisibilityButtonPress } = usePasswordInput()

  return (
    <PasswordInputView
      label={label}
      onChange={onChange}
      isPasswordVisible={isPasswordVisible}
      onPasswordVisibilityButtonPress={handlePasswordVisibilityButtonPress}
    />
  )
}
