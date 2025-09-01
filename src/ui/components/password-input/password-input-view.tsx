import { Icon } from '../icon'
import { Input } from '../input'
import { Pressable } from '../pressable'

type Props = {
  label: string
  isPasswordVisible: boolean
  onChange: (value: string) => void
  onPasswordVisibilityButtonPress: () => void
}

export const PasswordInputView = ({
  label,
  isPasswordVisible,
  onChange,
  onPasswordVisibilityButtonPress,
}: Props) => {
  return (
    <Input
      type={isPasswordVisible ? 'text' : 'password'}
      label={label}
      icon='password'
      placeholder='*******'
      endContent={
        <Pressable onPress={onPasswordVisibilityButtonPress}>
          <Icon
            name={isPasswordVisible ? 'eye-close' : 'eye-open'}
            color='neutral'
            size={24}
          />
        </Pressable>
      }
      onChange={onChange}
    />
  )
}
